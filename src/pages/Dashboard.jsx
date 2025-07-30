import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Services/firebase';
import '../design/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    } else {
      const localEmail = localStorage.getItem('email');
      if (localEmail) setUserEmail(localEmail);
    }
  }, []);

  return (
    <>
      <header className="dashboard-header">
      <h1 className="admin-title">Admin Panel</h1>
      <span className="logged-in-text">Logged in as: {userEmail}</span>
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
