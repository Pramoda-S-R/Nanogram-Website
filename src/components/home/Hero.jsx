import React from "react";
import { ArrowRight, Menu, X, UserPlus } from "lucide-react";

const Hero = () => {
  return (
    <main
      className="flex-grow bg-sky-900 text-slate-50 dark:bg-sky-950 p-8 border-none outline-none
"
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="max-w-2xl mx-auto mt-20 ">
          <h1 className="text-5xl font-bold mb-4">Welcome to Nanogram -</h1>
          <h1 className="text-5xl font-bold mb-4">The Tech Hub</h1>
          <p className="text-xl mx-auto pb-8">
            Join us in exploring the cutting-edge world of electronics and
            technology. Discover our activities, events, and resources designed
            for tech enthusiasts.
          </p>
        </div>
        <div className="mx-auto flex flex-wrap max-w-96 float justify-center align-middle ">
          <button className="mx-auto bg-blue-500 text-slate-50 px-8 py-4 rounded-md flex flex-col items-center hover:bg-blue-400 transition-colors">
            Discover Our Activities
          </button>
          <a
            href="#"
            className="mx-auto text-slate-50 flex felx-col items-center pt-4 pb-4 group"
          >
            Meet the Team
            <span className="ml-2 pt-1 flex items-center h-4 w-4 transition-transform duration-200 transform group-hover:translate-x-1">
              <ArrowRight />
            </span>
          </a>
        </div>
        <div className="max-w-7xl mx-auto pt-20  pb-20">
          <div className="overflow-hidden relative">
            <img
              src="/test.png"
              alt=""
              className="object-center rounded-md object-cover h-full w-full"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
