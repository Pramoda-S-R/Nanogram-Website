import React from "react";
import GridPostList from "./GridPostList";
import Loader from "./Loader";

const SearchResults = ({ isSearchFetching, searchedPosts }) => {
  if (isSearchFetching)
    return (
      <div className="flex-center w-full">
        <Loader />
      </div>
    );

  if (searchedPosts && searchedPosts.documents.length > 0)
    return <GridPostList posts={searchedPosts.documents} />;

  return (
    <p className="text-neutral-black/50 mt-10 text-center w-full">
      No results found
    </p>
  );
};

export default SearchResults;
