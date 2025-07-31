import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import { FiThumbsUp, FiMessageCircle } from 'react-icons/fi';
import Loader from "../../../components/loader/Loader";
import { motion } from "framer-motion";

const UpvotedFeatureCard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/books`
        );
        // Slice the first 6 books and sort by upvotes
        const topBooks = response.data.slice(0, 5);
        const sortedBooks = topBooks.sort(
          (a, b) => b.upvotes.length - a.upvotes.length
        );
        setBooks(sortedBooks);
      } catch (err) {
        setError("Error fetching books. Please try again later.");
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <Loader></Loader>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
     viewport={{ once: true, amount: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
    className="max-w-4xl  mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg ">
      <h2 className="text-3xl md:text-4xl font-semibold font-[Playfair] text-center mb-6 text-primary mt-8">
        Top 5 Upvoted Books
      </h2>
      <ul className="space-y-4">
        {books.map((book) => (
          <li
            key={book._id}
            className="flex  mb-8 flex-col sm:flex-row gap-4 p-4 mb-6 border-b dark:border-gray-700"
          >
            <div className="w-full sm:w-1/3">
              {/* Book Cover Image */}
              <Link to={`/book/${book._id}`} className="">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300 rounded-md"
                  style={{ aspectRatio: "2 / 3" }}
                />
              </Link>
            </div>
            <div className="flex-1 ">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                <Link className="hover:underline" to={`/book/${book._id}`}>
                  {book.title}
                </Link>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {book.author}
              </p>
              <p className="text-base text-gray-700 dark:text-gray-300">
                {book.description.length > 100
                  ? `${book.description.slice(0, 100)}...`
                  : book.description}
              </p>
              <div className="mt-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <FiThumbsUp
                      className="text-gray-600 dark:text-gray-300"
                      size={16}
                    />
                    <span>{book.upvotes.length} upvotes</span>
                  </span>
                  <span className="flex mt-0.5 items-center gap-1">
                    <FiMessageCircle
                      className="text-gray-600 dark:text-gray-300"
                      size={16}
                    />
                    <span className="">{book.reviews.length} reviews</span>
                  </span>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default UpvotedFeatureCard;
