import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = () => {
  const isDark = useSelector((state) => state.darkMode.value);

  return (
    // <section
    //   className={`${
    //     isDark ? "bg-gray-900" : "bg-gray-50"
    //   } pt-20 md:pt-24 lg:pt-28`}
    // >
    <section
      className={`pt-20 md:pt-24 lg:pt-28 h-screen` }
    >
      <div className="fixed top-0 right-0 z-[-1] w-full h-screen">
        <img
          src={isDark ? "hero_dark.webp" : "hero_light2.webp"}
          alt="Background"
          className={isDark?"w-full h-full object-cover":"w-full h-full object-cover"} 
        />
      </div>
      <div className="max-w-7xl mx-auto w-full h-full px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className={`text-4xl sm:text-5xl font-bold leading-tight ${
              isDark ? "text-white" : "text-white"
            }`}
          >
            On Road Transport
          </h1>
          <p
            className={`mt-4 text-lg ${
              isDark ? "text-white" : "text-white"
            }`}
          >
            Delivering Heavy Loads with Precision - Your Flatbed Transport
            Experts!
          </p>
          <div className="mt-6 flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4">
            <Link to="/quote">
              <motion.div
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Get a Quote
              </motion.div>
            </Link>
            <Link to="/about">
              <motion.div
                className={`px-6 py-3 border text-blue-600 rounded-lg transition ${
                  isDark
                    ? "border-blue-400 hover:bg-blue-900"
                    : "border-blue-600 bg-blue-50 hover:bg-blue-700 hover:text-white"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://wallpapercave.com/wp/s5rcLxH.jpg"
            alt="Logistics illustration"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </motion.div> */}
      </div>
    </section>
  );
};

export default Hero;
