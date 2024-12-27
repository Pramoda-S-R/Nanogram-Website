import { Album } from "lucide-react";
import Loader from "../../components/shared/Loader";
import GridPostList from "../../components/shared/GridPostList";
import { useGetCurrentUser, useGetSavedPosts } from "../../lib/react_query/queriesAndMutations";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();
  const {
    data: savedPosts,
    isLoading,
    isError,
  } = useGetSavedPosts(currentUser);

  return (
    <div className="saved-container">
      <div className="saved-inner_container">
        <h2 className="flex-start gap-2 h3-bold md:h2-bold w-full">
          <Album size={30} /> Saved Posts
        </h2>
      </div>
      {!currentUser || isLoading || isError ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savedPosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList posts={savedPosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
