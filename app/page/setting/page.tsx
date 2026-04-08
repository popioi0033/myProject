"use client";
import "./setting.css";
import PeriodHeader from "./components/periodHeader";
import PeriodTable from "./components/PeriodTable";
import { useState } from "react";

export default function SettingPage() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="setting-page">
      <PeriodHeader onSuccess={() => setRefresh(r => r + 1)} />
      <PeriodTable refresh={refresh} />
    </div>
  );
}