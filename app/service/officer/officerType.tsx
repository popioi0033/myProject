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
