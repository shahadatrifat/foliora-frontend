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
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const baseLinks = [
    { name: "Home", path: "/" },
    { name: "Library", path: "/library" },
    { name: "Reading Goals", path: "/reading-goals" },
  ];

  const userLinks = user
    ? [
        { name: "Add Book", path: "/add-book" },
        { name: "My Books", path: "/my-books" },
        { name: "Dashboard", path: "/dashboard" },
      ]
    : [];

  const infoLinks = [{ name: "About", path: "/about" }];

  const navLinks = [...baseLinks, ...userLinks, ...infoLinks];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Logged out successfully!");
      setIsUserMenuOpen(false);
    } catch {
      toast.error("Failed to logout.");
    }
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
      // close mobile menu if clicked outside on small screens
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        // keep mobile menu open if the click was on the hamburger button itself
        // we check target closest button with aria-label 'menu-toggle'
        const isToggle = e.target.closest?.("[data-menu-toggle]");
        if (!isToggle && window.innerWidth < 1024) {
          // only collapse if click outside mobile panel on small/tablet
          // do nothing when desktop
          // note: 1024px corresponds to lg breakpoint in Tailwind default
          // but we still rely on window.innerWidth to decide behavior
          // keep simpler: close mobile menu when clicking outside at < lg
          setMobileMenuOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on resize to desktop to avoid stuck open
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  return (
    <motion.header
      className={`w-full sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/60 dark:bg-black/30 backdrop-blur-md border-white/20 shadow-md"
          : "bg-white dark:bg-black border-transparent"
      }`}
      aria-label="Main navigation"
    >
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between font-semibold text-gray-800 dark:text-gray-200">
        {/* Left: logo + hamburger (visible on lg:hidden) */}
        <div className="flex items-center gap-2">
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen((s) => !s)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              data-menu-toggle="true"
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          <Link to="/" className="flex items-center gap-2 text-xl tracking-wide">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <span className="font-[Playfair] text-gray-900 dark:text-white text-xl">
              Foliora
            </span>
          </Link>
        </div>

        {/* Desktop navigation: shown on lg and up */}
        <ul className="hidden lg:flex flex-1 justify-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400 font-medium border-b-2 border-indigo-600 dark:border-indigo-400 pb-1"
                    : "text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right: theme toggle, sign in / user */}
        <div className="flex items-center gap-4 lg:gap-6 relative">
          <ThemeToggle />

          {!user && (
            <Link
              to="/signin"
              className="text-sm font-medium p-2 text-gray-700 dark:text-gray-200 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-white/10 rounded"
            >
              Sign In
            </Link>
          )}

          {user && (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen((s) => !s)}
                aria-expanded={isUserMenuOpen}
                className="flex items-center gap-2 focus:outline-none p-1 rounded"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <User className="w-6 h-6 dark:text-white" />
                )}
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-50"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
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
                          <FaRegCircleUser size={20} /> My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard"
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

      {/* Mobile/Tablet sliding menu (visible when mobileMenuOpen and on screens < lg) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-panel"
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden w-full"
          >
            <div
              ref={mobileMenuRef}
              className="container mx-auto px-4 pb-6"
            >
              <div className="mt-2 rounded-xl bg-white/80 dark:bg-gray-900/80 shadow-md border border-gray-100 dark:border-gray-800 p-4 backdrop-blur-sm">
                {/* Links */}
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <NavLink
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          isActive
                            ? "block w-full py-3 px-3 text-indigo-600 dark:text-indigo-400 font-medium border-b border-indigo-600 dark:border-indigo-400"
                            : "block w-full py-3 px-3 text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                        }
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                  {/* If logged out show Sign In button here (mobile) */}
                  {!user && (
                    <Link
                      to="/signin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center w-full px-4 py-2 rounded-md bg-indigo-600 text-white font-medium"
                    >
                      Sign In
                    </Link>
                  )}

                  {/* If logged in show small user links */}
                  {user && (
                    <div className="flex flex-col gap-2">
                      <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10 rounded"
                      >
                        <FaRegCircleUser /> Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10 rounded"
                      >
                        <RiDashboardHorizontalLine /> Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-white/10 rounded"
                      >
                        <IoLogOutOutline /> Logout
                      </button>
                    </div>
                  )}

                  {/* Theme toggle + small footer */}
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <ThemeToggle />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Foliora
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
