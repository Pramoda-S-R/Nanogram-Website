import React, { useEffect, useState } from "react";
import { getUpcomingEvents } from "../../../lib/appwrite/api";
import EventCard from "../../../components/shared/EventCard";

// Upcoming Component
const Upcoming = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getUpcomingEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <>
      {events?.documents.length !== 0 ? (
        <div
          className="w-full text-neutral-black py-16 sm:py-10"
          id="new-events"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
              {events?.documents.map((event, index) => {
                const date = new Date(event?.date);
                return (
                  <EventCard
                    key={index}
                    date={date.toDateString()}
                    title={event?.title}
                    description={event?.description}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Upcoming;
