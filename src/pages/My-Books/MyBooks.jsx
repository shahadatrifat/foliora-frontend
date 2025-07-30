import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Heart, MessageSquare, Edit, Trash } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import EditBookModal from "../Home/components/modals/EditBookModal";
import UpvoteListModal from "../Home/components/modals/UpVoteModal";


const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false); // State for edit modal visibility
  const [showUpvoteModal, setShowUpvoteModal] = useState(false); // State for upvote modal visibility
  const [selectedBook, setSelectedBook] = useState(null); // Store the book to be edited or upvoted
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    genre: "",
    coverImage: "",
  });

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    // Fetch books only if the user is logged in
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/books?email=${user?.email}`
        );
        setMyBooks(response.data);
      } catch (err) {
        console.error("Error fetching my books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [user]);

  const handleEdit = (book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title,
      description: book.description,
      category: book.category,
      genre: book.genre,
      coverImage: book.coverImage,
    });
    setShowEditModal(true);
  };

  const handleDelete = (bookId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/api/books/${bookId}`)
          .then(() => {
            setMyBooks((prev) => prev.filter((book) => book._id !== bookId));
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch((err) => {
            toast.error("Error deleting book:", err);
          });
      }
    });
  };

  const handleUpvote = (book) => {
    setSelectedBook(book);
    setShowUpvoteModal(true);  // Show upvote modal instead of edit modal
  };

  const closeModal = () => {
    setShowEditModal(false);
    setShowUpvoteModal(false);
    setSelectedBook(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedBook = { ...formData };

    axios
      .put(`${import.meta.env.VITE_API_URL}/api/books/${selectedBook._id}`, updatedBook)
      .then((res) => {
        setMyBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === selectedBook._id ? res.data : book
          )
        );
        setShowEditModal(false);
        toast.success("Book updated successfully!");
      })
      .catch((err) => {
        toast.error("Error updating book:", err);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#f3f4f6] dark:bg-[#0c111c]">
      <h2 className="text-3xl font-bold mb-6 text-primary dark:text-gray-100">
        My Books
      </h2>

      {myBooks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          You haven't uploaded any books yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myBooks.map((book) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="dark:bg-[#161d2f]/60 bg-white/60 backdrop-blur rounded-2xl p-4 shadow-sm border dark:border-gray-700 border-gray-200 transition-all flex flex-col justify-between"
            >
              <div>
                <Link to={`/book/${book._id}`}>
                  <h3 className="text-xl font-semibold dark:text-gray-200 text-gray-800 mb-2 cursor-pointer hover:underline line-clamp-2">
                    {book.title}
                  </h3>
                </Link>
                <p className="text-sm dark:text-gray-400 text-gray-800 mb-3 line-clamp-3">
                  {book.description?.slice(0, 120)}
                  {book.description && book.description.length > 120 ? "..." : ""}
                </p>

                <div className="flex flex-wrap gap-2 text-xs dark:text-gray-400 text-gray-800 mb-4">
                  {Array.isArray(book.category) && book.category.length > 0 && (
                    <span className="dark:bg-gray-700 bg-gray-200 px-2 py-1 rounded">
                      Category: {book.category.join(", ")}
                    </span>
                  )}
                  {!Array.isArray(book.category) && book.category && (
                    <span className="dark:bg-gray-700 bg-gray-200 px-2 py-1 rounded">
                      Category: {book.category}
                    </span>
                  )}

                  {Array.isArray(book.genre) && book.genre.length > 0 && (
                    <span className="dark:bg-gray-700 bg-gray-200 px-2 py-1 rounded">
                      Genre: {book.genre.join(", ")}
                    </span>
                  )}
                  {!Array.isArray(book.genre) && book.genre && (
                    <span className="dark:bg-gray-700 bg-gray-200 px-2 py-1 rounded">
                      Genre: {book.genre}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col mt-auto">
                <div className="flex justify-between items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpvote(book)}
                      className="flex flex-col gap-0.5"
                    >
                      <button className=" ">
                        <Heart className="w-4 h-4 text-pink-500 underline cursor-pointer" />
                      </button>
                      <span className="border max-w-[50px] border-t-1 border-gray-400"></span>
                    </button>
                    <span>{book.upvotes?.length || 0}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-400" />
                    <span>{book.reviews?.length || 0}</span>
                  </div>
                </div>

                <div className="w-48 h-65 overflow-hidden rounded-md mb-4 mx-auto">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="flex justify-between items-center mt-auto pt-2">
                  <button
                    onClick={() => handleEdit(book)}
                    className="flex-1 mr-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="flex-1 ml-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <Trash className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Book Modal */}
      {showEditModal && selectedBook && (
        <EditBookModal
          showModal={showEditModal}
          closeModal={closeModal}
          selectedBook={selectedBook}
          formData={formData}
          handleChange={handleChange}
          handleUpdate={handleUpdate}
        />
      )}

      {/* Upvote List Modal */}
      {showUpvoteModal && selectedBook && (
        <UpvoteListModal
          showModal={showUpvoteModal}
          closeModal={closeModal}
          selectedBook={selectedBook}
        />
      )}
    </div>
  );
};

export default MyBooks;
