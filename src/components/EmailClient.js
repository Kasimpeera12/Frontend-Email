import React, { useState, useEffect } from 'react';
import { fetchEmails } from '../services/api';
import '../styles/EmailClient.css';
import EmailSender from './EmailSender';
import { FaTrashAlt, FaEllipsisH } from 'react-icons/fa';

const EmailClient = ({ email, emailPassword }) => {
  const [emails, setEmails] = useState([]);
  const [folder, setFolder] = useState('inbox');
  const [view, setView] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emailCounts, setEmailCounts] = useState({ inbox: 0, sent: 0, drafts: 0, trash: 0 });
  const [showDelete, setShowDelete] = useState(null);

  useEffect(() => {
    const loadEmails = async () => {
      try {
        const res = await fetchEmails(folder, email, emailPassword);
        setEmails(res.data);
        setEmailCounts((prev) => ({ ...prev, [folder]: res.data.length }));
      } catch (err) {
        console.error('Error fetching emails:', err);
      }
    };
    loadEmails();
  }, [folder, email, emailPassword, view]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const handleDelete = (emailId) => {
    setEmails((prevEmails) => prevEmails.filter(email => email.id !== emailId));
    setShowDelete(null);
  };

  return (
    <div className="email-client">
      <div className="sidebar">
        <button className='compose-btn' onClick={() => setView('compose')}>Compose</button>
        <button className={`sidebar-btn ${folder === 'inbox' ? 'active' : ''}`} onClick={() => { setFolder('inbox'); setView('inbox'); }}>
          Inbox <span className="email-count">{emailCounts.inbox}</span>
        </button>
        <button className={`sidebar-btn ${folder === 'sent' ? 'active' : ''}`} onClick={() => { setFolder('sent'); setView('inbox'); }}>
          Sent <span className="email-count">{emailCounts.sent}</span>
        </button>
        <button className={`sidebar-btn ${folder === 'drafts' ? 'active' : ''}`} onClick={() => { setFolder('drafts'); setView('inbox'); }}>
          Drafts <span className="email-count">{emailCounts.drafts}</span>
        </button>
        <button className={`sidebar-btn ${folder === 'trash' ? 'active' : ''}`} onClick={() => { setFolder('trash'); setView('inbox'); }}>
          Trash <span className="email-count">{emailCounts.trash}</span>
        </button>
      </div>
      <div className="email-list">
        {view === 'compose' ? (
          <EmailSender setView={setView} />
        ) : view === 'detail' ? (
          <div className="email-detail">
            <button onClick={() => setView('inbox')} className="back-btn">← Back</button>
            <h2>{selectedEmail.subject}</h2>
            <p><strong>From:</strong> {selectedEmail.from}</p>
            <p><strong>To:</strong> {selectedEmail.to}</p>
            <hr />
            <div className="email-body">
              <p>{selectedEmail.body}</p>
            </div>
          </div>
        ) : (
          <>
            <h2>{folder.toUpperCase()}</h2>
            {emails.length === 0 ? <p>No emails found.</p> : (
              <ul>
                {emails.map((email) => (
                  <li key={email.id} className="email-item" onClick={() => { setSelectedEmail(email); setView('detail'); }}>
                    <div className="email-info">
                      <span className="email-subject">{email.subject}</span>
                      <span className="email-preview">{email.body.split(" ").slice(0, 4).join(" ")}</span>
                    </div>
                    <span className="email-time">
                      {formatTime(email.date)} 
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDelete(showDelete === email.id ? null : email.id);
                        }}
                      ><FaEllipsisH/></div>
                      {showDelete === email.id && (
                        <button className="delete-btn" onClick={() => handleDelete(email.id)}>
                          <FaTrashAlt size={15} />
                        </button>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmailClient;
