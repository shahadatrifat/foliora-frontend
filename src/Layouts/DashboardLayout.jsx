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
        className="w-1/5 p-6 bg-white dark:bg-gray-800 shadow-md sm:w-80 md:w-96"
      >
        <h2 className="text-lg text-primary font-['Poppins']  font-semibold mb-6">
          Foliora
        </h2>
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2   ${
                isActive ? "text-indigo-600 dark:text-primary font-semibold" : "hover:text-indigo-600"
              }`
            }
          >
            <Home size={18} /> Home
          </NavLink>
          <NavLink
            to="/dashboard/my-books"
            className={({ isActive }) =>
              `flex items-center gap-2  ${
                isActive ? "text-indigo-600 dark:text-primary font-semibold" : "hover:text-indigo-600"
              }`
            }
          >
            <BookText size={18} /> My Books
          </NavLink>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-2  ${
                isActive ? "text-indigo-600 dark:text-primary font-semibold" : "hover:text-indigo-600"
              }`
            }
          >
            <User size={18} /> Profile
          </NavLink>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
