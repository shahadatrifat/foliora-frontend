import React from "react";
import { Hourglass } from "ldrs/react";
import "ldrs/react/Hourglass.css";

const Loader = () => {
  return (
    <div className="flex justify-center  items-center min-h-screen  backdrop-blur   ">
      <Hourglass  size="60" bgOpacity="0.1" speed="1.75" color="black" />
    </div>
  );
};

export default Loader;
