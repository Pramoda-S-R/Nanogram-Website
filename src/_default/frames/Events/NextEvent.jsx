import React from "react";
import ShiftingCountdown from "../../../components/ui/ShiftingCountdown";
import { CalendarDays, Pin } from "lucide-react";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const NextEvent = () => {
  const navigate = useNavigate();

  return (
    <>
      <ShiftingCountdown
        title={"Register Now!"}
        countdownFrom="2025-01-09T00:00:00"
      />
      <div className="w-full flex lg:flex-row flex-col justify-center gap-5 py-10">
        <div className="flex-center md:p-0 p-8">
          <img
            src="/assets/images/placeholder.png"
            alt="Event Teaser"
            className="rounded-xl "
            loading="lazy"
          />
        </div>
        <div className="xl:max-w-4xl lg:max-w-xl max-w-full flex justify-between flex-col p-10 gap-10">
          <div className="flex flex-col w-full gap-5">
            <h2 className="text-3xl font-bold text-neutral-black">
              Event Title
            </h2>
            <p className="text-lg text-neutral-black/70 p-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              natus quisquam commodi. Doloremque, sint. Dolores tempora rem
              asperiores velit illum non repellat earum nostrum ab voluptatum,
              corrupti, eum laborum sequi dolor eligendi, ipsa cupiditate
              aliquid accusamus inventore voluptatem rerum saepe. Aliquid aut
              quia ad rerum iusto? Illum maxime nisi excepturi!
            </p>
            <div className="text-lg text-neutral-black/70 font-semibold p-4">
              <div className="flex-start gap-2">
                <CalendarDays /> Lorem ipsum dolor sit amet.
              </div>
              <div className="flex-start gap-2">
                <Pin /> Lorem ipsum dolor sit amet.
              </div>
            </div>
          </div>
          <Button onClick={() => navigate("/")} className={"w-fit"}>
            Register now
          </Button>
        </div>
      </div>
    </>
  );
};

export default NextEvent;
