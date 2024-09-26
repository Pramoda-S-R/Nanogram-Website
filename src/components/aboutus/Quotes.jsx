import React, { useState, useEffect } from "react";

const quotes = [
  {
    name: "Chris P.",
    role: "Software Engineer",
    image: "/1.png",
    text: "Joining Nanogram has been one of the best decisions of my life. The opportunities to learn and grow are endless.",
  },
  {
    name: "Sam K.",
    role: "Hardware Developer",
    image: "/1.png",
    text: "The community at Nanogram is incredibly supportive and inspiring. I've gained so much from my time here.",
  },
  {
    name: "Taylor R.",
    role: "Tech Enthusiast",
    image: "/1.png",
    text: "Nanogram has provided me with the resources and connections to take my projects to the next level.",
  },
  // Add more quotes here as needed
];

const Quotes = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Automatically switch quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // 5 seconds interval
    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <section className="relative flex flex-col justify-center bg-sky-200 dark:text-slate-50 dark:bg-sky-950 text-slate-950 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-20">
        <div className="flex justify-center">
          <div className="w-full max-w-3xl mx-auto text-center">
            {/* Profile Images */}
            <div className="relative h-32 flex justify-center space-x-8">
              {quotes.map((quote, index) => (
                <div
                  key={index}
                  className={`absolute transition-opacity duration-700 ${
                    currentQuoteIndex === index
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  <img
                    alt={quote.name}
                    className="w-16 h-16 rounded-full border border-black/10 dark:border-white/10 object-cover mx-auto"
                    src={quote.image}
                  />
                </div>
              ))}
            </div>

            {/* Quote Text */}
            <div className="relative mb-9 min-h-[80px]">
              {quotes.map((quote, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 text-center ${
                    currentQuoteIndex === index
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  <div className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                    {quote.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Profile Buttons */}
            <div className="flex flex-wrap justify-center -m-1.5 pt-20 sm:pt-30 ">
              {quotes.map((quote, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuoteIndex(index)}
                  className={`inline-flex flex-col justify-center whitespace-nowrap rounded-full px-4 py-3 m-1.5 text-xs shadow-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-sky-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ${
                    currentQuoteIndex === index
                      ? "bg-sky-500 text-white shadow-sky-950/10"
                      : "bg-white dark:bg-slate-700 hover:bg-sky-100 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-300"
                  }`}
                >
                  <div className="mx-auto">{quote.name}</div>
                  <div className="mt-1 mx-auto">{quote.role}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quotes;
