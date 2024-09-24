import React from "react";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200">404</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        Oops! The page you're looking for doesn't exist.
      </p>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
        Please check the URL or return to the home page.
      </p>
      <a href="/" className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
        Go to Home
      </a>
    </div>
  );
};

export default Error;
