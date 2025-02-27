import React from "react";
import {
  useGetCurrentUser,
  useGetTopUsers,
  useUpdateUserKarma,
} from "../../lib/react_query/queriesAndMutations";
import Loader from "../../components/shared/Loader";
import ProfileIcon from "../../components/shared/ProfileIcon";
import { Star } from "lucide-react";
import { getUserKarma } from "../../lib/utils";

const TopUsers = () => {
  const { data: currentUser } = useGetCurrentUser();

  const {
    data: topUsers,
    isPending: isTopUsersLoading,
    isError: isErrorTopUsers,
  } = useGetTopUsers(10);

  const { mutateAsync: updateUserKarma, isPending: isLoadingUpdate } =
    useUpdateUserKarma();

  useEffect(() => {
    if (currentUser?.$id) {
      // console.log("looping");
      if (getUserKarma(currentUser) !== currentUser?.karma) {
        // console.log("yes");
        updateUserKarma(currentUser);
      }
    }
  }, [currentUser]);

  return (
    <div className="h-screen flex flex-col flex-1 md:pt-32 py-24 px-5 md:p-14 overflow-y-scroll custom-scrollbar">
      <div>
        <h2 className="h3-bold md:h2-bold w-full pb-10">Top Creators</h2>
      </div>
      <div className="flex flex-col gap-5 w-full">
        {isTopUsersLoading ? (
          <Loader />
        ) : isErrorTopUsers ? (
          <div className="text-center text-neutral-black">
            Failed to load top users. Try again later.
          </div>
        ) : (
          <div className="flex flex-col gap-5 w-fit flex-wrap ml-5">
            {topUsers?.documents?.map((user, index) => (
              <div key={index} className="flex items-center gap-2">
                {index < 3 && (
                  <Star
                    className={
                      index === 0
                        ? "text-orange-400"
                        : index === 1
                        ? "text-gray-500"
                        : "text-yellow-900"
                    }
                  />
                )}
                {index >= 3 && (
                  <p className="text-neutral-black font-bold flex-center w-6">
                    {index + 1}
                  </p>
                )}
                <ProfileIcon
                  src={user?.imageUrl || "/assets/icons/user.svg"}
                  alt={user.name || "creator"}
                  className="rounded-full size-12"
                  id={user.$id}
                  name={user.name}
                  username={user.username}
                  showTime={false}
                  showUserName={true}
                  details={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopUsers;
