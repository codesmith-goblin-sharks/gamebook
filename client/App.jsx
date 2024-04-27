import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './stylesheets/styles.css'

import LoginPage from './pages/login';
import SignupPage from './pages/Signup';
import MainPage from './pages/Main';

import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route path='/' element={<Navigate replace to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = document.createRoot(document.getElementById('root'));
root.render(<App />);
export default App;
