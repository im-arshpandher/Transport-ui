import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MessageModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 sm:w-96 max-w-full overflow-auto max-h-screen">
        <h3 className="text-xl font-bold mb-4">Full Message</h3>
        
        <div className="mb-4">
          <p><strong>Subject:</strong> {message.subject}</p>
          <p><strong>From:</strong> {message.fullName} ({message.email})</p>
        </div>

        <div className="overflow-y-auto max-h-96 mb-4">
          <p className="whitespace-normal break-words"><strong>Message:</strong></p>
          <p className="whitespace-normal break-words">{message.message}</p>
        </div>

        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);  // For storing the selected message

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/contact?page=${currentPage}&limit=10`
        );
        setMessages(res.data.details.messages);
        setTotalPages(res.data.details.totalPages);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
      setIsLoading(false);
    };

    fetchMessages();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  // Ensure the PATCH request is correctly implemented
  const updateReadStatus = async (messageId) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/contact/read-status`, {
        messageId: messageId,
        isRead: true
      });
      if (response.data.success) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === messageId ? { ...msg, isRead: true } : msg
          )
        );
      }
    } catch (err) {
      console.error("Failed to update read status", err);
    }
  };

  // Modify handleMessageClick to update read status
  const handleMessageClick = (message) => {
    if (!message.isRead) {
      updateReadStatus(message._id);
    }
    setSelectedMessage(message);
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <motion.table
            className="w-full table-auto border bg-gray-100 border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-sm">Full Name</th>
                <th className="px-4 py-2 text-left text-sm">Email</th>
                <th className="px-4 py-2 text-left text-sm">Subject</th>
                <th className="px-4 py-2 text-left text-sm">Message</th>
                <th className="px-4 py-2 text-left text-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <motion.tr
                  key={msg._id}
                  className={`border-t cursor-pointer hover:bg-white hover:border hover:border-blue-500 ${msg.isRead ? '' : 'bg-gray-200'}`}
                  onClick={() => handleMessageClick(msg)}
                  whileHover={{ opacity: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <td className="px-4 py-2 truncate max-w-xs text-left text-sm">{msg.fullName}</td>
                  <td className="px-4 py-2 truncate max-w-xs text-left text-sm">{msg.email}</td>
                  <td className="px-4 py-2 truncate max-w-xs text-left text-sm">{msg.subject}</td>
                  <td className="px-4 py-2 truncate max-w-xs text-left text-sm">{msg.message}</td>
                  <td className="px-4 py-2">
                    {new Date(msg.createdAt).toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      )}

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400 hover:bg-blue-700 transition duration-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400 hover:bg-blue-700 transition duration-300"
        >
          Next
        </button>
      </div>

      {/* Show modal if a message is selected */}
      {selectedMessage && (
        <MessageModal message={selectedMessage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Messages;
