import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getToken } from '../../utils/cookies';

const UserModal = ({ user, onClose }) => {
  const handleBlock = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/${user._id}/status`, { status: "blocked" });
      onClose();
      window.location.reload();
    } catch (err) {
      console.error("Failed to block user", err);
    }
  };

  const handleUnblock = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/${user._id}/status`, { status: "have access" });
      onClose();
      window.location.reload();
    } catch (err) {
      console.error("Failed to unblock user", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/${user._id}`);
      onClose();
      window.location.reload();
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 sm:w-[500px] max-w-full max-h-screen overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">User Details</h3>
        <p><strong>Name:</strong> {user.fullName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Status:</strong> {user.status}</p>
        <div className="mt-4 text-right">
          <button onClick={handleBlock} className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer mr-2">
            Block
          </button>
          <button onClick={handleUnblock} className="px-4 py-2 bg-green-600 text-white rounded-md cursor-pointer mr-2">
            Unblock
          </button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer mr-2">
            Delete
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const token = getToken();
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data.users);
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <motion.h2
        className="text-2xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Admin Users
      </motion.h2>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm">Name</th>
                <th className="px-4 py-2 text-left text-sm">Email</th>
                <th className="px-4 py-2 text-left text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <motion.tr
                  key={user._id}
                  className={`border-t cursor-pointer hover:bg-gray-50 hover:border hover:border-blue-600 ${user.status === 'have access' ? 'bg-green-100' : 'bg-red-100'}`}
                  onClick={() => setSelectedUser(user)}
                  whileHover={{ scale: 1.0 }}
                >
                  <td className="px-4 py-2 truncate max-w-xs text-left text-sm">{user.fullName}</td>
                  <td className="px-4 py-2 truncate max-w-xs text-left text-sm">{user.email}</td>
                  <td className="px-4 py-2 truncate max-w-xs text-left text-sm">{user.status}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default Users;