import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../Services/firebase'; 
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import '../design/Login.css'

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      
      await updateProfile(userCredential.user, { displayName: name });

      
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, {
        name: name,
        email: email,
        position: position,
        createdAt: new Date()
      });

      
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-wrapper">
    <div className="login-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <input
          type="email"
          placeholder="Email"
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
        <button type="submit">Sign Up</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p style={{ color:'black', marginTop: '10px' }}>
        Already have an account?{' '}
        <span onClick={() => navigate('/')} style={{ color: '#1976d2', cursor: 'pointer' }}>
          Login here
        </span>
      </p>
    </div>
    </div>
  );
};

export default Signup;
