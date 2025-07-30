import React from "react";
import { MdOutlineRateReview } from "react-icons/md";
import { User } from "lucide-react";
import { FaStar } from "react-icons/fa";

const PostedReviewCard = ({ review }) => {
  const { name, photo, rating, comment, date } = review;

  // Format the date
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200  mb-4"> Posted Reviews</h2>
        <div className="container  w-full max-w-lg p-1 space-y-1  bg-gray-50 dark:bg-gray-700 rounded-xl ">
      {/* Reviewer Header */}
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center space-x-4">
          {/* Reviewer Profile Picture */}
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
            <img
              src={photo || "https://source.unsplash.com/100x100/?portrait"}
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

      {/* Footer with icon */}
      <div className="flex justify-end p-3 text-gray-500 dark:text-gray-400">
        <MdOutlineRateReview size={20} className="inline-block mr-2" />
        <span className="text-sm">Rated</span>
      </div>
    </div>
    <span className="bloc max-w-lg mt-2 space-y-1 rounded-xl block w-full h-0.5 bg-gray-200 dark:bg-gray-700"></span>
    </div>
  );
};

export default PostedReviewCard;
