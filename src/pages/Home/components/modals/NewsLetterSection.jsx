import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email address!");
    }

    setLoading(true);

    // Fake API call
    setTimeout(() => {
      toast.success("Subscription successful!");
      setEmail("");
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="container mx-auto px-4 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-800 dark:to-purple-900 text-white py-16 px-6 mt-12 text-center rounded-xl shadow-sm"
      >
        <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <p className="text-gray-200 mb-8">
          Get the latest updates, news, and special offers directly in your inbox.
        </p>

        <form
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none w-full max-w-xs text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg sm:rounded-r-lg sm:rounded-l-none focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-indigo-700 dark:hover:bg-indigo-600"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default NewsletterSection;
