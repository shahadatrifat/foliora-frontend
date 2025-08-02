import React, { useContext } from "react";
import { MdOutlineRateReview } from "react-icons/md";
import { Trash, User } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PostedReviewCard = ({ review, bookId, setReviews }) => {
  const { name, photo, rating, comment, date, email } = review;
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  // Format the date
  const formattedDate = new Date(date).toLocaleDateString();

  // Handle Delete
  const handleDelete = async () => {
    if (user.email !== review.email) {
      toast.error("You can only delete your own reviews.");
      return;
    }

    try {
      const res = await axiosSecure.delete(`/api/books/${bookId}/review`, {
        data: { email },
      });
      if (res.status === 200) {
        toast.success("Review deleted successfully");
      } else {
        toast.error("Failed to delete review");
      }
    } catch (err) {
      toast.error("Refresh the page to see the changes.");
    }
  };

  return (
    <div className="container  w-full mb-2  mx-auto p-1 space-y-1 bg-gray-50 dark:bg-gray-700 rounded-xl">
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center space-x-4">
          {/* Reviewer Profile Picture */}
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
            <img
              src={photo || <User size={30}></User>} // Default fallback image
              alt="Reviewer"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
              {name}
            </h4>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formattedDate}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* Star Rating */}
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              size={20}
              className={`${
                index < rating
                  ? "text-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Review Content */}
      <div className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-300">
        <p>{comment}</p>
      </div>

      {/* Delete Button for Logged In User */}
      <div className="flex justify-between ">
        <div>
          {user?.email === review?.email && (
            <div className="flex justify-end p-3 text-gray-500 dark:text-gray-400">
              <button onClick={handleDelete} className="text-sm">
                <Trash color="red" size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Footer with icon */}
        <div className="flex justify-end p-3 text-gray-500 dark:text-gray-400">
          <MdOutlineRateReview size={20} className="inline-block mr-2" />
          <span className="text-sm">Rated</span>
        </div>
      </div>
    </div>
  );
};

export default PostedReviewCard;
