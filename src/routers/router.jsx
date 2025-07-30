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
        element: (
          <PageWrapper>
            <AddBook></AddBook>
          </PageWrapper>
        ),
      },
      {
        path: "/my-books",
        element: (
          <PageWrapper>
            <MyBooks></MyBooks>
            </PageWrapper>
        ),
      },
      {
        path: "/book/:id",
        element: <BookDetail />,
        loader : ({params}) => fetch(`${import.meta.env.VITE_API_URL}/api/books/${params.id}`),
        fallback: <Loader></Loader>,
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
            path: "/dashboard/home",
            element: <DashboardHome></DashboardHome>,
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
