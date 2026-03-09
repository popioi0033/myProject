"use client";
import "./officers.css";
import { useState, useEffect } from "react";
import OfficersHeader from "./components/officerHeader";
import OfficersTable from "./components/officerTabel";
import { Officer, Pagination } from "./components/types";
import { OfficerService } from "@/app/service/officer/officerService";

export default function OfficersPage() {
  const [data, setData] = useState<Officer[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  const fetchOfficers = async (page: number) => {
  console.log("fetching page:", page) 
  try {
    setLoading(true);
    const res = await OfficerService.getOfficers({ page, limit: 10 });
    console.log("res.pagination:", res.pagination)  
    setData(res.data);
    setPagination(res.pagination);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchOfficers(1);
  }, []);

  return (
    <div className="officers-page">
      <OfficersHeader />
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <>
          <OfficersTable data={data} />
          <div className="pagination">
            <button
              onClick={() => fetchOfficers(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              ←
            </button>
            <span>Page {pagination.page} of {pagination.totalPages}</span>
            <button
              onClick={() => fetchOfficers(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
            >
              →
            </button>
          </div>
        </>
      )}
    </div>
  );
}