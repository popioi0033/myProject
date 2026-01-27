const OfficersHeader = () => {
  return (
    <div className="officers-header">
      <div>
        <h1 className="officer-header" >Officers</h1>
        <button className="add-btn">add officer</button>
        <button className="filter-btn">filter</button>
      </div>

      <div className="officers-actions">
        <input
          className="search"
          placeholder="Search for officers by name or email"
        />
        <button className="link">Export excel</button>
        <button className="primary">Confirm the officers</button>
      </div>
    </div>
  );
};

export default OfficersHeader;
