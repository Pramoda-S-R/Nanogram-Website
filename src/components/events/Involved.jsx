import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Update this variable to toggle event content
// let eventUpcoming = false;
let eventUpcoming = true;

const Involved = () => {
  return (
    <section className="overflow-hidden bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
          <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
            {/* Conditional Rendering Based on 'eventUpcoming' */}
            {eventUpcoming ? (
              <>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Explore Upcoming Events at Nanogram!
                </h2>
                <p className="mt-6 text-xl leading-8 text-slate-700 dark:text-slate-300">
                  Welcome to Nanogram's <strong>Tech Events Hub</strong> – where
                  innovation meets curiosity. Join us for exciting workshops,
                  hackathons, and seminars designed to ignite your curiosity and
                  expand your skills.
                </p>
                <p className="mt-6 text-base leading-7 text-slate-700 dark:text-slate-300">
                  📅 <strong>Upcoming Event:</strong> Microcoded 2.0
                  <br />
                  🕒 <strong>Date & Time:</strong> 2024, Dec - 23 <br />
                  📍 <strong>Location:</strong> ECE - Seminar Hall
                </p>
                <p className="mt-6 text-base leading-7 text-slate-700 dark:text-slate-300">
                  Don't miss the chance to learn, network, and grow with
                  like-minded tech enthusiasts.
                </p>
                <div className="mt-10 flex">
                  <Link
                    to="/events-active" // Change this to the event registration link
                    className="flex group gap-1 items-center justify-center text-white bg-sky-500 font-medium border-0 py-2 xl:py-3 px-6 focus:outline-none hover:bg-sky-400 rounded-lg text-sm sm:text-base 2xl:text-lg transition-colors duration-500 dark:hover:bg-slate-600"
                  >
                    Register Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Stay Tuned for the Next Big Thing!
                </h2>
                <p className="mt-6 text-xl leading-8 text-slate-700 dark:text-slate-300">
                  Our events calendar is currently empty, but don’t worry –
                  we’re working behind the scenes to bring you more inspiring
                  workshops, hackathons, and meetups.
                </p>
                <p className="mt-6 text-base leading-7 text-slate-700 dark:text-slate-300">
                  💡 <strong>What You Can Do:</strong> <br />
                  - Explore past events to see what we’ve been up to. <br />-
                  Join our community to stay updated on the latest
                  announcements.
                </p>
                <p className="mt-6 text-base leading-7 text-slate-700 dark:text-slate-300">
                  Be the first to know when new events are announced by signing
                  up below!
                </p>
                <div className="mt-10 flex">
                  <Link
                    to="https://www.instagram.com/nanogram_drait" // Change this to the subscription or updates link
                    className="flex group gap-1 items-center justify-center text-white bg-sky-500 font-medium border-0 py-2 xl:py-3 px-6 focus:outline-none hover:bg-sky-400 rounded-lg text-sm sm:text-base 2xl:text-lg transition-colors duration-500 dark:hover:bg-slate-600"
                  >
                    Stay Updated
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
            <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
              <div className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-slate-100 object-cover">
                <img
                  alt="Event Banner"
                  className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-slate-100 object-cover"
                  src={eventUpcoming ? "/show/13.webp" : "/show/7.webp"} // Dynamic image
                />
              </div>
            </div>
            <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
              <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                <div className="aspect-[4/3] w-[18rem] max-w-none flex-none rounded-2xl bg-slate-100 object-cover">
                  <img
                    alt="Event Highlight 1"
                    className="aspect-[4/3] w-[18rem] max-w-none flex-none rounded-2xl bg-slate-100 object-cover"
                    src="/show/6.webp"
                  />
                </div>
              </div>
              <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                <div className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-slate-100 object-cover">
                  <img
                    alt="Event Highlight 2"
                    className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-slate-100 object-cover"
                    src="/show/9.webp"
                  />
                </div>
              </div>
              <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                <div className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-slate-100 object-cover">
                  <img
                    alt="Event Highlight 3"
                    className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-slate-100 object-cover"
                    src="/show/10.webp"
                  />
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
