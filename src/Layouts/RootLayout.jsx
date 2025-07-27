import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { Toaster } from "react-hot-toast";


const RootLayout = () => {
  return (
    <div>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Navbar></Navbar>
      <main >
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
