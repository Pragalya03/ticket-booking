import React, { useState } from 'react';
import './Signup.css';

function Signup({ goTo }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signing up with:', { email, password });
    goTo('login'); 
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <button onClick={() => goTo('login')}>Login</button>
      </p>
    </div>
  );
}

export default Signup;






