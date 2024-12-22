import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FilePenLine, Trash } from "lucide-react";
import Button from "../../components/ui/Button";
import PostStats from "../../components/shared/PostStats";
import SpinLoader from "../../components/shared/SpinLoader";
import { timeAgo } from "../../lib/utils";
import { useUserContext } from "../../context/AuthContext";
import { useGetPostById } from "../../lib/react_query/queriesAndMutations";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();

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

  const handleDeletePost = () => {};

  return (
    <div className="post_details-container">
      {isPending ? (
        <SpinLoader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={post?.creator?.imageUrl || "/assets/icons/user.svg"}
                  alt={post?.creator.name || "creator"}
                  className="rounded-full size-8 lg:size-12"
                />
                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-neutral-black">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-neutral-black font-light">
                    <p className="subtle-semibold lg:small-regular">
                      {timeAgo(post?.$createdAt)}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex-center">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${
                    user.id !== post?.creator.$id && "hidden"
                  } text-primary`}
                >
                  <FilePenLine />
                </Link>
                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`${
                    user.id !== post?.creator.$id && "hidden"
                  } text-red-500`}
                >
                  <Trash />
                </Button>
              </div>
            </div>
            <hr className="border w-full border-neutral-black/50" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-medium">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag) => (
                  <li key={tag} className="text-primary font-light">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
