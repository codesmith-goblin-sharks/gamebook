import React, { useState } from 'react';
import Header from '../components/Header.jsx';

import { useNavigate } from 'react-router-dom';
import '../stylesheets/Login.scss';
import '../stylesheets/Signup.scss'


const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const navigate = useNavigate();

  // Handler for submitting
  const handleSignup = async (e) => {
    e.preventDefault();
    // [Not Done yet] backend signup engagement here
    setError('');
    try {
      const response = await fetch(`http://localhost:3000/createuser`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }); // check with the backend

      const data = await response.json();

      if (response.ok && data) {
        navigate('/login');
      } else {
        console.log(response)
        setError('Username already exists') 
      }
    } catch (err) {
      setError('Invalid username or password');
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
    <div className='sign-up'>
      <Header />
      <form onSubmit={handleSignup}>
        {error && <div className='error-message'>{error}</div>} {/* Display error message but maybe change to <p> */}
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
          <button type='submit'>Sign up</button>
        </div>
      </form>
    </div>
  );
}


export default SignupPage;