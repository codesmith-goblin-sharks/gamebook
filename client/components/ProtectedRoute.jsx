import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

// Check if user is authenticated
const useAuth = () => {
  // [Not Done Yet] user auth logic - check how backend implemented
  
  return user ? true : false;
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;