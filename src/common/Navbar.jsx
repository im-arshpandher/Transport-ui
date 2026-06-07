import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { invert } from "../../redux/colorModeSlice";

const Navbar = () => {
  const isDark = useSelector((state) => state.darkMode.value);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Careers", href: "/careers" },
  ];

  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode");
  
    if (storedTheme !== null) {
      dispatch(invert(storedTheme === "true"));
    } else {
      const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      dispatch(invert(darkModeMediaQuery.matches));
  
      // Optional: save system preference to localStorage if nothing is stored yet
      localStorage.setItem("darkMode", darkModeMediaQuery.matches.toString());
  
      const handleChange = (e) => {
        dispatch(invert(e.matches));
        localStorage.setItem("darkMode", e.matches.toString());
      };
  
      darkModeMediaQuery.addEventListener("change", handleChange);
  
      return () => {
        darkModeMediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, [dispatch]);
  
  return (
    <nav className={`w-full h-[70px] fixed top-0 left-0 z-50 shadow-md ${isDark ? "bg-gray-900" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center">
              <img
                src="\logo-removebg-preview.webp"
                alt="Logo"
                className="h-10 w-auto mr-2" // Set height to 40px, keep aspect ratio, add right margin
                style={{ maxWidth: "120px" }} // Optional: limit max width
              />
            </div>
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`hover:text-blue-500 ${isDark ? "text-white" : "text-gray-700"}`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Get a Quote
            </Link>
            <div className="checkbox-wrapper-3">
              <input
                type="checkbox"
                id="cbx-3"
                checked={isDark}
                onChange={() => {
                  dispatch(invert(!isDark));
                  localStorage.setItem("darkMode", (!isDark).toString());
                }}
              />
              <label htmlFor="cbx-3" className="toggle">
                <span />
              </label>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={isDark ? "text-white" : "text-gray-700"}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>



      </div>






      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden shadow-lg px-4 pt-4 pb-4 space-y-4 ${isDark ? "bg-gray-900" : "bg-white"}`}
          >
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block hover:text-blue-500 ${isDark ? "text-white" : "text-gray-700"}`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/quote"
              className="block text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Get a Quote
            </Link>
            <input
                type="checkbox"
                id="cbx-3"
                checked={isDark}
                onChange={() => {
                  dispatch(invert(!isDark));
                  localStorage.setItem("darkMode", (!isDark).toString());
                }}
              />
              <label htmlFor="cbx-3" className={"toggle" + (isDark ? " text-white" : "")}>
                Toggle Dark mode<span />
              </label>
          </motion.div>

        )}

      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
