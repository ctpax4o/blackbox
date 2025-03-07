import React, { useState } from 'react';
import { uploadVideo } from '../services/api';

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [entityId, setEntityId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('entity_id', entityId);

    try {
      const token = localStorage.getItem('token');
      await uploadVideo(formData, token);
      alert('Video uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error.response?.data || error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Upload Video</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
          required
        />
        <input
          type="text"
          placeholder="Entity ID"
          value={entityId}
          onChange={(e) => setEntityId(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Upload</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#1a1a1a',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
    color: '#ffffff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
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
  textarea: {
    margin: '12px 0',
    padding: '12px',
    borderRadius: '6px',
    backgroundColor: '#2c2c2c',
    color: '#ffffff',
    fontSize: '16px',
    minHeight: '100px',
    resize: 'vertical',
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
  },
};

export default VideoUpload;
