import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './stylesheets/styles.scss'

import LoginPage from './pages/Login.jsx';
import SignupPage from './pages/Signup.jsx';
import MainPage from './pages/Main.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/' element ={<MainPage />} />
        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        {/* {<Route path='/' element={<Navigate replace to='/login' />} />} */}
      </Routes>
    </BrowserRouter>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
export default App;
