"use client";
import AddOfficersForm from "./add-officerForm";
import { useState } from "react";

const OfficersHeader = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="officers-header">
      <div>
        <h1 className="officer-header" >Officers</h1>
        <button className="add-btn" onClick={() => setShowForm(true)}>add officer</button>
        <button className="filter-btn">filter</button>
      </div>
      {showForm && (
        <div className="modal-overlay">
          <AddOfficersForm onClose={() => setShowForm(false)} />
        </div>
      )}
      <div className="officers-actions">
        <input
          className="search"
          placeholder="Search for officers by name or email"
        />
        <button className="link">Export excel</button>
        <button className="primary">Confirm the officers</button>
      </div>
    </div>
  );
};

export default OfficersHeader;
