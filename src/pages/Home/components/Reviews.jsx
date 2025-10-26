import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "react-router";

export default function Reviews({ reviews = [] }) {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Latest Reviews</h2>
          <p className="text-gray-600 dark:text-gray-400">See what our community is saying</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 "
            >
              <div className="flex items-center gap-3 mb-4">
                <img src={review.reviewerPhoto || "https://i.ibb.co/4pDNDk1/avatar.png"} alt={review.reviewerName} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{review.reviewerName}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < (review.rating || 0) ? "text-yellow-500 fill-current" : "text-gray-300 dark:text-gray-600"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">{review.comment}</p>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">Review for: <Link className="underline" to={`/book/${review.bookId}`}>{review.bookTitle}</Link> </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
