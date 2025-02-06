import React, { useState } from "react";
import axios from "axios";
import "../styles/EmailSender.css";

const EmailSender = ({ setView }) => {
  const [from, setFrom] = useState(""); // Sender email
  const [to, setTo] = useState(""); // Recipient emails (comma-separated)
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [emailPassword, setEmailPassword] = useState(""); // App password for sender
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Split recipient emails by comma and remove whitespace
      const recipients = to.split(",").map((email) => email.trim());

      // Send email data to backend
      const response = await axios.post("http://localhost:5000/api/send-email", {
        from,
        to: recipients,
        subject,
        body,
        emailPassword,
      });

      // Check response
      if (response && response.data && response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage("Unexpected response from the server.");
      }
    } catch (error) {
      // Handle errors based on response
      if (error.response) {
        setMessage("Error sending email: " + error.response.data.error);
      } else if (error.request) {
        setMessage("No response from server.");
      } else {
        setMessage("Unexpected error: " + error.message);
      }
    }
  };

  return (
    <div className="email-sender">
      {/* <button className="back-button" onClick={() => setView("Inbox")}>← Back</button> */}
      <h2>Compose Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="from">Your Email (From):</label>
          <input
            type="email"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="to">Recipient Emails (To):</label>
          <textarea
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="e.g. recipient1@example.com, recipient2@example.com"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="emailPassword">Email App Password:</label>
          <input
            type="password"
            id="emailPassword"
            value={emailPassword}
            onChange={(e) => setEmailPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Email</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EmailSender;
