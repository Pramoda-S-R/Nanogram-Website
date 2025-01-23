import React, { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import {
  useGetCurrentUser,
  useGetUserById,
  useGetUserPosts,
} from "../../lib/react_query/queriesAndMutations";
import GridPostList from "../../components/shared/GridPostList";
import Loader from "../../components/shared/Loader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CakeSlice, Coins, FilePenLine } from "lucide-react";
import FollowButton from "../../components/shared/FollowButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/Dialog";
import { Followers, Following } from "../../components/shared/Follows";
import { formatDate, getUserKarma } from "../../lib/utils";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: posts, isLoading, isError } = useGetUserPosts(id || "");
  const { data: user } = useGetUserById(id || "");
  const { data: currentUser } = useGetCurrentUser();

  const location = useLocation();
  const [isFollowerDialogOpen, setIsFollowerDialogOpen] = useState(false);
  const [isFollowingDialogOpen, setIsFollowingDialogOpen] = useState(false);

  useEffect(() => {
    setIsFollowerDialogOpen(false);
    setIsFollowingDialogOpen(false);
  }, [location]);

  return (
    <div className="common-container w-full h-screen md:px-8 lg:px-20 px-0 md:pt-28 py-2 overflow-y-scroll custom-scrollbar">
      <div className="max-w-5xl flex flex-col w-full gap-6 md:gap-3">
        <div className="flex flex-wrap w-full">
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
                <Dialog
                  open={isFollowerDialogOpen}
                  onOpenChange={setIsFollowerDialogOpen}
                >
                  <DialogTrigger>
                    <div
                      className="flex flex-col items-center"
                      onClick={() => setIsFollowerDialogOpen(true)}
                    >
                      <p>{user?.followers.length || 0}</p>
                      <p>Followers</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Followers</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <hr className="w-full" />
                    <Followers user={user} currentUser={currentUser} />
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={isFollowingDialogOpen}
                  onOpenChange={setIsFollowingDialogOpen}
                >
                  <DialogTrigger>
                    <div
                      className="flex flex-col items-center"
                      onClick={() => setIsFollowingDialogOpen(true)}
                    >
                      <p>{user?.following.length || 0}</p>
                      <p>Following</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Following</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <hr className="w-full" />
                    <Following user={user} currentUser={currentUser} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          {currentUser?.$id === user?.$id ? (
            <div className="flex md:w-fit w-full items-start gap-4 pt-4 ml-[5.5rem]">
              <Button
                variant="ghost"
                onClick={() => navigate("/update-profile")}
                className={`${!currentUser ? "hidden" : ""}`}
              >
                <FilePenLine /> Edit Profile
              </Button>
            </div>
          ) : (
            <div className="flex md:w-fit w-full items-start gap-4 pt-4 ml-[5.5rem]">
              <FollowButton follower={currentUser} followed={user} />
              <Button
                variant="secondary"
                className={"border-2 border-neutral-white"}
                onClick={() => navigate(`/messages/${user?.$id}`)}
                disabled={!user}
              >
                Message
              </Button>
            </div>
          )}
        </div>
        <div className="flex md:flex-row flex-col gap-3 p-4">
          <div className="flex flex-col gap-3">
            <div className="flex-start gap-2">
              <CakeSlice />
              <p className="base-medium text-[10px] lg:body-bold text-neutral-black">
                {formatDate(user?.$createdAt, "MMMM DD, YYYY")}
              </p>
            </div>
            <div className="flex-start gap-2">
              <Coins />
              <p className="base-medium text-[10px] lg:body-bold text-neutral-black">
                {getUserKarma(user)}
              </p>
              <p className="base-medium text-[10px] lg:body-bold text-neutral-black">
                Nanobytes
              </p>
            </div>
          </div>
          <div className="h-full border" />
          <div className="max-w-md">
            <p>{user?.bio}</p>
          </div>
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
