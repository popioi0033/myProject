export type Student = {
  id: string;
  name: string;
  avatar?: string;
  studentId: string;
  email: string;
  campus: string;
  faculty: string;
};

export type UpdateStudentPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  gpax?: number;
  year?: number;
  branch?: string;
  facultyCode?: string;
};
