import { ImagePlus } from "lucide-react";
import PostForm from "../../components/forms/PostForm";
import React, { useEffect } from "react";

const CreatePost = () => {
  useEffect(() => {
    // Add overflow hidden to html and body when component mounts
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Clean up the styles when component unmounts
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col h-screen overflow-y-scroll custom-scrollbar md:pt-24 py-2">
      <div className="common-container">
        <div className="w-full flex-start gap-3 justify-start">
          <ImagePlus size={36} />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>
      </div>
      <PostForm action="Post" />
    </div>
  );
};

export default CreatePost;
