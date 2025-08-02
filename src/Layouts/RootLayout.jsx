import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { Toaster } from "react-hot-toast";
import PageWrapper from "../Shared/PageWrapper";
import { Fade } from "react-awesome-reveal";

const RootLayout = () => {
  return (
    <div>
      <Toaster position="bottom-left" reverseOrder={false}></Toaster>
      <Navbar></Navbar>
      <main>
        <Outlet />
      </main>
      <Fade cascade duration={1000}>
        <div className=" bg-gray-100 dark:bg-gray-800">
          {" "}
          <>
            <Footer></Footer>
          </>
        </div>
      </Fade>
    </div>
  );
};

export default RootLayout;
