import React, { useEffect } from "react";
import { messageRealtime } from "../../lib/appwrite/realtime";
import { useGetCurrentUser } from "../../lib/react_query/queriesAndMutations";

const Blog = () => {
  const { data: currentUser } = useGetCurrentUser();
  const [messages, setMessages] = React.useState([]);

  useEffect(() => {
    const unsubscribe = messageRealtime(currentUser?.$id, (response) => {
      if (response.event === "create") {
        setMessages((prevMessages) => [...prevMessages, response.payload]);
      } else if (response.event === "delete") {
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.$id !== response.payload.$id)
        );
      }
    });
    return () => {
      unsubscribe();
    };
  }, [currentUser?.$id]);

  return (
    <div className="default-container">
      {messages?.map((message) => (
        <p key={message.$id}>{message.content}</p>
      ))}
    </div>
  );
};

export default Blog;
