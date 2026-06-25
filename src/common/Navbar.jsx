import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaBars, FaTimes, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { invert } from "../../redux/colorModeSlice";

const Navbar = () => {
  const isDark = useSelector((state) => state.darkMode.value);
  const dispatch = useDispatch();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Careers", href: "/careers" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme !== null) {
      dispatch(invert(storedTheme === "true"));
    } else {
      const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      dispatch(invert(darkModeMediaQuery.matches));
      localStorage.setItem("darkMode", darkModeMediaQuery.matches.toString());

      const handleChange = (e) => {
        dispatch(invert(e.matches));
        localStorage.setItem("darkMode", e.matches.toString());
      };
      darkModeMediaQuery.addEventListener("change", handleChange);
      return () => darkModeMediaQuery.removeEventListener("change", handleChange);
    }
  }, [dispatch]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Is the current page Home? We apply transparent overlay navbar only on Home page top scroll.
  const isHomePage = location.pathname === "/";
  const useTransparentStyle = isHomePage && !scrolled;

  return (
    <header className="fixed top-0 left-0 w-full z-[9999] transition-all duration-300">
      {/* Top Utility Header Bar (Desktop Only) */}
      <div
        className={`hidden md:flex h-[38px] items-center justify-between px-8 text-xs font-semibold tracking-wider transition-all duration-300 ${
          useTransparentStyle
            ? isDark
              ? "bg-transparent text-white/90 border-b border-white/10"
              : "bg-transparent text-slate-800 border-b border-slate-200/50"
            : isDark
            ? "bg-slate-950 text-slate-300 border-b border-slate-900"
            : "bg-slate-100 text-slate-600 border-b border-slate-200"
        }`}
      >
        <div className="flex items-center gap-2">
          <FaPhoneAlt className="text-brand-red text-xs shrink-0" />
          <a href="tel:+971501234567" className="hover:text-brand-red transition">
            +971 50 123 4567
          </a>
          <span className="mx-2 text-slate-600">|</span>
          <FaEnvelope className="text-brand-red text-xs shrink-0" />
          <a href="mailto:hello@mashiana.com" className="hover:text-brand-red transition">
            hello@mashiana.com
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] bg-brand-red text-white px-2 py-0.5 rounded font-black tracking-widest uppercase">
            GCC WIDE
          </span>
          <span>FLATBED SPECIALISTS</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          useTransparentStyle
            ? "bg-transparent py-5"
            : isDark
            ? "bg-slate-900/95 backdrop-blur-md py-3 shadow-xl border-b border-slate-800"
            : "bg-white/95 backdrop-blur-md py-3 shadow-xl border-b border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[50px]">
            {/* Logo */}
            <Link to="/">
              <div className="flex items-center">
                <img
                  src="logo-removebg-preview.webp"
                  alt="Mashiana Logo"
                  className={`h-10 w-auto mr-2 transition-all duration-300 ${
                    useTransparentStyle && isDark ? "brightness-0 invert" : ""
                  }`}
                  style={{ maxWidth: "130px" }}
                />
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`font-semibold text-sm tracking-wide transition relative py-1 hover:text-brand-red ${
                      useTransparentStyle
                        ? isDark
                          ? "text-white hover:text-brand-red"
                          : "text-slate-800 hover:text-brand-red"
                        : isDark
                        ? "text-slate-200 hover:text-brand-red"
                        : "text-slate-700 hover:text-brand-red"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* Theme Toggle Button */}
              <button
                onClick={() => {
                  dispatch(invert(!isDark));
                  localStorage.setItem("darkMode", (!isDark).toString());
                }}
                className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none shrink-0 cursor-pointer ${
                  isDark
                    ? "text-yellow-400 hover:text-yellow-300 hover:bg-slate-800/50"
                    : "border border-slate-800 text-slate-800 hover:bg-slate-100"
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <FiSun className="w-5 h-5" />
                ) : (
                  <FiMoon className="w-4.5 h-4.5" />
                )}
              </button>

              {/* CONNECT WITH US Button */}
              <Link to="/quote">
                <motion.div
                  className={`px-5 py-2.5 rounded-lg border font-bold text-xs uppercase tracking-widest cursor-pointer shadow-md transition-all duration-300 ${
                    useTransparentStyle
                      ? isDark
                        ? "border-white bg-transparent text-white hover:bg-brand-red hover:border-brand-red"
                        : "border-brand-red bg-transparent text-brand-red hover:bg-brand-red hover:text-white"
                      : isDark
                      ? "border-brand-red bg-transparent text-brand-red hover:bg-brand-red hover:text-white"
                      : "border-brand-red bg-transparent text-brand-red hover:bg-brand-red hover:text-white"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Connect with us
                </motion.div>
              </Link>
            </div>

            {/* Mobile Menu & Theme Buttons */}
            <div className="md:hidden flex items-center gap-3">
              {/* Theme Toggle for Mobile */}
              <button
                onClick={() => {
                  dispatch(invert(!isDark));
                  localStorage.setItem("darkMode", (!isDark).toString());
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none shrink-0 cursor-pointer ${
                  isDark
                    ? "text-yellow-400 hover:text-yellow-300 hover:bg-slate-800/50"
                    : "border border-slate-800 text-slate-800 hover:bg-slate-100"
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <FiSun className="w-4.5 h-4.5" />
                ) : (
                  <FiMoon className="w-4 h-4" />
                )}
              </button>

              {/* Mobile Drawer Trigger */}
              <button
                onClick={toggleMenu}
                className={`p-1.5 rounded-full transition-colors focus:outline-none ${
                  useTransparentStyle
                    ? isDark
                      ? "text-white hover:bg-white/10"
                      : "text-slate-800 hover:bg-slate-950/5"
                    : isDark
                    ? "text-slate-200 hover:bg-slate-800/50"
                    : "text-slate-800 hover:bg-slate-100"
                }`}
                aria-label="Open menu"
              >
                <FaBars size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Slide-out Sidebar Panel */}
        {createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={toggleMenu}
                  className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[9999] md:hidden"
                />

                {/* Sidebar Container */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                  className={`fixed top-0 right-0 h-full w-4/5 max-w-[300px] z-[10000] shadow-2xl p-6 flex flex-col justify-between md:hidden border-l ${
                    isDark
                      ? "bg-slate-950 border-slate-800 text-white"
                      : "bg-white border-slate-200 text-slate-800"
                  }`}
                >
                  <div>
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800/80">
                      <Link to="/" onClick={toggleMenu}>
                        <img
                          src="logo-removebg-preview.webp"
                          alt="Mashiana Logo"
                          className={`h-9 w-auto ${isDark ? "brightness-0 invert" : ""}`}
                          style={{ maxWidth: "110px" }}
                        />
                      </Link>

                      <div className="flex items-center gap-3">
                        {/* Theme Toggle in Drawer */}
                        <button
                          onClick={() => {
                            dispatch(invert(!isDark));
                            localStorage.setItem("darkMode", (!isDark).toString());
                          }}
                          className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none shrink-0 cursor-pointer ${
                            isDark
                              ? "text-yellow-400 hover:text-yellow-300 hover:bg-slate-800/50"
                              : "border border-slate-800 text-slate-800 hover:bg-slate-100"
                          }`}
                          aria-label="Toggle theme"
                        >
                          {isDark ? (
                            <FiSun className="w-4.5 h-4.5" />
                          ) : (
                            <FiMoon className="w-4 h-4" />
                          )}
                        </button>

                        {/* Close Button */}
                        <button
                          onClick={toggleMenu}
                          className={`p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors focus:outline-none ${
                            isDark ? "text-slate-200" : "text-slate-800"
                          }`}
                          aria-label="Close menu"
                        >
                          <FaTimes size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Vertical Navigation Links */}
                    <div className="mt-8 flex flex-col space-y-4">
                      {menuItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`font-black text-sm uppercase tracking-widest py-2.5 px-3 rounded-lg transition-all duration-300 relative flex items-center justify-between ${
                              isActive
                                ? isDark
                                  ? "bg-slate-900 text-brand-red border-l-2 border-brand-red"
                                  : "bg-slate-50 text-brand-red border-l-2 border-brand-red"
                                : isDark
                                ? "text-slate-200 hover:bg-slate-900/50 hover:text-brand-red"
                                : "text-slate-700 hover:bg-slate-50 hover:text-brand-red"
                            }`}
                            onClick={toggleMenu}
                          >
                            <span>{item.name}</span>
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom Action CTA Button */}
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80">
                    <Link
                      to="/quote"
                      className="block text-center py-3 font-extrabold uppercase tracking-widest bg-brand-red text-white rounded-lg hover:bg-brand-red-dark hover:scale-[1.02] active:scale-[0.98] shadow-lg transition-all duration-200"
                      onClick={toggleMenu}
                    >
                      Connect with us
                    </Link>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          , document.body
        )}
      </nav>
    </header>
  );
};

export default Navbar;
