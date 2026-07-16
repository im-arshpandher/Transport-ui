import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from "react-icons/fa";

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
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    const allowedExtensions = ['.pdf', '.docx', '.xlsx', '.csv', '.png', '.jpg', '.jpeg', '.heif'];
    const validFiles = selectedFiles.filter(file => {
      const extension = file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity)).toLowerCase();
      return allowedExtensions.includes(extension);
    });

    if (validFiles.length !== selectedFiles.length) {
      toast.error("Some files were rejected. Invalid format.");
    }

    if (validFiles.length === 0) {
      e.target.value = null;
      return;
    }

    const newFiles = [...files, ...validFiles];
    const totalSize = newFiles.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > 5 * 1024 * 1024) {
      toast.error("Total file size exceeds 5MB limit.");
      e.target.value = null; // reset input
      return;
    }
    setFiles(newFiles);
    e.target.value = null; // reset so same file can be selected again
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Map form fields to backend expectations
      const payload = new FormData();
      payload.append("fullName", formData.companyName);
      payload.append("email", formData.email);
      payload.append("phoneNumber", formData.phoneNumber);
      payload.append("serviceType", "transport");
      payload.append("pickupLocation", formData.pickupZip);
      payload.append("deliveryLocation", formData.deliveryZip);
      payload.append("cargoDescription", `Requirements: ${formData.specialRequirements}. Referral: ${formData.referral}`);
      
      files.forEach(file => {
        payload.append("documents", file);
      });

      const res = await axios.post("http://localhost:5000/api/quote", payload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

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
        setFiles([]);
        const fileInput = document.getElementById('file-upload');
        if (fileInput) fileInput.value = "";
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

            <div className="relative md:col-span-3">
              <div className="mb-3">
                <label className={`block text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Upload Requirement Documents (Max 5MB total)
                </label>
                <p className={`text-[10px] mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Allowed types: .pdf, .docx, .xlsx, .csv, .png, .jpg, .jpeg, .heif
                </p>
              </div>
              
              <div className="space-y-4">
                {files.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {files.map((file, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border shadow-sm ${
                          isDark ? "bg-slate-900 border-slate-700 text-slate-300" : "bg-white border-slate-200 text-slate-700"
                        }`}
                      >
                        <a 
                          href={URL.createObjectURL(file)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="truncate max-w-[150px] hover:text-brand-blue hover:underline cursor-pointer"
                          title="Click to preview"
                        >
                          {file.name}
                        </a>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <label className={`inline-block px-6 py-2.5 rounded-lg border font-bold text-xs uppercase tracking-widest cursor-pointer transition-all duration-300 ${
                  isDark 
                    ? "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white" 
                    : "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                }`}>
                  {files.length > 0 ? "Add Another Document" : "Select Documents"}
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.docx,.xlsx,.csv,.png,.jpg,.jpeg,.heif"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
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
