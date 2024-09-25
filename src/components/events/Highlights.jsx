import React from "react";

// HighlightCard Component
const HighlightCard = ({ title, subtitle, imgSrc }) => {
  return (
    <div className="relative group">
      <div className="overflow-hidden aspect-w-3 aspect-h-4 flex justify-center items-center">
        <div className="object-cover w-full h-full transition-all duration-300 origin-bottom group-hover:scale-110 aspect-[3/4]">
          <img
            alt={title}
            className="object-cover w-full h-full transition-all duration-300 origin-bottom group-hover:scale-110 aspect-[3/4]"
            src={imgSrc}
          />
        </div>
        <div className="absolute z-20 flex flex-col justify-center items-center">
          <h3 className="text-base font-bold text-white">{title}</h3>
          <p className="text-sm font-medium text-gray-300">{subtitle}</p>
        </div>
        <div className="absolute z-10 inset-0 bg-black/20 pointer-events-none"></div>
      </div>
    </div>
  );
};

// Highlights Section
const Highlights = () => {
  // Data for the highlights
  const highlightData = [
    { title: "AI Workshop", subtitle: "Workshop", imgSrc: "/1.png" },
    { title: "Robotics Hackathon", subtitle: "Hackathon", imgSrc: "/1.png" },
    { title: "Electronics Expo", subtitle: "Expo", imgSrc: "/1.png" },
    { title: "IoT Seminar", subtitle: "Seminar", imgSrc: "/1.png" },
    { title: "Tech Conference", subtitle: "Conference", imgSrc: "/1.png" },
    { title: "Innovation Meetup", subtitle: "Meetup", imgSrc: "/1.png" },
  ];

  return (
    <section className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-50 px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-7xl flex flex-col gap-12">
        <div className="w-full flex flex-col gap-6 text-center md:text-left">
          <h2 className="text-4xl font-semibold">Event Highlights</h2>
          <p className="font-normal text-slate-700 dark:text-slate-300">
            A glimpse into our past events and activities. Experience the
            excitement and innovation at Nanogram - The Tech Hub.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-3 lg:grid-cols-6">
          {highlightData.map((highlight, index) => (
            <HighlightCard
              key={index}
              title={highlight.title}
              subtitle={highlight.subtitle}
              imgSrc={highlight.imgSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
