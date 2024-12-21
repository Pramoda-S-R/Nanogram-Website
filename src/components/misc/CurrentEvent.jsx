import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BatteryCharging, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

function DepartmentCheck() {
  const [belongsToECE, setBelongsToECE] = useState(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <main className="bg-sky-200 dark:bg-sky-950 text-slate-950 dark:text-slate-50 w-full h-full py-24">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-8">
          Join Nanogram: Let's Spark Creativity!
        </h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-lg px-4 sm:px-12 md:px-24 mb-12"
        >
          Are you a proud member of the Electronics and Communication
          Engineering (ECE) Department? Choose your path below and register to
          be part of the Nanogram experience!
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-around items-center gap-8 px-6">
        {belongsToECE === null ? (
          <>
            <motion.button
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              onClick={() => setBelongsToECE(true)}
              className="inline-flex items-center justify-center text-white bg-sky-500 font-medium border-0 py-2 xl:py-3 px-6 focus:outline-none hover:bg-sky-400 rounded-lg text-sm sm:text-base 2xl:text-lg transition-colors duration-500 shadow-md"
            >
              Yes, I Belong to ECE!
            </motion.button>

            <motion.button
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              onClick={() => setBelongsToECE(false)}
              className="inline-flex items-center justify-center text-white bg-red-500 font-medium border-0 py-2 xl:py-3 px-6 focus:outline-none hover:bg-red-400 rounded-lg text-sm sm:text-base 2xl:text-lg transition-colors duration-500 shadow-md"
            >
              Nope, I'm Not in ECE
            </motion.button>
          </>
        ) : belongsToECE ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-col items-center"
          >
            <h2 className="text-3xl font-bold mb-4">Welcome, ECE Wizard! 🧑‍🔧</h2>
            <Link
              to="https://docs.google.com/forms/d/e/1FAIpQLScq8YMtB4X3uNJY60dDJ1rvck3qzjvvY080o7mLwC9g40UWOQ/viewform?usp=sharing"
              className="inline-flex items-center justify-center gap-2 text-white bg-sky-500 font-medium border-0 py-2 xl:py-3 px-6 focus:outline-none hover:bg-sky-400 rounded-lg text-sm sm:text-base 2xl:text-lg transition-colors duration-500 shadow-md"
            >
              <BatteryCharging />
              Register Here
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-col items-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Oops! You're Not in ECE 😅
            </h2>
            <Link
              to="https://docs.google.com/forms/d/e/1FAIpQLSfQlfQ1S-w-wvyPXsSQz0M5OZzCf2433GbHbzH6E2ZfJJNcGQ/viewform?usp=sharing"
              className="inline-flex items-center justify-center gap-2 text-white bg-red-500 font-medium border-0 py-2 xl:py-3 px-6 focus:outline-none hover:bg-red-400 rounded-lg text-sm sm:text-base 2xl:text-lg transition-colors duration-500 shadow-md"
            >
              <AlertTriangle />
              General Registration
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  );
}

export default DepartmentCheck;
