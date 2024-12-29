import React, { Suspense } from "react";
import ParticleRing from "../../../components/motion/ParticleRing";
import Button from "../../../components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen-top flex flex-col">
      <div className="w-full h-5/6 relative">
        <Suspense>
          <ParticleRing />
        </Suspense>
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
            <Button variant="secondary" className={"w-fit"}>
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
      <div className="w-full h-1/6 flex md:justify-start justify-center items-center overflow-hidden md:px-20 px-0">
        <div className="flex -space-x-6">
          <div className="size-16 rounded-full bg-neutral-black z-10"></div>
          <div className="size-16 rounded-full bg-primary z-[9]"></div>
          <div className="size-16 rounded-full bg-neutral-black z-[8]"></div>
          <div className="size-16 rounded-full bg-primary z-[7]"></div>
          <div className="size-16 rounded-full bg-neutral-black z-[6]"></div>
          <div className="size-16 rounded-full bg-primary z-[5]"></div>
          <div className="size-16 rounded-full bg-neutral-black z-[4]"></div>
          <div className="size-16 rounded-full bg-primary z-[3]"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
