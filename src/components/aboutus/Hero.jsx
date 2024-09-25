import React from "react";
import { Cpu, Users, BookText } from "lucide-react";

const Hero = () => {
  return (
    <main className="relative isolate overflow-hidden bg-sky-900 text-slate-50 dark:bg-sky-950 py-24 sm:py-32">
      <div className="absolute inset-0 h-full w-full object-cover object-right md:object-center opacity-20">
        <img
          src="/1.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-right md:object-center opacity-20"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to Nanogram - The Tech Hub
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Discover the forefront of electronics and technology with our
            dedicated club. Join us in our journey to innovate and inspire.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          <div className="flex gap-x-4 rounded-xl bg-white/5 backdrop-blur-xl p-6 ring-1 ring-inset ring-white/10">
            <span>
              <div className="text-lg text-indigo-400 ">
                <Cpu />
              </div>
            </span>
            <div className="text-base leading">
              <h3 className="font-semibold">Innovative Projects</h3>
              <p className="mt-2 text-slate-3000">
                Engage in cutting-edge projects that push the boundaries of
                technology.
              </p>
            </div>
          </div>
          <div className="flex gap-x-4 rounded-xl bg-white/5 backdrop-blur-xl p-6 ring-1 ring-inset ring-white/10">
            <span>
              <div className="text-lg text-indigo-400 ">
                <Users />
              </div>
            </span>
            <div className="text-base leading">
              <h3 className="font-semibold">Expert Community</h3>
              <p className="mt-2 text-slate-3000">
                Connect with industry experts and like-minded enthusiasts.
              </p>
            </div>
          </div>
          <div className="flex gap-x-4 rounded-xl bg-white/5 backdrop-blur-xl p-6 ring-1 ring-inset ring-white/10">
            <span>
              <div className="text-lg text-indigo-400 ">
                <BookText />
              </div>
            </span>
            <div className="text-base leading">
              <h3 className="font-semibold">Educational Resources</h3>
              <p className="mt-2 text-slate-3000">
                Access a wealth of resources to enhance your technical
                knowledge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
