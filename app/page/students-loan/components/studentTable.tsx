import { Student } from "@/app/service/student/studentType";

type Props = {
  data: Student[];
};

const StudentTable = ({ data }: Props) => {
  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Student ID</th>
          <th>Email address</th>
          <th>Phone</th>
          <th>Faculty</th>
        </tr>
      </thead>
      <tbody>
        {data.map((s) => (
          <tr key={s.id}>
            <td className="name">{s.first_name} {s.last_name}</td>
            <td>{s.student_code}</td>
            <td>{s.email}</td>
            <td>{s.phone}</td>
            <td>{s.faculty_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;