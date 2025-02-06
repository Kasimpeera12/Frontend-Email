import React, { useState } from 'react';
import { loginUser } from '../services/api';
import '../styles/Login.css'
const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email_id: '', app_password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      setMessage(res.data.message);
      onLogin(formData.email_id, formData.app_password);
    } catch (err) {
      setMessage('Login failed: ' + err.response?.data?.error);
    }
  };

  return (
    <div className="form-container">
      <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email_id" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="app_password" placeholder="App Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      </div>
    </div>
  );
};

export default Login;
