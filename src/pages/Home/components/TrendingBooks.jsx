import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router";

export default function TrendingBooks({ books = [] }) {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Trending Now</h2>
            <p className="text-gray-600 dark:text-gray-400">Most upvoted by our community</p>
          </div>
          <TrendingUp className="w-12 h-12 text-indigo-600" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, index) => (
            <Link to={`/book/${book._id}`}><motion.div
              key={book._id || index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6  transition-shadow flex gap-4"
            >
              <img src={book.coverImage || "https://via.placeholder.com/80x120"} alt={book.title} className="w-20 h-28 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{book.author}</p>
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs px-2 py-1 rounded">
                    {book.upvotes?.length || 0} upvotes
                  </span>
                </div>
              </div>
            </motion.div></Link>
          ))}
        </div>
      </div>
    </section>
  );
}
