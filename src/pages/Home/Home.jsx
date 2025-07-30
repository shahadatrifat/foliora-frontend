import React from "react";
import Hero from "./components/Hero";
import Features from "./components/Feautres";
import Carousel from "../../../bg/Carousel/Carousel";

const Home = () => {
  return (
    <div className="min-h-screen"> 
        <Hero></Hero>
        <Features></Features>
        <div className="container mx-auto"><h2 className="text-3xl md:text-4xl font-semibold font-[Playfair] text-center mb-4 dark:text-white">Recent Ratings and Reviews</h2>
          <Carousel baseWidth={400} 
          autoplay={true}
          autoplayDelay={4000}
          pauseOnHover={true}
          loop={true}
          ></Carousel></div>
    </div>
  );
};

export default Home;
