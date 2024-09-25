import React from "react";
import { ArrowRight } from "lucide-react";

const images = [
  "/1.png",
  "/1.png",
  "/1.png",
  "/1.png",
  "/1.png",
  "/1.png",
  "/1.png",
  "/1.png",
  "/1.png",
  "/1.png",
  "/1.png",
  "/1.png",
  // Add more image paths as needed
];

const Team = () => {
  return (
    <section className="max-w-full p-6 bg-slate-50 dark:bg-slate-800  text-slate-900 dark:text-slate-50 border-none outline-none"> {/* Responsive flex direction */}
      {/* Text Section */}
      <div className="max-w-7xl flex flex-col lg:flex-row items-center mx-auto">
      <div className="mb-6 lg:mb-0 lg:mr-8 pl-10 pt-10 pr-10 lg:pr-0 lg:py-10"> {/* Added margin adjustments for spacing */}
        <h1 className="text-5xl font-medium mb-4">Meet Our Team</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Get to know the passionate and dedicated members behind Nanogram - The Tech Hub.
        </p>
        <a
          href="#"
          className="w-auto mx-auto text-sky-600 hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-400  focus:text-sky-500 flex items-center pt-4 pb-4 group"
        >
          Meet the Team
          <span className="ml-2 pt-1 flex items-center h-4 w-4 transition-transform duration-200 transform group-hover:translate-x-1">
            <ArrowRight />
          </span>
        </a>
      </div>
      
      {/* Images Section */}
      <div className="px-0 lg:px-4">
        <div className="grid grid-cols-6 gap-y-6 gap-x-4 lg:gap-y-12 lg:gap-x-8  justify-items-center">
          {images.map((img, index) => (
            <div key={index} className="aspect-square">
              <img
                src={img}
                alt={`Gallery image ${index + 1}`}
                className="object-cover w-full h-full rounded-full mx-auto shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default Team;
