"use client";
import { useState } from "react";
import { StudentService } from "@/app/service/student/studentService";
import { Student, UpdateStudentPayload } from "@/app/service/student/studentType";

type Props = {
  data: Student[];
  onAddRequest: () => void;
};

const StudentTable = ({ data, onAddRequest }: Props) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [viewStudent, setViewStudent] = useState<Student | null>(null);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [editForm, setEditForm] = useState<UpdateStudentPayload>({}); 
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

  const handleEditOpen = (s: Student) => {
    setEditStudent(s);
    setEditForm({
      firstName: s.first_name,
      lastName: s.last_name,
      email: s.email,
      phone: s.phone,
      gpax: s.gpax ? parseFloat(s.gpax) : undefined,
      year: s.year ? parseInt(s.year) : undefined,
      branch: s.branch,
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editStudent) return;
    try {
      await StudentService.updateStudent(editStudent.id, editForm);
      setEditStudent(null);
      onAddRequest(); // refresh table
      alert("Update student success");
    } catch (err) {
      console.error(err);
      alert("Update student failed");
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
              <td style={{ display: "flex", gap: "8px" }}>
                <button className="add-request-btn" onClick={() => setViewStudent(s)}>View</button>
                <button className="add-request-btn" onClick={() => handleEditOpen(s)}>Edit</button>
                <button className="add-request-btn" onClick={() => setSelectedStudent(s)}>+ Add Request</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Detail Modal */}
      {viewStudent && (
        <div className="modal-overlay">
          <div className="student-form">
            <button className="close-btn" onClick={() => setViewStudent(null)}>✕</button>
            <div className="student-form-header"><h1>Student Detail</h1></div>
            <div className="detail-section">
              <p className="detail-section-title">Personal Information</p>
              <div className="detail-grid">
                <div className="detail-item"><span>Student ID</span><strong>{viewStudent.student_code}</strong></div>
                <div className="detail-item"><span>First Name</span><strong>{viewStudent.first_name}</strong></div>
                <div className="detail-item"><span>Last Name</span><strong>{viewStudent.last_name}</strong></div>
                <div className="detail-item"><span>Email</span><strong>{viewStudent.email}</strong></div>
                <div className="detail-item"><span>Phone</span><strong>{viewStudent.phone}</strong></div>
                <div className="detail-item"><span>Faculty</span><strong>{viewStudent.faculty_name || "-"}</strong></div>
                <div className="detail-item"><span>Branch</span><strong>{viewStudent.branch || "-"}</strong></div>
                <div className="detail-item"><span>Year</span><strong>{viewStudent.year || "-"}</strong></div>
                <div className="detail-item"><span>GPAX</span><strong>{viewStudent.gpax ?? "-"}</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editStudent && (
        <div className="modal-overlay">
          <form className="student-form" onSubmit={handleEditSubmit}>
            <button type="button" className="close-btn" onClick={() => setEditStudent(null)}>✕</button>
            <div className="student-form-header">
              <h1>Edit Student</h1>
              <p style={{ color: "#666", fontSize: "14px" }}>{editStudent.student_code}</p>
            </div>
            <div className="form-row">
              <div className="form-field span-2">
                <label>First Name</label>
                <input value={editForm.firstName ?? ""} onChange={(e) => setEditForm(p => ({ ...p, firstName: e.target.value }))} />
              </div>
              <div className="form-field span-2">
                <label>Last Name</label>
                <input value={editForm.lastName ?? ""} onChange={(e) => setEditForm(p => ({ ...p, lastName: e.target.value }))} />
              </div>
              <div className="form-field span-2">
                <label>Email</label>
                <input type="email" value={editForm.email ?? ""} onChange={(e) => setEditForm(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div className="form-field span-2">
                <label>Phone</label>
                <input value={editForm.phone ?? ""} onChange={(e) => setEditForm(p => ({ ...p, phone: e.target.value }))} />
              </div>
              <div className="form-field span-2">
                <label>Branch</label>
                <input value={editForm.branch ?? ""} onChange={(e) => setEditForm(p => ({ ...p, branch: e.target.value }))} />
              </div>
              <div className="form-field span-1">
                <label>Year</label>
                <select value={editForm.year ?? ""} onChange={(e) => setEditForm(p => ({ ...p, year: parseInt(e.target.value) }))}>
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className="form-field span-1">
                <label>GPAX</label>
                <input type="number" min="0" max="4" step="0.01" value={editForm.gpax ?? ""} onChange={(e) => setEditForm(p => ({ ...p, gpax: parseFloat(e.target.value) }))} />
              </div>
              <div className="form-actions span-4">
                <button type="submit" className="primary">Save</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Add Request Modal */}
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
                <input name="academicYear" placeholder="25XX" value={form.academicYear} onChange={(e) => setForm(prev => ({ ...prev, academicYear: e.target.value }))} />
              </div>
              <div className="form-field span-2">
                <label>Semester</label>
                <select name="semester" value={form.semester} onChange={(e) => setForm(prev => ({ ...prev, semester: e.target.value }))}>
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