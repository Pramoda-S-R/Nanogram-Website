import React, { useState, useEffect } from "react";

const quotes = [
  {
    name: "Akshay Shandilya",
    role: "Viceroy - 2024",
    image: "/team/A1.webp",
    text: "As a small spark can ignite a vast forest, let's ignite the world of technology in Nanogram with our innovative ideas, creating a future that shines brighter with every step",
  },
  {
    name: "Anirudh Harish Bhat",
    role: "General Secretary - 2024",
    image: "/team/A2.webp",
    text: "Establishment of Nanogram was a testament to the power of collaboration and innovation. I hope our upcoming members help it to grow into something impactful  and inspiring.",
  },
  {
    name: "Arun Kumar",
    role: "Legacy Sentinal - 2024",
    image: "/team/A3.webp",
    text: "The best tech journey starts with a strong technical team with all efforts Let's make the future tech together.",
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
