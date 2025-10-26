import { useContext } from "react";
import { Trash2, User, Star } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const PostedReviewCard = ({ review, bookId }) => {
  const { name, photo, rating, comment, date, email } = review;
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleDelete = async () => {
    if (user.email !== review.email) {
      toast.error("You can only delete your own reviews.");
      return;
    }

    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await axiosSecure.delete(`/api/books/${bookId}/review`, {
        data: { email },
      });
      if (res.status === 200) {
        toast.success("Review deleted successfully");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error("Failed to delete review");
      }
    } catch (err) {
      toast.error("Error deleting review");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 "
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200 dark:border-gray-700">
            {photo ? (
              <img
                src={photo}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {name}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formattedDate}
            </p>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < rating
                      ? "text-yellow-500 fill-current"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2">
                {rating}.0
              </span>
            </div>
          </div>
        </div>

        {user?.email === email && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title="Delete review"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {comment}
      </p>
    </motion.div>
  );
};

export default PostedReviewCard;