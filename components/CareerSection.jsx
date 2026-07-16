import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from "react-icons/fa";

const CareerSection = () => {
  const isDark = useSelector((state) => state.darkMode.value);
  const [loading, setLoading] = useState(false);

  const jobList = [
    {
      title: "Heavy Vehicle Driver",
      location: "Dubai, UAE",
      type: "Full-time",
    },
    {
      title: "Logistics Coordinator",
      location: "Sharjah, UAE",
      type: "Full-time",
    },
    {
      title: "Fleet Maintenance Supervisor",
      location: "Abu Dhabi, UAE",
      type: "Full-time",
    },
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    position: "",
    coverLetter: "",
  });
  
  const [resumeFile, setResumeFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const extension = file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity)).toLowerCase();
    if (extension !== '.pdf' && extension !== '.docx') {
      toast.error("Only .pdf and .docx files are allowed for resumes.");
      e.target.value = null;
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit.");
      e.target.value = null;
      return;
    }

    setResumeFile(file);
    e.target.value = null; // reset so same file can be selected again
  };

  const removeFile = () => {
    setResumeFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      toast.error("Please upload your resume.");
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("email", formData.email);
      payload.append("position", formData.position);
      if (formData.coverLetter) {
        payload.append("coverLetter", formData.coverLetter);
      }
      payload.append("resume", resumeFile);
      // Dummy turnstile response for backend validation if not implemented on frontend yet
      payload.append("cf-turnstile-response", "dummy-token");

      const res = await axios.post("http://localhost:5000/api/career/apply", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Application submitted successfully!");
        setFormData({
          fullName: "",
          email: "",
          position: "",
          coverLetter: "",
        });
        setResumeFile(null);
      } else {
        toast.error(res.data.message || "Failed to submit application.");
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "An error occurred while submitting the application.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="career-section"
      className={`scroll-mt-32 pt-32 pb-20 md:pt-40 transition-colors duration-300 border-t border-b ${
        isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: 0.2 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <motion.div
          className="text-center mb-12"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs md:text-sm font-extrabold tracking-widest text-brand-blue uppercase bg-brand-blue/10 px-3 py-1.5 rounded-md inline-block mb-4">
            Work With The Best
          </span>
          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Join The onroad Logistics Team
          </h2>
          <p
            className={`mt-4 text-sm sm:text-base max-w-2xl mx-auto text-center ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Be part of a dynamic logistics and heavy transport leader in the
            UAE. We offer competitive growth and professional career paths.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-8"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name *"
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

            <div className="relative md:col-span-2">
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className={`w-full py-3 bg-transparent border-b focus:outline-none transition-all duration-300 text-sm cursor-pointer ${
                  isDark
                    ? "border-slate-800 focus:border-brand-blue text-slate-300 bg-slate-950 placeholder-slate-600"
                    : "border-slate-300 focus:border-brand-blue text-slate-600 bg-white placeholder-slate-400"
                }`}
              >
                <option value="" disabled hidden>
                  Position Applying For *
                </option>
                {jobList.map((job, idx) => (
                  <option key={idx} value={job.title}>
                    {job.title}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="relative md:col-span-2">
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Cover Letter (optional)"
                rows="4"
                className={`w-full py-3 bg-transparent border-b focus:outline-none transition-all duration-300 text-sm ${
                  isDark
                    ? "border-slate-800 focus:border-brand-blue text-white placeholder-slate-600"
                    : "border-slate-300 focus:border-brand-blue text-slate-800 placeholder-slate-400"
                }`}
              ></textarea>
            </div>

            <div className="relative md:col-span-2">
              <div className="mb-3">
                <label className={`block text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Upload Resume (Max 5MB) *
                </label>
                <p className={`text-[10px] mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Allowed types: .pdf, .docx
                </p>
              </div>
              
              <div className="space-y-4">
                {resumeFile && (
                  <div className="flex flex-wrap gap-2">
                    <div 
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border shadow-sm ${
                        isDark ? "bg-slate-900 border-slate-700 text-slate-300" : "bg-white border-slate-200 text-slate-700"
                      }`}
                    >
                      <a 
                        href={URL.createObjectURL(resumeFile)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="truncate max-w-[150px] hover:text-brand-blue hover:underline cursor-pointer"
                        title="Click to preview"
                      >
                        {resumeFile.name}
                      </a>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                )}
                
                <label className={`inline-block px-6 py-2.5 rounded-lg border font-bold text-xs uppercase tracking-widest cursor-pointer transition-all duration-300 ${
                  isDark 
                    ? "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white" 
                    : "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                }`}>
                  {resumeFile ? "Change Resume" : "Select Resume"}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

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
              {loading ? "Submitting..." : "Submit Application"}
            </motion.button>
          </div>
        </motion.form>

        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={true}
          theme={isDark ? "dark" : "light"}
        />
      </div>
    </motion.section>
  );
};

export default CareerSection;
