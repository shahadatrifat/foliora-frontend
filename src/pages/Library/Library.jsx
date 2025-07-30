import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SkeletonCard from "../../components/loader/skeleton/SkeletonCard";
import { motion } from "framer-motion";
import { Heart, MessageSquare, User, ArrowRight } from "lucide-react";
import { Link } from "react-router"; // Corrected import for Link

const Library = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/books`)
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch books");
        setLoading(false);
      });
  }, []);

  const genres = ["All", ...new Set(books.flatMap((book) => book.genre || []))];

  const filteredBooks =
    selectedGenre === "All"
      ? books
      : books.filter((book) => book.genre?.includes(selectedGenre));

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-10 md:px-16 bg-[#f3f4f6] dark:bg-[#0c111c]">
        <h1 className="text-4xl font-bold mb-10 text-center text-primary tracking-tight">
          📚 Explore the Library
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 md:px-16 bg-[#f3f4f6] dark:bg-[#0c111c] transition-colors duration-300">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="text-4xl font-bold mb-10 text-center text-primary tracking-tight"
      >
        📚 Explore the Library
      </motion.h1>

      {/* Genre Dropdown for Mobile (visible on smaller screens, hidden on md and up) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="block md:hidden flex justify-center mb-6"
      >
        <label
          htmlFor="genre-select"
          className="mr-2 flex items-center text-gray-800 dark:text-gray-200"
        >
          Filter by Genre:
        </label>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Genre Buttons for Desktop (hidden on smaller screens, visible on md and up) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="hidden md:flex flex-wrap gap-3 justify-center mb-10"
      >
        {genres.map((genre, index) => (
          <button
            key={index}
            onClick={() => setSelectedGenre(genre)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur ${
              selectedGenre === genre
                ? "bg-primary text-white shadow-lg"
                : "bg-white/40 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-700"
            }`}
          >
            {genre}
          </button>
        ))}
      </motion.div>

      {/* Book Cards Grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
        style={{ perspective: 1200 }}
      >
        {filteredBooks.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
            No books found in this genre.
          </p>
        ) : (
          filteredBooks.map((book, index) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              style={{ transformStyle: "preserve-3d" }}
              className="bg-white/60 dark:bg-[#111827]/60 backdrop-blur rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl p-4 relative flex flex-col justify-between"
            >
              {/* === Group 1: Image, Title, and Author === */}
              <div className="flex flex-col">
                {/* Book cover */}
                <div className="w-full aspect-[2/3] overflow-hidden rounded-md mb-3 sm:mb-4">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                {/* Book Info (Title & Author) */}
                <div>
                  <Link to={`/book/${book._id}`}><h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-1 hover:underline line-clamp-2">
                    {book.title}
                  </h2></Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {book.author}
                  </p>
                </div>
              </div>

              {/* === Group 2: Genres, Uploader, Likes/Reviews, and Details Button === */}
              <div className="mt-4 flex flex-col"> {/* Added mt-4 for spacing from Group 1 */}
                {/* Genres Section */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {Array.isArray(book.genre) ? (
                    book.genre.map((g, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full whitespace-nowrap"
                      >
                        {g}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                      {book.genre}
                    </span>
                  )}
                </div>

                {/* Uploader Info (if exists) */}
                {book.uploader?.name && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <User className="w-4 h-4" />
                    <span>{book.uploader.name}</span>
                  </div>
                )}

                {/* Likes/Reviews and View Details Button - ON THE SAME LINE */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mt-auto pt-2">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>{book.upvotes?.length || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                      <span>{book.reviews?.length || 0}</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link to={`/book/${book._id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="group inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all duration-300"
                    >
                       Details
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-0.5 sm:group-hover:translate-x-1" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Library;
