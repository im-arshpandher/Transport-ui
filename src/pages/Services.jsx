import React, { useEffect } from "react"; 
import {
  FaTruckMoving,
  FaShippingFast,
  FaMapMarkedAlt,
  FaCogs,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";

import { motion } from "framer-motion"; 
import Navbar from "../common/Navbar"; 
import Footer from "../common/Footer"; 
import { useSelector } from "react-redux"; 

const services = [
  {
    title: "Flatbed Trucking",
    icon: <FaTruckMoving className="text-4xl text-blue-600" />,
    description:
      "Exclusive flatbed transportation for oversized, heavy, or irregular cargo with full compliance and safety.",
  },
  {
    title: "Project Cargo Transport",
    icon: <FaShippingFast className="text-4xl text-blue-600" />,
    description:
      "Special handling for large-scale industrial and construction equipment, delivered directly to site.",
  },
  {
    title: "Route Planning & Optimization",
    icon: <FaMapMarkedAlt className="text-4xl text-blue-600" />,
    description:
      "Strategic route planning across the UAE to minimize delays, avoid restrictions, and reduce costs.",
  },
  {
    title: "Secure Loading & Lashing",
    icon: <FaShieldAlt className="text-4xl text-blue-600" />,
    description:
      "Expert team ensures safe lashing, tarping, and load securing — critical for road compliance.",
  },
  {
  title: "24/7 Transport Support",
  icon: <FaClock className="text-4xl text-blue-600" />,
  description:
    "Round-the-clock assistance to ensure smooth coordination, timely updates, and quick issue resolution during transit.",
},
  {
    title: "Custom Solutions for Heavy Industries",
    icon: <FaCogs className="text-4xl text-blue-600" />,
    description:
      "Tailored transport services for manufacturing, energy, construction, and infrastructure sectors.",
  },
];


const Services = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);


  const isDark = useSelector((state) => state.darkMode.value); // Get dark mode state

  return (
    <>
      <Navbar />
      <section className={`py-20 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className={`text-center mb-12 ${isDark ? "text-white" : "text-gray-800"}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold">Our Services</h2>
            <p className={`text-gray-600 mt-2 max-w-2xl mx-auto ${isDark ? "text-white" : ""}`}>
              We provide a full range of logistics and heavy transport solutions
              tailored to your needs.
            </p>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg shadow transition ${isDark ? "bg-gray-700 text-white" : "bg-white text-gray-800"}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-center">{service.title}</h3>
                <p className={`text-center mt-2 ${isDark ? "text-white" : "text-gray-600"}`}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Services;
