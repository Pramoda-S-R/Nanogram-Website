import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { MessageCircleMore, SquarePen } from "lucide-react";
import { useGetUsers } from "../../lib/react_query/queriesAndMutations";

function Contact({ contact }) {
  return (
    <li className="pb-5" key={contact.$id}>
      <Link to={`/messages/${contact.$id}`}>
        <div className="flex gap-3 cursor-pointer">
          <img
            src={contact?.imageUrl || "/assets/icons/user.svg"}
            alt="user"
            className="rounded-full size-14"
            loading="lazy"
          />

          <div className="lg:flex md:hidden flex justify-start flex-col gap-1">
            <p className="text-xl font-semibold">{contact?.name}</p>
            <p className="font-light">@{contact?.username}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}

const Contacts = ({ className }) => {
  const {
    data: creators,
    isLoading,
    isError: isErrorCreators,
  } = useGetUsers(12);
  return (
    <div
      className={clsx(className, "flex flex-col lg:w-[50vw] md:w-fit w-full")}
    >
      <div className="flex w-full lg:justify-between md:justify-center justify-between sm:justify-center lg:px-5 lg:pt-5 lg:py-0 md:px-1 md:py-4 px-5 pt-5 py-0">
        <div className="lg:flex md:hidden flex gap-3 justify-center">
          <MessageCircleMore className="w-9 h-9" />
          <h2 className="h3-bold md:h2-bold text-left">All Chats</h2>
        </div>
        <div className="flex-center">
          <SquarePen className="size-6 lg:mx-0 md:mx-4 mx-2" />
        </div>
      </div>
      <ul className="w-full h-full lg:px-5 lg:pt-5 md:px-1 md:pt-1 px-5 pt-5 overflow-y-scroll custom-scrollbar">
        {creators?.documents.map((contact) => (
          <Contact key={contact.$id} contact={contact} />
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
