const Dashboard: React.FC = () => {
  return (
    <>
      <h1>Welcome to dashboard</h1>

      <div className="cards">
        <div className="card">
          <div className="icon">👤</div>
          <div>
            <h3>Add other admins</h3>
            <p>Set the loan officer’s access rights to the system.</p>
          </div>
        </div>

        <div className="card">
          <div className="icon">🏦</div>
          <div>
            <h3>Add report</h3>
            <p>
              Export excel files to create reports for student loan information
            </p>
          </div>
        </div>

        <div className="card">
          <div className="icon">🎓</div>
          <div>
            <h3>Add students loan</h3>
            <p>
              Import excel files to enter student loan data into the system.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
