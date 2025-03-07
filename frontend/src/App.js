import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token'); // Ensure the state is initialized correctly
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Convert to boolean
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" />}
        />
        <Route
          path="/upload"
          element={isLoggedIn ? <Upload /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;