"use client";

import React, { useEffect } from "react"; 
import {
  FaTruckMoving,
  FaShippingFast,
  FaMapMarkedAlt,
  FaCogs,
  FaClock,
  FaShieldAlt
} from "react-icons/fa";
import { motion } from "framer-motion";

import Navbar from "@/components/common/Navbar"; 
import Footer from "@/components/common/Footer"; 
import { useSelector } from "react-redux"; 

const services = [
  {
    title: "Flatbeds, lowbeds & Pickups",
    icon: <FaTruckMoving className="text-3xl text-brand-blue shrink-0" />,
    description: (
      <>
        Versatile transport using <b>flatbeds, lowbeds, and pickups</b>. Backed by a fleet of <b>90+ trucks</b>, we handle cargo of any scale with uncompromising safety.
      </>
    ),
  },
  {
    title: "Project Cargo Transport",
    icon: <FaShippingFast className="text-3xl text-brand-blue shrink-0" />,
    description:
      "End-to-end management for oversized and complex industrial equipment. We deliver massive structural payloads directly to site, on schedule.",
  },
  {
    title: "Route Planning & Optimization",
    icon: <FaMapMarkedAlt className="text-3xl text-brand-blue shrink-0" />,
    description:
      "Intelligent logistics planning to minimize transit times, navigate infrastructure constraints, and significantly reduce operational costs.",
  },
  {
    title: "Secure Loading & Lashing",
    icon: <FaShieldAlt className="text-3xl text-brand-blue shrink-0" />,
    description:
      "Certified loading operations using industry-leading lashing and binding techniques to ensure absolute road compliance and load stability.",
  },
  {
    title: "24/7 Transport Support",
    icon: <FaClock className="text-3xl text-brand-blue shrink-0" />,
    description:
      "Round-the-clock dispatch assistance. We provide real-time coordination and rapid issue resolution to keep your supply chain moving seamlessly.",
  },
  {
    title: "Custom Industry Solutions",
    icon: <FaCogs className="text-3xl text-brand-blue shrink-0" />,
    description:
      "Bespoke logistics frameworks tailored for energy, manufacturing, and construction. Scalable transport operations adapting to your specific needs.",
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
              <b>Specialized UAE Transport & Logistics Fleet</b>
            </h1>
            <p className={`mt-4 text-sm sm:text-base max-w-2xl mx-auto text-center ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              We provide a comprehensive range of logistics and transport solutions tailored to the unique requirements of your business. Our fleet includes <b>flatbeds, lowbeds, pickups, and specialized chassis for container transport</b>, with <b>90+ trucks</b> readily available.
            </p>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`p-8 rounded-xl shadow-md border flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
                  isDark
                    ? "bg-slate-950 border-slate-800 hover:border-brand-blue text-white"
                    : "bg-white border-slate-200 hover:border-brand-blue text-slate-800"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div>
                  <div className="mb-6 inline-flex p-3 rounded-lg bg-brand-blue/5">
                    {service.icon}
                  </div>
                  <h3 className={`text-xl font-bold uppercase tracking-wide mb-3 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed text-left ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {service.description}
                  </p>
                </div>
                
                {/* Crimson Accent hover strip */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-brand-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            ))}
          </div>

          {/* Bottom Action CTA Button */}
          <div className="mt-16 flex justify-center">
            <a
              href="/#quote-section"
              className="px-8 py-4 font-extrabold uppercase tracking-widest bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark hover:scale-[1.02] active:scale-[0.98] shadow-lg transition-all duration-200"
            >
              Get Quotation Now
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Services;
