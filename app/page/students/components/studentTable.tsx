import { useState } from "react";
import { StudentService } from "@/app/service/student/studentService";
import { Student } from "@/app/service/student/studentType";

type Props = {
  data: Student[];
  onAddRequest: () => void;  
};

const StudentTable = ({ data, onAddRequest }: Props) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [form, setForm] = useState({ academicYear: "", semester: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    try {
      await StudentService.addRequest({
        studentId: selectedStudent.id,
        academicYear: form.academicYear,
        semester: parseInt(form.semester),
      });
      setSelectedStudent(null);
      setForm({ academicYear: "", semester: "" });
      onAddRequest();  
      alert("Add request success");
    } catch (err) {
      console.error(err);
      alert("Add request failed");
    }
  };

  return (
    <>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Email address</th>
            <th>Phone</th>
            <th>Faculty</th>
            <th></th>
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
              <td>
                <button className="add-request-btn" onClick={() => setSelectedStudent(s)}>
                  + Add Request
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedStudent && (
        <div className="modal-overlay">
          <form className="student-form" onSubmit={handleSubmit}>
            <button type="button" className="close-btn" onClick={() => setSelectedStudent(null)}>✕</button>

            <div className="student-form-header">
              <h1>Add Loan Request</h1>
              <p style={{ color: "#666", fontSize: "14px" }}>
                {selectedStudent.first_name} {selectedStudent.last_name} • {selectedStudent.student_code}
              </p>
            </div>

            <div className="form-row">
              <div className="form-field span-2">
                <label>Academic Year</label>
                <input
                  name="academicYear"
                  placeholder="25XX"
                  value={form.academicYear}
                  onChange={(e) => setForm(prev => ({ ...prev, academicYear: e.target.value }))}
                />
              </div>

              <div className="form-field span-2">
                <label>Semester</label>
                <select
                  name="semester"
                  value={form.semester}
                  onChange={(e) => setForm(prev => ({ ...prev, semester: e.target.value }))}
                >
                  <option value="">Select semester</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>

              <div className="form-actions span-4">
                <button type="submit" className="primary">Confirm</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default StudentTable;