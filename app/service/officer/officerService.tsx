import { CreateOfficerPayload } from "../officer/officerType";

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
};