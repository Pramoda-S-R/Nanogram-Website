import React from "react";
import { ArrowRight } from "lucide-react";
import Button from "../../../components/ui/Button";

const Mission = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="mx-auto max-w-2xl px-6 lg:px-8 py-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-7xl lg:grid-cols-2">
        <div className="lg:pr-4">
          <div className="relative overflow-hidden rounded-3xl bg-neutral-black px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
            <div className="absolute inset-0 h-full w-full object-cover">
              <img
                src="/assets/images/placeholder.png"
                alt="img"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-neutral-black/70 mix-blend-multiply"></div>
            <figure className="relative isolate">
              <blockquote className="mt-6 text-xl font-semibold leading-8 text-neutral-white">
                <span>
                  <div>
                    "Creativity is seeing what others see and thinking what no
                    one else ever thought."
                  </div>
                </span>
              </blockquote>
              <figcaption className="mt-6 text-sm leading-6 text-neutral-white">
                <span>
                  <div>Albert Einstein, Renowned Physicist</div>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
        <div>
          <div className="text-base leading-7 lg:mx-w-lg">
            <div className="text-base font-semibold leading-7 text-primary/70">
              Empowering Tech Enthusiasts
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Our Mission
            </h1>
            <div className="max-w-xl">
              <p className=" mt-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                possimus cupiditate dolores nam fuga et?
              </p>
              <p className="mt-6">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Perspiciatis cumque accusantium omnis amet reprehenderit aut!
              </p>
              <p className="mt-6">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repellendus, veniam! Nobis consequuntur consequatur dolorem
                harum?
              </p>
            </div>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-neutral-black pt-10 sm:grid-cols-4">
            <div>
              <dt className="text-sm font-semibold leading-6 text-neutral-black/80 text-nowrap">
                <div>Founded</div>
              </dt>
              <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-neutral-black">
                <div>2024</div>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold leading-6 text-neutral-black/80 text-nowrap">
                <div>Workshops & Events</div>
              </dt>
              <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-neutral-black">
                <div>10+</div>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold leading-6 text-neutral-black/80 text-nowrap">
                <div>Active Members</div>
              </dt>
              <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-neutral-black">
                <div>50+</div>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold leading-6 text-neutral-black/80 text-nowrap">
                <div>Students Reached</div>
              </dt>
              <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-neutral-black">
                <div>300+</div>
              </dd>
            </div>
          </dl>
          <div className="mt-10 flex">
            <Button
              variant="link"
              className="text-lg group flex items-center gap-1 font-semibold leading-6"
              onClick={() => window.open("https://www.linkedin.com/company/nanogramhub/", "_blank")}
            >
              Learn more about us
              <span className="ml-2 pt-1 flex items-center h-4 w-4 transition-transform duration-200 transform group-hover:translate-x-1">
                <ArrowRight />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
