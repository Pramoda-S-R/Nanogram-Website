import React from "react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../lib/utils";
import { FilePenLine } from "lucide-react";
import { useUserContext } from "../../context/AuthContext";
import PostStats from "./PostStats";

const PostCard = ({ post }) => {
  const { user } = useUserContext();

  if (!post.creator) return;

  return (
    <div className="post-card shadow-2xl">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={post?.creator?.imageUrl || "/assets/icons/user.svg"}
              alt={post?.creator.name || "creator"}
              className="rounded-full size-12"
              loading="lazy"
            />
          </Link>
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-neutral-black">
              {post.creator.name}
            </p>
            <div className="flex-center gap-2 text-neutral-black font-light">
              <p className="subtle-semibold lg:small-regular">
                {timeAgo(post.$createdAt)}
              </p>
            </div>
          </div>
        </div>
        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <FilePenLine size={20} />
        </Link>
      </div>
      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.length === 0
              ? null
              : post.tags.map((tag) => (
                  <li key={tag} className="text-primary font-light">
                    #{tag}
                  </li>
                ))}
          </ul>
        </div>
        <img
          src={post.imageUrl || "/assets/icons/user.svg"}
          alt={post.caption || "post image"}
          className="post-card_img shadow-lg"
          loading="lazy"
        />
      </Link>

      <PostStats post={post} userId={user.id} showComments={true} />
    </div>
  );
};

export default PostCard;
