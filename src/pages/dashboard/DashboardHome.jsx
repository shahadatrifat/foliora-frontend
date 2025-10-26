import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";
import DashboardStats from "./DashboardStats";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { BookOpen, Star, TrendingUp, CheckCircle } from "lucide-react";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  
  const [activeTab, setActiveTab] = useState(0);
  const [categories, setCategories] = useState([
    { name: "Reading", posts: [] },
    { name: "Read", posts: [] },
    { name: "Want to read", posts: [] },
  ]);
  
  // Add state for user stats from API
  const [stats, setStats] = useState({
    uploadedBooks: 0,
    reviewsGiven: 0,
    currentlyReading: 0,
    completedBooks: 0,
  });
  
  const [loading, setLoading] = useState(true);

  // Fetch books by reading status
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/api/books?email=${user?.email}`)
      .then((res) => {
        const books = res.data;
        const categorizedBooks = {
          Reading: [],
          Read: [],
          "Want-to-Read": [],
        };

        books.books.forEach((book) => {
          const status =
            book.readingStatus?.find((status) => status.email === user.email)
              ?.status || "Not Started";
          
          if (categorizedBooks[status]) {
            categorizedBooks[status].push(book);
          }
        });

        setCategories([
          { name: "Reading", posts: categorizedBooks.Reading },
          { name: "Read", posts: categorizedBooks.Read },
          { name: "Want to read", posts: categorizedBooks["Want-to-Read"] },
        ]);
      })
      .catch((err) => console.error("Error fetching books:", err))
      .finally(() => setLoading(false));
  }, [user]);

  // NEW: Fetch user statistics from API
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/api/user/stats?email=${user.email}`)
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => console.error("Error fetching stats:", err));
  }, [user]);

  const ReadingCount = categories[0].posts?.length;
  const ReadCount = categories[1].posts?.length;
  const WantToReadCount = categories[2].posts?.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6"
    >
      {/* Welcome Header */}
      <h2 className="text-2xl text-gray-700 dark:text-gray-200 font-semibold mb-8">
        Welcome back,{" "}
        <span className="font-serif text-indigo-600 dark:text-indigo-400 text-3xl">
          {user?.displayName}
        </span>
      </h2>

      {/* NEW: Stats Cards from API */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow"
        >
          <BookOpen className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-3xl font-bold">{stats.uploadedBooks}</p>
          <p className="text-sm opacity-90">Books Uploaded</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl p-6 text-white shadow"
        >
          <Star className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-3xl font-bold">{stats.reviewsGiven}</p>
          <p className="text-sm opacity-90">Reviews Given</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white shadow"
        >
          <TrendingUp className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-3xl font-bold">{stats.currentlyReading}</p>
          <p className="text-sm opacity-90">Currently Reading</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow"
        >
          <CheckCircle className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-3xl font-bold">{stats.completedBooks}</p>
          <p className="text-sm opacity-90">Completed Books</p>
        </motion.div>
      </div>

      {/* Reading Status Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          My Reading List
        </h3>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div>
            {/* Tab Buttons */}
            <div className="flex gap-4 flex-wrap border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
              {categories.map((category, index) => (
                <button
                  key={category.name}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2 text-sm font-semibold transition-all ${
                    activeTab === index
                      ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600"
                      : "text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div>
              {categories[activeTab].posts.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No books in this category yet</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {categories[activeTab].posts.map((post) => (
                    <motion.li
                      key={post._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="relative rounded-lg p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all cursor-pointer"
                    >
                      <Link
                        to={`/book/${post._id}`}
                        className="font-semibold text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                      <ul className="flex gap-3 text-gray-600 dark:text-gray-400 text-xs mt-2">
                        <li>{post.publishingYear}</li>
                        <li>•</li>
                        <li>{post.reviews?.length || 0} reviews</li>
                        <li>•</li>
                        <li>{post.upvotes?.length || 0} upvotes</li>
                      </ul>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Original Dashboard Stats Component */}
      <div className="mt-8">
        <DashboardStats
          ReadingCount={ReadingCount}
          ReadCount={ReadCount}
          WantToReadCount={WantToReadCount}
        />
      </div>
    </motion.div>
  );
};

export default DashboardHome;