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
    icon: <FaTruckMoving className="text-4xl text-brand-blue" />,
    description:
      "Exclusive flatbed transportation for oversized, heavy, or irregular cargo with full compliance and safety.",
  },
  {
    title: "Project Cargo Transport",
    icon: <FaShippingFast className="text-4xl text-brand-blue" />,
    description:
      "Special handling for large-scale industrial and construction equipment, delivered directly to site.",
  },
  {
    title: "Route Planning & Optimization",
    icon: <FaMapMarkedAlt className="text-4xl text-brand-blue" />,
    description:
      "Strategic route planning across the UAE to minimize delays, avoid restrictions, and reduce costs.",
  },
  {
    title: "Secure Loading & Lashing",
    icon: <FaShieldAlt className="text-4xl text-brand-blue" />,
    description:
      "Expert team ensures safe lashing, tarping, and load securing — critical for road compliance.",
  },
  {
  title: "24/7 Transport Support",
  icon: <FaClock className="text-4xl text-brand-blue" />,
  description:
    "Round-the-clock assistance to ensure smooth coordination, timely updates, and quick issue resolution during transit.",
},
  {
    title: "Custom Solutions for Heavy Industries",
    icon: <FaCogs className="text-4xl text-brand-blue" />,
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
      <section className={`pt-28 pb-20 md:pt-40 md:pb-24 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs md:text-sm font-extrabold tracking-widest text-brand-blue uppercase bg-brand-blue/10 px-3 py-1.5 rounded-md inline-block mb-4">
              Our Capabilities
            </span>
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight uppercase ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Specialized GCC Flatbed Services
            </h1>
            <p className={`mt-4 text-sm sm:text-base max-w-2xl mx-auto text-center ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              We provide a comprehensive range of logistics and heavy transport solutions tailored to the unique requirements of heavy industries.
            </p>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`p-8 rounded-xl shadow-md border border-t-4 border-t-brand-blue hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ${
                  isDark
                    ? "bg-slate-900 border-slate-800 text-white"
                    : "bg-white border-slate-200/60 text-slate-800"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-6">{service.icon}</div>
                <h3 className="text-xl font-black uppercase tracking-tight text-center mb-3">{service.title}</h3>
                <p className={`text-justify leading-relaxed text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
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
