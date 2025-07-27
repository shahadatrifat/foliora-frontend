import React from "react";
import Hero from "./components/Hero";
import Features from "./components/Feautres";

const Home = () => {
  return (
    <div className="min-h-screen"> 
        <Hero></Hero>
        <Features></Features>
    </div>
  );
};

export default Home;
