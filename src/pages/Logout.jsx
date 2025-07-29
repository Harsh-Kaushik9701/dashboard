import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Services/firebase';
import '../design/Logout.css'; // ⬅️ Create this file

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (!confirmed) return;

    try {
      await signOut(auth);

      // Clear localStorage items
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('signupEmail');
      localStorage.removeItem('signupPassword');
      localStorage.removeItem('token');

      navigate('/login?clear=1');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="logout-container">
      <div className="logout-box">
        <h3>Click here to get logout</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Logout;
