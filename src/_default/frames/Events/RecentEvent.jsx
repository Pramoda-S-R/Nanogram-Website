import React, { useEffect, useState } from "react";
import { getLastEvent } from "../../../lib/appwrite/api";

const RecentEvent = () => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getLastEvent();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full flex lg:flex-row flex-col justify-center gap-5 md:px-10 px-0 mt-5">
        <div className="w-full flex justify-between flex-col p-10 gap-10">
          <div className="flex flex-col w-full gap-5">
            <h2 className="text-3xl font-bold text-neutral-black">
              {event?.title}
            </h2>
            <p className="text-lg text-neutral-black/70 p-2">
              {event?.content}
            </p>
          </div>
        </div>
        <div className="flex-center md:p-0 p-8 w-full">
          <img
            src={event?.imageUrl || "/assets/images/placeholder.png"}
            alt="Event Teaser"
            className="rounded-xl"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex md:flex-row flex-col w-full lg:gap-10 gap-2 justify-center md:px-0 px-5">
        <div className="flex w-full justify-end items-end">
          <img
            src="/assets/images/nano9124.png"
            alt="image"
            className="h-3/4 w-3/4 md:w-fit rounded-xl"
            loading="lazy"
          />
        </div>
        <div className="flex justify-center w-full">
          <img
            src="/assets/images/nano51224.png"
            alt="image"
            className="rounded-xl md:w-full w-[75%]"
            loading="lazy"
          />
        </div>
        <div className="w-full flex">
          <img
            src="/assets/images/nano13924.png"
            alt="image"
            className="h-3/4 w-3/4 md:w-fit rounded-xl"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default RecentEvent;
