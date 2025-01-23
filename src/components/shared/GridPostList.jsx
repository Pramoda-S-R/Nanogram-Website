import React from "react";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import { useGetCurrentUser } from "../../lib/react_query/queriesAndMutations";
import ProfileIcon from "./ProfileIcon";

const GridPostList = ({ posts, showUser = true, showStats = true }) => {
  const { data: currentUser } = useGetCurrentUser();
  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-0">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-fit object-cover"
              loading="lazy"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <ProfileIcon
                src={post.creator.imageUrl}
                alt="creator"
                className="size-8 rounded-full bg-neutral-white p-0.5"
                id={post.creator.$id}
                name={post.creator.name}
                details={false}
              />
            )}
            {showStats && <PostStats post={post} userId={currentUser?.$id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
