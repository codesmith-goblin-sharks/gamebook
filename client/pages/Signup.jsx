import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import '../stylesheets/Signup.scss'

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Handler for submitting
  const handleSignup = async (e) => {
    e.preventDefault();
    // [Not Done yet] backend signup engagement here
    try {
      const response = await fetch(`http://localhost:3000/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }); // check with the backend

      const data = await response.json();

      if (response.ok && data === true) {
        navigate('/home');
      } else {
        navigate('/signup'); //Let's do it these way for now... I haven't figure out how to render a error message
      }
    } catch (err) {
      console.log('Error with sign up', err);
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