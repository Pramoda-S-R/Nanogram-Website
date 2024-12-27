import React from "react";

const RecentEvent = () => {
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full flex lg:flex-row flex-col justify-center gap-5">
        <div className="xl:max-w-4xl lg:max-w-xl max-w-full flex justify-between flex-col p-10 gap-10">
          <div className="flex flex-col w-full gap-5">
            <h2 className="text-3xl font-bold text-neutral-black">
              Event Title
            </h2>
            <p className="text-lg text-neutral-black/70 p-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              natus quisquam commodi. Doloremque, sint. Dolores tempora rem
              asperiores velit illum non repellat earum nostrum ab voluptatum,
              corrupti, eum laborum sequi dolor eligendi, ipsa cupiditate
              aliquid accusamus inventore voluptatem rerum saepe. Aliquid aut
              quia ad rerum iusto? Illum maxime nisi excepturi!
            </p>
            <p className="text-lg text-neutral-black/70 p-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores obcaecati distinctio deleniti odio itaque laborum? Ex,
              dolorum eos. Quis, voluptatum? Tenetur necessitatibus voluptate
              quod quis!
            </p>
          </div>
        </div>
        <div className="flex-center md:p-0 p-8">
          <img
            src="/assets/images/placeholder.png"
            alt="Event Teaser"
            className="rounded-xl "
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex w-full gap-10 justify-center">
        <div className="flex justify-end items-end">
          <img
            src="/assets/images/placeholder.png"
            alt="image"
            className="h-1/2 rounded-xl"
            loading="lazy"
          />
        </div>
        <div className="w-fit">
          <img
            src="/assets/images/placeholder.png"
            alt="image"
            className="rounded-xl"
            loading="lazy"
          />
        </div>
        <div className="w-fit flex">
          <img
            src="/assets/images/placeholder.png"
            alt="image"
            className="h-2/3 rounded-xl"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default RecentEvent;
