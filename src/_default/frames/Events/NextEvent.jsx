import React, { useEffect, useState } from "react";
import ShiftingCountdown from "../../../components/ui/ShiftingCountdown";
import { CalendarDays, Pin } from "lucide-react";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { getNextEvent } from "../../../lib/appwrite/api";
import Banner from "../../../components/motion/Banner";

const NextEvent = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getNextEvent();
        setEvent(data);
        setDate(new Date(data?.date));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <>
      {event ? (
        <>
          {event?.date && (
            <ShiftingCountdown
              title={event?.registration ? "Register Now!" : "Event Update!"}
              countdownFrom={event?.date}
            />
          )}
          <div className="w-full flex lg:flex-row flex-col justify-center gap-5 md:px-10 px-0 ">
            <div className="flex-center w-full md:p-0 p-8">
              <img
                src={event?.imageUrl || "/assets/images/placeholder.png"}
                alt="Event Teaser"
                className="rounded-xl "
                loading="lazy"
              />
            </div>
            <div className="w-full flex justify-between flex-col p-10 gap-10">
              <div className="flex flex-col w-full gap-5">
                <h2 className="text-3xl font-bold text-neutral-black">
                  {event?.title}
                </h2>
                <p className="text-lg text-neutral-black/70 p-2">
                  {event?.content}
                </p>
                <div className="text-lg text-neutral-black/70 font-semibold p-4">
                  <div className="flex-start gap-2">
                    <CalendarDays />{" "}
                    {date &&
                      `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
                  </div>
                  <div className="flex-start gap-2">
                    {event?.location && (
                      <>
                        <Pin /> {event?.location}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {event?.registration && (
                <Button
                  onClick={() => window.open(event?.registration, "_blank")}
                  className={"w-fit"}
                >
                  Register now
                </Button>
              )}
            </div>
          </div>
        </>
      ) : (
        <Banner />
      )}
    </>
  );
};

export default NextEvent;
