import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Filter, Search } from "lucide-react";
import Input from "../../components/ui/Input";
import Loader from "../../components/shared/Loader";
import SearchResults from "../../components/shared/SearchResults";
import GridPostList from "../../components/shared/GridPostList";
import {
  useGetPosts,
  useSearchPosts,
} from "../../lib/react_query/queriesAndMutations";
import useDebounce from "../../hooks/useDebounce";

const Explore = () => {
  useEffect(() => {
    // Add overflow hidden to html and body when component mounts
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Clean up the styles when component unmounts
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const { ref, inView } = useInView();

  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedValue);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  if (!posts)
    return (
      <div className="flex-center w-full h-screen md:py-24 py-16">
        <Loader />
      </div>
    );

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <Input
          icon={<Search size={24} />}
          placeholder="Search posts by caption or tags"
          className="explore-search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>
        <div className="flex-center gap-3 bg-neutral-black rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-accent-gray"> All</p>
          <Filter className="text-accent-gray" size={20} />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl mb-14">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="text-neutral-black mt-10 text-center w-full">
            {" "}
            End of Posts
          </p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
