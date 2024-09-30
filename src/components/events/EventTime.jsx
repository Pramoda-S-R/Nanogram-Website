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
      title: "Introduction to Microcontrollers",
      description:
        "Fundamental concepts of microcontrollers and their applications in embedded systems.",
    },
    {
      date: "Oct 2024",
      title: "Arduino Microcontrollers",
      description:
        "Introduction to programming and controlling hardware using Arduino boards.",
    },
    {
      date: "Nov 2024",
      title: "Career Guidance",
      description:
        "Advice on career planning, skills development, and professional growth strategies.",
    },
    {
      date: "Nov 2024",
      title: "Linux Basics",
      description:
        "Overview of essential Linux commands and system navigation for beginners.",
    },
  ];

  return (
    <section
      className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-50 py-16 sm:py-20"
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
    </section>
  );
};

export default EventTime;
