import React from "react";
import lonley from "../../../src/assets/lotties/Lonely404.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
      {/* Lottie Animation */}
      <div className="text-center mb-6">
        <Player
          autoplay
          loop
          src={lonley}
          className="w-full max-w-lg mx-auto"
        />
      </div>

      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
        Oops! Something went wrong.
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        We couldn't find the page you're looking for.
      </p>

      <div className="flex space-x-4">
        <Link
          to="/"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
