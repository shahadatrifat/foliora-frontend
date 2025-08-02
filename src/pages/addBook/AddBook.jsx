import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Tag, User, Upload, ImagePlus } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddBook = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [genreInput, setGenreInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [showModal, setShowModal] = useState(false); // State for showing modal

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    coverImage: "",
    publishingYear: "",
    description: "",
    pageCount: "",
  });

  const genreArray = genreInput
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item);

  const categoryArray = categoryInput
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "genre") {
      setGenreInput(value);
    } else if (name === "category") {
      setCategoryInput(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user || !user.email) {
        toast.error("You must be logged in to upload a book.");
        setLoading(false);
        return;
      }

      if (
        !formData.title ||
        !formData.author ||
        !formData.coverImage ||
        !genreArray.length ||
        !categoryArray.length ||
        !formData.publishingYear ||
        !formData.pageCount ||
        !formData.description
      ) {
        toast.error("All fields are required.");
        setLoading(false);
        return;
      }

      const dataToSend = {
        ...formData,
        genre: genreArray,
        category: categoryArray,
        uploader: [
          {
            uploaderEmail: user.email,
            uploaderName: user.displayName,
            uploaderPhoto: user.photoURL,
          },
        ],
        UploadDate: new Date().toISOString(),
        upvotes: [],
        reviews: [],
        readingStatus: [
          {
            email: user.email,
            status: "Not Started",
          },
        ],
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/books`,
        dataToSend
      );
      toast.success("Book added successfully!");
      console.log("Book added:", response.data);
      setFormData({
        title: "",
        author: "",
        coverImage: "",
        publishingYear: "",
        description: "",
        pageCount: "",
      });
      setGenreInput("");
      setCategoryInput("");
    } catch (error) {
      console.error("Failed to add book:", error);
      if (error.response?.data?.message) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("Failed to add book. Please try again.");
      }
    } finally {
      setLoading(false);
      setShowModal(false); 
    }
  };

  // Handle modal confirm
  const handleModalConfirm = () => {
    setShowModal(true); // Show the modal
  };

  // Handle modal cancel
  const handleModalCancel = () => {
    setShowModal(false); // Close the modal without submitting
  };

  return (
    <div className="min-h-screen px-4 py-10 md:px-20 bg-[#f8f9fb] dark:bg-[#0c111c]">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-semibold text-center mb-10 text-primary"
      >
        ✨ Add a New Book
      </motion.h1>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white dark:bg-[#111827] rounded-2xl shadow-lg p-8 space-y-6"
      >
        {/* Title */}
        <div>
          <label className="flex mb-1 items-center gap-2 font-semibold text-gray-700 dark:text-white">
            <BookOpen size={18} /> Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Book title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-900 border dark:border-gray-700 border-gray-200 text-gray-800 dark:text-white rounded-xl focus:outline-none"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="flex mb-1 items-center gap-2 font-semibold text-gray-700 dark:text-white">
            <User size={18} /> Author
          </label>
          <input
            type="text"
            name="author"
            placeholder="Author name"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl focus:outline-none"
            required
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="flex mb-1 items-center gap-2 font-semibold text-gray-700 dark:text-white">
            <ImagePlus size={18} /> Cover Image URL
          </label>
          <input
            type="url"
            name="coverImage"
            placeholder="https://example.com/book.jpg"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full px-4 py-3 border-gray-200 bg-gray-100 border dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl focus:outline-none"
            required
          />
        </div>

        {/* Genre */}
        <div>
          <label className="flex mb-1 items-center gap-2 font-semibold text-gray-700 dark:text-white">
            <Tag size={18} /> Genre (comma-separated)
          </label>
          <input
            type="text"
            name="genre"
            placeholder="Fiction, Fantasy, Thriller"
            value={genreInput}
            onChange={handleChange}
            className="w-full px-4 py-3 border-gray-200 bg-gray-100 border dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl focus:outline-none"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="flex mb-1 items-center gap-2 font-semibold text-gray-700 dark:text-white">
            <Tag size={18} /> Category (comma-separated)
          </label>
          <input
            type="text"
            name="category"
            placeholder="Classic, Bestseller"
            value={categoryInput}
            onChange={handleChange}
            className="w-full px-4 py-3 border-gray-200 bg-gray-100 border dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl focus:outline-none"
            required
          />
        </div>

        {/* Publishing Year */}
        <div>
          <label className="flex mb-1 items-center gap-2 font-semibold text-gray-700 dark:text-white">
            <Calendar size={18} /> Publishing Year
          </label>
          <input
            type="number"
            name="publishingYear"
            placeholder="e.g., 2023"
            min="1500"
            max={new Date().getFullYear()}
            value={formData.publishingYear}
            onChange={handleChange}
            className="w-full px-4 py-3 border-gray-200 bg-gray-100 border dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl focus:outline-none"
            required
          />
        </div>
        {/* Page Count */}
        <div>
          <label className="flex mb-1 items-center gap-2 font-semibold text-gray-700 dark:text-white">
            📄 Page Count
          </label>
          <input
            type="number"
            name="pageCount"
            placeholder="e.g., 300"
            min="1"
            value={formData.pageCount}
            onChange={handleChange}
            className="w-full px-4 py-3 border-gray-200 bg-gray-100 border dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl focus:outline-none"
            required
          />
        </div>
        {/* Description */}
        <div>
          <label className="flex items-center gap-2 mb-1 font-semibold text-gray-700 dark:text-white">
            📝 Description
          </label>
          <textarea
            name="description"
            rows="4"
            placeholder="Short description of the book..."
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border-gray-200 bg-gray-100 border dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl focus:outline-none"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={handleModalConfirm} 
            disabled={loading}
            className="px-6 py-3 rounded-xl border-gray-200 text-white border dark:border-gray-700 font-semibold bg-primary hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? (
              "Adding Book..."
            ) : (
              <>
                <Upload className="inline-block mr-2" />
                Post The Book
              </>
            )}
          </button>
        </div>
      </motion.form>
      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[90%] max-w-md shadow-lg">
            <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-4">
              Confirm Your Book Details
            </h3>
            <div className="space-y-4">
              <p><strong>Title:</strong> {formData.title}</p>
              <p><strong>Author:</strong> {formData.author}</p>
              <p><strong>Genre:</strong> {genreArray.join(", ")}</p>
              <p><strong>Category:</strong> {categoryArray.join(", ")}</p>
              <p><strong>Year:</strong> {formData.publishingYear}</p>
              <p><strong>Pages:</strong> {formData.pageCount}</p>
              <p><strong>Description:</strong> {formData.description}</p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleModalCancel}
                className="px-6 py-3 bg-gray-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-primary text-white rounded-xl"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBook;
