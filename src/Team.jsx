import React from "react";
import { ArrowRight } from "lucide-react";

const images = [
  "/src/images/1.png",
  "/src/images/1.png",
  "/src/images/1.png",
  "/src/images/1.png",
  "/src/images/1.png",
  "/src/images/1.png",
  "/src/images/1.png",
  "/src/images/1.png",
  "/src/images/1.png",
  "/src/images/1.png",
  "/src/images/1.png",
  "/src/images/1.png",
  // Add more image paths as needed
];

const Team = () => {
  return (
    <section className="max-w-7xl mx-auto p-6 bg-white flex flex-col lg:flex-row"> {/* Responsive flex direction */}
      {/* Text Section */}
      <div className="max-w-sm mb-6 lg:mb-0 lg:mr-8"> {/* Added margin adjustments for spacing */}
        <h1 className="text-5xl font-medium mb-4">Meet Our Team</h1>
        <p className="text-lg text-gray-500">
          Get to know the passionate and dedicated members behind Nanogram - The Tech Hub.
        </p>
        <a
          href="#"
          className="w-auto mx-auto text-blue-500 flex items-center pt-4 pb-4 group"
        >
          Meet the Team
          <span className="ml-2 pt-1 flex items-center h-4 w-4 transition-transform duration-200 transform group-hover:translate-x-1">
            <ArrowRight />
          </span>
        </a>
      </div>
      
      {/* Images Section */}
      <div className="px-4">
        <div className="grid grid-cols-6 gap-y-12 gap-x-8 justify-items-center">
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
    </section>
  );
};

export default Team;
