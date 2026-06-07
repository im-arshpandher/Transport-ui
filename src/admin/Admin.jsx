import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaEnvelope,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedRoute from '../components/ProtectedRoute';

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import ServicesAdmin from "./pages/ServicesAdmin";
import { logout } from "../../redux/authSlice";
import { removeCookie } from "../utils/cookies";
import { useDispatch } from "react-redux";
import Candidates from "./pages/Candidates";

const tabs = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "dashboard" },
  { name: "Users", icon: <FaUsers />, path: "users" },
  { name: "Services", icon: <FaBoxOpen />, path: "services" },
  { name: "Messages", icon: <FaEnvelope />, path: "messages" },
  { name: "Candidates", icon: <FaUsers />, path: "candidates" },
  { name: "Settings", icon: <FaCog />, path: "settings" },
];

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className="fixed md:relative z-30 bg-gray-800 text-white w-64 p-4 space-y-4 h-full"
          >
            <div className="text-2xl font-bold mb-4">Admin Panel</div>
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={`/admin/${tab.path}`}
                className={`flex items-center px-4 py-2 rounded hover:bg-gray-700 ${location.pathname.includes(tab.path) ? "bg-gray-700" : ""
                  }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.name}
              </Link>
            ))}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:block bg-gray-800 text-white w-64 p-4 space-y-4">
        <div className="text-2xl font-bold mb-4">Admin Panel</div>
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            to={`/admin/${tab.path}`}
            className={`flex items-center px-4 py-2 rounded hover:bg-gray-700 ${location.pathname.includes(tab.path) ? "bg-gray-700" : ""
              }`}
          >
            <span className="mr-3">{tab.icon}</span>
            {tab.name}
          </Link>
        ))}

        <button onClick={() => {
          removeCookie("jwt");
          localStorage.removeItem("jwt");
          dispatch(logout());
          navigate("/login");
        }}>Logout</button>

      </div>

      {/* Main Content */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="flex-1 p-6 bg-gray-100"
      >
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="services"
            element={
              <ProtectedRoute>
                <ServicesAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="candidates"
            element={
              <ProtectedRoute>
                <Candidates />
              </ProtectedRoute>
            }
          />
        </Routes>
      </motion.main>
    </div>
  );
};

export default Admin;
