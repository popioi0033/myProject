"use client";  
import TrackingHeader from "./components/trackingHeader";
import TrackingTable from "./components/trackingTable";
import "./tracking.css";
import { useState } from "react";

export default function TrackingPage() {
  const [statusFilter, setStatusFilter] = useState<string[]>(["PENDING", "REVIEWING"]);

  const handleFilterChange = (code: string) => {
    setStatusFilter(prev =>
      prev.includes(code)
        ? prev.filter(c => c !== code)
        : [...prev, code]
    );
  };

  return (
    <>
      <TrackingHeader statusFilter={statusFilter} onFilterChange={handleFilterChange} />
      <TrackingTable statusFilter={statusFilter} />
    </>
  );
}