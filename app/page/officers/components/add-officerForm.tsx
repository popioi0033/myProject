import { useState } from "react";
import { OfficerService } from "@/app/service/officer/officerService";
import { CreateOfficerPayload } from "../../../service/officer/officerType"
type AddOfficersFormProps = {
    onClose: () => void;
};

const AddOfficersForm = ({ onClose }: AddOfficersFormProps) => {

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


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !form.name ||
            !form.officerCode ||
            !form.username ||
            !form.password
        ) {
            alert("Please fill required fields");
            return;
        }

        try {
            await OfficerService.createOfficer(form);
            onClose();
        } catch (err) {
            console.error(err);
            alert("Create officer failed");
        }
    };


    return (
        <div className="modal-overlay">
            <form className="officer-form" onSubmit={handleSubmit}>
                {/* close button */}
                <button
                    type="button"
                    className="close-btn"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="form-row">
                    {/* Full name */}
                    <div className="form-field span-4">
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email */}
                    <div className="form-field span-2">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Institute */}
                    <div className="form-field span-1">
                        <label htmlFor="institute">Institute</label>
                        <select
                            id="institute"
                            name="institute"
                            value={form.institute}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                        </select>
                    </div>

                    {/* Officer Code */}
                    <div className="form-field span-1">
                        <label htmlFor="officerCode">Officer ID</label>
                        <input
                            id="officerCode"
                            name="officerCode"
                            value={form.officerCode}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Job position */}
                    <div className="form-field span-2">
                        <label htmlFor="jobPosition">Job position</label>
                        <input
                            id="jobPosition"
                            name="jobPosition"
                            value={form.jobPosition}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Phone */}
                    <div className="form-field span-2">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Username */}
                    <div className="form-field span-2">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            placeholder="Enter username"
                            value={form.username}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password */}
                    <div className="form-field span-2">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Actions */}
                    <div className="form-actions span-4">
                        <button type="submit" className="primary">
                            Confirm
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );

};

export default AddOfficersForm;
