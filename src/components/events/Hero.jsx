import React from "react";

const Hero = () => {
  return (
    <main className="relative isolate overflow-hidden bg-sky-200 dark:text-slate-50 dark:bg-sky-950 text-slate-950 py-24 sm:py-32">
      <div className="absolute inset-0 opacity-20 -z-10 h-full w-full object-cover object-right md:object-center rounded-lg bg-slate-100 bg-transparent ">
        <img
          alt="Design Studio"
          className="absolute inset-0 opacity-20 -z-10 h-full w-full object-cover object-right md:object-center rounded-lg bg-slate-100"
          src="/1.png"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight  sm:text-6xl">
            Upcoming Events at Nanogram - The Tech Hub
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
            Stay updated with our latest events, workshops, and technical
            meetups. Join us to explore the world of electronics and innovation.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <dl className="mt-16 grid grid-cols-2 gap-8 sm:mt-20 lg:grid-cols-4">
            <div className="flex flex-col-reverse">
              <dt className="text-base leading-7 text-slate-700 dark:text-slate-300">
                Events Held
              </dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight text-slate-700 dark:text-slate-300">
                50+
              </dd>
            </div>
            <div className="flex flex-col-reverse">
              <dt className="text-base leading-7 text-slate-700 dark:text-slate-300">
                Active Members
              </dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight text-slate-700 dark:text-slate-300">
                200+
              </dd>
            </div>
            <div className="flex flex-col-reverse">
              <dt className="text-base leading-7 text-slate-700 dark:text-slate-300">
                Workshops
              </dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight text-slate-700 dark:text-slate-300">
                30+
              </dd>
            </div>
            <div className="flex flex-col-reverse">
              <dt className="text-base leading-7 text-slate-700 dark:text-slate-300">
                Hackathons
              </dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight text-slate-700 dark:text-slate-300">
                10+
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
};

export default Hero;
