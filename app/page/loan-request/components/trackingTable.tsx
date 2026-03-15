"use client";
import { useState, useEffect } from "react";
import { StudentService } from "@/app/service/student/studentService";
import { LoanRequest, LoanRequestResponse } from "@/app/service/student/studentType";

const TrackingTable = () => {
  const [data, setData] = useState<LoanRequest[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  const fetchRequests = async (page: number) => {
    try {
      setLoading(true);
      const res: LoanRequestResponse = await StudentService.getRequest({ page, limit: 10 });
      setData(res.data);
      setPagination(res.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(1);
  }, []);

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
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
                  <span className={`status-badge ${row.status_code === "APPROVED" ? "approved" : "pending"}`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <button className="add-request-btn">View</button>
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
  );
};

export default TrackingTable;