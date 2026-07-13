import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import { z } from "zod";
import { toast } from "react-toastify";

const CareerSection = () => {
  const isDark = useSelector((state) => state.darkMode.value);

  const jobList = [
    {
      title: "Heavy Vehicle Driver",
      location: "Dubai, UAE",
      type: "Full-time",
      description:
        "Looking for experienced heavy vehicle drivers with valid UAE license and knowledge of logistics routes.",
    },
    {
      title: "Logistics Coordinator",
      location: "Sharjah, UAE",
      type: "Full-time",
      description:
        "Coordinate daily operations, manage schedules, and ensure timely delivery of goods.",
    },
    {
      title: "Fleet Maintenance Supervisor",
      location: "Abu Dhabi, UAE",
      type: "Full-time",
      description:
        "Oversee routine inspections, repairs, and maintenance of heavy transport vehicles.",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    coverLetter: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define the schema
    const schema = z.object({
      name: z.string().trim().min(2, "Name must be at least 2 characters"),
      email: z.string().trim().email("Invalid email address"),
      position: z
        .string()
        .trim()
        .min(2, "Position must be at least 2 characters"),
      coverLetter: z.string().optional(),
      resume: z.instanceof(File),
    });

    // Validate the form data
    try {
      schema.parse(formData);

      // Create FormData object
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("position", formData.position);
      data.append("coverLetter", formData.coverLetter);
      data.append("resume", formData.resume);

      // Send the form data using axios
      await axios.post("http://localhost:5000/api/candidates", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Application submitted successfully!");
      setFormData({
        name: "",
        email: "",
        position: "",
        coverLetter: "",
        resume: null,
      });
      document.getElementById("resume-file").value = "";
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.errors.map((err) => err.message).join("\n"));
      } else {
        alert("An error occurred while submitting the application.");
      }
    }
  };

  return (
    <motion.section
      className={`pt-28 pb-20 md:pt-40 md:pb-24 ${isDark ? "bg-gray-900" : "bg-white"}`}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs md:text-sm font-extrabold tracking-widest text-brand-blue uppercase bg-brand-blue/10 px-3 py-1.5 rounded-md inline-block mb-4">
            Work With The Best
          </span>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight uppercase ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Join The onroad Logistics Team
          </h1>
          <p
            className={`mt-4 text-sm sm:text-base max-w-2xl mx-auto text-center ${isDark ? "text-slate-300" : "text-slate-600"}`}
          >
            Be part of a dynamic logistics and heavy transport leader in the
            UAE. We offer competitive growth and professional career paths.
          </p>
        </motion.div>

        {/* Application Section */}
        <motion.div
          id="apply"
          className={`p-4 sm:p-8 rounded-lg shadow-md 
            ${isDark ? "bg-gray-800 text-white" : "bg-gray-50"}`}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Submit Your Resume
          </h3>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className={`w-full py-3 bg-transparent border-b focus:outline-none transition-all duration-300 text-sm ${
                isDark
                  ? "border-slate-800 focus:border-brand-blue text-white placeholder-slate-600"
                  : "border-slate-300 focus:border-brand-blue text-slate-800 placeholder-slate-400"
              }`}
              required
              onChange={handleChange}
              value={formData.name}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className={`w-full py-3 bg-transparent border-b focus:outline-none transition-all duration-300 text-sm ${
                isDark
                  ? "border-slate-800 focus:border-brand-blue text-white placeholder-slate-600"
                  : "border-slate-300 focus:border-brand-blue text-slate-800 placeholder-slate-400"
              }`}
              required
              onChange={handleChange}
              value={formData.email}
            />
            <select
              name="position"
              className={`w-full py-3 bg-transparent border-b focus:outline-none transition-all duration-300 text-sm md:col-span-2 ${
                isDark
                  ? "border-slate-800 focus:border-brand-blue text-white"
                  : "border-slate-300 focus:border-brand-blue text-slate-800"
              } ${!formData.position ? (isDark ? "text-slate-600" : "text-slate-400") : ""}`}
              required
              onChange={handleChange}
              value={formData.position}
            >
              <option value="" disabled hidden>
                Position Applying For
              </option>
              {jobList.map((job, idx) => (
                <option key={idx} value={job.title} className={isDark ? "bg-gray-900 text-white" : "bg-white text-slate-900"}>
                  {job.title}
                </option>
              ))}
              <option value="Other" className={isDark ? "bg-gray-900 text-white" : "bg-white text-slate-900"}>
                Other
              </option>
            </select>
            <textarea
              name="coverLetter"
              placeholder="Cover Letter (optional)"
              rows="4"
              className={`w-full py-3 bg-transparent border-b focus:outline-none transition-all duration-300 text-sm md:col-span-2 ${
                isDark
                  ? "border-slate-800 focus:border-brand-blue text-white placeholder-slate-600"
                  : "border-slate-300 focus:border-brand-blue text-slate-800 placeholder-slate-400"
              }`}
              onChange={handleChange}
              value={formData.coverLetter}
            ></textarea>
            <input
              type="file"
              name="resume"
              className="md:col-span-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-blue hover:file:bg-blue-100"
              accept=".pdf,.doc,.docx"
              required
              onChange={handleChange}
              id="resume-file"
            />
            <button
              type="submit"
              className="md:col-span-2 w-full bg-brand-blue text-white font-bold py-3 px-6 uppercase tracking-widest hover:bg-brand-blue-dark active:bg-brand-blue transition-colors shadow-md cursor-pointer"
            >
              Submit Application
            </button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CareerSection;
