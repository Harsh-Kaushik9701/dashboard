import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Services/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import '../design/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 🧹 Clear fields if coming from logout
    const clearFields = new URLSearchParams(location.search).get('clear');
    if (clearFields === '1') {
      setEmail('');
      setPassword('');
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please fill in both fields.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('token', 'user-authenticated');

      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.code);

     
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        setErrorMsg('Invalid email or password.');
      } else {
        setErrorMsg('Incorrect Credentials. Try again.');
      }
    }
  };

  return (
    <div className="login-wrapper">
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <p className="signup-link">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
    </div>
  );
};

export default Login;
