export type Faculty = {
  code: string;
  name: string;
};

export type AddStudentPayload = {
  studentCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  facultyCode: string;
};

export type Student = {
  id: number;
  student_code: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  faculty_id?: number;    // addStudent
  faculty_name?: string;  // getStd (JOIN faculties)
};

export type StudentResponse = {
  data: Student[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};