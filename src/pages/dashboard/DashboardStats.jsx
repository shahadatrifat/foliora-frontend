import React from 'react';
import { motion } from "framer-motion";

const DashboardStats = ({ ReadingCount, ReadCount, WantToReadCount }) => {
  return (
    <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="flex flex-col md:flex-row mx-auto sm:flex-row justify-around gap-6 p-4 max-w-4xl mx-auto  rounded-lg">
      {/* Reading */}
      <div className="flex flex-col items-center text-center p-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl">
        <h3 className="text-xl font-semibold">Reading</h3>
        <p className="text-2xl font-bold">{ReadingCount}</p>
      </div>

      {/* Read */}
      <div className="flex flex-col items-center text-center p-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl">
        <h3 className="text-xl font-semibold">Read</h3>
        <p className="text-2xl font-bold">{ReadCount}</p>
      </div>

      {/* Want to Read */}
      <div className="flex flex-col items-center text-center p-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl">
        <h3 className="text-xl font-semibold">Want to Read</h3>
        <p className="text-2xl font-bold">{WantToReadCount}</p>
      </div>
    </motion.div>
  );
};

export default DashboardStats;
