import StudentHeader from "./components/studentHeader";
import StudentTable from "./components/studentTable";
import StudentDetail from "./components/studentDetail";
import "./studentLoan.css";

const mockData = [
  {
    id: "1",
    name: "Enth Mercy",
    studentId: "703703",
    email: "michelle.rivera@example.com",
    campus: "JS 2",
    faculty: "a",
  },
  {
    id: "2",
    name: "Cody Fisher",
    studentId: "542030",
    email: "tim.jennings@example.com",
    campus: "SS 3",
    faculty: "a",
  },
];

export default function StudentLoanPage() {
  return (
    <>
      <StudentHeader />

      <div className="student-layout">
        <StudentTable data={mockData} />
        <StudentDetail />
      </div>
    </>
  );
}
