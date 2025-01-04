import React from "react";
import FollowButton from "./FollowButton";
import { useGetCurrentUser } from "../../lib/react_query/queriesAndMutations";
import { Link } from "react-router-dom";
import { DialogClose } from "../ui/Dialog";

const Followers = ({ user, currentUser, onClick }) => {
  return (
    <div>
      <ul>
        {user?.followers.map((follows) => (
          <li
            key={follows.$id}
            className="flex justify-between items-center pb-2"
          >
            <div className="flex gap-2">
              <DialogClose>
                <Link
                  to={`/profile/${follows.follower.$id}`}
                  onClick={onClick(follows.follower)}
                >
                  <img
                    src={follows.follower.imageUrl || "/assets/icons/user.svg"}
                    alt="user"
                    className="rounded-full md:size-14 size-10"
                    loading="lazy"
                  />
                </Link>
              </DialogClose>
              <div className="flex flex-col">
                <p className="text-md font-semibold">{follows.follower.name}</p>
                <p className="text-xs font-light">
                  @{follows.follower.username}
                </p>
              </div>
            </div>
            {currentUser.$id === follows.follower.$id ? (
              <></>
            ) : (
              <FollowButton
                follower={currentUser}
                followed={follows.follower}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Following = ({ user, currentUser }) => {
  console.log(user);
  return (
    <div>
      <ul>
        {user?.following.map((follows) => (
          <li key={follows.$id} className="flex justify-between items-center">
            <div className="flex gap-2">
              <img
                src={follows.follower.imageUrl || "/assets/icons/user.svg"}
                alt="user"
                className="rounded-full md:size-14 size-10"
                loading="lazy"
              />
              <div className="flex flex-col">
                <p className="text-md font-semibold">{follows.follower.name}</p>
                <p className="text-xs font-light">
                  @{follows.follower.username}
                </p>
              </div>
            </div>
            <FollowButton follower={currentUser} followed={follows.follower} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Followers, Following };
