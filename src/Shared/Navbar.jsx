import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { BookOpen, Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { IoLogOutOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiDashboardHorizontalLine } from "react-icons/ri";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Library", path: "/library" },
  ];

  if (user) {
    navLinks.push({ name: "Add Book", path: "/add-Book" });
    navLinks.push({ name: "My Books", path: "/my-books" });
  }

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Logged out successfully!");
      setIsUserMenuOpen(false);
    } catch (err) {
      toast.error("Failed to logout.");
    }
  };

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      className="w-full bg-white/70 backdrop-blur-md  sticky top-0 z-50 border-b border-white/20"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between font-semibold text-gray-800">
        <div className="flex items-center gap-2 ">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
          {/* Left Logo */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl tracking-wide"
            >
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <span className="font-serif text-gray-900 dark:text-white font-[Playfair] text-xl">
                Foliora
              </span>
            </Link>
          </div>
        </div>

        {/* Center Links (Desktop) */}
        <ul className="hidden md:flex flex-1 justify-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-1 rounded-md"
                    : "hover:text-indigo-500 dark:text-white"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-6 relative">
          <ThemeToggle />

          {!user && (
            <Link
              to="/signin"
              className="text-sm font-medium p-2 text-gray-700 dark:text-white hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-white/10 rounded"
            >
              Sign In
            </Link>
          )}

          {user && (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                {user.photoURL ? (
                  <img
                    src={user?.photoURL}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <User className="w-6 h-6 dark:text-white" />
                )}
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-50"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            user.photoURL ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold dark:text-white">
                            {user.displayName || "No Name"}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <ul className="p-2 text-sm dark:text-white">
                      <li>
                        <Link
                          to="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded"
                        >
                          <FaRegCircleUser size={20} />
                                                    My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded"
                        >
                         <RiDashboardHorizontalLine size={20} /> Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded"
                        >
                          <IoLogOutOutline size={20} /> Logout
                        </button>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Links */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden flex flex-col gap-2 px-4 pb-4"
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 text-indigo-600 font-medium"
                      : "block py-2 hover:text-indigo-500 dark:text-white"
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
