export type CreateOfficerPayload = {
  officerCode: string;
  name: string;
  email: string;
  institute: string;
  jobPosition: string;
  phone: string;
  username: string;
  password: string;
  role: "ADMIN" | "STAFF";
};

export interface Officer {
  id: number;
  officer_code: string;
  name: string;
  institute: string;
  email: string;
  job_position: string;
  phone: string;
  role: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}