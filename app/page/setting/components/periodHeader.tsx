"use client";
import { useState } from "react";
import AddLoanPeriodForm from "./addLoanPeriodForm";

type PeriodHeaderProps = {
  onSuccess: () => void;
};


const PeriodHeader = ({ onSuccess }: PeriodHeaderProps) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="student-header">
        <div className="left">
          <h1>
            Loan Period Setting
          </h1>
        </div>
        <div className="right">
          <button className="link">Export excel</button>
          <button className="primary" onClick={() => setShowForm(true)}>
            + Add Period
          </button>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <AddLoanPeriodForm onClose={() => setShowForm(false)} />
        </div>
      )}
    </>
  );
};

export default PeriodHeader;