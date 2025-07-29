import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../design/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="dashboard-header">
        Admin Panel
      </header>
      <div className="dashboard-cards">
        <div className="card" onClick={() => navigate('/dashboard/add-user')}>
          Click Here To Add User
        </div>
        <div className="card" onClick={() => navigate('/dashboard/userlist')}>
          Click Here to View User List
        </div>
        <div className="card" onClick={() => navigate('/dashboard/userdetails')}>
          Click Here to View User Details
        </div>
        <div className="card" onClick={() => navigate('/dashboard/logout')}>
          Click Here to Logout
        </div>
      </div>
    </>
  );
};

export default Dashboard;
