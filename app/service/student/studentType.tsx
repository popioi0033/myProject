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

export type AddRequestPayload = {
  studentId: number;
  academicYear: string;
  semester: number;
};

export type LoanRequest = {
  id: number;
  academic_year: string;
  semester: number;
  created_at: string;
  first_name: string;
  last_name: string;
  student_code: string;
  officer_name: string;
  status: string;
  status_code: string;
};

export type LoanRequestResponse = {
  data: LoanRequest[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};