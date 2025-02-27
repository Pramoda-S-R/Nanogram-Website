import React from "react";
import Loader from "../../components/shared/Loader";
import {
  useGetRecentPosts,
  useGetTopUsers,
} from "../../lib/react_query/queriesAndMutations";
import PostCard from "../../components/shared/PostCard";
import ProfileIcon from "../../components/shared/ProfileIcon";
import SpinLoader from "../../components/shared/SpinLoader";
import { Link } from "react-router-dom";
import { Coins } from "lucide-react";

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  const {
    data: topUsers,
    isPending: isTopUsersLoading,
    isError: isErrorTopUsers,
  } = useGetTopUsers(10);
  console.log(topUsers);

  const hasPosts = posts?.documents && posts.documents.length > 0;

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          {isPostLoading ? (
            <Loader />
          ) : isErrorPosts ? (
            <div className="text-center text-neutral-black">
              Failed to load posts. Try again later.
            </div>
          ) : hasPosts ? (
            <ul className="flex flex-1 flex-col gap-9 w-full my-24 lg:my-14 md:my-28">
              {posts.documents.map((post) => (
                <PostCard key={post.$id} post={post} />
              ))}
            </ul>
          ) : (
            <div className="text-center text-neutral-black/50 py-24 md:py-14">
              No posts available.
            </div>
          )}
        </div>
      </div>
      <div className="bg-primary md:pt-[4.75rem] pt-[4.5rem] lg:flex flex-col hidden w-64 h-screen p-3 overflow-y-scroll custom-scrollbar">
        {isTopUsersLoading ? (
          <SpinLoader />
        ) : (
          <>
            <div className="flex-center">
              <h2 className="h3-bold md:h2-bold text-neutral-white px-2 pb-3">
                Top Creators
              </h2>
            </div>
            <div className="bg-neutral-white border border-neutral-black">
              {(topUsers?.documents || []).map((user) => (
                <div key={user?.$id} className="flex flex-col gap-3 p-4">
                  <Link to={`/profile/${user.$id}`}>
                    <div className="flex items-center gap-3">
                      <img
                        src={user.imageUrl || "/assets/icons/user.svg"}
                        alt={user.name || "user"}
                        loading="lazy"
                        className="rounded-full size-8 lg:size-12"
                      />
                      <div className="flex flex-col">
                        <p className="base-medium lg:body-bold text-neutral-black">
                          {user.name}
                        </p>
                        <p className="flex gap-1 subtle-semibold lg:small-regular text-neutral-black">
                          <Coins size={16} />
                          {user.karma} Nanobytes
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
