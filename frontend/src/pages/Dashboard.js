import React, { useState, useEffect } from 'react';
import { getSentimentData } from '../services/api';

const Dashboard = ({ onLogout }) => {
  const [sentimentData, setSentimentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getSentimentData(token);
        setSentimentData(data);
      } catch (error) {
        console.error('Failed to fetch sentiment data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
      </header>
      <main style={styles.main}>
        <section style={styles.card}>
          <h3 style={styles.cardTitle}>Sentiment Overview</h3>
          <p style={styles.cardText}>
            {sentimentData ? JSON.stringify(sentimentData, null, 2) : 'Loading sentiment data...'}
          </p>
        </section>
      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '0 20px',
  },
  header: {
    padding: '20px 0',
    textAlign: 'center',
    borderBottom: '1px solid #333333', // Subtle divider
  },
  title: {
    fontSize: '28px',
    fontWeight: 'normal',
  },
  main: {
    maxWidth: '1200px',
    margin: '40px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: '#1a1a1a',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
  },
  cardTitle: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  cardText: {
    fontSize: '16px',
    color: '#cccccc', // Light gray for secondary text
  },
};

export default Dashboard;