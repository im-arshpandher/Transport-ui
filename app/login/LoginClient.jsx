"use client";

import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { saveToken } from '@/lib/cookies';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', { email, password });
      if (response.data.success) {
        // Save JWT token in cookies and local storage
        saveToken(response.data.token);
        dispatch(loginSuccess({ email }));
        navigate('/admin');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      alert('An error occurred during login.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login; 