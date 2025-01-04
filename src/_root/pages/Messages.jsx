import {
  Laugh,
  MessageCircleMore,
  SendHorizontal,
  SquarePen,
} from "lucide-react";
import React, { useState } from "react";
import { useGetUsers } from "../../lib/react_query/queriesAndMutations";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/Popover";

function Contact({ contact, onClick }) {
  return (
    <li className="pb-5" key={contact.$id}>
      <div
        className="flex gap-3 cursor-pointer"
        onClick={() => onClick(contact)}
      >
        <img
          src={contact?.imageUrl || "/assets/icons/user.svg"}
          alt="user"
          className="rounded-full md:size-14 size-10"
          loading="lazy"
        />

        <div className="lg:flex hidden justify-start flex-col gap-1">
          <p className="text-xl font-semibold">{contact?.name}</p>
          <p className="font-light">@{contact?.username}</p>
        </div>
      </div>
    </li>
  );
}

function Chat({ contact }) {
  const navigate = useNavigate();
  return (
    <div className="flex w-full h-full flex-col">
      <div className="w-full p-2">
        <div
          className="flex gap-3 cursor-pointer items-center"
          onClick={() => navigate(`/profile/${contact.$id}`)}
        >
          <img
            src={contact?.imageUrl || "/assets/icons/user.svg"}
            alt="user"
            className="rounded-full md:size-10 size-8"
            loading="lazy"
          />

          <div className="flex justify-start flex-col">
            <p className="text-md font-semibold">{contact?.name}</p>
            <p className="text-xs font-light">@{contact?.username}</p>
          </div>
        </div>
      </div>
      <hr className="w-full" />
      <div className="flex flex-1"></div>
      <form className="relative">
        <Input
          icon={
            <Popover>
              <PopoverTrigger>
                <Laugh />
              </PopoverTrigger>
              <PopoverContent>
                Place content for the popover here.
              </PopoverContent>
            </Popover>
          }
          type="text"
          id="message"
          placeholder="Write a message..."
          className="pr-12"
          //   {...register("message")}
        />
        <Button
          variant="link"
          type="submit"
          className="absolute right-0 top-1"
          disabled={false}
        >
          <SendHorizontal />
        </Button>
      </form>
    </div>
  );
}

const Messages = () => {
  const {
    data: creators,
    isLoading,
    isError: isErrorCreators,
  } = useGetUsers(12);

  const [displayedContact, setDisplayedContact] = useState(null);

  const handleClick = (contact) => {
    setDisplayedContact(contact);
  };
  console.log(displayedContact);

  return (
    <div className="default-container flex flex-row md:pb-0 pb-[4.75rem]">
      <div className="flex flex-col">
        <div className="flex w-full lg:justify-between justify-center lg:p-5 p-1">
          <div className="lg:flex hidden  gap-3 justify-center">
            <MessageCircleMore className="w-9 h-9"/>
            <h2 className="h3-bold md:h2-bold text-left">All Chats</h2>
          </div>
          <div className="flex-center">
            <SquarePen className="size-6 lg:mx-0 md:mx-4 mx-2" />
          </div>
        </div>
        {/* <hr className="w-full border-neutral-black/70" /> */}
        <ul className="lg:w-[30vw] w-fit lg:px-5 lg:pt-5 px-1 pt-1">
          {creators?.documents.map((contact) => (
            <Contact
              key={contact.$id}
              contact={contact}
              onClick={handleClick}
            />
          ))}
        </ul>
      </div>
      <div className="border-l border-neutral-black h-full" />
      <div className="w-full">
        {!displayedContact ? (
          <div className="w-full h-full flex-center">
            <Player
              autoplay
              loop
              src="https://lottie.host/e163d0bc-a751-4b8f-9261-1a426e1443e5/ZWgFJamtbr.json"
              style={{ height: "89vh", width: "50vw" }}
            >
              <Controls visible={false} />
            </Player>
          </div>
        ) : (
          <Chat contact={displayedContact} />
        )}
      </div>
    </div>
  );
};

export default Messages;
