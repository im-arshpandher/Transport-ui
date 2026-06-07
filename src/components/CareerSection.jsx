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
      position: z.string().trim().min(2, "Position must be at least 2 characters"),
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
      className={`py-20 ${isDark ? "bg-gray-900" : "bg-white"}`}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <h2 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
            Join Our Team
          </h2>
          <p className={`${isDark ? "text-white" : "text-gray-600"} mt-2`}>
            Be part of a dynamic logistics and heavy transport company in the UAE.
          </p>
        </motion.div>

        {/* Job Listings */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {jobList.map((job, idx) => (
            <motion.div
              key={idx}
              className={`border rounded-lg p-6 shadow hover:shadow-md transition 
                ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-800"}`}
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="mt-1">
                {job.location} • {job.type}
              </p>
              <p className="mt-4">{job.description}</p>
              <a
                href="#apply"
                className="inline-block mt-4 text-blue-500 hover:text-blue-600 font-medium"
              >
                Apply Now →
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Application Section */}
        <motion.div
          id="apply"
          className={`mt-20 p-8 rounded-lg shadow-md 
            ${isDark ? "bg-gray-800 text-white" : "bg-gray-50"}`}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Submit Your Resume
          </h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
              required
              onChange={handleChange}
              value={formData.name}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
              required
              onChange={handleChange}
              value={formData.email}
            />
            <input
              type="text"
              name="position"
              placeholder="Position Applying For"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none md:col-span-2"
              required
              onChange={handleChange}
              value={formData.position}
            />
            <textarea
              name="coverLetter"
              placeholder="Cover Letter (optional)"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none md:col-span-2"
              onChange={handleChange}
              value={formData.coverLetter}
            ></textarea>
            <input
              type="file"
              name="resume"
              className="md:col-span-2"
              accept=".pdf,.doc,.docx"
              required
              onChange={handleChange}
              id="resume-file"
            />
            <button
              type="submit"
              className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
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
