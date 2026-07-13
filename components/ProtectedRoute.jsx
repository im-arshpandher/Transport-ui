"use client";
import React from 'react';
import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  console.log('ProtectedRoute re-rendered, isAuthenticated:', isAuthenticated);

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) redirect('/login');
  return children;
};

export default ProtectedRoute; 