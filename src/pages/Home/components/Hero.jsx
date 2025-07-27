// src/components/Hero.jsx
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Player } from "@lottiefiles/react-lottie-player";
import readingAnimation from "../../../assets/lotties/reading.json";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] dark:from-[#0c111c] dark:to-[#0e131f] text-gray-900 dark:text-white py-20">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 items-center gap-12">
        {/* Lottie Animation */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Player
            autoplay
            loop
            src={readingAnimation}
            className="w-full  max-w-md"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-[Playfair] leading-tight">
            Curate Your Virtual Bookshelf
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
            Discover, organize, and track your reading journey—all in one
            elegant digital library made just for you.
          </p>

          <div className="mt-8 flex justify-center md:justify-start gap-4 flex-wrap">
            <Link
              to="/library"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Explore Library
            </Link>
            <Link
              to="/signin"
              className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-100 transition"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
