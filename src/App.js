import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import EmailClient from './components/EmailClient';

const App = () => {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="app-container">
      {!user ? (
        <div className="auth-container">
          {isRegistering ? <Register onSwitch={() => setIsRegistering(false)} /> : <Login onLogin={(email, password) => setUser({ email, password })} />}
         <div className="toggle-btn" >
          <div  onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
          </div>
          </div>
        </div>
      ) : (
        <EmailClient email={user.email} emailPassword={user.password} />
      )}
    </div>
  );
};

export default App;
