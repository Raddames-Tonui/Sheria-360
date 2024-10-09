import React from "react";
import Hero from "./Home/Hero";
import LawyerSearchCard from "./Home/LawyerSearchCard";
import SheriaAiCard from "./Home/SheriaAiCard";
import ESheria from "./Home/ESheria";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
   
    <div className="md:mx-20">
      <Hero />
      <div className="">
        <LawyerSearchCard />
      </div>
      <ESheria />
      <SheriaAiCard />
      

    </div>
    <Footer/>
    </>
  );
}

export default Home;
