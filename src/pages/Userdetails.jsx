import React, { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../Services/firebase';
import '../design/UserDetails.css';

const UserDetails = () => {
  const [emailInput, setEmailInput] = useState('');
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    setUserData(null);
    setMessage('');

    if (!emailInput.trim()) {
      setMessage('Please enter an email.');
      return;
    }

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', emailInput.trim()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setUserData(doc.data());
      } else {
        setMessage('No user found with this email.');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setMessage('An error occurred while searching.');
    }
  };

  return (
    <div className="user-details-container">
      <h2>Search User Details</h2>
      <div className="search-box">
        <input
          type="email"
          placeholder="Enter user email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {message && <p style={{ color: 'orange' }}>{message}</p>}

      {userData && (
        <div className="user-card">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Position:</strong> {userData.position}</p>
          <p><strong>Joined:</strong> {new Date(userData.createdAt.seconds * 1000).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
