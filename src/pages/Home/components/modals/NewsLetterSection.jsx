// src/components/home/Newsletter.jsx
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-6 text-indigo-600" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Stay Updated</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Subscribe to our newsletter for book recommendations and updates</p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors">Subscribe</motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
