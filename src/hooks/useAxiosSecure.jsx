import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Request interceptor to add Authorization header
  axiosInstance.interceptors.request.use((config) => {
    if (user?.accessToken) {
      config.headers.authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  });

  // Response interceptor to handle errors globally
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        signOutUser()
          .then(() => {
            console.error("Unauthorized access - user signed out");
            navigate("/signin", {
              state: { from: window.location.pathname },
            }); // Redirect to sign-in page
            toast.error("Session expired. Please sign in again.");
          })
          .catch((error) => {
            console.error("Error signing out user:", error);
          });
        console.error("Unauthorized access - redirecting to login");
      } else {
        // Handle other errors
        console.error("An error occurred:", error);
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosSecure;
