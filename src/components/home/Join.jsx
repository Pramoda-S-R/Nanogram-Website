import React from "react";
import { Link } from "react-router-dom";

const Join = () => {
  return (
    <section>
      <div className="bg-sky-200 dark:text-slate-50 dark:bg-sky-950 text-slate-950 max-w-full grid  sm:grid-cols-1 lg:grid-cols-2 items-center border-none outline-none">
        <img src="/show/2.webp" alt="Join Us" className=" w-full " />
        <div className="max-w-full p-10 mx-auto ">
          <div className="max-w-lg ">
            <h2 className="text-lg font-semibold tracking-wide mb-2 text-blue-600 dark:text-blue-200">
              Be a Tech Enthusiast
            </h2>
            <h1 className="text-4xl font-bold mb-6">
              Join Nanogram - The Tech Hub
            </h1>

            <div className="flex flex-col md:flex-row justify-between items-start">
              <p className="mb-4 text-slate-800 dark:text-gray-300">
                Become a part of our vibrant community and stay updated with the
                latest in technology.
              </p>
            </div>
            <div className="mt-8 flex flex-col md:flex-row items-center justify-start">
              <Link
                to="/join"
                className="bg-blue-500 px-4 py-2 rounded-md flex items-center justify-center hover:bg-blue-400 transition-colors"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
