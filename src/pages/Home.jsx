import React, { useEffect } from "react";
import Navbar from "../common/Navbar";
import Hero from "../components/Hero";
import Footer from "../common/Footer";
import TransportServices from "../components/TransportServices";
import Testimonials from "../components/Testimonials";

const Home = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <div>
     
      <Navbar />
      <Hero />
      <TransportServices/>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
