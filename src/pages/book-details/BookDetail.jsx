import { Link, useLoaderData } from "react-router";
import { motion } from "framer-motion";
import {
  CalendarDays,
  BookOpenText,
  UserRoundSearch,
  User,
  ChevronLeft,
  Heart,
  MessageSquareText,
  ArrowUp,
} from "lucide-react";
import toast from "react-hot-toast";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import ReviewCard from "./ReviewCard"; // Import your ReviewCard component
import PostedReviewCard from "./PostedReviewCard";

const BookDetails = () => {
  const book = useLoaderData();
  const { user } = useContext(AuthContext);

  // Initialize state based on the initial book data
  const [upvoteCount, setUpvoteCount] = useState(book.upvotes?.length || 0);
  const [hasUpvoted, setHasUpvoted] = useState(() => {
    return book.upvotes?.some((up) => up.email === user?.email);
  });
  const [readingStatus, setReadingStatus] = useState(
    book.readingStatus?.find((status) => status.email === user?.email)
      ?.status || "Not Started"
  );

  // Effect to re-sync state if the book data changes (e.g., from re-fetching via loader)
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

  const uploaderInfo = uploader?.[0]; // Access uploaderInfo safely

  const handleUpvote = async () => {
    // Frontend pre-checks
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
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/books/${book._id}/upvote`,
        {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        }
      );

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
      } else {
        toast.error(
          `Upvote failed: Server responded with status ${res.status}`
        );
      }
    } catch (err) {
      toast.error("Error upvoting book");
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/books/${book._id}/reading-status`,
        {
          email: user.email,
          readingStatus: newStatus,
        }
      );
      setReadingStatus(newStatus);
      toast.success("Reading status updated");
    } catch (err) {
      toast.error("Error updating reading status");
    }
  };

  const handleReviewSubmit = async (review) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/books/${book._id}/review`,
        {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          rating: review.rating,
          comment: review.message,
          date: new Date().toISOString(),
        }
      );
      if (res.status === 200) {
        toast.success("Review submitted successfully!");
      }
    } catch (err) {
      toast.error("Error submitting review");
    }
  };

  const formattedUploadDate = UploadDate
    ? new Date(UploadDate).toLocaleDateString()
    : "N/A";

  // Show loader if book data is loading
  if (!book) {
    return <Loader />; 
  }

  return (
    <div className="max-w-6xl py-10 px-4 md:py-16 mx-auto">
      <button
        className="flex items-center hover:underline text-sm font-semibold text-primary"
        onClick={() => window.history.back()}
      >
        <ChevronLeft /> back
      </button>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#f3f4f6] dark:bg-[#0c111c] rounded-3xl py-10 px-4 md:py-16 mt-6"
      >
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="w-full overflow-hidden rounded-2xl">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair text-primary">
              {title}
            </h1>

            <p className="text-muted-foreground text-sm italic flex items-center">
              <CalendarDays size={16} className="inline mr-1" />
              Published in {publishingYear}
            </p>

            <div className="space-y-3">
              <div>
                <span className="text-muted-foreground font-medium">Author:</span>{" "}
                <span className="text-lg font-semibold">{author}</span>
              </div>
              <div>
                <span className="text-muted-foreground text-sm font-medium">
                  Genre:
                </span>{" "}
                {genre?.map((g, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full whitespace-nowrap mr-1"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <div>
                <span className="text-muted-foreground text-sm font-medium">
                  Category:
                </span>{" "}
                {category?.map((c, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full whitespace-nowrap mr-1"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <div>
                <span className="text-muted-foreground font-medium">
                  Page Count:
                </span>{" "}
                <span>{pageCount}</span>
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2 text-primary">
                Description
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Reading Status
              </label>
              <select
                value={readingStatus}
                onChange={handleStatusChange}
                className="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 rounded-md"
              >
                <option value="Want-to-Read">Want-to-Read</option>
                <option value="Reading">Reading</option>
                <option value="Read">Read</option>
                <option value="Not Started">Not Started</option>
              </select>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleUpvote}
                disabled={hasUpvoted}
                className={`px-4 py-2 flex items-center gap-2 rounded-full transition-all text-sm font-semibold
                    ${
                      hasUpvoted
                        ? "bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100"
                        : "bg-muted hover:bg-muted/80"
                    }`}
              >
                <ArrowUp size={16} className=" inline text-primary" />
                {hasUpvoted ? "Upvoted" : "Upvote"} ({upvoteCount})
              </button>
              <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-muted hover:bg-muted/70 transition ">
                <MessageSquareText className="text-primary" size={16} />
                Review
              </button>
            </div>

            <span className="divider"></span>

            {/* Render reviews after the divider */}
            {reviews?.length > 0 &&
              reviews.map((review, index) => (
                <PostedReviewCard key={index} review={review} />
              ))}
          </div>
        </div>

        <ReviewCard onSubmit={handleReviewSubmit} />
        <div className="divider"></div>
      </motion.section>
    </div>
  );
};

export default BookDetails;
