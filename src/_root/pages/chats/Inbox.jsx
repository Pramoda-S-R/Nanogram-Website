import { Controls, Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import { useMediaQuery } from "react-responsive";
import Contacts from "../../../components/shared/Contacts";

const Inbox = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  if (isMobile) return <Contacts />;
  return (
    <div className="w-full h-full flex justify-center items-start">
      <Player
        autoplay
        loop
        src="https://lottie.host/e163d0bc-a751-4b8f-9261-1a426e1443e5/ZWgFJamtbr.json"
        style={{ height: "89vh" }}
      >
        <Controls visible={false} />
      </Player>
    </div>
  );
};

export default Inbox;
