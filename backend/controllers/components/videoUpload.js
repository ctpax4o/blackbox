import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoUpload = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [entityId, setEntityId] = useState('');

  useEffect(() => {
    // Check if user has an access token stored (indicating authentication)
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuth = () => {
    window.location.href = '/api/oauth/auth';
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!videoFile) {
      alert('Please select a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('entity_id', entityId);

    try {
      const token = localStorage.getItem('accessToken'); // Use stored token
      if (!token) {
        alert('You need to authenticate first.');
        return;
      }

      const response = await axios.post('/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Success:', response.data);
      alert('Video uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload video.');
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={handleAuth}>Authenticate with YouTube</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="file" accept="video/*" onChange={handleFileChange} />
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="text" placeholder="Entity ID" value={entityId} onChange={(e) => setEntityId(e.target.value)} />
          <button type="submit">Upload Video</button>
        </form>
      )}
    </div>
  );
};

export default VideoUpload;