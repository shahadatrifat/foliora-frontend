import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-hot-toast"; // Importing toast for notifications

const NewsletterSection = () => {
  const [email, setEmail] = useState(""); // State to store the email input

  // Handle email change
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email address!"); // Display error toast if the email is empty
    } else {
      toast.success("Subscription successful!"); // Display success toast on valid submission
    }
  };

  return (
    <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true, amount: 0.3 }}
    
    className="bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-800 dark:to-purple-900 text-white py-20 px-8 mt-12 text-center">
      <h2 className="text-2xl font-semibold mb-6 text-gray-100 dark:text-gray-200">
        Subscribe to our Newsletter
      </h2>
      <p className="text-gray-200 mb-6 dark:text-gray-400">
        Get the latest updates, news, and special offers directly in your inbox.
      </p>
      <form className="flex justify-center items-center" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          className="p-3 rounded-l-lg w-full max-w-xs text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-r-lg ml-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-indigo-700 dark:hover:bg-indigo-600"
        >
          <span className="text-lg">Subscribe</span>
        </button>
      </form>
    </motion.div>
  );
};

export default NewsletterSection;
