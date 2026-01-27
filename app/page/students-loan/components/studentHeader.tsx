const StudentHeader = () => {
  return (
    <div className="student-header">
      <div className="left">
        <button className="filter-btn">Add filter ⌄</button>
      </div>

      <div className="right">
        <input
          className="search"
          placeholder="Search for a student by name or email"
        />
        <button className="link">Export excel</button>
        <button className="primary">Add Student</button>
      </div>
    </div>
  );
};

export default StudentHeader;
