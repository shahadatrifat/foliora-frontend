import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Your Reading Journey Today</h2>
          <p className="text-xl mb-8 text-white/90">Join thousands of readers discovering their next favorite book</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg">Get Started Free</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-transparent border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors text-lg">Learn More</motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
