import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";

const ContactSection = () => {
  const isDark = useSelector((state) => state.darkMode.value);

  const recaptchaRef = useRef();
  
  const [verified, setVerified] = useState(true);//made it true for testing
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    serviceType: "",
    pickupLocation: "",
    deliveryLocation: "",
    cargoDescription: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const token = recaptchaRef.current.getValue();
    // if (!token) {
    //   toast.error("Please verify the reCAPTCHA.");
    //   return;
    // }

    try {
      const res = await axios.post("http://localhost:5000/api/quote", formData);

      if (res.data.success) {
        toast.success("Quote request submitted successfully!");

        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          serviceType: "",
          pickupLocation: "",
          deliveryLocation: "",
          cargoDescription: "",
        });

        recaptchaRef.current.reset();
        setVerified(false);
      } else {
        toast.error(res.data.message || "Submission failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <motion.section
        className={`py-20 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Heading */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className={`text-3xl font-bold ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              Get in Touch
            </h2>
            <p className={`mt-2 ${isDark ? "text-white" : "text-gray-600"}`}>
              We’d love to hear from you. Reach out anytime!
            </p>
          </motion.div>

          {/* Content Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Contact Info */}
            <motion.div
              className="space-y-6"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  Head Office
                </h3>
                <p
                  className={`${
                    isDark ? "text-white" : "text-gray-600"
                  } mt-1`}
                >
                  Logistics Company UAE
                  <br />
                  Industrial Area, Dubai, UAE
                </p>
              </div>

              <div>
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  Email
                </h3>
                <p className="text-blue-500 mt-1">
                  <a href="mailto:info@logisticsuae.com">
                    info@logisticsuae.com
                  </a>
                </p>
              </div>

              <div>
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  Phone
                </h3>
                <p
                  className={`${
                    isDark ? "text-white" : "text-gray-600"
                  } mt-1`}
                >
                  +971 50 123 4567
                </p>
              </div>

              {/* Google Map Embed */}
              <div>
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115736.19921795841!2d55.2707826!3d25.2048493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4344d8e14cd9%3A0x90c61c4e0b0e4478!2sDubai%2C%20UAE!5e0!3m2!1sen!2sae!4v1611689137715!5m2!1sen!2sae"
                  width="100%"
                  height="200"
                  allowFullScreen=""
                  loading="lazy"
                  className="rounded-lg shadow"
                ></iframe>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className={`p-8 shadow-md rounded-lg ${
                isDark ? "bg-gray-800 text-white" : "bg-white"
              }`}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                onSubmit={handleSubmit}
              >
              <motion.input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className={`px-4 py-2 border ${
                  isDark ? "border-gray-600" : "border-gray-300"
                } rounded`}
                whileFocus={{ scale: 1.05 }}
              />
              <motion.input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className={`px-4 py-2 border ${
                  isDark ? "border-gray-600" : "border-gray-300"
                } rounded`}
                whileFocus={{ scale: 1.05 }}
              />
              <motion.input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className={`px-4 py-2 border ${
                  isDark ? "border-gray-600" : "border-gray-300"
                } rounded`}
                whileFocus={{ scale: 1.05 }}
              />
              <motion.select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
                className={`px-4 py-2 border ${
                  isDark ? "border-gray-600" : "border-gray-300"
                } rounded`}
                whileFocus={{ scale: 1.05 }}
              >
                <option className="text-gray-900" value="">
                  Select Service Type
                </option>
                <option className="text-gray-900" value="transport">
                  Heavy Transport
                </option>
                <option className="text-gray-900" value="logistics">
                  Freight & Logistics
                </option>
                <option className="text-gray-900" value="storage">
                  Warehousing
                </option>
                <option className="text-gray-900" value="customs">
                  Customs Clearance
                </option>
              </motion.select>
              <motion.input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="Pickup Location"
                required
                className={`px-4 py-2 border ${
                  isDark ? "border-gray-600" : "border-gray-300"
                } rounded`}
                whileFocus={{ scale: 1.05 }}
              />
              <motion.input
                type="text"
                name="deliveryLocation"
                value={formData.deliveryLocation}
                onChange={handleChange}
                placeholder="Delivery Location"
                required
                className={`px-4 py-2 border ${
                  isDark ? "border-gray-600" : "border-gray-300"
                } rounded`}
                whileFocus={{ scale: 1.05 }}
              />
              <motion.textarea
                name="cargoDescription"
                value={formData.cargoDescription}
                onChange={handleChange}
                placeholder="Cargo Description (size, weight, etc)"
                rows="4"
                required
                className={`md:col-span-2 px-4 py-2 border ${
                  isDark ? "border-gray-600" : "border-gray-300"
                } rounded`}
                whileFocus={{ scale: 1.05 }}
              ></motion.textarea>

              <motion.div
                className="md:col-span-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <ReCAPTCHA
                  sitekey="6LeM2y0rAAAAAM-pSIsO4EcCdCsVnfY9BAL--uTu"
                  ref={recaptchaRef}
                  onChange={() => setVerified(true)}
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={!verified}
                className={`md:col-span-2 py-3 rounded text-white transition cursor-pointer ${
                  verified
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                whileHover={verified ? { scale: 1.05 } : {}}
              >
                Submit Request
              </motion.button>
            </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDark ? "dark" : "light"}
        limit={3}
      />
    </div>
  );
};

export default ContactSection;
