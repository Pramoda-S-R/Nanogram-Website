import React from "react";
import ParticleRing from "../../../components/motion/ParticleRing";
import Button from "../../../components/ui/Button";
import { ArrowRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen-top flex flex-col">
      <div className="w-full h-5/6 relative">
        <ParticleRing />
        <div className="absolute top-0 left-0 max-w-full w-full h-full flex flex-col justify-end pointer-events-none md:p-20 p-4">
          <h1 className="font-extrabold md:text-7xl text-4xl text-neutral-white mb-4">
            NANOGRAM | THE TECH HUB
          </h1>
          <p className="text-neutral-white font-bold text-xl max-w-2xl mb-10">
            Join us in exploring the fascinating world of electronics and
            technology. Discover our activities, events, and resources designed
            for tech enthusiasts.
          </p>
          <div className="w-full flex md:flex-row flex-col gap-5 pointer-events-auto">
            <Button variant="secondary" className={"w-fit"} onClick={() => navigate("/community")}>
              Join the Community for Free!
            </Button>
            <Button
              variant="link"
              className={
                "w-fit backdrop-blur-lg group flex items-center gap-1 font-semibold leading-6"
              }
              onClick={() => navigate("/about-us#team")}
            >
              <p className="text-neutral-white group-hover:text-secondary">
                Meet the Team
              </p>
              <span className="ml-2 pt-1 flex items-center h-4 w-4 transition-transform duration-200 transform group-hover:translate-x-1">
                <ArrowRight className="text-neutral-white group-hover:text-secondary" />
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full h-fit flex md:flex-row flex-col gap-5 md:justify-start justify-center items-center overflow-hidden py-6 md:px-20 px-0">
        <div className="flex -space-x-6">
          <div className="size-16 shadow-lg rounded-full bg-accent-gray z-10">
            <img
              src="/assets/images/placeholder.png"
              alt="img"
              className="rounded-full"
            />
          </div>
          <div className="size-16 shadow-lg rounded-full bg-accent-gray z-[9]">
            <img
              src="/assets/images/placeholder.png"
              alt="img"
              className="rounded-full"
            />
          </div>
          <div className="size-16 shadow-lg rounded-full bg-accent-gray z-[8]">
            <img
              src="/assets/images/placeholder.png"
              alt="img"
              className="rounded-full"
            />
          </div>
          <div className="size-16 shadow-lg rounded-full bg-accent-gray z-[7]">
            <img
              src="/assets/images/placeholder.png"
              alt="img"
              className="rounded-full"
            />
          </div>
          <div className="size-16 shadow-lg rounded-full bg-accent-gray z-[6]">
            <img
              src="/assets/images/placeholder.png"
              alt="img"
              className="rounded-full"
            />
          </div>
          <div className="size-16 shadow-lg rounded-full bg-accent-gray z-[5]">
            <img
              src="/assets/images/placeholder.png"
              alt="img"
              className="rounded-full"
            />
          </div>
          <div className="size-16 shadow-lg rounded-full bg-accent-gray z-[4]">
            <img
              src="/assets/images/placeholder.png"
              alt="img"
              className="rounded-full"
            />
          </div>
          <div className="size-16 shadow-lg rounded-full bg-accent-gray z-[3]">
            <img
              src="/assets/images/placeholder.png"
              alt="img"
              className="rounded-full"
            />
          </div>
          <div className="flex-center size-16 shadow-lg rounded-full bg-accent-gray z-[2]">
            <Plus />
          </div>
        </div>
        <div className="flex px-10">
          <p className="text-medium font-semibold text-neutral-black/70 text-justify">
            Meet passionate tech enthusiasts like you. Join us in exploring the
            fascinating world of electronics and technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
