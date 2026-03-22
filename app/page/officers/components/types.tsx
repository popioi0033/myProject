export interface Officer {
  id: string;
  name: string;
  institute: string;
  officer_code: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}