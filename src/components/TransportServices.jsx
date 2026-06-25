import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaBoxes, FaTv, FaTools, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";

export const whyChooseUsData = [
  {
    title: "Specialized Flatbed Expertise",
    description:
      "We focus exclusively on flatbed trucking — ensuring your oversized, heavy, and project cargo is secured with certified lashing systems.",
  },
  {
    title: "Experienced Logistics Advisors",
    description:
      "Decades of combined experience in organizing complex route surveys, GCC permits, and police escorts for super-heavy loads.",
  },
  {
    title: "Transparent Fixed Pricing",
    description:
      "Get clear, competitive shipping rates and fuel surcharges with zero hidden cross-border brokerage fees.",
  },
  {
    title: "24/7 Dispatch Operations",
    description:
      "Our support center coordinates with drivers around the clock, keeping you updated on customs border status.",
  },
];

const WhyChooseUsTimeline = ({ data, isDark }) => (
  <div className="relative border-l-4 border-brand-red ml-2 sm:ml-6">
    {data.map((item, idx) => (
      <motion.div
        key={idx}
        className="mb-12 ml-4 sm:ml-10 relative group"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: idx * 0.08 }}
      >
        {/* Point Marker */}
        <div className="absolute -left-[24px] sm:-left-[48px] top-1.5 w-4 h-4 rounded-full bg-brand-red border-4 border-slate-50 dark:border-slate-900 group-hover:scale-125 transition-transform" />

        {/* Card */}
        <div
          className={`p-6 rounded-xl shadow border transition-all duration-300
            ${isDark
              ? "bg-slate-950 border-slate-900 hover:border-brand-red"
              : "bg-white border-slate-200 hover:border-brand-red"
            }
            group-hover:shadow-lg`}
        >
          <h3 className={`text-lg font-bold mb-2 uppercase tracking-wide ${isDark ? "text-slate-100" : "text-slate-900"}`}>
            {item.title}
          </h3>
          <p className={`text-sm text-justify leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            {item.description}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
);

const TransportServices = () => {
  const isDark = useSelector((state) => state.darkMode.value);

  return (
    <div className="w-full">
      {/* 1. Value Proposition Grid Section (monetransport style) */}
      <section className={`py-20 border-b transition-colors duration-300 ${isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
              Performance Standards
            </span>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 uppercase ${isDark ? "text-white" : "text-slate-900"}`}>
              Built for Reliability
            </h2>
            <p className={`max-w-2xl mx-auto mt-4 text-sm sm:text-base ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Mashiana overrides traditional transit inefficiencies by shipping direct without mid-route loading shifts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
            {/* Value Prop 1: Zero Transloading */}
            <div className={`p-8 rounded-xl border flex flex-col justify-between ${
              isDark ? "bg-slate-900/60 border-slate-800" : "bg-slate-50 border-slate-200"
            }`}>
              <div>
                <div className="mb-6 inline-flex p-3 rounded-lg bg-brand-red/10 text-brand-red">
                  <FaBoxes className="text-2xl" />
                </div>
                <h3 className={`text-xl font-bold uppercase tracking-wider mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
                  Direct Door-to-Door
                </h3>
                <p className={`text-sm text-justify leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Avoid slow cargo shifts at warehouses. Your heavy components, steel structures, or pipes stay secured on the exact same trailer from pick-up to final delivery point. No damage risk.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs font-bold text-brand-red uppercase tracking-wider">
                <FaCheckCircle /> <span>Single-trailer shipping</span>
              </div>
            </div>

            {/* Value Prop 2: Telemetry Tracking */}
            <div className={`p-8 rounded-xl border flex flex-col justify-between relative overflow-hidden ${
              isDark ? "bg-slate-900/60 border-slate-800" : "bg-slate-50 border-slate-200"
            }`}>
              <div>
                <div className="mb-6 inline-flex p-3 rounded-lg bg-brand-red/10 text-brand-red">
                  <FaTv className="text-2xl" />
                </div>
                <h3 className={`text-xl font-bold uppercase tracking-wider mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
                  Actual Visibility
                </h3>
                <p className={`text-sm text-justify leading-relaxed mb-6 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Track shipments in real-time with GPS tracking. We verify borders and load status at all transit nodes.
                </p>

                {/* SVG Telemetry Map Simulator Panel (Wow factor) */}
                <div className="w-full h-32 rounded-lg bg-slate-950 border border-slate-800 relative p-3 flex flex-col justify-between overflow-hidden text-white/95 select-none font-mono">
                  <div className="absolute inset-0 opacity-15">
                    {/* SVG Map Path Grid */}
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>
                  {/* Map path line */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                      d="M 20 90 Q 120 20, 240 80 T 360 40"
                      fill="none"
                      stroke="#ec1c24"
                      strokeWidth="2.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                  </svg>
                  
                  {/* Simulated GPS Stats */}
                  <div className="flex items-center justify-between text-[9px] relative z-10 text-slate-400">
                    <span>DEVICE #M809-GPS</span>
                    <span className="text-green-400 flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> ONLINE
                    </span>
                  </div>
                  
                  {/* Interactive marker */}
                  <div className="flex items-center gap-2 relative z-10 mt-2">
                    <FaMapMarkerAlt className="text-brand-red animate-bounce text-sm shrink-0" />
                    <div>
                      <p className="text-[10px] font-black uppercase text-white leading-none">BORDER APPROACH</p>
                      <p className="text-[8px] text-slate-400 mt-0.5">DUBAI ➔ RIYADH TRANSIT</p>
                    </div>
                  </div>

                  <div className="flex justify-between text-[9px] relative z-10 text-slate-500 pt-1 border-t border-slate-900">
                    <span>SPEED: 72 KM/H</span>
                    <span>ETA: 4.5 HRS</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs font-bold text-brand-red uppercase tracking-wider">
                <FaCheckCircle /> <span>Samsara GPS Integration</span>
              </div>
            </div>

            {/* Value Prop 3: New Equipment */}
            <div className={`p-8 rounded-xl border flex flex-col justify-between ${
              isDark ? "bg-slate-900/60 border-slate-800" : "bg-slate-50 border-slate-200"
            }`}>
              <div>
                <div className="mb-6 inline-flex p-3 rounded-lg bg-brand-red/10 text-brand-red">
                  <FaTools className="text-2xl" />
                </div>
                <h3 className={`text-xl font-bold uppercase tracking-wider mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
                  Modern Fleets & Safety
                </h3>
                <p className={`text-sm text-justify leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Keep delivery timelines secure. We inspect and maintain all flatbeds, binders, stanchions, and tarps. No breakdowns, no delay excuses, no payload compromise.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs font-bold text-brand-red uppercase tracking-wider">
                <FaCheckCircle /> <span>Regularly serviced setups</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Timeline Rework Section */}
      <section className={`py-20 transition-colors duration-300 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
              Why Partner With Us
            </span>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 uppercase ${isDark ? "text-white" : "text-slate-900"}`}>
              Logistics Operations
            </h2>
            <p className={`max-w-xl mx-auto mt-4 text-sm sm:text-base ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              What set us apart in the GCC oversized and heavy industrial haulage sector.
            </p>
          </div>

          <div className="mt-12">
            <WhyChooseUsTimeline data={whyChooseUsData} isDark={isDark} />
          </div>

        </div>
      </section>
    </div>
  );
};

export default TransportServices;
