import React from "react";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const UserCard = ({ currentUser, user }) => {
  return (
    <div className="user-card">
      <Link to={`/profile/${user.$id}`} className="flex-center flex-col gap-4">
        <img
          src={user.imageUrl || "/assets/icons/user.svg"}
          alt="creator"
          className="rounded-full w-14 h-14"
          loading="lazy"
        />

        <div className="flex-center flex-col gap-1">
          <p className="base-medium text-light-1 text-center line-clamp-1">
            {user.name}
          </p>
          <p className="small-regular text-light-3 text-center line-clamp-1">
            @{user.username}
          </p>
        </div>
      </Link>
      <FollowButton follower={currentUser} followed={user} />
    </div>
  );
};

export default UserCard;
