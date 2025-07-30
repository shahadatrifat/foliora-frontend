import React, { useState } from "react";
import { MdOutlineRateReview } from "react-icons/md";
import toast from "react-hot-toast";

const ReviewCard = ({ onSubmit, existingReview = {} }) => {
  const [rating, setRating] = useState(existingReview.rating || 0);
  const [message, setMessage] = useState(existingReview.message || "");
  const [error, setError] = useState("");

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  }; 

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (!rating || !message.trim()) {
      setError("Please provide both a rating and a message.");
      return;
    }
    setError(""); // Clear previous error

    const review = {
      rating,
      message: message.trim(),
      date: new Date(),
    };

    // Callback to parent (optional)
    if (onSubmit) {
      onSubmit(review);
    }

    toast.success("Review submitted!");
    setRating(0);
    setMessage("");
  };

  return (
    <div className="flex flex-col mt-6 max-w-md mx-auto items-center p-8 border-gray-200 border-opacity-60 dark:border-gray-700 border-2 rounded-xl lg:p-12 dark:bg-gray-900 dark:text-gray-800">
      <div className="flex flex-col items-center w-full">
        <h2 className="text-3xl font-semibold text-center text-primary">
          Review this book
        </h2>
        <div className="flex flex-col items-center py-6 space-y-3">
          <span className="text-center text-gray-500 text-muted-foreground dark:text-gray-400 text-sm">
            How would you rate this book?
          </span>
          <div className="flex space-x-3">
            <div className="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name="rating"
                  value={star}
                  checked={rating === star}
                  onChange={handleRatingChange}
                  className="mask mask-star-2 bg-orange-400"
                  aria-label={`${star} star`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <textarea
            rows="3"
            placeholder="Message..."
            value={message}
            onChange={handleMessageChange}
            className="p-4 text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 sm:text-md focus:ring-primary focus:border-primary dark:focus:ring-primary dark:focus:border-primary resize-none"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full mt-3  text-gray-200 bg-primary hover:bg-primary/80 focus:ring-4 focus:outline-none focus:ring-primary/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary/80 dark:focus:ring-primary/80 flex items-center justify-center gap-2"
          >
            <MdOutlineRateReview size={20} />
            Submit
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default ReviewCard;
