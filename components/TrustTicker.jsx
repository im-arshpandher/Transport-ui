import React from "react";
import { useSelector } from "react-redux";
import { FaShieldAlt, FaMapMarkedAlt, FaAward, FaBuilding, FaHandshake, FaTruck, FaHistory } from "react-icons/fa";

const TrustTicker = () => {
  const isDark = useSelector((state) => state.darkMode.value);

  const partners = [
    { name: "UAE Customs Approved", icon: <FaBuilding className="text-xl mr-2 shrink-0" /> },
    // { name: "Samsara Telematics", icon: <FaMapMarkedAlt className="text-xl mr-2 shrink-0" /> },
    { name: "Safe Transport Alliance", icon: <FaShieldAlt className="text-xl mr-2 shrink-0" /> },
    { name: "90+ trucks available", icon: <FaTruck className="text-xl mr-2 shrink-0" /> },
    { name: "ISO 9001 Logistics", icon: <FaAward className="text-xl mr-2 shrink-0" /> },
    { name: "35 years+ industry experience", icon: <FaHistory className="text-xl mr-2 shrink-0" /> },
  ];

  // Duplicate list to achieve seamless infinite scroll loops
  const doublePartners = [...partners, ...partners, ...partners];

  return (
    <section
      className={`py-6 border-b transition-colors duration-300 ${
        isDark
          ? "bg-slate-950 border-slate-900 text-slate-400"
          : "bg-white border-slate-100 text-slate-500"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-6 overflow-hidden">
        {/* Title */}
        <div className="shrink-0 text-xs font-black uppercase tracking-widest text-brand-blue md:border-r border-slate-800 pr-6 select-none">
          Trusted & Certified
        </div>

        {/* Marquee Ticker */}
        <div className="relative w-full overflow-hidden select-none">
          <div className="animate-ticker flex items-center gap-12 whitespace-nowrap">
            {doublePartners.map((partner, idx) => (
              <div
                key={idx}
                className="flex items-center text-sm font-semibold tracking-wide text-slate-400 dark:text-slate-500 hover:text-brand-blue dark:hover:text-brand-blue transition duration-300"
              >
                {partner.icon}
                <span>{partner.name}</span>
              </div>
            ))}
          </div>

          {/* Gradients to mask edges */}
          <div className={`absolute inset-y-0 left-0 w-8 pointer-events-none bg-gradient-to-r ${
            isDark ? "from-slate-950 to-transparent" : "from-white to-transparent"
          }`} />
          <div className={`absolute inset-y-0 right-0 w-8 pointer-events-none bg-gradient-to-l ${
            isDark ? "from-slate-950 to-transparent" : "from-white to-transparent"
          }`} />
        </div>
      </div>
    </section>
  );
};

export default TrustTicker;
