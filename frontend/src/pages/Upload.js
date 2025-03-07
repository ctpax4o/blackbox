import React from 'react';
import VideoUpload from '../components/VideoUpload';

const Upload = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Upload Video</h1>
      </header>
      <main style={styles.main}>
        <VideoUpload />
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
    borderBottom: '1px solid #333333',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'normal',
  },
  main: {
    maxWidth: '600px',
    margin: '40px auto',
  },
};

export default Upload;