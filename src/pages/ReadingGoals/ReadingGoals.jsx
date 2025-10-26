import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  TrendingUp,
  Calendar,
  Book,
  Award,
  Plus,
  Trash2,
  CheckCircle,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function ReadingGoals() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    targetBooks: 12,
    year: new Date().getFullYear(),
    type: "yearly",
  });

  useEffect(() => {
    if (!user?.email) return;
    fetchGoals();
  }, [user]);

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(`/api/reading-goals?email=${user.email}`);
      setGoals(res.data);
    } catch (error) {
      console.error("Failed to fetch goals:", error);
      toast.error("Failed to load goals");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGoal = async () => {
    if (!newGoal.title.trim()) {
      toast.error("Please enter a goal title");
      return;
    }

    const goalData = {
      ...newGoal,
      email: user.email,
      progress: 0,
    };

    try {
      const res = await axiosSecure.post("/api/reading-goals", goalData);
      setGoals([...goals, { ...goalData, _id: res.data.insertedId }]);
      setNewGoal({
        title: "",
        targetBooks: 12,
        year: new Date().getFullYear(),
        type: "yearly",
      });
      setShowCreateModal(false);
      toast.success("Reading goal created!");
    } catch (error) {
      console.error("Failed to add goal:", error);
      toast.error("Failed to create goal");
    }
  };

  const handleProgressUpdate = async (goal, increment) => {
    const newProgress = Math.max(
      0,
      Math.min(goal.targetBooks, (goal.progress || 0) + increment)
    );

    try {
      await axiosSecure.patch(`/api/reading-goals/${goal._id}`, {
        progress: newProgress,
      });

      setGoals(
        goals.map((g) =>
          g._id === goal._id ? { ...g, progress: newProgress } : g
        )
      );

      if (newProgress >= goal.targetBooks) {
        toast.success(" Goal completed! Well done!");
      }
    } catch (error) {
      console.error("Failed to update progress:", error);
      toast.error("Failed to update progress");
    }
  };

 const handleDeleteGoal = async (goalId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This goal will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/api/reading-goals/${goalId}`);
      setGoals(goals.filter((g) => g._id !== goalId));
      toast.success("Goal deleted successfully");
    } catch (error) {
      console.error("Failed to delete goal:", error);
      toast.error("Failed to delete goal");
    }
  });
};

  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const stats = {
    totalGoals: goals.length,
    booksRead: goals.reduce((sum, g) => sum + (g.progress || 0), 0),
    avgProgress: goals.length
      ? Math.round(
          goals.reduce(
            (sum, g) => sum + calculateProgress(g.progress || 0, g.targetBooks),
            0
          ) / goals.length
        )
      : 0,
    completed: goals.filter((g) => (g.progress || 0) >= g.targetBooks).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Reading Goals
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your reading progress and achieve your goals
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            New Goal
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: Target,
              label: "Active Goals",
              value: stats.totalGoals,
              color: "text-indigo-600",
              bg: "bg-indigo-50 dark:bg-indigo-900/20",
            },
            {
              icon: Book,
              label: "Books Read",
              value: stats.booksRead,
              color: "text-purple-600",
              bg: "bg-purple-50 dark:bg-purple-900/20",
            },
            {
              icon: TrendingUp,
              label: "Avg Progress",
              value: `${stats.avgProgress}%`,
              color: "text-green-600",
              bg: "bg-green-50 dark:bg-green-900/20",
            },
            {
              icon: Award,
              label: "Completed",
              value: stats.completed,
              color: "text-yellow-600",
              bg: "bg-yellow-50 dark:bg-yellow-900/20",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.bg} rounded-lg p-6 shadow-sm`}
            >
              <stat.icon className={`w-10 h-10 ${stat.color} mb-3`} />
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {goals.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No reading goals yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Create your first goal to start tracking your reading progress
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Your First Goal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal, index) => {
              const progress = calculateProgress(
                goal.progress || 0,
                goal.targetBooks
              );
              const isCompleted = (goal.progress || 0) >= goal.targetBooks;

              return (
                <motion.div
                  key={goal._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6  hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {goal.title || `${goal.year} Reading Goal`}
                        </h3>
                        {isCompleted && (
                          <CheckCircle className="w-6 h-6 text-green-500 fill-current" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{goal.year}</span>
                        <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded text-xs">
                          {goal.type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteGoal(goal._id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {goal.progress || 0} / {goal.targetBooks} books
                      </span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          isCompleted
                            ? "bg-gradient-to-r from-green-500 to-emerald-500"
                            : "bg-gradient-to-r from-indigo-500 to-purple-500"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleProgressUpdate(goal, -1)}
                      disabled={!goal.progress || goal.progress === 0}
                      className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      -1 Book
                    </button>
                    <button
                      onClick={() => handleProgressUpdate(goal, 1)}
                      disabled={isCompleted}
                      className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      +1 Book
                    </button>
                  </div>

                  {isCompleted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                    >
                      <p className="text-green-800 dark:text-green-200 text-sm font-medium flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Goal completed! Congratulations! 
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Create Reading Goal
                  </h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Goal Title
                    </label>
                    <input
                      type="text"
                      value={newGoal.title}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, title: e.target.value })
                      }
                      placeholder="e.g., 2025 Reading Challenge"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Target Number of Books
                    </label>
                    <input
                      type="number"
                      value={newGoal.targetBooks}
                      onChange={(e) =>
                        setNewGoal({
                          ...newGoal,
                          targetBooks: parseInt(e.target.value) || 0,
                        })
                      }
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Year
                    </label>
                    <input
                      type="number"
                      value={newGoal.year}
                      onChange={(e) =>
                        setNewGoal({
                          ...newGoal,
                          year:
                            parseInt(e.target.value) ||
                            new Date().getFullYear(),
                        })
                      }
                      min="2020"
                      max="2030"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Type
                    </label>
                    <select
                      value={newGoal.type}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, type: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    >
                      <option value="yearly">Yearly</option>
                      <option value="monthly">Monthly</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateGoal}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Create Goal
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}