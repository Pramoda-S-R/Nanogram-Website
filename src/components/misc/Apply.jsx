import React from "react";
import { Link } from "react-router-dom";
import { BatteryWarning } from "lucide-react";

let accepting = false;
// let accepting = true;

function Apply() {
  if (accepting) {
    return (
      <main className="bg-sky-200 dark:text-slate-50 dark:bg-sky-950 text-slate-950 w-full h-full py-24">
        <div className="max-w-7xl text-5xl text-center font-bold mb-12">
          The Circuit is Open!
        </div>
        <div className="max-w-4xl text-justify mx-auto mb-12">
          🎉 Great news! The Nanogram family is growing, and we want YOU to be a
          part of it! Whether you're a coding whiz, a soldering maestro, or just
          passionate about electronics, there's a place for you in our club.
          Together, we'll build, tinker, and make sparks fly (the good kind,
          promise 😉). So what are you waiting for? Fill out the form, hit "Join
          Nanogram," and let's start creating some electrifying memories. We
          can’t wait to meet you!
        </div>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-around">
          <Link
            to="https://google.com"
            className="inline-flex items-center justify-center text-white bg-sky-500 font-medium border-0 py-2 xl:py-3 px-6 focus:outline-none hover:bg-sky-400 rounded-lg text-sm sm:text-base 2xl:text-lg transition-colors duration-500"
          >
            Join Nanogram
          </Link>
        </div>
      </main>
    );
  }
  return (
    <main className="bg-sky-200 dark:text-slate-50 dark:bg-sky-950 text-slate-950 w-full h-full py-24">
      <div className="max-w-7xl text-5xl text-center font-bold mb-12">
        Hold That Soldering Iron!
      </div>
      <div className="max-w-4xl text-justify mx-auto mb-12">
        😔 Oops! Looks like we’ve reached our full circuit capacity for now. Our
        membership window is closed, but don’t worry—this isn't a permanent
        short circuit! Keep your resistors ready because we’ll be opening
        applications again soon. Until then, stay tuned for exciting updates,
        hackathons, and more! We promise, the wait will be worth it. Keep
        tinkering, and we hope to see you in the next batch of members!
      </div>
      <div className="mt-10 flex flex-col md:flex-row items-center justify-around">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 text-white bg-sky-500 font-medium border-0 py-2 xl:py-3 px-6 focus:outline-none hover:bg-sky-400 rounded-lg text-sm sm:text-base 2xl:text-lg transition-colors duration-500"
        >
          <BatteryWarning />
          Over Voltage
        </Link>
      </div>
    </main>
  );
}

export default Apply;
