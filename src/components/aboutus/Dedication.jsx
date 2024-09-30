import React from "react";

const Dedication = () => {
  return (
    <section className="w-full mx-auto max-w-7xl py-10 px-4 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-50 grid grid-cols-1 items-center gap-16 md:grid-cols-2">
      <div className="w-full h-auto object-cover bg-slate-100 aspect-[16/9] md:aspect-[1/1]">
        <img
          alt="Img"
          className="w-full h-auto object-cover bg-slate-100 aspect-[16/9] md:aspect-[1/1]"
          src="/1.png"
        />
      </div>
      <div className="mx-auto max-w-2xl lg:mr-0 lg:max-w-lg">
        <h2 className="text-base font-semibold leading-8  text-sky-500">
          Our Achievements
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white/80 sm:text-4xl">
          Dedication and Innovation
        </p>
        <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-white/80">
          At Nanogram, we are committed to pushing the boundaries of technology
          and fostering a community of innovation.
        </p>
        <dl className="mt-16 grid max-w-xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 xl:mt-16">
          <div className="flex flex-col gap-y-3 border-l border-black/20 dark:border-white/20 pl-6">
            <dt className="text-sm leading-6 text-slate-600 dark:text-white/80">
              <div>Founded</div>
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-slate-900 dark:text-white/80">
              <div>2024</div>
            </dd>
          </div>
          <div className="flex flex-col gap-y-3 border-l border-black/20 dark:border-white/20 pl-6">
            <dt className="text-sm leading-6 text-slate-600 dark:text-white/80">
              <div>Active Members</div>
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-slate-900 dark:text-white/80">
              <div>50+</div>
            </dd>
          </div>
          <div className="flex flex-col gap-y-3 border-l border-black/20 dark:border-white/20 pl-6">
            <dt className="text-sm leading-6 text-slate-600 dark:text-white/80">
              <div>Workshops & Events</div>
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-slate-900 dark:text-white/80">
              <div>5+</div>
            </dd>
          </div>
          <div className="flex flex-col gap-y-3 border-l border-black/20 dark:border-white/20 pl-6">
            <dt className="text-sm leading-6 text-slate-600 dark:text-white/80">
              <div>Students Reached</div>
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-slate-900 dark:text-white/80">
              <div>300+</div>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default Dedication;
