// src/components/home/Features.jsx
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Target, Users } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: BookOpen,
      title: "Vast Collection",
      description: "Access thousands of books across every genre imaginable",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: Target,
      title: "Reading Goals",
      description: "Set and track your reading goals throughout the year",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with fellow readers and share recommendations",
      gradient: "from-pink-500 to-red-500",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-black">
      <div className="container  mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Foliora?</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Everything you need to manage and enjoy your reading journey</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow transition-all"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
