import React, { useEffect } from "react";
import ContactSection from "../components/ContactSection";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const Contact = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Contact;
