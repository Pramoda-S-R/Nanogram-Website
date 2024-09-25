import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <main className="bg-sky-200 dark:text-slate-50 dark:bg-sky-950 text-slate-950">
      <div className="relative isolate overflow-hidden">
        {/* Top Gradient Blur */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#38BDF8] to-[#9333EA] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        {/* Main Content */}
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Welcome to Nanogram - The Tech Hub
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-800 dark:text-slate-300">
                Join us in exploring the cutting-edge world of electronics and
                technology. Discover our activities, events, and resources
                designed for tech enthusiasts.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
                <Link
                  to="/events#new-events"
                  className="inline-flex items-center justify-center text-white bg-sky-500 font-medium border-0 py-2 xl:py-3 px-6 focus:outline-none hover:bg-sky-400 rounded-lg text-sm sm:text-base 2xl:text-lg transition-colors duration-500"
                >
                  Discover Our Activities
                </Link>
                <Link
                  to="/about-us#team"
                  className="text-sm group flex items-center gap-1 font-semibold leading-6 text-sky-700 dark:text-white"
                >
                  Meet the Team
                  <span className="ml-2 pt-1 flex items-center h-4 w-4 transition-transform duration-200 transform group-hover:translate-x-1">
                    <ArrowRight />
                  </span>
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="mt-16 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 sm:mt-24 w-full h-auto aspect-[16/9] object-cover">
              <img
                alt="Hero Img"
                className="mt-16 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 sm:mt-24 w-full h-auto aspect-[16/9] object-cover"
                src="/1.png"
              />
            </div>
          </div>
        </div>

        {/* Bottom Gradient Blur */}
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#38BDF8] to-[#9333EA] opacity-40 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
