import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../Services/firebase';
import '../design/Login.css';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');

  const handleAddUser = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // ✅ Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Update display name
      await updateProfile(userCredential.user, { displayName: name });

      // ✅ Save user in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        position,
        createdAt: new Date()
      });

      setMessage('✅ User added successfully!');
      setName('');
      setEmail('');
      setPassword('');
      setPosition('');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setMessage('❌ Email already registered. Please use a different email.');
      } else {
        setMessage(`❌ ${error.message}`);
      }
    }
  };

  return (
    <div className="login-wrapper">
    <div className="login-container">
      <h2>Add New User</h2>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Position (e.g., Developer)"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        /><br />
        <button type="submit">Add User</button>
        {message && (
          <p style={{ marginTop: '10px', color: message.startsWith('✅') ? 'green' : 'red' }}>
            {message}
          </p>
        )}
      </form>
    </div>
    </div>
  );
};

export default AddUser;
