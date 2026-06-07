import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

const QuoteModal = ({ quote, onClose, setQuotes }) => {
  const handleAccept = async () => {
    try {
      await axios.post(`http://localhost:5000/api/quotes/${quote._id}/accept`);
      onClose(); // Close the modal
      // Refresh the data without reloading the page
      setQuotes((prevQuotes) => prevQuotes.map(q => q._id === quote._id ? { ...q, accepted: 'yes' } : q));
      toast.success("Quote accepted successfully!");
    } catch (err) {
      console.error("Failed to accept quote", err);
      toast.error("Failed to accept quote.");
    }
  };

  const handleReject = async () => {
    try {
      await axios.post(`http://localhost:5000/api/quotes/${quote._id}/reject`);
      onClose(); // Close the modal
      // Refresh the data without reloading the page
      setQuotes((prevQuotes) => prevQuotes.map(q => q._id === quote._id ? { ...q, accepted: 'no' } : q));
      toast.success("Quote rejected successfully!");
    } catch (err) {
      console.error("Failed to reject quote", err);
      toast.error("Failed to reject quote.");
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 sm:w-[500px] max-w-full max-h-screen overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Quote Details</h3>
        <p><strong>Name:</strong> {quote.fullName}</p>
        <p><strong>Email:</strong> {quote.email}</p>
        <p><strong>Phone:</strong> {quote.phone}</p>
        <p><strong>Service:</strong> {quote.serviceType}</p>
        <p><strong>Pickup:</strong> {quote.pickupLocation}</p>
        <p><strong>Delivery:</strong> {quote.deliveryLocation}</p>
        <p className="whitespace-pre-wrap mt-2"><strong>Description:</strong><br />{quote.cargoDescription}</p>
        <p className="mt-2"><strong>Date:</strong> {new Date(quote.createdAt).toLocaleString()}</p>
        <div className="mt-4 text-right">
          <button onClick={() => { handleAccept(); }} className="px-4 py-2 bg-green-600 text-white rounded-md cursor-pointer mr-2">
            Accept
          </button>
          <button onClick={() => { handleReject(); }} className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer mr-2">
            Reject
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ServicesAdmin = () => {

  const [quotes, setQuotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState(null);

  useEffect(() => {
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/quotes?page=${currentPage}&limit=10`);
        setQuotes(res.data.details.quotes);
        setTotalPages(res.data.details.totalPages);
      } catch (err) {
        console.error("Failed to fetch quotes", err);
      }
      setIsLoading(false);
    };

    fetchQuotes();
  }, [currentPage]);

  return (
    <div className="p-6">
      <motion.h2
        className="text-2xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Quote Requests
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
                <th className="px-4 py-2 text-left text-sm">Service</th>
                <th className="px-4 py-2 text-left text-sm">Pickup</th>
                <th className="px-4 py-2 text-left text-sm">Delivery</th>
                <th className="px-4 py-2 text-left text-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <motion.tr
                  key={quote._id}
                  className={`border-t cursor-pointer hover:bg-gray-50 hover:border hover:border-blue-600 ${quote.accepted === 'yes' ? 'bg-green-100' : quote.accepted === 'no' ? 'bg-red-100' : ''}`}
                  onClick={() => setSelectedQuote(quote)}
                  whileHover={{ scale: 1.0 }}
                >
                  <td className="px-4 py-2 truncate max-w-xs text-left text-sm">{quote.fullName}</td>
                  <td className="px-4 py-2 truncate max-w-xs text-left text-sm">{quote.email}</td>
                  <td className="px-4 py-2 truncate max-w-xs text-left text-sm">{quote.serviceType}</td>
                  <td className="px-4 py-2 truncate max-w-xs text-left text-sm">{quote.pickupLocation}</td>
                  <td className="px-4 py-2 truncate max-w-xs text-left text-sm">{quote.deliveryLocation}</td>
                  <td className="px-4 py-2">
                    {new Date(quote.createdAt).toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>

      {selectedQuote && (
        <QuoteModal quote={selectedQuote} onClose={() => setSelectedQuote(null)} setQuotes={setQuotes} />
      )}

    </div>
  )
}

export default ServicesAdmin