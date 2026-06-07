import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export const whyChooseUsData = [
  {
    title: "Specialized Flatbed Expertise",
    description:
      "We focus exclusively on flatbed trucking — ensuring your oversized and heavy cargo is handled with unmatched precision and care.",
  },
  {
    title: "Experienced Logistics Team",
    description:
      "Decades of experience in handling construction equipment, heavy goods, and project cargo.",
  },
  {
    title: "Affordable Pricing",
    description:
      "Get competitive pricing without compromising on quality or service.",
  },
  {
    title: "24/7 Support",
    description:
      "Our support team is always available to answer your questions and keep your shipment moving.",
  },
];

// Present data as a vertical timeline with enhanced visuals
const WhyChooseUsTimeline = ({ data, isDark }) => (
  <div className="relative border-l-4 border-blue-600 ml-6">
    {data.map((item, idx) => (
      <motion.div
        key={idx}
        className="mb-12 ml-10 relative group"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: idx * 0.08 }}
      >
    
        {/* Card */}
        <div
          className={`p-6 rounded-xl shadow-lg border transition-all duration-200
            ${isDark
              ? "bg-gray-800 border-gray-700 hover:border-blue-500"
              : "bg-white border-gray-200 hover:border-blue-400"
            }
            group-hover:shadow-2xl`}
        >
          <h3 className={`text-xl font-bold mb-2 tracking-tight ${isDark ? "text-blue-300" : "text-blue-700"}`}>
            {item.title}
          </h3>
          <p className={`text-base leading-relaxed ${isDark ? "text-white" : "text-gray-600"}`}>
            {item.description}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
);

const TransportServices = () => {
  const isDark = useSelector((state) => state.darkMode.value);

  // Images for each group of 3 points (replace with your actual image URLs or imports)
  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
  ];

  // Split data into groups of 3
  const groups = [];
  for (let i = 0; i < whyChooseUsData.length; i += 2) {
    groups.push(whyChooseUsData.slice(i, i + 2));
  }

  return (
    <div>
      {/* ... keep your previous sections ... */}

      {/* Why Choose Us Section */}
      <section className={`${isDark ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" : "bg-gradient-to-b from-blue-50 via-white to-blue-100"} py-20`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className={`text-4xl font-extrabold tracking-tight mb-4 ${isDark ? "text-blue-200" : "text-blue-800"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Why Choose Us
          </motion.h2>
          <p className={`max-w-2xl mx-auto mb-12 text-lg ${isDark ? "text-blue-100" : "text-blue-700"}`}>
            Discover what sets our flatbed transport services apart.
          </p>
          <div className="space-y-20">
            {groups.map((group, idx) => {
              const isImageLeft = idx % 2 === 0;
              const imageUrl = images[idx % images.length];
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row items-center md:justify-between gap-10 ${!isImageLeft ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Image */}
                  <motion.div
                    className="flex-shrink-0 w-full md:w-1/2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    <img
                      src={imageUrl}
                      alt="Transport Service"
                      className="rounded-xl shadow-xl w-full h-80 object-cover"
                      loading="lazy"
                    />
                  </motion.div>
        
                  <div className="w-full md:w-1/2">
                    <WhyChooseUsTimeline data={group} isDark={isDark} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransportServices;
