import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
    return regex.test(password);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!validatePassword(password)) {
      toast.error(
        "Password must be 6+ characters, include an uppercase letter, a number, and a symbol."
      );
      return;
    }

    setLoading(true);

    createUser(email, password)
      .then(() => {
        return updateUserProfile({ displayName: name, photoURL });
      })
      .then(() => {
        toast.success("Account created!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message || "Failed to create account");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0c111c] px-4">
      <div className="w-full max-w-sm space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Create an Account
        </h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="w-full border-b bg-transparent p-2 text-gray-800 dark:text-white focus:outline-none"
            required
          />
          <input
            name="photo"
            type="text"
            placeholder="Photo URL"
            className="w-full border-b bg-transparent p-2 text-gray-800 dark:text-white focus:outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border-b bg-transparent p-2 text-gray-800 dark:text-white focus:outline-none"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border-b bg-transparent p-2 text-gray-800 dark:text-white focus:outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/signin" className="text-indigo-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
