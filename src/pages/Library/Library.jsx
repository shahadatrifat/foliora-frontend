import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SkeletonCard from "../../components/loader/skeleton/SkeletonCard";
import { motion } from "framer-motion";
import { Heart, MessageSquare, User } from "lucide-react"; // Import User icon if you're using it

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

      {/* Genre Dropdown for Mobile */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="block md:hidden flex justify-center mb-6"
      >
        <label htmlFor="genre-select" className="mr-2 flex items-center text-gray-800 dark:text-gray-200">
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

      {/* Genre Buttons for Desktop */}
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

      {/* Book Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-8"
        style={{ perspective: 1200 }}
      >
        {filteredBooks.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
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
              className="bg-white/60 dark:bg-[#111827]/60 backdrop-blur rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl p-4 relative"
            >
              {/* Book cover */}
              <div className="w-full aspect-[2/3] overflow-hidden rounded-md mb-4">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="md:w-full md:h-full w-96 h-full  mx-auto object-cover rounded-md"
                />
              </div>

              {/* Book Info */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 line-clamp-2">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {book.author}
                </p>

                {/* --- START OF FIX --- */}
                {/* New flex container for genres AND likes/reviews */}
                <div className="flex items-center justify-between mt-2"> {/* Added mt-2 for spacing from author */}
                    {/* Genres Section */}
                    <div className="flex flex-wrap gap-1"> {/* Removed mt-2, it's now handled by parent */}
                        {book.genre?.map((g, i) => (
                            <span
                                key={i}
                                className="text-xs bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                            >
                                {g}
                            </span>
                        ))}
                    </div>

                    {/* Likes/Reviews Section */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400"> {/* Adjusted gap to 4 */}
                        <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4 text-rose-500" />
                            <span>{book.upvotes?.length || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4 text-blue-500" />
                            <span>{book.reviews?.length || 0}</span>
                        </div>
                    </div>
                </div>

                {/* Uploader Info (if exists) - placed below genres/likes if it should be on its own line */}
                {book.uploader?.name && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2"> {/* Added mt-2 for spacing */}
                        <User className="w-4 h-4" />
                        <span>{book.uploader.name}</span>
                    </div>
                )}
                {/* --- END OF FIX --- */}

                {/* Removed the empty div with mt-4 here */}
                {/* <div className="mt-4"></div> */}

              </div> {/* End of Book Info div */}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Library;