import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    coverImage: "",
    genre: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: Add uploader info here
    const dataToSend = {
      ...formData,
      uploader: {
        name: "Anonymous", // Replace with user display name from context
        email: "user@example.com", // Replace with auth user email
      },
      upvotes: [],
      reviews: [],
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/books`, dataToSend);
      if (res.data.insertedId || res.data.acknowledged) {
        toast.success("Book added successfully!");
        setFormData({
          title: "",
          author: "",
          coverImage: "",
          genre: "",
          category: "",
          description: "",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] dark:bg-[#0c111c] px-4 md:px-16 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-[#111827] p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          <UploadCloud className="inline w-7 h-7 mb-1" /> Add a New Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl focus:outline-none"
            required
          />

          {/* Author */}
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl focus:outline-none"
            required
          />

          {/* Cover Image */}
          <input
            type="text"
            name="coverImage"
            placeholder="Cover Image URL"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl focus:outline-none"
            required
          />

          {/* Genre */}
          <input
            type="text"
            name="genre"
            placeholder="Genre (e.g., Fantasy, Horror)"
            value={formData.genre}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl focus:outline-none"
            required
          />

          {/* Category */}
          <input
            type="text"
            name="category"
            placeholder="Category (e.g., Fiction, Non-Fiction)"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl focus:outline-none"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Short Description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl focus:outline-none resize-none"
            required
          ></textarea>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition duration-300"
          >
            Submit Book
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddBook;
