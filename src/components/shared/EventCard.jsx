import React from "react";

const EventCard = ({ date, title, description }) => {
  return (
    <div>
      <time className="flex items-center text-sm font-semibold leading-6 text-primary/70">
        <span className="mx-4 h-3 w-3 bg-primary/70 rounded-full"></span>
        {date}
        <div className="lg:block hidden -ml-2 h-px w-screen -translate-x-full border-t border-neutral-black/50 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"></div>
      </time>
      <div className="ml-4">
        <h2 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-neutral-black">
          {title}
        </h2>
        <p className="mt-1 text-base font-normal leading-7 text-neutral-black/70">
          {description}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
