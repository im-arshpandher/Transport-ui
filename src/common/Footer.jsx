import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Our Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img
                src="/logo-removebg-preview.webp"
                alt="Mashiana Logo"
                className="h-10 w-auto mr-2 brightness-0 invert"
                style={{ maxWidth: "135px" }}
              />
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Mashiana Heavy Transport is the premier GCC-wide flatbed carrier, delivering oversized machinery, steel cargo, and project materials safely and reliably for over a decade.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-brand-red text-base shrink-0 mt-0.5" />
                <span>Mashiana Transport Yard, Industrial Area 12, Dubai, United Arab Emirates</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-brand-red text-base shrink-0" />
                <a href="tel:+971501234567" className="hover:text-white transition">
                  +971 50 123 4567
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-brand-red text-base shrink-0" />
                <a href="mailto:hello@mashiana.com" className="hover:text-white transition">
                  hello@mashiana.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Logistics Insights (Mock Blog Links) */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[2px] after:bg-brand-red">
              Logistics Insights
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="/services"
                  className="hover:text-white transition block group"
                >
                  <p className="group-hover:text-brand-red font-semibold transition text-slate-300">
                    Oversized Cargo Handling Regulations
                  </p>
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    June 12, 2026 • GCC Regulations
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="hover:text-white transition block group"
                >
                  <p className="group-hover:text-brand-red font-semibold transition text-slate-300">
                    Samsara GPS Integration: Enhancing Cargo Safety
                  </p>
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    May 28, 2026 • Logistics Telematics
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="hover:text-white transition block group"
                >
                  <p className="group-hover:text-brand-red font-semibold transition text-slate-300">
                    Why Flatbed Specialization Matters
                  </p>
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    April 19, 2026 • Freight Brokerage
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Let's Get Social */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[2px] after:bg-brand-red">
              Let's Get Social
            </h4>
            <p className="text-sm leading-relaxed mb-6">
              Stay updated with real-time fleet availability, job openings, and project updates across our UAE terminals.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <FaFacebookF />, url: "https://facebook.com" },
                { icon: <FaLinkedinIn />, url: "https://linkedin.com" },
                { icon: <FaYoutube />, url: "https://youtube.com" },
                { icon: <FaEnvelope />, url: "mailto:hello@mashiana.com" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-red hover:text-white hover:border-brand-red hover:scale-105 transition-all duration-300 shadow"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider">
              <Link to="/about" className="hover:text-brand-red transition">
                About Us
              </Link>
              <span className="text-slate-800">•</span>
              <Link to="/services" className="hover:text-brand-red transition">
                Our Services
              </Link>
              <span className="text-slate-800">•</span>
              <Link to="/quote" className="hover:text-brand-red transition">
                Freight Quote
              </Link>
            </div>
          </div>

        </div>

        {/* Footer Bottom Block */}
        <div className="border-t border-slate-900 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-semibold tracking-wider">
          <p>© {currentYear} Mashiana Heavy Transport. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-red transition">
              Terms & Conditions
            </a>
            <span>•</span>
            <a href="#" className="hover:text-brand-red transition">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
