import { Outlet, NavLink } from "react-router";
import { BookText, User, Home } from "lucide-react";
import { motion } from "framer-motion";
import Galaxy from "../../bg/Galaxy/Galaxy";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-64 p-6 bg-white dark:bg-white/5 shadow-md"
      >
        <h2 className="text-xl text-gray-800 dark:text-white font-semibold mb-6"><span className="font-serif font-semibold text-2xl">Foliora</span > Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) =>
              `flex items-center gap-2 text-gray-800 dark:text-white ${
                isActive ? "text-indigo-600 font-semibold" : "hover:text-indigo-600"
              }`
            }
          >
            <Home size={18} /> Home
          </NavLink>
          <NavLink
            to="/dashboard/my-books"
            className={({ isActive }) =>
              `flex items-center gap-2 text-gray-800 dark:text-white ${
                isActive ? "text-indigo-600 font-semibold" : "hover:text-indigo-600"
              }`
            }
          >
            <BookText size={18} /> My Books
          </NavLink>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 text-gray-800 dark:text-white ${
                isActive ? "text-indigo-600 font-semibold" : "hover:text-indigo-600"
              }`
            }
          >
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
