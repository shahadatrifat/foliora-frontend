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
        className="w-16 sm:w-1/4 md:w-60 lg:w-64 p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-md flex flex-col"
      >
        <div className="mb-6 flex items-center justify-center sm:justify-start">
          <h2 className="text-lg text-primary font-['Poppins'] font-semibold">
            <span className="hidden sm:inline">Foliora</span>
            <span className="sm:hidden">📖</span>
          </h2>
        </div>

        <nav className="flex flex-col gap-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 px-2 py-2 rounded transition ${
                isActive
                  ? "text-indigo-600 dark:text-primary font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:text-indigo-600"
              }`
            }
            aria-label="Home"
          >
            <Home className="" size={20} />
            <span className="hidden sm:inline">Home</span>
          </NavLink>

          <NavLink
            to="/dashboard/my-books"
            className={({ isActive }) =>
              `flex items-center gap-2 px-2 py-2 rounded transition ${
                isActive
                  ? "text-indigo-600 dark:text-primary font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:text-indigo-600"
              }`
            }
            aria-label="My Books"
          >
            <BookText size={20} />
            <span className="hidden sm:inline">My Books</span>
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 px-2 py-2 rounded transition ${
                isActive
                  ? "text-indigo-600 dark:text-primary font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:text-indigo-600"
              }`
            }
            aria-label="Profile"
          >
            <User size={20} />
            <span className="hidden sm:inline">Profile</span>
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
