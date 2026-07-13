"use client";

import React, { useEffect } from "react";

import CareerSection from "@/components/CareerSection";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";



const Careers = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
   <div>
      
      <Navbar/>
     <CareerSection/>
     <Footer/>
   </div>
  );
};

export default Careers;
