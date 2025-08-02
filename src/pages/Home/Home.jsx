import React from "react";
import Hero from "./components/Hero";
import Features from "./components/Feautres";
import Carousel from "../../../bg/Carousel/Carousel";
import UpvotedFeatureCard from "./components/UpvotedFeatureCard";
import NewsletterSection from "./components/modals/NewsLetterSection";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero></Hero>
      <UpvotedFeatureCard></UpvotedFeatureCard>
      <Features></Features>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        viewport={{ once: true, amount: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto"
      >
        <h2 className="text-3xl md:text-4xl mt-12 font-semibold font-[Playfair] text-center mb-6 text-primary">
          Recent Ratings and Reviews
        </h2>
        <Carousel
          baseWidth={400}
          autoplay={true}
          autoplayDelay={4000}
          pauseOnHover={true}
          loop={true}
        ></Carousel>
      </motion.div>
      <NewsletterSection></NewsletterSection>
    </div>
  );
};

export default Home;
