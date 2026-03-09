import { Faculty, AddStudentPayload, Student } from "./studentType";

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
};