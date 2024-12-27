import React from "react";

// EventCard Component
const EventCard = ({ date, title, description }) => {
  return (
    <div>
      <time className="flex items-center text-sm font-semibold leading-6 text-primary/70">
        <span className="mx-4 h-3 w-3 bg-primary/70 rounded-full"></span>
        {date}
        <div className="lg:block hidden absolute -ml-2 h-px w-screen -translate-x-full border-t border-neutral-black/50 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"></div>
      </time>
      <h2 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-neutral-black">
        {title}
      </h2>
      <p className="mt-1 text-base font-normal leading-7 text-neutral-black/70">
        {description}
      </p>
    </div>
  );
};

// Upcoming Component
const Upcoming = () => {
  // Data for the events
  const eventData = [
    {
      date: "Dec 2024",
      title: "Introduction to Microcontrollers",
      description:
        "Fundamental concepts of microcontrollers and their applications in embedded systems.",
    },
    {
      date: "Jan 2025",
      title: "Career Guidance",
      description:
        "Advice on career planning, skills development, and professional growth strategies.",
    },
    {
      date: "Jan 2025",
      title: "Linux Basics",
      description:
        "Overview of essential Linux commands and system navigation for beginners.",
    },
    {
      date: "Jan 2025",
      title: "Debug This!!",
      description:"Debugging every last line of code and Programming together one more time."
    }
  ];

  return (
    <div
      className=" text-neutral-black py-16 sm:py-10"
      id="new-events"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {eventData.map((event, index) => (
            <EventCard
              key={index}
              date={event.date}
              title={event.title}
              description={event.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
