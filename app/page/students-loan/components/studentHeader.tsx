"use client";
import { useState } from "react";
import AddStudentForm from "./addStudentForm";

const StudentHeader = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="student-header">
        <div className="left">
          <button className="filter-btn">Add filter ⌄</button>
        </div>

        <div className="right">
          <input
            className="search"
            placeholder="Search for a student by name or email"
          />
          <button className="link">Export excel</button>
          <button className="primary" onClick={() => setShowForm(true)}>
            Add Student
          </button>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <AddStudentForm onClose={() => setShowForm(false)} />
        </div>
      )}
    </>
  );
};

export default StudentHeader;