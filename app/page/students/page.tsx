"use client";
import { useState, useEffect } from "react";
import StudentHeader from "./components/studentHeader";
import StudentTable from "./components/studentTable";
import "./studentLoan.css";
import { Student, StudentResponse } from "@/app/service/student/studentType";
import { StudentService } from "@/app/service/student/studentService";

export default function StudentLoanPage() {
  const [data, setData] = useState<Student[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null); 

  const fetchStudents = async (page: number) => {
    try {
      setLoading(true);
      const res: StudentResponse = await StudentService.getStudent({ page, limit: 10 });
      setData(res.data);
      setPagination(res.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(1);
  }, []);

  return (
    <>
      <StudentHeader onSuccess={() => fetchStudents(pagination.page)} />
      <div className="student-layout">
    
        <div>
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : (
            <>
              <StudentTable data={data} onAddRequest={() => fetchStudents(pagination.page)} />
              <div className="pagination">
                <button onClick={() => fetchStudents(pagination.page - 1)} disabled={pagination.page === 1}>←</button>
                <span>Page {pagination.page} of {pagination.totalPages}</span>
                <button onClick={() => fetchStudents(pagination.page + 1)} disabled={pagination.page === pagination.totalPages}>→</button>
              </div>
            </>
          )}
        </div>
      </div>
       {selectedStudent && (
        <div className="modal-overlay">
          <div className="student-form">
            <button className="close-btn" onClick={() => setSelectedStudent(null)}>✕</button>
            <h2>Add Loan Request</h2>
            <p>Student: <strong>{selectedStudent.first_name} {selectedStudent.last_name}</strong></p>
            <p>ID: {selectedStudent.student_code}</p>
            {/* form เพิ่ม loan request ทำต่อตรงนี้ */}
          </div>
        </div>
      )}
    </>
  );
}