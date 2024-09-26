import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Involved = () => {
  return (
    <section className="overflow-hidden bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-50">
      <div>
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
            <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Get Involved with Nanogram - The Tech Hub
              </h2>
              <p className="mt-6 text-xl leading-8 text-slate-700 dark:text-slate-300">
                Join our community of tech enthusiasts and innovators.
                Participate in our events to learn, share, and grow.
              </p>
              <p className="mt-6 text-base leading-7 text-slate-700 dark:text-slate-300">
                Whether you are a beginner or an expert, there's a place for you
                at Nanogram. Let's push the boundaries of technology together.
              </p>

              <div className="mt-10 flex">
                <Link
                  to=""
                  className="flex group gap-1 items-center justify-center text-white bg-sky-500 font-medium border-0 py-2 xl:py-3 px-6 focus:outline-none hover:bg-sky-400 rounded-lg text-sm sm:text-base 2xl:text-lg transition-colors duration-500 dark:hover:bg-slate-600"
                >
                  View Upcoming Events
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
              <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                <div className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-slate-100 object-cover">
                  <img
                    alt="Image"
                    className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-slate-100 object-cover"
                    src="/1.png"
                  />
                </div>
              </div>
              <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                  <div className="aspect-[4/3] w-[18rem] max-w-none flex-none rounded-2xl bg-slate-100 object-cover">
                    <img
                      alt="Image"
                      className="aspect-[4/3] w-[18rem] max-w-none flex-none rounded-2xl bg-slate-100 object-cover"
                      src="/1.png"
                    />
                  </div>
                </div>
                <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                  <div className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-slate-100 object-cover">
                    <img
                      alt="Image"
                      className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-slate-100 object-cover"
                      src="/1.png"
                    />
                  </div>
                </div>
                <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                  <div className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-slate-100 object-cover">
                    <img
                      alt="Image"
                      className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-slate-100 object-cover"
                      src="/1.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Involved;
