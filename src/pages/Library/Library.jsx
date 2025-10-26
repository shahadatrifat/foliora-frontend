import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  BookOpen,
  Star,
  ThumbsUp,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

export default function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [genres, setGenres] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, selectedGenre, sortBy, page]);

  const fetchGenres = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/genres`);
      setGenres(data);
    } catch (error) {
      console.error("Failed to fetch genres:", error);
    }
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/books`, {
        params: {
          search: searchTerm,
          genre: selectedGenre,
          sort: sortBy,
          page,
          limit: 12,
        },
      });
      setBooks(data.books || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGenre("all");
    setSortBy("newest");
    setPage(1);
  };

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "title-asc", label: "Title (A-Z)" },
    { value: "title-desc", label: "Title (Z-A)" },
    { value: "upvotes", label: "Most Upvoted" },
    { value: "rating", label: "Highest Rated" },
  ];

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-12">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-10 text-center sm:text-left"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-1">
            Discover Books
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Explore our collection of amazing books
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl  p-3 sm:p-5 mb-6 sm:mb-10">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, author, or genre..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="appearance-none w-full sm:w-auto px-3 sm:px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 cursor-pointer text-sm sm:text-base"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 mb-3 sm:mb-4 justify-center sm:justify-start">
                  <button
                    onClick={() => handleGenreChange("all")}
                    className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedGenre === "all"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    All Genres
                  </button>
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => handleGenreChange(genre)}
                      className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedGenre === genre
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>

                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 sm:gap-2 text-sm text-red-600 hover:text-red-700 justify-center sm:justify-start"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedGenre !== "all" || sortBy !== "newest") && (
          <div className="flex flex-wrap gap-2 mb-6 justify-center sm:justify-start">
            {searchTerm && (
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm">
                Search: {searchTerm}
              </span>
            )}
            {selectedGenre !== "all" && (
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                Genre: {selectedGenre}
              </span>
            )}
            {sortBy !== "newest" && (
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                Sort: {sortOptions.find((o) => o.value === sortBy)?.label}
              </span>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 animate-pulse"
              >
                <div className="bg-gray-300 dark:bg-gray-700 h-52 sm:h-64 rounded-lg mb-4"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No books found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          <>
            {/* Books Grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {books.map((book, index) => (
                <motion.div
                  key={book._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-lg  overflow-hidden shadow-sm transition-shadow cursor-pointer group"
                >
                  <div className="relative overflow-hidden">
                    <Link to={`/book/${book._id}`}>
                      <img
                        src={
                          book.coverImage ||
                          "https://via.placeholder.com/300x400?text=No+Cover"
                        }
                        alt={book.title}
                        className="w-full h-95 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    <div className="absolute top-2 right-2 flex gap-1 sm:gap-2">
                      {book.upvotes?.length > 0 && (
                        <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {book.upvotes.length}
                        </span>
                      )}
                      {book.reviews?.length > 0 && (
                        <span className="bg-yellow-500/90 backdrop-blur px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 text-white">
                          <Star className="w-3 h-3 fill-current" />
                          {calculateAverageRating(book.reviews)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 hover:underline dark:text-white mb-1 line-clamp-1">
                      <Link to={`/book/${book._id}`}>{book.title}</Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                      by {book.author}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded">
                        {Array.isArray(book.genre)
                          ? book.genre.join(", ")
                          : book.genre}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 text-sm sm:text-base"
                >
                  <ArrowLeft></ArrowLeft>
                </button>
                <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 text-sm sm:text-base"
                >
                  <ArrowRight></ArrowRight>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
