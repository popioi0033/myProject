// app/(dashboard)/officers/components/OfficersTable.tsx
import { Officer } from "./types";

type Props = {
  data: Officer[];
};

const OfficersTable = ({ data }: Props) => {
  return (
    <table className="officers-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Institute</th>
          <th>Officers ID</th>
          <th>Email address</th>
          <th>Contact</th>
        </tr>
      </thead>

      <tbody>
        {data.map((officer) => (
          <tr key={officer.id}>
            <td className="name">{officer.name}</td>
            <td>{officer.institute}</td>
            <td>{officer.officerId}</td>
            <td>{officer.email}</td>
            <td>{officer.contact}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OfficersTable;
