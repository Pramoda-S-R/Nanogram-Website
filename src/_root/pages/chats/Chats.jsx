import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EmojiPicker from "emoji-picker-react";
import clsx from "clsx";
import Input from "../../../components/ui/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/Popover";
import { ChevronLeft, Ellipsis, Laugh, SendHorizontal } from "lucide-react";
import Button from "../../../components/ui/Button";
import {
  useCreateMessage,
  useDeleteMessage,
  useGetCurrentUser,
  useGetMessages,
  useGetUserById,
  useUpdateMessage,
} from "../../../lib/react_query/queriesAndMutations";
import { ParseText } from "../../../components/shared/ParseText";
import { messageFormSchema } from "../../../lib/validation";
import { useToast } from "../../../components/ui/Toast";
import { useInView } from "react-intersection-observer";
import SpinLoader from "../../../components/shared/SpinLoader";
import { messageRealtime } from "../../../lib/appwrite/realtime";

function ChatHeader({ contact }) {
  return (
    <div className="flex gap-3 w-full p-2">
      <Link to="/messages" className="flex gap-3 cursor-pointer items-center">
        <ChevronLeft />
      </Link>
      <Link
        to={`/profile/${contact?.$id}`}
        className="flex gap-3 cursor-pointer items-center"
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
      </Link>
    </div>
  );
}

function ChatBody({
  messages,
  currentUser,
  onDelete,
  onUpdate,
  hasNextPage,
  inViewRef,
}) {
  let lastMesssageSender = null;

  return (
    <div className="flex h-[50vh] flex-col-reverse justify-start flex-1 pt-5 overflow-y-scroll custom-scrollbar">
      {messages?.map((message) => {
        const receivedByCurrentUser =
          message?.receiver.$id === currentUser?.$id;
        const differentSender = lastMesssageSender !== message?.sender.$id;
        lastMesssageSender = message?.sender.$id;
        return (
          <div
            key={message.$id}
            className={`w-full group ${
              differentSender ? "pb-5" : "pb-1"
            } px-2 gap-2 flex items-end ${
              receivedByCurrentUser ? "flex-row" : "flex-row-reverse"
            }`}
          >
            {differentSender ? (
              <img
                src={message?.sender.imageUrl || "/assets/icons/user.svg"}
                alt="user"
                className={"rounded-full md:size-10 size-8"}
              />
            ) : (
              <div className="size-8 md:size-10"></div>
            )}
            <div
              className={`flex max-w-[69%] ${
                receivedByCurrentUser
                  ? "justify-start items-start"
                  : "justify-end items-end"
              }`}
            >
              <div className="relative flex flex-col gap-1">
                <p className="w-fit bg-primary text-neutral-white px-5 py-2 rounded-3xl">
                  {ParseText(message?.content)}
                </p>
                {message?.reactions?.length > 0 && (
                  <div className={`absolute -bottom-3 ${receivedByCurrentUser ? "left-0" : "right-0"} flex gap-1`}>
                    {message?.reactions.map((reaction, index) => (
                      <img
                        key={Math.random() + index}
                        src={reaction}
                        alt="emoji"
                        className="w-5"
                        onClick={() =>
                          onUpdate({
                            id: message.$id,
                            content: message.content,
                            reactions: message.reactions.filter(
                              (reactionElement) => reactionElement !== reaction
                            ),
                          })
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="h-full flex-center gap-2">
              {currentUser?.$id === message?.sender.$id && (
                <Popover>
                  <PopoverTrigger>
                    <Ellipsis className="group-hover:block hidden" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <Button
                      variant="ghost"
                      className="text-red-600"
                      onClick={() => onDelete(message.$id)}
                    >
                      Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              )}
              <EmojiPickerPopover
                onSelectEmoji={(emoji) =>
                  onUpdate({
                    id: message.$id,
                    content: message.content,
                    reactions: [emoji.imageUrl, ...message.reactions],
                  })
                }
                className="group-hover:block hidden"
              />
            </div>
          </div>
        );
      })}
      {hasNextPage && messages.length > 20 && (
        <div ref={inViewRef} className="flex-center w-full py-5">
          <SpinLoader />
        </div>
      )}
    </div>
  );
}

function EmojiPickerPopover({ onSelectEmoji, className }) {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiClick = (emojiObject) => {
    setSelectedEmoji(emojiObject);
    if (onSelectEmoji) {
      onSelectEmoji(emojiObject);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Laugh className={clsx(className)} />
      </PopoverTrigger>
      <PopoverContent className="p-2 shadow-lg rounded-md">
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          lazyLoadEmojis
          theme="light" // You can set it to "dark" for a dark theme
        />
      </PopoverContent>
    </Popover>
  );
}

const Chats = () => {
  const { id } = useParams();
  const { ref, inView } = useInView();
  const { data: contact } = useGetUserById(id || "");
  const { data: currentUser } = useGetCurrentUser();
  const {
    data: messages,
    fetchNextPage,
    hasNextPage,
  } = useGetMessages({
    senderId: currentUser?.$id,
    receiverId: contact?.$id,
  });
  const { mutateAsync: sendMessage } = useCreateMessage();
  const { mutateAsync: updateMessage } = useUpdateMessage();
  const { mutateAsync: deleteMessage } = useDeleteMessage();

  const toast = useToast();

  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const unsubscribe = messageRealtime(currentUser?.$id, (response) => {
      if (response.event === "create") {
        setMessageList((prevMessages) => [response.payload, ...prevMessages]);
      } else if (response.event === "delete") {
        setMessageList((prevMessages) =>
          prevMessages.filter((message) => message.$id !== response.payload.$id)
        );
      } else if (response.event === "update") {
        setMessageList((prevMessages) =>
          prevMessages.map((message) =>
            message.$id === response.payload.$id ? response.payload : message
          )
        );
      }
    });
    return () => {
      unsubscribe();
    };
  }, [currentUser?.$id]);

  useEffect(() => {
    setMessageList([]);
  }, [id]);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  useEffect(() => {
    if (messages?.pages) {
      const allMessages = messages.pages.flatMap((page) => page.documents);
      setMessageList(allMessages);
    }
  }, [messages]);

  // Form State
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: "",
    },
  });

  const message = watch("message");

  const handleDelete = async (messageId) => {
    const status = await deleteMessage(messageId);
    if (!status) {
      toast({
        title: "Delete Failed!",
        description:
          "There was an error in deleting your message. Please try again.",
      });
    }
  };

  const handleUpdate = async (message) => {
    const updatedMessage = await updateMessage({
      id: message.id,
      content: message.content,
      reactions: message.reactions,
    });
    if (!updatedMessage) {
      toast({
        title: "Update Failed!",
        description:
          "There was an error in updating your message. Please try again.",
      });
    }
  };

  const onSubmit = async (data) => {
    setValue("message", "");
    const newMessage = await sendMessage({
      senderId: currentUser?.$id,
      receiverId: contact?.$id,
      content: data.message,
    });
    if (!newMessage) {
      toast({
        title: "Message Failed!",
        description:
          "There was an error in sending your message. Please try again.",
      });
    }
  };

  return (
    <div className="flex w-full h-full flex-col">
      <ChatHeader contact={contact} />
      <hr className="w-full" />
      <ChatBody
        messages={messageList}
        currentUser={currentUser}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        hasNextPage={hasNextPage}
        inViewRef={ref}
      />
      <form className="relative" onSubmit={handleSubmit(onSubmit)}>
        <Input
          icon={
            <EmojiPickerPopover
              onSelectEmoji={(emoji) =>
                setValue("message", watch("message") + emoji.emoji)
              }
            />
          }
          type="text"
          id="message"
          placeholder="Write a message..."
          className="pr-14"
          autoComplete="off"
          {...register("message")}
        />
        <Button
          variant="link"
          type="submit"
          className="absolute right-0 top-1"
          disabled={!message}
        >
          <SendHorizontal />
        </Button>
      </form>
    </div>
  );
};

export default Chats;
