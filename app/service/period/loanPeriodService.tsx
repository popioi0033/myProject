import { LoanPeriod } from "./loanPeriodType";

const BASE_URL = "http://localhost:3001/api";

export const LoanPeriodService = {
  getLoanPeriods: async (): Promise<{ data: LoanPeriod[] }> => {
    const res = await fetch(`${BASE_URL}/loan-period`);
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Get loan periods failed");
    }
    return res.json();
  },

  createLoanPeriod: async (data: {
    name: string;
    academicYear: string;
    semester: number;
    startDate: string;
    endDate: string;
  }): Promise<void> => {
    const res = await fetch(`${BASE_URL}/loan-period`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Create loan period failed");
    }
    return res.json();
  },

  updateLoanPeriod: async (id: number, data: {
    name?: string;
    academicYear?: string;
    semester?: number;
    startDate?: string;
    endDate?: string;
  }): Promise<void> => {
    const res = await fetch(`${BASE_URL}/loan-period/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Update loan period failed");
    }
    return res.json();
  },
  deleteLoanPeriod: async (id: number): Promise<void> => {
    const res = await fetch(`${BASE_URL}/loan-period/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Delete loan period failed");
    }
    return res.json();
  },
};