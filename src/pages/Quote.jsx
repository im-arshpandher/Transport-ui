import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Quote = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const recaptchaRef = useRef();
  const isDark = useSelector((state) => state.darkMode.value);
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
    <>
    <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDark ? "dark" : "light"}
        className="text-sm sm:text-base"
      />

      <motion.section
        className={`pt-28 pb-20 md:pt-40 md:pb-24 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs md:text-sm font-extrabold tracking-widest text-brand-red uppercase bg-brand-red/10 px-3 py-1.5 rounded-md inline-block mb-4">
              Request A Quote
            </span>
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight uppercase ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Get A Custom Freight & Flatbed Estimate
            </h1>
            <p className={`mt-4 text-sm sm:text-base max-w-2xl mx-auto text-center ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              Fill in your load details below. Our pricing desk will compile dedicated flatbed options for Dubai, Abu Dhabi, or GCC transit.
            </p>
          </motion.div>

          <motion.div
            className={`p-4 sm:p-8 rounded-lg shadow-md ${
              isDark ? "bg-gray-700 text-white" : "bg-white text-gray-800"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className={`px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-200 ${
                  isDark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300"
                }`}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className={`px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-200 ${
                  isDark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300"
                }`}
              />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className={`px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-200 ${
                  isDark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300"
                }`}
              />
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
                className={`px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-200 ${
                  isDark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300"
                }`}
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
              </select>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="Pickup Location"
                required
                className={`px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-200 ${
                  isDark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300"
                }`}
              />
              <input
                type="text"
                name="deliveryLocation"
                value={formData.deliveryLocation}
                onChange={handleChange}
                placeholder="Delivery Location"
                required
                className={`px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-200 ${
                  isDark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300"
                }`}
              />
              <textarea
                name="cargoDescription"
                value={formData.cargoDescription}
                onChange={handleChange}
                placeholder="Cargo Description (size, weight, etc)"
                rows="4"
                required
                className={`md:col-span-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-200 ${
                  isDark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300"
                }`}
              ></textarea>

              <motion.div
                className="md:col-span-2 overflow-hidden w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="w-full origin-left scale-[0.82] min-[380px]:scale-90 sm:scale-100">
                  <ReCAPTCHA
                    sitekey="6LeM2y0rAAAAAM-pSIsO4EcCdCsVnfY9BAL--uTu"
                    ref={recaptchaRef}
                    onChange={() => setVerified(true)}
                  />
                </div>
              </motion.div>

              <motion.button
                type="submit"
                disabled={!verified}
                className={`md:col-span-2 py-3 rounded text-white transition cursor-pointer font-semibold shadow-sm ${
                  verified
                    ? "bg-brand-red hover:bg-brand-red-dark"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                whileHover={verified ? { scale: 1.02 } : {}}
                whileTap={verified ? { scale: 0.98 } : {}}
              >
                Submit Request
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.section>
      <Footer />
    </>
  );
};

export default Quote;
