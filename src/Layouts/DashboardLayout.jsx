// src/layout/DashboardLayout.jsx
import { Outlet, NavLink } from "react-router";
import { BookText, User, Home } from "lucide-react";
import { motion } from "framer-motion";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <motion.aside 
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-64 p-6 bg-white dark:bg-white/5 shadow-md">
        <h2 className="text-xl font-semibold mb-6">Foliora Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <NavLink to="/dashboard" className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-indigo-600">
            <Home size={18} /> Home
          </NavLink>
          <NavLink to="/dashboard/assignments" className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-indigo-600">
            <BookText size={18} /> Assignments
          </NavLink>
          <NavLink to="/profile" className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-indigo-600">
            <User size={18} /> Profile
          </NavLink>
        </nav>
      </motion.aside>

      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
