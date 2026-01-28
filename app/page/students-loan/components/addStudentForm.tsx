type AddOfficersFormProps = {
    onClose: () => void;
};

const AddStudentForm = ({ onClose }: AddOfficersFormProps) => {
    const faculties = [
        { id: 1, name: "Faculty of Engineering" },
        { id: 2, name: "Faculty of Science" },
        { id: 3, name: "Faculty of Business Administration" },
    ];

    return (
        <form className="officer-form">
            <div className="officer-form-header">
                <h1>Add Students</h1>
            </div>

            <div className="form-row">
                {/* ===== row 1 ===== */}
                <div className="form-field span-2">
                    <label htmlFor="studentId">Student ID</label>
                    <input id="studentId" />
                </div>

                <div className="form-field faculty">
                    <label htmlFor="faculty">Faculty</label>
                    <select id="faculty">...</select>
                </div>

                <div className="form-field campus">
                    <label htmlFor="campus">Campus</label>
                    <select id="campus">
                        <option value="">select campus</option>
                        <option value="">A</option>
                        <option value="">B</option>
                    </select>
                </div>

                {/* ===== row 2+ (auto 2 ช่อง) ===== */}
                <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" />
                </div>

                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" />
                </div>

                <div className="form-field">
                    <label htmlFor="branch">Branch</label>
                    <input id="branch" name="branch" />
                </div>

                <div className="form-field">
                    <label htmlFor="degree-level">Degree Level</label>
                    <input id="degree-level" type="number" />
                </div>

                <div className="form-field">
                    <label htmlFor="year">Year</label>
                    <input id="year" type="number" />
                </div>

                <div className="form-field">
                    <label htmlFor="gpax">GPAX</label>
                    <input id="gpax" type="number" />
                </div>

                <div className="close">
                    <button type="button" onClick={onClose}>X</button>
                </div>
            </div>
        </form>
    );
};

export default AddStudentForm;
