import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      onLoginSuccess();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Log In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Sign In</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#000000',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '320px',
    padding: '30px',
    backgroundColor: '#1a1a1a',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'normal',
  },
  input: {
    margin: '12px 0',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #333333',
    backgroundColor: '#2c2c2c',
    color: '#ffffff',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#444444',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Login;