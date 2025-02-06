import React, { useState } from 'react';
import { registerUser } from '../services/api';
import '../styles/Register.css';


const Register = ({ onSwitch }) => {
  const [formData, setFormData] = useState({ username: '', phoneNumber: '', email_id: '', app_password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Registration failed: ' + err.response?.data?.error);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
        <input type="email" name="email_id" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="app_password" placeholder="App Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
      {/* <button onClick={onSwitch}>Already registered? Login</button> */}
    </div>
  );
};

export default Register;
