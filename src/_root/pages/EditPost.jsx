import { ImagePlus } from "lucide-react";
import PostForm from "../../components/forms/PostForm";
import { useEffect } from "react";
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
    <div className="flex flex-1 flex-col h-screen-top overflow-y-scroll custom-scrollbar">
      {isPending ? (
        <SpinLoader />
      ) : (
        <div className="common-container">
          <div className="max-w-5xl flex-start gap-3 justify-start w-full">
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
