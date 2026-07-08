import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async"; 
import { motion } from "framer-motion"; 
import Navbar from "../common/Navbar"; 
import Footer from "../common/Footer"; 
import { useSelector } from "react-redux"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const About = () => {
  const isDark = useSelector((state) => state.darkMode.value); // Get dark mode state

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us | Heavy Fleet Operations | onroad</title>
        <meta name="description" content="With over 35 years of experience, we provide reliable heavy transport solutions including flatbeds, lowbeds, pickups, and container chassis across the UAE." />
      </Helmet>
      <Navbar />
      <section className={`pt-28 pb-20 md:pt-40 md:pb-24 ${isDark ? "bg-slate-900" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs md:text-sm font-extrabold tracking-widest text-brand-blue uppercase bg-brand-blue/10 px-3 py-1.5 rounded-md inline-block mb-4">
              Who We Are
            </span>
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight uppercase ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Decades of Specialized Transport & Logistics
            </h1>
            <p className={`mt-4 text-sm sm:text-base max-w-2xl mx-auto text-center ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              A trusted logistics and heavy transport partner in the UAE, committed to safe, timely, and compliant cargo movement across the UAE borders.
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
              <h3 className={`text-2xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                Operational Excellence
              </h3>
              <p className={`mt-4 text-justify leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                While this is a new venture started in <b>2023</b>, our core team brings over <b>35+ years</b> of experience in the industry. We specialize in heavy
                equipment transport, freight logistics, warehousing, and route
                optimization across the UAE.
              </p>
              <p className={`mt-4 text-justify leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                We have <b>90+ trucks</b> readily available, including <b>flatbeds, lowbeds and pickups</b> for your service, ensuring reliability, safety, and transparency
                in every shipment. Whether you're moving oversized cargo or managing complex supply
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

          {/* Image Slider */}
          <div className="mb-16">
            <Swiper
              modules={[Autoplay]}
              loop={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="w-full rounded-xl"
            >
              <SwiperSlide>
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
                  alt="Loading Cargo"
                  className="w-full h-64 object-cover rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800"
                  alt="Warehouse"
                  className="w-full h-64 object-cover rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800"
                  alt="Heavy Equipment Transport"
                  className="w-full h-64 object-cover rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                />
              </SwiperSlide>
            </Swiper>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`p-8 rounded-xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"}`}
            >
              <h3 className="text-xl font-black uppercase tracking-wider text-brand-blue mb-4">
                Our Mission
              </h3>
              <p className={`text-justify leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                To deliver safe, efficient, and innovative logistics and
                transport solutions while exceeding client expectations and
                maintaining the highest safety and service standards.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`p-8 rounded-xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"}`}
            >
              <h3 className="text-xl font-black uppercase tracking-wider text-brand-blue mb-4">
                Our Vision
              </h3>
              <p className={`text-justify leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
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
