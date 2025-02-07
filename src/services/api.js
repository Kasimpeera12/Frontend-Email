import axios from 'axios';

const API_URL = 'https://email-backend-4l8f.onrender.com/api'; // Adjust based on your backend

export const registerUser = (userData) => axios.post(`${API_URL}/register`, userData);
export const loginUser = (loginData) => axios.post(`${API_URL}/login`, loginData);
export const fetchEmails = (folder, email, emailPassword) =>
  axios.get(`${API_URL}/emails/${folder}`, { params: { email, emailPassword } });
