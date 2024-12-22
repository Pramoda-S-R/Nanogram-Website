import React from "react";
import { useToast } from "../../components/ui/Toast";
import Loader from "../../components/shared/Loader";
import { useGetRecentPosts } from "../../lib/react_query/queriesAndMutations";
import PostCard from "../../components/shared/PostCard";

const Home = () => {
  const toast = useToast();

  const { data: posts, isPending: isPostLoading, isError: isErrorPosts } = useGetRecentPosts();

  const hasPosts = posts?.documents && posts.documents.length > 0;

  return (
    <div className="flex flex-1 h-screen-top">
      <div className="home-container">
        <div className="home-posts">
          {isPostLoading ? (
            <Loader />
          ) : isErrorPosts ? (
            <div className="text-center text-neutral-black">Failed to load posts. Try again later.</div>
          ) : hasPosts ? (
            <ul className="flex flex-1 flex-col gap-9 w-full">
              {posts.documents.map((post) => (
                <PostCard key={post.$id} post={post} />
              ))}
            </ul>
          ) : (
            <div className="text-center text-accent-gray">No posts available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
