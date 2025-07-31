import { Navigate, useLocation } from "react-router";
import { toast } from "react-hot-toast";
import Loader from "../loader/Loader";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) return <Loader></Loader>;

  if (!user) {
    toast.error("You must be logged in to access this page");
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
