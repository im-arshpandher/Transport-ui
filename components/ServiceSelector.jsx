import React from "react";
import { useSelector } from "react-redux";
import { FaTruckLoading, FaRoute, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from 'next/link';

const ServiceSelector = () => {
  const isDark = useSelector((state) => state.darkMode.value);

  const services = [
    {
      title: "Fleet Rental & Leasing",
      description: <>Secure long-term <b>flatbeds, lowbeds, or pickups</b> or immediate commercial rental to cover seasonal spikes and fleet fluctuations with zero maintenance overhead.</>,
      icon: <FaTruckLoading className="text-3xl text-brand-blue shrink-0" />,
      link: "/services",
    },
    {
      title: "Dedicated Project Logistics",
      description: <>Full supply chain management for heavy machinery, structural steel, and construction materials with custom route surveys.</>,
      icon: <FaRoute className="text-3xl text-brand-blue shrink-0" />,
      link: "/services",
    },
    {
      title: "UAE Freight Brokerage",
      description: <>Access verified heavy capacity and handle complex customs clearances smoothly across Dubai, Abu Dhabi, Saudi, and Oman borders.</>,
      icon: <FaShieldAlt className="text-3xl text-brand-blue shrink-0" />,
      link: "/services",
    },
  ];

  return (
    <section className={`py-20 transition-colors duration-300 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
            Commercial Divisions
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 uppercase ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Specialized Transport Services
          </h2>
          <p className={`max-w-xl mx-auto mt-4 text-sm sm:text-base ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}>
            We own and operate one of the region's most reliable heavy fleets, delivering cost stabilization and capacity guarantees.
          </p>
        </div>

        {/* 3-Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className={`p-8 rounded-xl shadow-md border flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
                isDark
                  ? "bg-slate-950 border-slate-800 hover:border-brand-blue text-white"
                  : "bg-white border-slate-200 hover:border-brand-blue text-slate-800"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
            >
              {/* Top content */}
              <div>
                <div className="mb-6 inline-flex p-3 rounded-lg bg-brand-blue/5">
                  {service.icon}
                </div>
                <h3 className={`text-xl font-bold uppercase tracking-wide mb-3 ${
                  isDark ? "text-white" : "text-slate-900"
                }`}>
                  {service.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  {service.description}
                </p>
              </div>

              {/* Bottom Call to Action */}
              <div className="mt-8">
                <Link href={service.link}
                  className="inline-flex items-center text-xs font-black uppercase tracking-widest text-brand-blue group-hover:underline"
                >
                  Explore Service &rarr;
                </Link>
              </div>

              {/* Crimson Accent hover strip */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-brand-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServiceSelector;
