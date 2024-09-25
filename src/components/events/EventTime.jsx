import React from "react";

// EventCard Component
const EventCard = ({ date, title, description }) => {
  return (
    <div>
      <time className="flex items-center text-sm font-semibold leading-6 text-sky-500">
        <span className="mr-4 h-3 w-3 bg-sky-400 rounded-full"></span>
        {date}
        <div className="absolute -ml-2 h-px w-screen -translate-x-full border-t border-black/10 dark:border-white/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"></div>
      </time>
      <h2 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-slate-900 dark:text-white/80">
        {title}
      </h2>
      <p className="mt-1 text-base font-normal leading-7 text-slate-700 dark:text-white/70">
        {description}
      </p>
    </div>
  );
};

// EventTime Component
const EventTime = () => {
  // Data for the events
  const eventData = [
    {
      date: "Oct 2024",
      title: "AI Workshop",
      description:
        "Dive into the world of Artificial Intelligence with hands-on sessions and expert talks.",
    },
    {
      date: "Nov 2024",
      title: "Robotics Hackathon",
      description:
        "Join our hackathon to build and showcase innovative robotics projects.",
    },
    {
      date: "Dec 2024",
      title: "Electronics Expo",
      description:
        "Explore the latest in electronics technology at our annual expo.",
    },
    {
      date: "Jan 2025",
      title: "IoT Seminar",
      description:
        "Learn about the Internet of Things and its applications in modern technology.",
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-50 py-16 sm:py-20" id="new-events">
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

export default EventTime;
