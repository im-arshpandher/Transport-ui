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
        className={`py-20 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className={`text-center mb-12 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold">Request a Quote</h2>
            <p
              className={`text-gray-600 mt-2 ${isDark ? "text-white" : ""}`}
            >
              Fill in your details and get a customized logistics or transport
              quote.
            </p>
          </motion.div>

          <motion.div
            className={`p-8 rounded-lg shadow-md ${
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
        </div>
      </motion.section>
      <Footer />
    </>
  );
};

export default Quote;
