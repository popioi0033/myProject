"use client";
import { useState, useEffect } from "react";
import { LoanPeriod } from "@/app/service/period/loanPeriodType";
import { LoanPeriodService } from "@/app/service/period/loanPeriodService";

const getPeriodStatus = (startDate: string, endDate: string) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) return { label: "ยังไม่เริ่ม", className: "upcoming" };
  if (now > end) return { label: "สิ้นสุดแล้ว", className: "expired" };
  return { label: "กำลังเปิดอยู่", className: "active" };
};

type Props = {
  refresh?: number;
};

const PeriodTable = ({ refresh }: Props) => {
  const [data, setData] = useState<LoanPeriod[]>([]);
  const [loading, setLoading] = useState(true);
  const [editPeriod, setEditPeriod] = useState<LoanPeriod | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });

  const fetchPeriods = async () => {
    try {
      setLoading(true);
      const res = await LoanPeriodService.getLoanPeriods();
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditOpen = (period: LoanPeriod) => {
    setEditPeriod(period);
    setEditForm({
      name: period.name,
      startDate: period.start_date.slice(0, 16),
      endDate: period.end_date.slice(0, 16),
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPeriod) return;
    try {
      await LoanPeriodService.updateLoanPeriod(editPeriod.id, {
        name: editForm.name,
        startDate: editForm.startDate,
        endDate: editForm.endDate,
      });
      setEditPeriod(null);
      fetchPeriods();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  useEffect(() => {
    fetchPeriods();
  }, [refresh]);

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <>
      <table className="period-table">
        <thead>
          <tr>
            <th>ชื่อรอบ</th>
            <th>ปีการศึกษา</th>
            <th>เทอม</th>
            <th>วันเริ่ม</th>
            <th>วันสิ้นสุด</th>
            <th>สถานะ</th>
            <th>สร้างโดย</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((period) => {
            const status = getPeriodStatus(period.start_date, period.end_date);
            return (
              <tr key={period.id}>
                <td>{period.name}</td>
                <td>{period.academic_year}</td>
                <td>{period.semester}</td>
                <td>{new Date(period.start_date).toLocaleDateString("th-TH")}</td>
                <td>{new Date(period.end_date).toLocaleDateString("th-TH")}</td>
                <td>
                  <span className={`period-badge ${status.className}`}>
                    {status.label}
                  </span>
                </td>
                <td>{period.created_by_name}</td>
                <td>
                  <button className="add-request-btn" onClick={() => handleEditOpen(period)}>
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editPeriod && (
        <div className="modal-overlay">
          <form className="student-form" onSubmit={handleEditSubmit}>
            <button type="button" className="close-btn" onClick={() => setEditPeriod(null)}>✕</button>

            <div className="student-form-header">
              <h1>Edit Loan Period</h1>
            </div>

            <div className="form-row">
              <div className="form-field span-4">
                <label>Period Name</label>
                <input
                  value={editForm.name}
                  onChange={(e) => setEditForm(p => ({ ...p, name: e.target.value }))}
                />
              </div>

              <div className="form-field span-2">
                <label>Start Date</label>
                <input
                  type="datetime-local"
                  value={editForm.startDate}
                  onChange={(e) => setEditForm(p => ({ ...p, startDate: e.target.value }))}
                />
              </div>

              <div className="form-field span-2">
                <label>End Date</label>
                <input
                  type="datetime-local"
                  value={editForm.endDate}
                  onChange={(e) => setEditForm(p => ({ ...p, endDate: e.target.value }))}
                />
              </div>

              <div className="form-actions span-4">
                <button type="submit" className="primary">Save</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default PeriodTable;