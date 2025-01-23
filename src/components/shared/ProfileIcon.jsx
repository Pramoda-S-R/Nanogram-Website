import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CakeSlice, Coins } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/HoverCard";
import { formatDate, getUserKarma } from "../../lib/utils";
import SpinLoader from "./SpinLoader";
import FollowButton from "./FollowButton";
import Button from "../ui/Button";
import {
  useGetCurrentUser,
  useGetUserById,
} from "../../lib/react_query/queriesAndMutations";

const ProfileIcon = ({
  src,
  alt,
  className,
  id,
  name,
  time,
  details,
  showName = true,
}) => {
  const navigate = useNavigate();
  const { data: currentUser } = useGetCurrentUser();
  const { data: user, isPending } = useGetUserById(id);

  return (
    <HoverCard>
      <HoverCardTrigger>
        {details ? (
          <Link to={`/profile/${id}`}>
            <div className="flex items-center gap-3">
              <img src={src} alt={alt} className={className} loading="lazy" />
              <div className="flex flex-col">
                <p className="base-medium lg:body-bold text-neutral-black">
                  {name}
                </p>
                <div className="flex-center gap-2 text-neutral-black font-light">
                  <p className="subtle-semibold lg:small-regular">{time}</p>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex-start gap-2 flex-1">
            <img src={src} alt={alt} className={className} loading="lazy" />
            {showName && <p className="line-clamp-1">{name}</p>}
          </div>
        )}
      </HoverCardTrigger>
      <HoverCardContent>
        {isPending ? (
          <SpinLoader />
        ) : (
          <div className="flex flex-col gap-3 p-4">
            <div className="flex items-center gap-3">
              <img
                src={user?.imageUrl || "/assets/icons/user.svg"}
                alt={user?.name || "user"}
                className="rounded-full size-8 lg:size-12"
                loading="lazy"
              />
              <div className="flex flex-col">
                <Button
                  variant="link"
                  padding=""
                  onClick={() => navigate(`/profile/${id}`)}
                >
                  <p className="base-medium lg:body-bold text-neutral-black">
                    {user?.name}
                  </p>
                </Button>
                <div className="flex-center gap-2 text-neutral-black font-light">
                  <p className="subtle-semibold lg:small-regular">
                    @{user?.username}
                  </p>
                </div>
              </div>
            </div>
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
            <div className="flex-center gap-4">
              {user.$id !== currentUser.$id && (
                <FollowButton follower={currentUser} followed={user} />
              )}
              <Button
                variant="secondary"
                className={"border-2 border-neutral-white"}
                onClick={() => navigate(`/messages/${user?.$id}`)}
                disabled={!user}
              >
                Message
              </Button>
            </div>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProfileIcon;
