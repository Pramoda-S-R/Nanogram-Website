import React from "react";
import { Newspaper } from "lucide-react";
import NewsCard from "../../components/shared/NewsCard";
import { useGetNews } from "../../lib/react_query/queriesAndMutations";
import Loader from "../../components/shared/Loader";

const NewsLetter = () => {
  const {
    data: newsLetters,
    isPending: isNewsLoading,
    isError: isNewsError,
  } = useGetNews();

  const hasnewsLetters =
    newsLetters?.documents && newsLetters.documents.length > 0;

  const hasPastNewsLetters =
    newsLetters?.documents && newsLetters.documents.lenght > 1;

  return (
    <div className="h-screen flex flex-col flex-1 md:pt-32 py-24 px-5 md:p-14 overflow-y-scroll custom-scrollbar">
      <div className="max-w-5xl flex items-center w-full gap-2 justify-start">
        <Newspaper />
        <h2 className="h3-bold md:h2-bold w-full">Newsletter</h2>
      </div>
      <div className="w-full flex md:justify-start justify-center gap-2">
        {isNewsLoading ? (
          <Loader />
        ) : isNewsError ? (
          <div className="text-center text-neutral-black">
            Failed to load posts. Try again later.
          </div>
        ) : hasnewsLetters ? (
          <NewsCard newsLetter={newsLetters?.documents[0]} />
        ) : (
          <div className="text-center text-neutral-black/50 py-24 md:py-14">
            No posts available.
          </div>
        )}
      </div>
      <div className="max-w-5xl flex items-center w-full gap-2 justify-start">
        <h2 className="h3-bold md:h2-bold w-full">Past Newsletters</h2>
      </div>
      <div className="w-full flex md:justify-start justify-center gap-2">
        {isNewsLoading ? (
          <Loader />
        ) : isNewsError ? (
          <div className="text-center text-neutral-black">
            Failed to load posts. Try again later.
          </div>
        ) : hasPastNewsLetters ? (
          <div className="flex flex-wrap">
            {newsLetters.documents?.slice(1).map((news, index) => (
              <div key={index}>
                <NewsCard newsLetter={news} showActions={false} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-neutral-black/50 py-24 md:py-14">
            No NewsLetters available.
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsLetter;
