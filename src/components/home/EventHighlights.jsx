import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { image } from "framer-motion/client";

const events = [
  { title: "Microcoded", image: "/gallery/22.webp" },
  { title: "Colossus Hackathon", image: "/gallery/13.webp" },
  { title: "Debug This!!", image: "/gallery/16.webp" },
  { title: "Talk on EV", image: "/gallery/15.webp" },
  { title: "Techno Exhibition", image: "/gallery/10.webp" },
  { title: "Industrial Visit", image: "/gallery/11.webp" },
  { title: "Inauguration", image: "/gallery/12.webp" },
  // Add more events here as needed
];

const EventCard = ({ title, image }) => (
  <div className="flex-shrink-0 w-64 sm:w-56 md:w-64 mr-4">
    <img
      src={image}
      alt={title}
      className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-lg mb-2"
    />
    <h3 className="text-sm font-semibold">{title}</h3>
  </div>
);

const EventHighlights = () => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-800  text-slate-900 dark:text-slate-50 border-none outline-none">
      <div className="max-w-full sm:max-w-7xl mx-auto px-6 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Event Highlights
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-4 sm:mb-6">
          A glimpse into our past events and activities.
        </p>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto pb-4 hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {events.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>

          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-slate-50 dark:bg-slate-800 p-1 sm:p-2 rounded-full shadow-md transition-transform duration-300 hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-slate-50 dark:bg-slate-800 p-1 sm:p-2 rounded-full shadow-md transition-transform duration-300 hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventHighlights;
