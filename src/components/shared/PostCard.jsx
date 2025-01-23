import React from "react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../lib/utils";
import { FilePenLine } from "lucide-react";
import PostStats from "./PostStats";
import { ParseText } from "./ParseText";
import { useGetCurrentUser } from "../../lib/react_query/queriesAndMutations";
import ProfileIcon from "./ProfileIcon";

const PostCard = ({ post }) => {
  const { data: currentUser } = useGetCurrentUser();

  if (!post.creator) return;

  return (
    <div className="post-card shadow-2xl">
      <div className="flex-between">
        <ProfileIcon
          src={post?.creator?.imageUrl || "/assets/icons/user.svg"}
          alt={post?.creator.name || "creator"}
          className="rounded-full size-12"
          id={post.creator.$id}
          name={post.creator.name}
          time={timeAgo(post.$createdAt)}
          details={true}
        />

        <Link
          to={`/update-post/${post.$id}`}
          className={`${currentUser?.$id !== post.creator.$id && "hidden"}`}
        >
          <FilePenLine size={20} />
        </Link>
      </div>
      <div className="small-medium lg:base-medium py-5">
        <p>{ParseText(post.caption)}</p>
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
      <Link to={`/posts/${post.$id}`}>
        <img
          src={post.imageUrl || "/assets/icons/user.svg"}
          alt={post.caption || "post image"}
          className="post-card_img shadow-lg"
          loading="lazy"
        />
      </Link>

      <PostStats post={post} userId={currentUser?.$id} showComments={true} />
    </div>
  );
};

export default PostCard;
