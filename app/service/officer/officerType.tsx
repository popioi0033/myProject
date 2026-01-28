export type CreateOfficerPayload = {
  officerCode: string;
  name: string;
  email: string;
  institute: string;
  jobPosition: string;
  phone: string;
  role: "ADMIN" | "STAFF";
};
