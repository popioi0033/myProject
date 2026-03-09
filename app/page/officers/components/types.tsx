export interface Officer {
  id: string;
  name: string;
  institute: string;
  officerId: string;
  email: string;
  contact: string;
  avatar?: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}