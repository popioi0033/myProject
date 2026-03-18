"use client";
import { useState, useRef, useEffect } from "react";
import { StudentService } from "@/app/service/student/studentService";

type TrackingHeaderProps = {
  statusFilter: string[];
  onFilterChange: (code: string) => void;
};

const TrackingHeader = ({ statusFilter, onFilterChange }: TrackingHeaderProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const statuses = [
    { code: "PENDING", label: "รอดำเนินการ" },
    { code: "REVIEWING", label: "กำลังตรวจสอบ" },
    { code: "APPROVED", label: "อนุมัติ" },
    { code: "REJECTED", label: "ปฏิเสธ" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="student-header">
      <div className="left">
        <div className="filter-dropdown-wrapper" ref={dropdownRef}>
          <button className="filter-btn" onClick={() => setShowDropdown(prev => !prev)}>
            Filter
            {statusFilter.length > 0 && (
              <span className="filter-count">{statusFilter.length}</span>
            )}
            ⌄
          </button>

          {showDropdown && (
            <div className="filter-dropdown">
              {statuses.map((s) => (
                <label key={s.code} className="filter-dropdown-item">
                  <input
                    type="checkbox"
                    checked={statusFilter.includes(s.code)}
                    onChange={() => onFilterChange(s.code)}
                  />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="right">
        <input className="search" placeholder="Search by student name or ID" />
        <button
          className="link"
          onClick={() => StudentService.exportExcel("", statusFilter.join(","))}
        >
          Export excel
        </button>
      </div>
    </div>
  );
};

export default TrackingHeader;