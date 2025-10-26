import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Star, Award } from "lucide-react";

export default function Stats() {
  const items = [
    { icon: BookOpen, label: "Books", value: "100+", color: "text-indigo-600" },
    { icon: Users, label: "Readers", value: "500+", color: "text-purple-600" },
    { icon: Star, label: "Reviews", value: "1000+", color: "text-yellow-600" },
    { icon: Award, label: "Top Rated", value: "100+", color: "text-green-600" },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {items.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
