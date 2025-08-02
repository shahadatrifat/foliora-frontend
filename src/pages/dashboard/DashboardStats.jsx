import React from 'react';
import { motion } from "framer-motion";
import { FaBookOpen, FaCheckCircle, FaBookmark } from 'react-icons/fa'; // Icons for reading, read, and want to read

const DashboardStats = ({ ReadingCount, ReadCount, WantToReadCount }) => {
  return (
    <motion.div 
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 p-6 max-w-5xl mx-auto rounded-lg"
>
  {/* Reading */}
  <div className="flex flex-col items-center text-center p-6 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all">
    <FaBookmark size={32} className="text-indigo-600 mb-2" />
    <h3 className="text-xl font-semibold">Reading</h3>
    <p className="text-2xl font-bold">{ReadingCount}</p>
  </div>

  {/* Read */}
  <div className="flex flex-col items-center text-center p-6 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all">
    <FaCheckCircle size={32} className="text-green-600 mb-2" />
    <h3 className="text-xl font-semibold">Read</h3>
    <p className="text-2xl font-bold">{ReadCount}</p>
  </div>

  {/* Want to Read */}
  <div className="flex flex-col items-center text-center p-6 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all">
    <FaBookOpen size={32} className="text-yellow-600 mb-2" />
    <h3 className="text-xl font-semibold">Want to Read</h3>
    <p className="text-2xl font-bold">{WantToReadCount}</p>
  </div>
</motion.div>

  );
};

export default DashboardStats;
