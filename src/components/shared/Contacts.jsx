import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { MessageCircleMore, Search, SquarePen } from "lucide-react";
import {
  useGetCurrentUser,
  useSearchUsers,
} from "../../lib/react_query/queriesAndMutations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import Input from "../ui/Input";
import useDebounce from "../../hooks/useDebounce";
import Loader from "./Loader";
import { getContactsRealtime } from "../../lib/appwrite/realtime";

function Contact({ contact }) {
  return (
    <li className="pb-5" key={contact.$id}>
      <Link to={`/messages/${contact.$id}`}>
        <div className="flex gap-3 md:justify-center justify-start lg:justify-start cursor-pointer">
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
  const { data: currentUser } = useGetCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [latestChat, setLatestChat] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedUsers, isFetching } = useSearchUsers(debouncedValue);

  useEffect(() => {
    setIsDialogOpen(false);
  }, [location]);

  useEffect(() => {
    const unsubscribe = getContactsRealtime(currentUser?.$id, (response) => {
      setContacts((prevContacts) => {
        const contactId = response.$id;

        const existingContactIndex = prevContacts.findIndex(
          (contact) => contact.$id === contactId
        );

        if (existingContactIndex !== -1) {
          const updatedContacts = [...prevContacts];
          const [existingContact] = updatedContacts.splice(
            existingContactIndex,
            1
          );
          return [existingContact, ...updatedContacts];
        }

        return [response, ...prevContacts];
      });
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser?.$id]);

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      const contactMap = new Map();

      const allMessages = [...currentUser.sent, ...currentUser.received];

      allMessages.sort(
        (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
      );

      allMessages.forEach((message) => {
        const contact = message?.receiver || message?.sender;
        if (!contactMap.has(contact.$id)) {
          contactMap.set(contact.$id, contact);
        }
      });

      setContacts(Array.from(contactMap.values()));
      setIsLoading(false);
    }
  }, [currentUser]);

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowUsers = !shouldShowSearchResults && contacts?.length !== 0;

  return (
    <div
      className={clsx(className, "flex flex-col lg:w-[50vw] md:w-fit w-full")}
    >
      <div className="flex w-full lg:justify-between md:justify-center justify-between sm:justify-center lg:px-5 lg:pt-5 lg:py-0 md:px-1 md:py-4 px-5 pt-5 py-0">
        <div className="lg:flex md:hidden flex gap-3 justify-center">
          <MessageCircleMore className="w-9 h-9" />
          <h2 className="h3-bold md:h2-bold text-left">All Chats</h2>
        </div>
        <div className="flex-center gap-4 px-6">
          <Search
            size={24}
            onClick={() => navigate("/all-users")}
            className="md:hidden block"
          />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <SquarePen
                className="size-6 lg:mx-0 md:mx-4 mx-2"
                onClick={() => setIsDialogOpen(true)}
              />
            </DialogTrigger>
            <DialogContent className="max-w-[425px]">
              <DialogTitle className="text-lg font-bold">
                Add Contact
              </DialogTitle>
              <DialogDescription></DialogDescription>
              <hr className="w-full" />
              <div className="w-full flex flex-col gap-4">
                <Input
                  icon={<Search size={24} />}
                  placeholder="Search users by name or username"
                  className=""
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                {shouldShowSearchResults && !isFetching ? (
                  <ul>
                    {searchedUsers?.documents.map((contact) => (
                      <li
                        key={contact.$id}
                        className="flex-start gap-4 pb-4 cursor-pointer"
                        onClick={() => navigate(`/messages/${contact.$id}`)}
                      >
                        <img
                          src={contact.imageUrl || "/assets/icons/user.svg"}
                          alt={contact.name || "contact"}
                          className="size-10 rounded-full"
                          loading="lazy"
                        />
                        <div className="flex justify-start flex-col">
                          <p className="text-md font-semibold">
                            {contact.name}
                          </p>
                          <p className="text-xs font-light">
                            @{contact.username}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : shouldShowUsers && !isLoading ? (
                  <ul className="w-full">
                    {contacts?.map((contact) => (
                      <li
                        key={contact.$id}
                        className="flex-start gap-4 pb-4 cursor-pointer"
                        onClick={() => navigate(`/messages/${contact.$id}`)}
                      >
                        <img
                          src={contact.imageUrl || "/assets/icons/user.svg"}
                          alt={contact.name || "contact"}
                          className="size-10 rounded-full"
                          loading="lazy"
                        />
                        <div className="flex justify-start flex-col">
                          <p className="text-md font-semibold">
                            {contact.name}
                          </p>
                          <p className="text-xs font-light">
                            @{contact.username}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : contacts?.length !== 0 ? (
                  <div className="flex-center w-full mt-10">
                    <Loader />
                  </div>
                ) : (
                  <div className="text-center text-neutral-black/50 py-24 md:py-14">
                    No users available.
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <ul className="w-full h-full lg:px-5 lg:pt-5 md:px-1 md:pt-1 px-5 pt-5 overflow-y-scroll custom-scrollbar">
        {contacts?.length !== 0 ? (
          contacts?.map((contact) => (
            <Contact key={contact.$id} contact={contact} />
          ))
        ) : (
          <p className="w-full text-center text-neutral-black/70">
            Start a conversation with someone
          </p>
        )}
      </ul>
    </div>
  );
};

export default Contacts;
