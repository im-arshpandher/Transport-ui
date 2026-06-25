import React, { useEffect } from "react";
import Navbar from "../common/Navbar";
import Hero from "../components/Hero";
import TrustTicker from "../components/TrustTicker";
import ServiceSelector from "../components/ServiceSelector";
import TransportServices from "../components/TransportServices";
import HomeQuoteForm from "../components/HomeQuoteForm";
import Testimonials from "../components/Testimonials";
import Footer from "../common/Footer";

const Home = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Hero />
      <TrustTicker />
      <ServiceSelector />
      <TransportServices />
      <HomeQuoteForm />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
