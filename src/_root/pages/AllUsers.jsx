import { useToast } from "../../components/ui/Toast";
import Loader from "../../components/shared/Loader";
import UserCard from "../../components/shared/UserCard";
import {
  useGetCurrentUser,
  useGetUsers,
  useSearchUsers,
} from "../../lib/react_query/queriesAndMutations";
import { Search } from "lucide-react";
import Input from "../../components/ui/Input";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

const AllUsers = () => {
  const toast = useToast();

  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedUsers, isFetching } = useSearchUsers(debouncedValue);

  const { data: currentUser } = useGetCurrentUser();
  const {
    data: creators,
    isLoading,
    isError: isErrorCreators,
  } = useGetUsers(12);

  const newCreators = creators?.documents.filter(
    (creator) => creator.$id !== currentUser?.$id
  );

  if (isErrorCreators) {
    toast({
      title: "Something went wrong",
      description: "We couldn't fetch the creators. Please try again later.",
    });

    return;
  }

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowUsers = !shouldShowSearchResults && newCreators?.length !== 0;

  return (
    <div className="user-container">
      <div className="user-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Users</h2>
        <Input
          icon={<Search size={24} />}
          placeholder="Search users by name or username"
          className="explore-search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      {shouldShowSearchResults && !isFetching ? (
        <div className="flex flex-wrap gap-9 w-full max-w-5xl mb-14">
          <ul className="flex flex-col gap-2 w-full">
            {searchedUsers?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 w-full">
                <div className="flex-between w-full max-w-5xl">
                  <Link
                    to={`/profile/${creator.$id}`}
                    className="flex-start gap-4"
                  >
                    <img
                      src={creator.imageUrl || "/assets/icons/user.svg"}
                      alt={creator.name || "creator"}
                      className="size-16 rounded-full"
                       loading="lazy"
                    />
                    <div className="flex justify-start flex-col gap-1">
                      <p className="base-medium text-light-1 text-left line-clamp-1">
                        {creator.name}
                      </p>
                      <p className="small-regular text-light-3 text-left line-clamp-1">
                        @{creator.username}
                      </p>
                    </div>
                  </Link>
                  <Button
                    className={`${
                      creator.$id === currentUser.$id ? "hidden" : ""
                    } flex-end`}
                  >
                    Follow
                  </Button>
                </div>
                <hr className="w-full border-neutral-black mt-2" />
              </li>
            ))}
          </ul>
        </div>
      ) : shouldShowUsers && !isLoading ? (
        <>
          <div className="flex-between w-full max-w-5xl">
            <h2 className="h3-bold md:h2-bold text-left w-full">Other Users</h2>
          </div>
          <div className="flex flex-wrap gap-9 w-full max-w-5xl mb-14">
            <ul className="user-grid">
              {newCreators?.map((creator) => (
                <li key={creator?.$id} className="flex-1 min-w-0 w-full  ">
                  <UserCard user={creator} />
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : newCreators?.length !== 0 ? (
        <div className="flex-center w-full mt-10">
          <Loader />
        </div>
      ) : (
        <div className="text-center text-neutral-black/50 py-24 md:py-14">No users available.</div>
      )}
    </div>
  );
};

export default AllUsers;
