import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 py-8 mt-"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Text */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center md:items-start mb-4 md:mb-0"
          >
            <h1 className="text-3xl font-extrabold font-[Playfair] text-gray-800 dark:text-white">
              Foliora
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Explore books, reviews, and more
            </p>
          </motion.div>

          {/* Links Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 text-center md:text-left"
          >
            <a
              href="/about"
              className="text-gray-400 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition duration-200 transform hover:scale-105"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-gray-400 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition duration-200 transform hover:scale-105"
            >
              Contact
            </a>
            <a
              href="/privacy-policy"
              className="text-gray-400 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition duration-200 transform hover:scale-105"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gray-400 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition duration-200 transform hover:scale-105"
            >
              Terms of Service
            </a>
          </motion.div>
        </div>

        {/* Social Media Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-6 mt-6"
        >
          <a
            href="https://www.facebook.com/shahadat.hossain.rifat.770767/"
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-gray-400 hover:text-blue-600 transition duration-200 transform hover:scale-110"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className=" dark:text-gray-400 hover:text-blue-400 transition duration-200 transform hover:scale-110"
          >
            <FaTwitter size={30} />
          </a>
          <a
            href="https://www.instagram.com/zazazawg/"
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-gray-400 hover:text-pink-600 transition duration-200 transform hover:scale-110"
          >
            <FaInstagram size={30} />
          </a>
        </motion.div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-500 mt-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-bold text-gray-800 dark:text-white font-[Playfair]">Foliora</span>. All
            rights reserved.
          </motion.span>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
