import React from "react";
import Hero from "./Home/Hero";
import LawyerSearchCard from "./Home/LawyerSearchCard";
import SheriaAiCard from "./Home/SheriaAiCard";
import ESheria from "./Home/ESheria";

function Home() {
  return (
    <div className="">
      <Hero />
      <div className="px-20">
        <LawyerSearchCard />
      </div>
      <ESheria />
      <SheriaAiCard />
    </div>
  );
}

export default Home;
