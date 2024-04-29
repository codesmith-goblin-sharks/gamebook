import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { useNavigate } from 'react-router-dom';

import '../stylesheets/Login.scss';

const LoginPage = ({ setIsAuthenticated }) => {
  //State hooks for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Handler for submitting
  const handleLogin = async (e) => {
    e.preventDefault();
    // [Not Done yet] backend login engagement here
    setError('');
    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }); // check with the backend

      const data = await response.json();

      if (response.ok && data) {
        setIsAuthenticated(true)
        navigate('/home');
      } else {
        setError('Incorrect username or password'); 
      }
    } catch (err) {
      setError('Error logging in');
    }
  };

  // Handler for user input fetching
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className='login'>
      <Header />
      <form onSubmit={handleLogin}>
        {error && <div className='error-message'>{error}</div>}
        <div className='input-field'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className='input-field'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className='action-buttons'>
          <button type='submit'>Login</button>
          <Link to='/signup'>Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
