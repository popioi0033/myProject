import { useState } from "react";
import { OfficerService } from "@/app/service/officer/officerService";
import { CreateOfficerPayload } from "../../../service/officer/officerType";

type AddOfficersFormProps = {
    onClose: () => void;
    onSuccess: () => void; 
};

const AddOfficersForm = ({ onClose ,onSuccess}: AddOfficersFormProps) => {
    const [form, setForm] = useState<CreateOfficerPayload>({
        officerCode: "",
        name: "",
        email: "",
        institute: "",
        jobPosition: "",
        phone: "",
        username: "",
        password: "",
        role: "ADMIN",
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.officerCode || !form.username || !form.password) {
            alert("Please fill required fields");
            return;
        }

        try {
            await OfficerService.createOfficer(form);
            onSuccess();
            setShowSuccess(true); 
        } catch (err) {
            console.error(err);
            alert("Create officer failed");
        }
    };

    if (showSuccess) {
        return (
            <div className="success-modal">
                <div className="success-icon">✓</div>
                <h2 className="success-title">Add Officer Success!</h2>
                <p className="success-desc">
                    <strong>{form.name}</strong> has been added successfully.
                </p>
                <button className="primary success-close-btn" onClick={onClose}>
                    Done
                </button>
            </div>
        );
    }

    return (
        <form className="officer-form" onSubmit={handleSubmit}>
            <button type="button" className="close-btn" onClick={onClose}>✕</button>

            <div className="form-row">
                <div className="form-field span-4">
                    <label htmlFor="name">Full Name</label>
                    <input id="name" name="name" value={form.name} onChange={handleChange} />
                </div>

                <div className="form-field span-2">
                    <label htmlFor="email">Email address</label>
                    <input id="email" name="email" value={form.email} onChange={handleChange} />
                </div>

                <div className="form-field span-1">
                    <label htmlFor="institute">Institute</label>
                    <select id="institute" name="institute" value={form.institute} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                    </select>
                </div>

                <div className="form-field span-1">
                    <label htmlFor="officerCode">Officer ID</label>
                    <input id="officerCode" name="officerCode" value={form.officerCode} onChange={handleChange} />
                </div>

                <div className="form-field span-2">
                    <label htmlFor="jobPosition">Job position</label>
                    <input id="jobPosition" name="jobPosition" value={form.jobPosition} onChange={handleChange} />
                </div>

                <div className="form-field span-2">
                    <label htmlFor="phone">Phone Number</label>
                    <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
                </div>

                <div className="form-field span-2">
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" placeholder="Enter username" value={form.username} onChange={handleChange} />
                </div>

                <div className="form-field span-2">
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" placeholder="Enter password" value={form.password} onChange={handleChange} />
                </div>

                <div className="form-actions span-4">
                    <button type="submit" className="primary">Confirm</button>
                </div>
            </div>
        </form>
    );
};

export default AddOfficersForm;