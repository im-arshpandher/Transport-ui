import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeQuoteForm = () => {
  const isDark = useSelector((state) => state.darkMode.value);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    phoneNumber: "",
    email: "",
    pickupZip: "",
    deliveryZip: "",
    specialRequirements: "",
    referral: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Map form fields to backend expectations
      const payload = {
        fullName: formData.companyName, // Backend expects fullName
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        serviceType: "transport", // default service type
        pickupLocation: formData.pickupZip,
        deliveryLocation: formData.deliveryZip,
        cargoDescription: `Requirements: ${formData.specialRequirements}. Referral: ${formData.referral}`,
      };

      const res = await axios.post("http://localhost:5000/api/quote", payload);

      if (res.data.success) {
        toast.success("Freight quote request sent successfully!");
        setFormData({
          companyName: "",
          phoneNumber: "",
          email: "",
          pickupZip: "",
          deliveryZip: "",
          specialRequirements: "",
          referral: "",
        });
      } else {
        toast.error(res.data.message || "Failed to submit request.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Could not submit. Please call +971 56 534 5459 directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quote-section" className={`scroll-mt-32 py-20 transition-colors duration-300 border-t border-b ${
      isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200"
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center mb-12">
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Call <a href="tel:+971565345459" className="text-brand-blue hover:underline">+971 56 534 5459</a> now to get a customized transport quote.
          </h2>
          <p className={`mt-2 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Or submit details below and a heavy logistics advisor will contact you within 15 minutes.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Input fields with sleek bottom-bordered styles (AMT style) */}
            <div className="relative">
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name *"
                required
                className={`w-full py-3 bg-transparent border-b focus:outline-none transition-all duration-300 text-sm ${
                  isDark
                    ? "border-slate-800 focus:border-brand-blue text-white placeholder-slate-600"
                    : "border-slate-300 focus:border-brand-blue text-slate-800 placeholder-slate-400"
                }`}
              />
            </div>

            <div className="relative">
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number *"
                required
                className={`w-full py-3 bg-transparent border-b focus:outline-none transition-all duration-300 text-sm ${
                  isDark
                    ? "border-slate-800 focus:border-brand-blue text-white placeholder-slate-600"
                    : "border-slate-300 focus:border-brand-blue text-slate-800 placeholder-slate-400"
                }`}
              />
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address *"
                required
                className={`w-full py-3 bg-transparent border-b focus:outline-none transition-all duration-300 text-sm ${
                  isDark
                    ? "border-slate-800 focus:border-brand-blue text-white placeholder-slate-600"
                    : "border-slate-300 focus:border-brand-blue text-slate-800 placeholder-slate-400"
                }`}
              />
            </div>

            <div className="relative">
              <input
                type="text"
                name="pickupZip"
                value={formData.pickupZip}
                onChange={handleChange}
                placeholder="Pickup Area / City *"
                required
                className={`w-full py-3 bg-transparent border-b focus:outline-none transition-all duration-300 text-sm ${
                  isDark
                    ? "border-slate-800 focus:border-brand-blue text-white placeholder-slate-600"
                    : "border-slate-300 focus:border-brand-blue text-slate-800 placeholder-slate-400"
                }`}
              />
            </div>

            <div className="relative">
              <input
                type="text"
                name="deliveryZip"
                value={formData.deliveryZip}
                onChange={handleChange}
                placeholder="Delivery Area / City *"
                required
                className={`w-full py-3 bg-transparent border-b focus:outline-none transition-all duration-300 text-sm ${
                  isDark
                    ? "border-slate-800 focus:border-brand-blue text-white placeholder-slate-600"
                    : "border-slate-300 focus:border-brand-blue text-slate-800 placeholder-slate-400"
                }`}
              />
            </div>

            <div className="relative">
              <select
                name="referral"
                value={formData.referral}
                onChange={handleChange}
                required
                className={`w-full py-3 bg-transparent border-b focus:outline-none transition-all duration-300 text-sm cursor-pointer ${
                  isDark
                    ? "border-slate-800 focus:border-brand-blue text-slate-300 bg-slate-950 placeholder-slate-600"
                    : "border-slate-300 focus:border-brand-blue text-slate-600 bg-white placeholder-slate-400"
                }`}
              >
                <option value="">How Did You Hear About Us? *</option>
                <option value="Search Engine">Search Engine</option>
                <option value="Social Media">LinkedIn / Social Media</option>
                <option value="Email Newsletter">Email Newsletter</option>
                <option value="Industry Referral">Industry Referral</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="relative md:col-span-3">
              <input
                type="text"
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleChange}
                placeholder="Any Special Transport Requirements (e.g. flatbed/lowbed, dimensions, cargo weight)"
                className={`w-full py-3 bg-transparent border-b focus:outline-none transition-all duration-300 text-sm ${
                  isDark
                    ? "border-slate-800 focus:border-brand-blue text-white placeholder-slate-600"
                    : "border-slate-300 focus:border-brand-blue text-slate-800 placeholder-slate-400"
                }`}
              />
            </div>

          </div>

          {/* Submit Button wrapper */}
          <div className="text-center mt-8">
            <motion.button
              type="submit"
              disabled={loading}
              className={`px-8 py-3.5 border font-bold text-xs uppercase tracking-widest cursor-pointer shadow-md rounded-lg transition-all duration-300 ${
                isDark
                  ? "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                  : "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {loading ? "Submitting..." : "Get Quotation"}
            </motion.button>
          </div>
        </form>

        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={true}
          theme={isDark ? "dark" : "light"}
        />

      </div>
    </section>
  );
};

export default HomeQuoteForm;
