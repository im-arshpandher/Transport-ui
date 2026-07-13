"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

export default function ScrollToTop() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showTop) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: 30,
        right: 30,
        zIndex: 1000,
        padding: "10px 10px",
        borderRadius: "50%",
        border: "none",
        background: "#333",
        color: "#fff",
        cursor: "pointer",
        fontSize: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
      }}
      aria-label="Scroll to top"
    >
      <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <AiOutlineArrowUp />
      </span>
    </button>
  );
}
