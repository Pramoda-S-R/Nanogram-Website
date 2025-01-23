import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import {
  useFollowUser,
  useUnFollowUser,
} from "../../lib/react_query/queriesAndMutations";
import SpinLoader from "./SpinLoader";

const FollowButton = ({ follower, followed }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const { mutate: followUser, isPending: isPendingFollow } = useFollowUser();
  const { mutate: unFollowUser, isPending: isPendingUnFollow } =
    useUnFollowUser();

  if (follower === followed) return;

  const followedRecord = follower?.following.find(
    (record) => record.followed.$id === followed?.$id
  );

  useEffect(() => {
    setIsFollowing(!!followedRecord);
  }, [follower]);

  const handleFollow = (e) => {
    e.stopPropagation();
    if (followedRecord) {
      // unfollow
      unFollowUser(followedRecord.$id);
      setIsFollowing(false);
    } else {
      // follow
      followUser({ followerId: follower?.$id, followedId: followed?.$id });
      setIsFollowing(true);
    }
  };

  return (
    <Button
      variant={isFollowing ? "outline" : "primary"}
      onClick={handleFollow}
      disabled={!followed || isPendingFollow || isPendingUnFollow}
    >
      {isPendingFollow || isPendingUnFollow ? (
        <SpinLoader />
      ) : isFollowing ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </Button>
  );
};

export default FollowButton;
