import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Users Summary Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p className="text-gray-600">Total Users: 120</p>
          <Link to="/admin/users" className="text-blue-500 hover:underline mt-2 block">View More</Link>
        </div>

        {/* Services Summary Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Services</h2>
          <p className="text-gray-600">Active Services: 45</p>
          <Link to="/admin/services" className="text-blue-500 hover:underline mt-2 block">View More</Link>
        </div>

        {/* Messages Summary Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Messages</h2>
          <p className="text-gray-600">New Messages: 10</p>
          <Link to="/admin/messages" className="text-blue-500 hover:underline mt-2 block">View More</Link>
        </div>

        {/* Settings Summary Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p className="text-gray-600">Configuration Status: Updated</p>
          <Link to="/admin/settings" className="text-blue-500 hover:underline mt-2 block">View More</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;