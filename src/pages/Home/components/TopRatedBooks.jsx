import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "react-router";

export default function TopRatedBooks({ books = [] }) {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Top Rated Books</h2>
            <p className="text-gray-600 dark:text-gray-400">Discover our community's favorites</p>
          </div>
          <Star className="w-12 h-12 text-yellow-500 fill-current" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {books.map((book, index) => (
            <motion.div
              key={book._id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="group cursor-pointer"
            >
              <Link to={`/book/${book._id}`}><div className="relative overflow-hidden rounded-lg shadow-sm  transition-shadow">
                <img src={book.coverImage || "https://via.placeholder.com/200x300"} alt={book.title} className="w-full h-78 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-white">
                    <p className="font-semibold line-clamp-2 mb-1">{book.title}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="text-sm">{(book.averageRating ?? 0).toFixed?.(1) || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div></Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
