import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="bg-gray-900 text-white py-10">
      
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Company Info */}
        <motion.div variants={fadeIn}>
             <Link to="/">
        <div className="flex items-center">
          <img
            src="\logo-removebg-preview.png"
            alt="Logo"
            className="h-10 w-auto mr-2" // Set height to 40px, keep aspect ratio, add right margin
            style={{ maxWidth: "120px" }} // Optional: limit max width
          />
        </div>
      </Link>
          <p className="text-gray-400">
            Reliable logistics and freight solutions across the UAE.
          </p>
        </motion.div>

        {/* Contact Details */}
        <motion.div variants={fadeIn}>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="text-gray-400 space-y-2">
            <li>📍 Dubai, United Arab Emirates</li>
            <li>📞 +971-50-123-4567</li>
            <li>✉️ info@logiuae.com</li>
          </ul>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={fadeIn}>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link to="/about" className="text-gray-400 hover:text-white">
                About
              </Link>
            </li>

            <li>
              <Link to="/services" className="text-gray-400 hover:text-white">
                Services
              </Link>
            </li>

            <li>
              <Link to="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </li>

            <li>
              <Link to="/careers" className="text-gray-400 hover:text-white">
                Careers
              </Link>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Footer Bottom */}
      <motion.div
        className="mt-8 text-center text-gray-500 text-sm border-t border-gray-700 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.5 } }}
      >
        &copy; {new Date().getFullYear()} LogiUAE. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
