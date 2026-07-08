import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMapPin, FiClock } from "react-icons/fi";

const Hero = () => {
  const isDark = useSelector((state) => state.darkMode.value);

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={isDark ? "hero_night_mobile.png" : "hero_day_mobile.png"}
          alt="Mashiana Heavy Flatbed Transport Background"
          className="w-full h-full object-cover transition-all duration-700"
          style={{ objectPosition: "15% center" }}
        />
        {/* Dynamic Dark Gradients Overlay for Legibility */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isDark
              ? "bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40 md:bg-gradient-to-r"
              : "bg-gradient-to-r from-white/95 via-white/80 to-white/40 md:bg-gradient-to-r"
          }`}
        />
        {/* Bottom backdrop gradient to fade into page sections */}
        <div
          className={`absolute bottom-0 left-0 w-full h-32 pointer-events-none ${
            isDark
              ? "bg-gradient-to-t from-slate-900 to-transparent"
              : "bg-gradient-to-t from-slate-50 to-transparent"
          }`}
        />
      </div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 z-10 flex flex-col justify-center h-full pt-[80px] md:pt-[110px]">
        <motion.div
          className="w-full md:w-3/5 text-left flex flex-col justify-center h-full md:h-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tagline */}
          <div className="mb-4">
            <span className="text-xs md:text-sm font-extrabold tracking-widest text-brand-blue uppercase bg-brand-blue/10 px-3 py-1.5 rounded-md inline-block">
              GCC Flatbed Operations
            </span>
          </div>

          {/* Bold Headline (shipamt style) */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight uppercase ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            You've got the <span className="text-brand-blue">Freight</span> & We have access to the <span className="text-brand-blue">Best Flats</span>.
          </h1>

          {/* Subtext description (monetransport style) */}
          <p
            className={`mt-6 text-sm sm:text-base md:text-lg text-justify leading-relaxed max-w-xl transition-colors ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Decades of dedicated heavy-equipment logistics. Moving large machinery, structural steel, and project cargo across Dubai, Abu Dhabi, and GCC borders with door-to-door tracking.
          </p>

          <div className="flex flex-col gap-4 mt-8">
            {/* Features Row (Mobile Quick View) */}
            <div
              className={`flex flex-row justify-between items-center gap-2 w-full px-2 py-4 border-t border-b md:hidden ${
                isDark ? "border-slate-800 text-white/90" : "border-slate-200 text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <FiMapPin className="w-5 h-5 text-brand-blue shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] font-black leading-none uppercase tracking-wider opacity-60">Operations</p>
                  <p className="text-xs font-black leading-tight uppercase tracking-wider mt-0.5">GCC & UAE WIDE</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="w-5 h-5 text-brand-blue shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] font-black leading-none uppercase tracking-wider opacity-60">Status</p>
                  <p className="text-xs font-black leading-tight uppercase tracking-wider mt-0.5">REAL-TIME GPS</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-4 w-full mt-2 justify-start">
              <Link to="/quote" className="flex-1 sm:flex-initial">
                <motion.div
                  className="px-6 py-3.5 bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition font-bold text-center shadow-lg cursor-pointer text-xs sm:text-sm uppercase tracking-wider w-full"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Quote Shipment
                </motion.div>
              </Link>
              <Link to="/about" className="flex-1 sm:flex-initial">
                <motion.div
                  className={`px-6 py-3.5 border rounded-lg transition font-bold text-center shadow-md cursor-pointer text-xs sm:text-sm uppercase tracking-wider w-full ${
                    isDark
                      ? "border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800"
                      : "border-slate-300 bg-white/60 text-slate-800 hover:bg-slate-100"
                  }`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Learn More
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
