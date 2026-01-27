import { Student } from "./types";

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
          <th>Campus</th>
          <th>Faculty</th>
        </tr>
      </thead>

      <tbody>
        {data.map((s) => (
          <tr key={s.id}>
            <td className="name">
              <img src={s.avatar ?? "/avatar.png"} />
              {s.name}
            </td>
            <td>{s.studentId}</td>
            <td>{s.email}</td>
            <td>{s.campus}</td>
            <td>{s.faculty}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
