import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Adjust based on your backend

const api = axios.create({
  baseURL: API_URL,
});

// Authentication
export const login = async (email, password) => {
  const response = await api.post('/users/login', { email, password });
  return response.data;
};

// Video Upload
export const uploadVideo = async (formData, token) => {
  const response = await api.post('/videos/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Sentiment Data (Placeholder)
export const getSentimentData = async (token) => {
  const response = await api.get('/sentiment', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};