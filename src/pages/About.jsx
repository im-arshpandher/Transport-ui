import React, { useEffect } from "react"; 
import { motion } from "framer-motion"; 
import Navbar from "../common/Navbar"; 
import Footer from "../common/Footer"; 
import { useSelector } from "react-redux"; 

const About = () => {
  const isDark = useSelector((state) => state.darkMode.value); // Get dark mode state

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <section className={`py-20 ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <motion.div
            className={`text-center mb-12 ${isDark ? "text-white" : "text-gray-800"}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold">About Us</h2>
            <p className={`mt-2 text-gray-600 max-w-2xl mx-auto text-justify ${isDark ? "text-white" : ""}`}>
              A trusted logistics and heavy transport company based in the UAE,
              committed to safe, timely, and efficient cargo movement across the
              region.
            </p>
          </motion.div>

          {/* Two-column Layout */}
          <div className="md:flex md:items-center md:space-x-10 mb-16">
            {/* Text Content */}
            <motion.div
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className={`text-2xl font-semibold ${isDark ? "text-white" : "text-gray-700"}`}>
                Who We Are
              </h3>
              <p className={`text-gray-600 mt-4 text-justify ${isDark ? "text-white" : ""}`}>
                With over a decade of experience, we specialize in heavy
                equipment transport, freight logistics, warehousing, and route
                optimization across the GCC. Our team of professionals and fleet
                of modern vehicles ensure reliability, safety, and transparency
                in every shipment.
              </p>
              <p className={`text-gray-600 mt-4 text-justify ${isDark ? "text-white" : ""}`}>
                Whether you're moving oversized cargo or managing complex supply
                chains, we tailor solutions that work best for your business.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800"
                alt="Our Fleet"
                className="w-full h-[400px] object-cover rounded-lg shadow-md"
              />
            </motion.div>
          </div>

          {/* Image Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
              alt="Loading Cargo"
              className="w-full h-64 object-cover rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            />
            <motion.img
              src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800"
              alt="Warehouse"
              className="w-full h-64 object-cover rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            />
            <motion.img
              src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800"
              alt="Heavy Equipment Transport"
              className="w-full h-64 object-cover rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className={`text-2xl font-semibold ${isDark ? "text-white" : "text-gray-700"} mb-4`}>
                Our Mission
              </h3>
              <p className={`text-gray-600 text-justify ${isDark ? "text-white" : ""}`}>
                To deliver safe, efficient, and innovative logistics and
                transport solutions while exceeding client expectations and
                maintaining the highest safety and service standards.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className={`text-2xl font-semibold ${isDark ? "text-white" : "text-gray-700"} mb-4`}>
                Our Vision
              </h3>
              <p className={`text-gray-600 text-justify ${isDark ? "text-white" : ""}`}>
                To be the UAE's leading heavy transport and logistics partner
                recognized for reliability, innovation, and customer trust.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
