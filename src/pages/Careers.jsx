import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import CareerSection from "../components/CareerSection";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";



const Careers = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
   <div>
      <Helmet>
        <title>Careers | Transport Fleet Jobs | onroad</title>
        <meta name="description" content="Join our expanding team! We are looking for experienced drivers and logistics coordinators for our fleet of flatbeds, lowbeds, and container chassis." />
      </Helmet>
      <Navbar/>
     <CareerSection/>
     <Footer/>
   </div>
  );
};

export default Careers;
