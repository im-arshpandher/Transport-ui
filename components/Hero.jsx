import React from "react";
import { motion } from "framer-motion";
import Link from 'next/link';
import { useSelector } from "react-redux";
import { FiMapPin, FiClock } from "react-icons/fi";

const Hero = () => {
  const isDark = useSelector((state) => state.darkMode.value);

  return (
    <section className="relative w-full min-h-[100dvh] flex overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={isDark ? "hero_night_mobile.png" : "hero_day_mobile.png"}
          alt="onroad Heavy Transport Background"
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
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 z-10 flex flex-col justify-start md:justify-center pt-[120px] pb-10 md:pt-[140px] md:pb-20">
        <motion.div
          className="w-full md:w-3/5 text-left flex flex-col justify-start md:justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tagline */}
          <div className="mb-[clamp(0.7rem,2dvh,1rem)]">
            <span className="text-[clamp(0.65rem,1.5dvh,0.875rem)] font-extrabold tracking-widest text-brand-blue uppercase bg-brand-blue/10 px-3 py-1.5 rounded-md inline-block">
              UAE Transport & Fleet Operations
            </span>
          </div>

          {/* Bold Headline (shipamt style) */}
          <h1
            className={`text-[clamp(1.9rem,6.5dvh,3.75rem)] font-black leading-tight tracking-tight uppercase ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            You've got the <span className="text-brand-blue">Freight</span> & We
            have access to the{" "}
            <span className="text-brand-blue">Best Flats</span>.
          </h1>

          {/* Subtext description (monetransport style) */}
          <p
            className={`mt-[clamp(0.9rem,3dvh,1.5rem)] text-[clamp(0.875rem,2.2dvh,1.125rem)] text-justify leading-relaxed max-w-xl transition-colors ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Decades of dedicated heavy-equipment logistics. Moving large
            machinery, structural steel, and project cargo across Dubai, Abu
            Dhabi, and UAE borders with absolute reliability.
          </p>

          <div className="flex flex-col gap-4 mt-8">
            {/* Features Row (Mobile Quick View) */}
            <div
              className={`flex flex-row justify-between items-center gap-2 w-full px-2 py-4 border-t border-b md:hidden ${
                isDark
                  ? "border-slate-800 text-white/90"
                  : "border-slate-200 text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <FiMapPin className="w-5 h-5 text-brand-blue shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] font-black leading-none uppercase tracking-wider opacity-60">
                    Operations
                  </p>
                  <p className="text-xs font-black leading-tight uppercase tracking-wider mt-0.5">
                    UAE WIDE
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="w-5 h-5 text-brand-blue shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] font-black leading-none uppercase tracking-wider opacity-60">
                    Status
                  </p>
                  <p className="text-xs font-black leading-tight uppercase tracking-wider mt-0.5">
                    24/7 SUPPORT
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-4 w-full mt-2 justify-start">
              <a href="/#quote-section" className="flex-1 sm:flex-initial">
                <motion.div
                  className="px-6 py-3.5 bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition font-bold text-center shadow-lg cursor-pointer text-xs sm:text-sm uppercase tracking-wider w-full"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Quote Shipment
                </motion.div>
              </a>
              <Link href="/about" className="flex-1 sm:flex-initial">
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
