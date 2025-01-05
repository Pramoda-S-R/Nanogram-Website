import React from "react";
import FollowButton from "./FollowButton";
import { Link } from "react-router-dom";
import { DialogClose } from "../ui/Dialog";

const Followers = ({ user, currentUser }) => {
  return (
    <div>
      <ul>
        {user?.followers.length === 0 ? (
          <p className="w-full text-center">Nothing to see here</p>
        ) : (
          user?.followers.map((follows) => (
            <li
              key={follows.$id}
              className="flex justify-between items-center pb-2"
            >
              <div className="flex gap-2">
                <Link
                  to={`/profile/${follows.follower.$id}`}
                >
                  <img
                    src={follows.follower.imageUrl || "/assets/icons/user.svg"}
                    alt="user"
                    className="rounded-full md:size-14 size-10"
                    loading="lazy"
                  />
                </Link>
                <div className="flex flex-col">
                  <p className="text-md font-semibold">
                    {follows.follower.name}
                  </p>
                  <p className="text-xs font-light">
                    @{follows.follower.username}
                  </p>
                </div>
              </div>
              {currentUser?.$id === follows.follower.$id ? (
                <></>
              ) : (
                <FollowButton
                  follower={currentUser}
                  followed={follows.follower}
                />
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

const Following = ({ user, currentUser }) => {
  return (
    <div>
      <ul>
        {user?.following.length === 0 ? (
          <p className="w-full text-center">Nothing to see here</p>
        ) : (
          user?.following.map((follows) => (
            <li
              key={follows.$id}
              className="flex justify-between items-center pb-2"
            >
              <div className="flex gap-2">
                <Link
                  to={`/profile/${follows.followed.$id}`}
                >
                  <img
                    src={follows.followed.imageUrl || "/assets/icons/user.svg"}
                    alt="user"
                    className="rounded-full md:size-14 size-10"
                    loading="lazy"
                  />
                </Link>
                <div className="flex flex-col">
                  <p className="text-md font-semibold">
                    {follows.followed.name}
                  </p>
                  <p className="text-xs font-light">
                    @{follows.followed.username}
                  </p>
                </div>
              </div>
              {currentUser?.$id === follows.followed.$id ? (
                <></>
              ) : (
                <FollowButton
                  follower={currentUser}
                  followed={follows.followed}
                />
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export { Followers, Following };
