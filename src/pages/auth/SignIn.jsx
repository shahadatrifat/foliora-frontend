import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";

const SignIn = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success("Signed in successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (error) {
      toast.error("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0c111c] px-4">
      <div className="w-full max-w-sm space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Welcome Back
        </h2>

        <form onSubmit={handleSignIn} className="space-y-4">
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
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="flex justify-center">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex items-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            <FcGoogle size={20}/>
            Sign in with Google
          </button>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
