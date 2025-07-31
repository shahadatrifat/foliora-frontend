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
import BookDetail from "../pages/book-details/BookDetail";
import Loader from "../components/loader/Loader";
import MyBooks from "../pages/My-Books/MyBooks";
import DashboardMainPage from "../pages/dashboard/DashboardMainPage";
import ErrorPage from "../components/Errorpage/ErrorPage";
import PrivateRoute from "../components/private-route/PrivateRoute";

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
        path: "/add-Book",
        element: (
          <PageWrapper>
            <PrivateRoute><AddBook></AddBook></PrivateRoute>
          </PageWrapper>
        ),
      },
      {
        path: "/my-books",
        element: (
          <PrivateRoute><PageWrapper>
            <MyBooks></MyBooks>
            </PageWrapper></PrivateRoute>
        ),
      },
      {
        path: "/book/:id",
        element: <PrivateRoute><BookDetail></BookDetail></PrivateRoute>,
        loader : ({params}) => fetch(`${import.meta.env.VITE_API_URL}/api/books/${params.id}`),
        fallback: <Loader></Loader>,
      },
      {
        path: "/profile",
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>,
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
        path:"*",
        element:<ErrorPage></ErrorPage>
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
          
          {
            index: true,
            element: <PrivateRoute><DashboardHome></DashboardHome></PrivateRoute>,
          },
          {
            path: "/dashboard/my-books",
            element: (
              <PageWrapper>
                <MyBooks></MyBooks>
              </PageWrapper>
            ),
          },
          {
            path: "/dashboard/profile",
            element: <MyProfile></MyProfile>,
          }
          
        ],
      },
    ],
  },
]);

export default router;
