import React, { useState } from 'react';
import { db } from '../Services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import '../design/Adduser.css';

const secondaryApp = initializeApp({
  apiKey: "AIzaSyDzKe3EBj0dyeFRbgBo6CWr-u2R3565mPI",
  authDomain: "dashboard-app-6906b.firebaseapp.com",
  projectId: "dashboard-app-6906b",
}, "Secondary");

const secondaryAuth = getAuth(secondaryApp);

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        email,
        password
      );

      const uid = userCredential.user.uid;

      await signOut(secondaryAuth);

      await addDoc(collection(db, 'users'), {
        uid,
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
      console.error('Error:', error.message);
      if (error.code === 'auth/email-already-in-use') {
        setMessage('❌ Email is already registered.');
      } else {
        setMessage(`❌ ${error.message}`);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddUser;
