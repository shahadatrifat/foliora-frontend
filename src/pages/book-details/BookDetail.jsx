import { Link, useLoaderData } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  BookOpen,
  User,
  ChevronLeft,
  ArrowUp,
  MessageSquareText,
  Star,
  BookmarkPlus,
  Share2,
  Eye,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/loader/Loader";
import ReviewCard from "./ReviewCard";
import PostedReviewCard from "./PostedReviewCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookDetails = () => {
  const book = useLoaderData();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [upvoteCount, setUpvoteCount] = useState(book.upvotes?.length || 0);
  const [hasUpvoted, setHasUpvoted] = useState(() => {
    return book.upvotes?.some((up) => up.email === user?.email);
  });
  const [readingStatus, setReadingStatus] = useState(
    book.readingStatus?.find((status) => status.email === user?.email)
      ?.status || "Not Started"
  );
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    setUpvoteCount(book.upvotes?.length || 0);
    setHasUpvoted(book.upvotes?.some((up) => up.email === user?.email));
    setReadingStatus(
      book.readingStatus?.find((status) => status.email === user?.email)
        ?.status || "Not Started"
    );
  }, [book, user]);

  const {
    title,
    author,
    genre,
    category,
    description,
    coverImage,
    publishingYear,
    pageCount,
    uploader,
    UploadDate,
    reviews,
  } = book;
  const bookId = String(book._id);
  const uploaderInfo = uploader?.[0];

  // Calculate average rating
  const averageRating = reviews?.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const handleUpvote = async () => {
    if (!user) {
      return toast.error("You must be logged in to upvote a book");
    }
    if (uploaderInfo && uploaderInfo.uploaderEmail === user.email) {
      return toast.error("You can't upvote your own book");
    }
    if (hasUpvoted) {
      return toast.error("You have already upvoted this book");
    }

    try {
      const res = await axiosSecure.patch(`/api/books/${book._id}/upvote`, {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      });
      if (res.status === 200) {
        if (res.data && Array.isArray(res.data.upvotes)) {
          setUpvoteCount(res.data.upvotes.length);
          setHasUpvoted(true);
          toast.success("Upvoted successfully!");
        } else {
          setUpvoteCount((prev) => prev + 1);
          setHasUpvoted(true);
          toast.success("Upvoted successfully");
        }
      }
    } catch (err) {
      toast.error("Error upvoting book");
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await axiosSecure.patch(`/api/books/${book._id}/reading-status`, {
        email: user.email,
        readingStatus: newStatus,
      });
      setReadingStatus(newStatus);
      toast.success("Reading status updated");
    } catch (err) {
      toast.error("Error updating reading status");
    }
  };

  const handleReviewSubmit = async (review) => {
    try {
      const res = await axiosSecure.post(`/api/books/${book._id}/review`, {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        rating: review.rating,
        comment: review.message,
        date: new Date().toISOString(),
      });
      if (res.status === 200) {
        toast.success("Review submitted successfully!");
        window.location.reload();
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Error submitting review");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out "${title}" by ${author}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
      setShowShareModal(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Reading":
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
      case "Read":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "Want-to-Read":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
    }
  };

  if (!book) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Library
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Book Cover & Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-6 space-y-6">
              {/* Book Cover */}
              <div className="relative group">
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  src={coverImage}
                  alt={title}
                  className="w-full rounded-2xl "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">
                      {pageCount} pages
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating Overview */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 ">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-6 h-6 text-yellow-500 fill-current" />
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {averageRating}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {reviews?.length || 0} reviews
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-500 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(averageRating)
                              ? "fill-current"
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress Bars for Rating Distribution */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews?.filter((r) => r.rating === star).length || 0;
                    const percentage = reviews?.length ? (count / reviews.length) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-6">
                          {star}★
                        </span>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-8">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUpvote}
                  disabled={hasUpvoted}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    hasUpvoted
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  <ArrowUp className="w-5 h-5" />
                  {hasUpvoted ? "Upvoted" : "Upvote"} ({upvoteCount})
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  Share Book
                </motion.button>
              </div>

              {/* Reading Status */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 ">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Reading Status
                </label>
                <select
                  value={readingStatus}
                  onChange={handleStatusChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 font-medium transition-all cursor-pointer ${getStatusColor(
                    readingStatus
                  )}`}
                >
                  <option value="Want-to-Read">Want to Read</option>
                  <option value="Reading">Currently Reading</option>
                  <option value="Read">Finished</option>
                  <option value="Not Started">Not Started</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Book Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Book Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 "
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {title}
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                by {author}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <CalendarDays className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {publishingYear}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <BookOpen className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {pageCount} pages
                  </span>
                </div>
              </div>

              {/* Genres & Categories */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {genre?.map((g, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category?.map((c, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 "
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                About this book
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {description}
              </p>
            </motion.div>

            {/* Publisher Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Published by
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500 flex-shrink-0">
                  {uploaderInfo?.uploaderPhoto ? (
                    <img
                      src={uploaderInfo.uploaderPhoto}
                      alt={uploaderInfo.uploaderName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <User className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-lg">
                    {uploaderInfo?.uploaderName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {uploaderInfo?.uploaderEmail}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    Published {new Date(UploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Reviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <MessageSquareText className="w-6 h-6" />
                Reviews ({reviews?.length || 0})
              </h2>

              {/* Add Review */}
              <ReviewCard onSubmit={handleReviewSubmit} />

              {/* Existing Reviews */}
              <div className="space-y-4">
                {reviews?.length > 0 ? (
                  reviews.map((review, index) => (
                    <PostedReviewCard
                      key={index}
                      review={review}
                      bookId={bookId}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                    <MessageSquareText className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 dark:text-gray-400">
                      No reviews yet. Be the first to review!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;