import React from "react";

const Activities = () => {
  return (
    <div className="w-full mx-auto max-w-7xl py-10 px-4 grid grid-cols-1 items-center md:grid-cols-2">
      <div className="w-full h-auto object-cover aspect-[16/9] md:aspect-[1/1]">
        <img
          alt="Img"
          className="w-full h-auto object-cover aspect-[16/9] md:aspect-[1/1]"
          src="/assets/images/placeholder.png"
        />
      </div>
      <div className="mx-auto max-w-2xl lg:mr-0 lg:max-w-lg">
        <h2 className="text-base font-semibold leading-8  text-primary/70">
          Activities at Nanogram
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-black sm:text-4xl">
          What We Do
        </p>
        <p className="mt-6 text-lg leading-8 text-neutral-black/70">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione
          quasi modi nihil voluptatibus est eaque vel sapiente recusandae
          quisquam veritatis!
        </p>
        <dl className="mt-16 grid max-w-xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 xl:mt-16">
          <div className="flex flex-col gap-y-3 border-l border-neutral-black pl-6">
            <dt className="text-sm leading-6 text-neutral-black/70">
              <div>Placeholder</div>
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-neutral-black">
              <div>Placeholder </div>
            </dd>
          </div>
          <div className="flex flex-col gap-y-3 border-l border-neutral-black pl-6">
            <dt className="text-sm leading-6 text-neutral-black/70">
              <div>Placeholder</div>
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-neutral-black">
              <div>Placeholder</div>
            </dd>
          </div>
          <div className="flex flex-col gap-y-3 border-l border-neutral-black pl-6">
            <dt className="text-sm leading-6 text-neutral-black/70">
              <div>Placeholder</div>
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-neutral-black">
              <div>Placeholder</div>
            </dd>
          </div>
          <div className="flex flex-col gap-y-3 border-l border-neutral-black pl-6">
            <dt className="text-sm leading-6 text-neutral-black/70">
              <div>Placeholder</div>
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-neutral-black">
              <div>Placeholder</div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Activities;
