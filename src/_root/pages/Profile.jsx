import React, { useEffect } from "react";
import Button from "../../components/ui/Button";
import {
  useGetCurrentUser,
  useGetUserById,
  useGetUserPosts,
} from "../../lib/react_query/queriesAndMutations";
import GridPostList from "../../components/shared/GridPostList";
import Loader from "../../components/shared/Loader";
import { useParams } from "react-router-dom";
import { FilePenLine } from "lucide-react";
import FollowButton from "../../components/shared/FollowButton";

const Profile = () => {
  const { id } = useParams();
  const { data: posts, isLoading, isError } = useGetUserPosts(id || "");
  const { data: user } = useGetUserById(id || "");
  const { data: currentUser } = useGetCurrentUser();

  return (
    <div className="common-container w-full h-screen md:px-8 lg:px-20 px-0 md:pt-28 py-2 lg:overflow-y-hidden overflow-y-scroll custom-scrollbar">
      <div className="max-w-5xl flex flex-col w-full gap-6 md:gap-3">
        <div className="flex justify- flex-wrap w-full">
          <div className="flex gap-6 items-start">
            <img
              src={user?.imageUrl || "/assets/icons/user.svg"}
              alt="user"
              className="rounded-full md:size-24 size-16"
              loading="lazy"
            />
            <div className="flex justify-start flex-col gap-1">
              <p className="text-xl font-semibold">{user?.name}</p>
              <p className="font-light">@{user?.username}</p>
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <p>{user?.posts.length || 0}</p>
                  <p>Posts</p>
                </div>
                <div className="flex flex-col items-center">
                  <p>{user?.followers.length || 0}</p>
                  <p>Followers</p>
                </div>
                <div className="flex flex-col items-center">
                  <p>{user?.following.length || 0}</p>
                  <p>Following</p>
                </div>
              </div>
            </div>
          </div>
          {currentUser?.$id === user?.$id ? (
            <div className="flex md:w-fit w-full items-start gap-4 pt-4 ml-[5.5rem]">
              <Button variant="ghost">
                <FilePenLine /> Edit Profile
              </Button>
            </div>
          ) : (
            <div className="flex md:w-fit w-full items-start gap-4 pt-4 ml-[5.5rem]">
              <FollowButton
                follower={currentUser}
                followed={user}
              />
              <Button
                variant="secondary"
                className={"border-2 border-neutral-white"}
              >
                Message
              </Button>
            </div>
          )}
        </div>
        <div className="max-w-md">
          <p>{user?.bio}</p>
        </div>
      </div>
      <hr className="w-full border-neutral-black my-6" />
      {!user || isLoading || isError ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9 mb-14">
          {posts?.documents.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList
              posts={posts?.documents}
              showStats={false}
              showUser={false}
            />
          )}
        </ul>
      )}
    </div>
  );
};

export default Profile;
