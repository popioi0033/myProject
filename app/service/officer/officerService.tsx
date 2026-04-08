import { CreateOfficerPayload ,Officer,Pagination} from "../officer/officerType";

const BASE_URL = "http://localhost:3001/api/officers";

export const OfficerService = {
  createOfficer: async (payload: CreateOfficerPayload) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Create officer failed");
    }

    return res.json();
  },
  getOfficers: async ({
    page = 1,
    limit = 10,
    search = "",
  }: {
    page?: number;
    limit?: number;
    search?: string;
  } = {}) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search,
    });

    const res = await fetch(`${BASE_URL}/get?${params}`);

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Get officers failed");
    }

    return res.json(); 
  },
  exportOfficerExcel: (search = "") => {
  const params = new URLSearchParams({ search });
  window.open(`${BASE_URL}/export?${params}`, "_blank");
},
};