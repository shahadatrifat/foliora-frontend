// src/pages/MyProfile.jsx
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { LogOut, Pencil } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user, updateUserProfile, signOutUser } = useContext(AuthContext);
  const [editOpen, setEditOpen] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [newPhotoURL, setNewPhotoURL] = useState(user?.photoURL || "");

  const handleSave = () => {
    updateUserProfile({ displayName: newName, photoURL: newPhotoURL });
    toast.success("Profile updated!");
    setEditOpen(false);
  };

  const handleLogout = async () => {
    try {
      await Swal.fire({
        title: "Are you sure?",
        text: "You want to sign out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Sign out!",
      }).then((result) => {
        if (result.isConfirmed) {
          signOutUser();
          Swal.fire({
            title: "Signed out!",
            text: "You have been signed out.",
            icon: "success",
          });
        }
      });
    } catch (err) {
      Swal.fire("Failed to logout.");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="min-h-screen py-16 px-4 flex justify-center items-center bg-white dark:bg-gray-950 text-gray-900 dark:text-white"
      >
        <div className="max-w-md w-full bg-gray-50 dark:bg-white/5 p-8 rounded-2xl shadow-md text-center relative backdrop-blur-md">
          <div className="flex justify-center mb-4">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-indigo-500 object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold">
            {user?.displayName || "Anonymous"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {user?.email}
          </p>
          <p className="text-xs text-gray-400 mt-1">UID: {user?.uid}</p>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => setEditOpen(true)}
              className="px-4 py-2 flex items-center justify-center gap-2 border border-indigo-500 text-indigo-500 rounded hover:bg-indigo-50 dark:hover:bg-white/10 transition"
            >
              <Pencil size={16} />
              Edit Profile
            </button>

            
            <button
              onClick={handleLogout}
              className="px-4 py-2 flex items-center justify-center gap-2 border border-red-500 text-red-500 rounded hover:bg-red-50 dark:hover:bg-white/10 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </motion.div>

      {/* Edit Modal */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[90%] max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">
              Edit Profile
            </h3>
            <div className="form-control mb-4">
              <label className="label text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                defaultValue={user?.displayName || ""}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label text-gray-700 dark:text-gray-300">
                Photo URL
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                defaultValue={user?.photoURL}
                onChange={(e) => setNewPhotoURL(e.target.value)}
              />
            </div>

            <div className="flex justify-between gap-3">
              <button
                onClick={() => setEditOpen(false)}
                className="btn btn-outline "
              >
                Cancel
              </button>
              <button onClick={handleSave} className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyProfile;
