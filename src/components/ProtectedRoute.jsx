import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  console.log('ProtectedRoute re-rendered, isAuthenticated:', isAuthenticated);

  if (loading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute; 