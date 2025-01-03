import { ImagePlus } from "lucide-react";
import PostForm from "../../components/forms/PostForm";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetPostById } from "../../lib/react_query/queriesAndMutations";
import SpinLoader from "../../components/shared/SpinLoader";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");

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

  // Avoid conditional rendering of hooks
  return (
    <div className="flex flex-col h-screen overflow-y-scroll custom-scrollbar w-full py-5">
      {isPending ? (
        <SpinLoader />
      ) : (
        <div className="update-container md:pt-[4.75rem] pt-[4.5rem]">
          <div className="flex-start gap-3 justify-start w-full p-4">
            <ImagePlus size={36} />
            <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
          </div>
          <PostForm action="Update" post={post} />
        </div>
      )}
    </div>
  );
};

export default EditPost;
