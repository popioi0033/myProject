"use client";
import { useState, useEffect } from "react";
import { StudentService } from "@/app/service/student/studentService";
import { LoanRequest, LoanRequestResponse } from "@/app/service/student/studentType";

type Props = {
  statusFilter: string[];
};

const TrackingTable = ({ statusFilter }: Props) => {
 
  const [data, setData] = useState<LoanRequest[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<LoanRequest | null>(null);

  const fetchRequests = async (page: number) => {
    try {
      setLoading(true);
      const res: LoanRequestResponse = await StudentService.getRequest({ page, limit: 10 ,status: statusFilter.join(",")});
      setData(res.data);
      setPagination(res.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: "next" | "reject") => {
    if (!selected) return;
    try {
      await StudentService.updateStatus({ requestId: selected.id, action });
      setSelected(null);
      fetchRequests(pagination.page);
    } catch (err) {
      console.error(err);
      alert("Update status failed");
    }
  };

  useEffect(() => {
    fetchRequests(1);
  }, [statusFilter]); 

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <>
      <div className="tracking-layout">
        <div>
          <table className="student-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Officer</th>
                <th>Academic Year</th>
                <th>Semester</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.first_name} {row.last_name}</td>
                  <td>{row.officer_name}</td>
                  <td>{row.academic_year}</td>
                  <td>{row.semester}</td>
                  <td>
                    <span className={`status-badge ${
                      row.status_code === "APPROVED" ? "approved" :
                      row.status_code === "REJECTED" ? "rejected" : "pending"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <button className="add-request-btn" onClick={() => setSelected(row)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={() => fetchRequests(pagination.page - 1)} disabled={pagination.page === 1}>←</button>
            <span>Page {pagination.page} of {pagination.totalPages}</span>
            <button onClick={() => fetchRequests(pagination.page + 1)} disabled={pagination.page === pagination.totalPages}>→</button>
          </div>
        </div>

        <div className="tracking-detail">
          <p className="tracking-detail-empty">Select a request to view details</p>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="modal-overlay">
          <div className="student-form">
            <button className="close-btn" onClick={() => setSelected(null)}>✕</button>

            <div className="student-form-header">
              <h1>Loan Request Detail</h1>
              <span className={`status-badge ${
                selected.status_code === "APPROVED" ? "approved" :
                selected.status_code === "REJECTED" ? "rejected" : "pending"
              }`}>
                {selected.status}
              </span>
            </div>

            {/* ข้อมูลนักศึกษา */}
            <div className="detail-section">
              <p className="detail-section-title">Student Information</p>
              <div className="detail-grid">
                <div className="detail-item">
                  <span>Student ID</span>
                  <strong>{selected.student_code}</strong>
                </div>
                <div className="detail-item">
                  <span>Name</span>
                  <strong>{selected.first_name} {selected.last_name}</strong>
                </div>
                <div className="detail-item">
                  <span>Faculty</span>
                  <strong>{selected.faculty_name}</strong>
                </div>
                <div className="detail-item">
                  <span>Branch</span>
                  <strong>{selected.branch || "-"}</strong>
                </div>
                <div className="detail-item">
                  <span>Year</span>
                  <strong>{selected.year || "-"}</strong>
                </div>
                <div className="detail-item">
                  <span>GPAX</span>
                  <strong>{selected.gpax ?? "-"}</strong>
                </div>
              </div>
            </div>

            {/* ข้อมูล request */}
            <div className="detail-section">
              <p className="detail-section-title">Request Information</p>
              <div className="detail-grid">
                <div className="detail-item">
                  <span>Academic Year</span>
                  <strong>{selected.academic_year}</strong>
                </div>
                <div className="detail-item">
                  <span>Semester</span>
                  <strong>{selected.semester}</strong>
                </div>
                <div className="detail-item">
                  <span>Officer</span>
                  <strong>{selected.officer_name}</strong>
                </div>
              </div>
            </div>

            {/* ปุ่ม action — ซ่อนถ้า APPROVED หรือ REJECTED */}
            {!["APPROVED", "REJECTED"].includes(selected.status_code) && (
              <div className="detail-actions">
                <button className="reject-btn" onClick={() => handleAction("reject")}>
                  ปฏิเสธ
                </button>
                <button className="primary" onClick={() => handleAction("next")}>
                  {selected.status_code === "PENDING" ? "ดำเนินการต่อ" : "อนุมัติ"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TrackingTable;