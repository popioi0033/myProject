// app/(dashboard)/officers/page.tsx
import "./officers.css";
import OfficersHeader from "./components/officerHeader";
import OfficersTable from "./components/officerTabel";
import { Officer } from "./components/types";

const mockData: Officer[] = [
  {
    id: "1",
    name: "Kristin Watson",
    institute: "Officer",
    officerId: "2933243245352",
    email: "michelle.rivera@example.com",
    contact: "Female",
  },
  {
    id: "2",
    name: "Marvin McKinney",
    institute: "Officer",
    officerId: "2933243245352",
    email: "debbie.baker@example.com",
    contact: "Female",
  },
];

export default function OfficersPage() {
  return (
    <div className="officers-page">
      <OfficersHeader />
      <OfficersTable data={mockData} />
    </div>
  );
}
