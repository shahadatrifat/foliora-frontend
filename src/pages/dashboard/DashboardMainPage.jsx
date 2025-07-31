import React from 'react';
import { motion } from "framer-motion";

const DashboardMainPage = () => {
    return (
       <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-gray-800 dark:text-white"
    >
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Here you can manage your books, assignments, and preferences.
      </p>
      
    </motion.div>
    );
};

export default DashboardMainPage;

