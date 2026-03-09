"use client";
import { useState, useEffect } from "react";
import { StudentService } from "../../../service/student/studentService";
import { Faculty, AddStudentPayload } from "../../../service/student/studentType";

type AddStudentFormProps = {
    onClose: () => void;
};

const AddStudentForm = ({ onClose }: AddStudentFormProps) => {
    const [faculties, setFaculties] = useState<Faculty[]>([]);
    const [form, setForm] = useState<AddStudentPayload>({
        studentCode: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        facultyCode: "",
    });
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const loadFaculties = async () => {
            const data = await StudentService.getFacultyDropdown();
            setFaculties(data);
        };
        loadFaculties();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.studentCode || !form.firstName || !form.lastName || !form.facultyCode) {
            alert("Please fill required fields");
            return;
        }

        try {
            await StudentService.addStudent(form);
            setShowSuccess(true);
        } catch (err) {
            console.error(err);
            alert("Add student failed");
        }
    };

    if (showSuccess) {
        return (
            <div className="success-modal">
                <div className="success-icon">✓</div>
                <h2 className="success-title">Add Student Success!</h2>
                <p className="success-desc">
                    <strong>{form.firstName} {form.lastName}</strong> has been added successfully.
                </p>
                <button className="primary success-close-btn" onClick={onClose}>Done</button>
            </div>
        );
    }

    return (
        <form className="officer-form" onSubmit={handleSubmit}>
            <button type="button" className="close-btn" onClick={onClose}>✕</button>

            <div className="officer-form-header">
                <h1>Add Students</h1>
            </div>

            <div className="form-row">
                {/* row 1 */}
                <div className="form-field span-2">
                    <label htmlFor="studentCode">Student ID</label>
                    <input
                        id="studentCode"
                        name="studentCode"
                        value={form.studentCode}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field span-1">
                    <label htmlFor="facultyCode">Faculty</label>
                    <select
                        id="facultyCode"
                        name="facultyCode"
                        value={form.facultyCode}
                        onChange={handleChange}
                    >
                        <option value="">Select faculty</option>
                        {faculties.map(f => (
                            <option key={f.code} value={f.code}>{f.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-field span-1">
                    <label htmlFor="campus">Campus</label>
                    <select id="campus" name="campus">
                        <option value="">Select campus</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                    </select>
                </div>

                {/* row 2 */}
                <div className="form-field span-2">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field span-2">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field span-2">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field span-2">
                    <label htmlFor="phone">Phone</label>
                    <input
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-actions span-4">
                    <button type="submit" className="primary">Confirm</button>
                </div>
            </div>
        </form>
    );
};

export default AddStudentForm;