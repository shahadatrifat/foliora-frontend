import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/Signup";
import PageWrapper from "../Shared/PageWrapper";
import MyProfile from "../pages/myProfile/MyProfile";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Library from "../pages/Library/Library";
import AddBook from "../pages/addBook/AddBook";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/library",
        element: <Library></Library>,
      },
      {
        path: "/wishlist",
        element: <h1>Wishlist</h1>,
      },
      {
        path: "/add-Book",
        element: <PageWrapper><AddBook></AddBook></PageWrapper>,
      },
      {
        path: "/profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/signup",
        element: (
          <PageWrapper>
            <SignUp></SignUp>
          </PageWrapper>
        ),
      },
      {
        path: "/signin",
        element: (
          <PageWrapper>
            <SignIn></SignIn>
          </PageWrapper>
        ),
      },
      {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/assignments",
        element: <h1>Assignments</h1>,
      },
    ],
  },
    ],
  },
  
]);

export default router;
