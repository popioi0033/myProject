"use client";
import { useState } from "react";
import { LoanPeriodService } from "@/app/service/period/loanPeriodService";

type AddLoanPeriodFormProps = {
  onClose: () => void;
  onSuccess?: () => void;
};

const AddLoanPeriodForm = ({ onClose, onSuccess }: AddLoanPeriodFormProps) => {
  const [form, setForm] = useState({
    name: "",
    academicYear: "",
    semester: "",
    startDate: "",
    endDate: "",
  });

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.academicYear || !form.semester || !form.startDate || !form.endDate) {
      alert("Please fill required fields");
      return;
    }
    try {
      await LoanPeriodService.createLoanPeriod({ 
        name: form.name,
        academicYear: form.academicYear,
        semester: parseInt(form.semester),
        startDate: form.startDate,
        endDate: form.endDate,
      });
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Add period failed");
    }
};

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <button type="button" className="close-btn" onClick={onClose}>✕</button>

      <div className="student-form-header">
        <h1>Add Loan Period</h1>
      </div>

      <div className="form-row">
        <div className="form-field span-4">
          <label>Period Name</label>
          <input
            placeholder="เช่น รอบที่ 1 เทอม 1/2567"
            value={form.name}
            onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
          />
        </div>

        <div className="form-field span-2">
          <label>Academic Year</label>
          <input
            placeholder="เช่น 2567"
            value={form.academicYear}
            onChange={(e) => setForm(p => ({ ...p, academicYear: e.target.value }))}
          />
        </div>

        <div className="form-field span-2">
          <label>Semester</label>
          <select
            value={form.semester}
            onChange={(e) => setForm(p => ({ ...p, semester: e.target.value }))}
          >
            <option value="">Select semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>

        <div className="form-field span-2">
          <label>Start Date</label>
          <input
            type="datetime-local"
            value={form.startDate}
            onChange={(e) => setForm(p => ({ ...p, startDate: e.target.value }))}
          />
        </div>

        <div className="form-field span-2">
          <label>End Date</label>
          <input
            type="datetime-local"
            value={form.endDate}
            onChange={(e) => setForm(p => ({ ...p, endDate: e.target.value }))}
          />
        </div>

        <div className="form-actions span-4">
          <button type="submit" className="primary">Confirm</button>
        </div>
      </div>
    </form>
  );
};

export default AddLoanPeriodForm;