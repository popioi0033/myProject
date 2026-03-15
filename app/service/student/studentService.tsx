import { Faculty, AddStudentPayload, Student ,StudentResponse, AddRequestPayload,LoanRequest,LoanRequestResponse} from "./studentType";

const BASE_URL = "http://localhost:3001/api";

export const StudentService = {
  getFacultyDropdown: async (search = ""): Promise<Faculty[]> => {
    const params = new URLSearchParams({ search });
    const res = await fetch(`${BASE_URL}/faculty?${params}`);

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Get faculty failed");
    }

    const json = await res.json();
    return json.data;
  },

  addStudent: async (data: AddStudentPayload): Promise<Student> => {
    const res = await fetch(`${BASE_URL}/students/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Add student failed");
    }

    const json = await res.json();
    return json.student;
  },

  getStudent: async ({
    page = 1,
    limit = 10,
    search = "",
  }: {
    page?: number;
    limit?: number;
    search?: string;
  } = {}): Promise<StudentResponse> => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search,
    });

    const res = await fetch(`${BASE_URL}/students/get?${params}`);

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Get officers failed");
    }

    return res.json(); 
  },
  addRequest: async (data: AddRequestPayload): Promise<void> => {
    const res = await fetch(`${BASE_URL}/students/add-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Add request failed");
    }

    return res.json();
},
  getRequest: async ({
    page = 1,
    limit = 10,
    search = "",
  }: {
    page?: number;
    limit?: number;
    search?: string;
  } = {}): Promise<LoanRequestResponse> => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search,
    });

    const res = await fetch(`${BASE_URL}/students/get-request?${params}`);

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Get request failed");
    }

    return res.json();
  },
};
