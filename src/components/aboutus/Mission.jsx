import React from "react";

const Mission = () => {
  return (
    <section className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-50 py-16 sm:py-20 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-4">
            <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
              <div className="absolute inset-0 h-full w-full object-cover">
                <img
                  src="/1.png"
                  alt="img"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply"></div>
              <figure className="relative isolate">
                <blockquote className="mt-6 text-xl font-semibold leading-8 text-white">
                  <span>
                    <div>
                      "Nanogram has been a pivotal part of my growth as a tech
                      enthusiast. The community and resources are unparalleled."
                    </div>
                  </span>
                </blockquote>
                <figcaption className="mt-6 text-sm leading-6 text-gray-300">
                  <span>
                    <div>Jamie Doe, Member</div>
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
          <div>
            <div className="text-base leading-7 lg:mx-w-lg">
              <div className="text-base font-semibold leading-7 text-sky-500">
                Empowering Tech Enthusiasts
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                Our Mission
              </h1>
              <div className="max-w-xl">
                <p className=" mt-6">
                  Our mission is to foster a community of innovation and
                  excellence in electronics and technology.
                </p>
                <p className="mt-6">
                  We provide a platform for members to collaborate, learn, and
                  grow their technical skills.
                </p>
                <p className="mt-6">
                  Through our events and resources, we aim to inspire the next
                  generation of tech leaders.
                </p>
              </div>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-black/10 pt-10 sm:grid-cols-4 dark:border-white/10">
              <div>
                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-slate-400 text-nowrap">
                  <div>Founded</div>
                </dt>
                <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900 dark:text-slate-50">
                  <div>2015</div>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-slate-400 text-nowrap">
                  <div>Projects Completed</div>
                </dt>
                <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900 dark:text-slate-50">
                  <div>200+</div>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-slate-400 text-nowrap">
                  <div>Active Members</div>
                </dt>
                <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900 dark:text-slate-50">
                  <div>500+</div>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-slate-400 text-nowrap">
                  <div>Awards Won</div>
                </dt>
                <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900 dark:text-slate-50">
                  <div>15</div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
