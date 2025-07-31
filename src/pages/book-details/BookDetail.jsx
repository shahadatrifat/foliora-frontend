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
  console.log(book);
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
  const bookId = String(book._id);
  console.log(bookId);

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
        className="flex items-center hover:underline text-md font-semibold text-primary"
        onClick={() => window.history.back()}
      >
        <ChevronLeft /> back
      </button>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#f3f4f6] dark:bg-[#0c111c] rounded-3xl py-10 px-4 md:py-16 "
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

            <p className="text-muted-foreground text-gray-800 dark:text-gray-300 text-sm italic flex items-center">
              <CalendarDays size={16} className="inline mr-1" />
              Published in {publishingYear}
            </p>

            <div className="space-y-3">
              <div>
                <span className="text-muted-foreground text-gray-800 dark:text-gray-300 font-medium">
                  Author:
                </span>{" "}
                <span className="text-lg text-gray-800 dark:text-gray-300 font-semibold">
                  {author}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground text-gray-800 dark:text-gray-300 text-sm font-medium">
                  Genre:
                </span>{" "}
                {genre?.map((g, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full whitespace-nowrap mr-1"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <div>
                <span className="text-muted-foreground text-sm text-gray-800 dark:text-gray-300 font-medium">
                  Category:
                </span>{" "}
                {category?.map((c, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full whitespace-nowrap mr-1"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <div>
                <span className="text-muted-foreground text-gray-800 dark:text-gray-300 font-medium">
                  Page Count:
                </span>{" "}
                <span className="text-gray-800 dark:text-gray-300">
                  {pageCount}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2 text-primary">
                Description
              </h2>
              <p className="text-base leading-relaxed  text-gray-800 dark:text-gray-300 text-muted-foreground">
                {description}
              </p>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-300">
                Reading Status
              </label>
              <select
                value={readingStatus}
                onChange={handleStatusChange}
                className="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border border-gray-300 rounded-md"
              >
                <option value="Want-to-Read">Want-to-Read</option>
                <option value="Reading">Reading</option>
                <option value="Read">Read</option>
                <option value="Not Started">Not Started</option>
              </select>
            </div>

            <div className="flex gap-3 mt-">
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
                <span className="text-gray-800 dark:text-gray-300">
                  {hasUpvoted ? "Upvoted" : "Upvote"}
                </span>{" "}
                ({upvoteCount})
              </button>
              <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-muted hover:bg-muted/70 transition ">
                <MessageSquareText className="text-primary" size={16} />
                <span className="text-gray-800 dark:text-gray-300">
                  Reviewed By
                </span>
                ({reviews.length})
              </button>
            </div>

            

            {/* Render publisher after the divider */}
            <div className="">
              <h2 className="text-xl font-semibold  text-primary">Publisher</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1 text-gray-500 dark:text-gray-400    ">
                posted on {UploadDate.slice(0, 10)}
              </p>
              <div className="px-3 py-2 bg-gray-100 mb-5 dark:bg-gray-800 w-full md:w-3/4 border border-gray-300 dark:border-gray-600  rounded-md bg-muted/40 flex items-center gap-3   ">
                <div className="w-12 border-2 border-primary border-muted dark:border-gray-600 h-12 min-w-12 rounded-full overflow-hidden shadow-inner">
                  {uploaderInfo.uploaderPhoto ? (
                    <img
                      src={uploaderInfo.uploaderPhoto}
                      alt={uploaderInfo.uploaderName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-lg font-bold text-primary">
                      <User />
                    </div>
                  )}
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-300 text-foreground">
                    {uploaderInfo.uploaderName}
                  </p>
                  <p className="text-xs text-muted-foreground text-gray-800 dark:text-gray-300 flex items-center gap-1">
                    <UserRoundSearch size={12} />
                    {uploaderInfo.uploaderEmail}
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <span className="divider"></span>
        <div className="md:flex justify-center-safe gap-2   ">
          <div>
            <ReviewCard onSubmit={handleReviewSubmit} />
          </div>
          <div className="divider md:divider-horizontal"></div>
          <div>
            {reviews?.length > 0 &&
              reviews.map((review, index) => (
                <PostedReviewCard key={index} review={review} bookId={bookId} />
              ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default BookDetails;
