const TrackingHeader = () => {
  return (
    <div className="student-header">
      <div className="left">
        <button className="filter-btn">Add filter ⌄</button>
      </div>
      <div className="right">
        <input className="search" placeholder="Search by student name or ID" />
        <button className="link">Export excel</button>
      </div>
    </div>
  );
};

export default TrackingHeader;