import React from "react";
import { Link } from "react-router-dom"; // Import Link
import { ArrowRight } from "lucide-react";

const images = [
  "/gallery/2.webp",
  "/gallery/3.webp",
  "/gallery/1.webp",
  "/gallery/6.webp",
  "/gallery/9.webp",
  "/gallery/8.webp",
  // Add more image paths as needed
];

const Gallery = () => {
  return (
    <section className="p-6 bg-slate-50 dark:bg-slate-800  text-slate-900 dark:text-slate-50 border-none outline-none">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-8 justify-items-center">
          {images.map((img, index) => (
            <div key={index} className="aspect-square">
              <img
                src={img}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
                className="object-cover w-full h-full rounded-lg mx-auto shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Link Button to navigate to /gallery */}
      <div className="mt-8 text-center">
        <Link
          to="/gallery"
          className="bg-blue-500 bg-opacity-50 px-6 py-3 rounded-full inline-flex items-center hover:bg-opacity-70 transition-colors group"
        >
          Go to Gallery{" "}
          <span className="ml-2 pt-1 flex items-center transition-transform duration-200 transform group-hover:translate-x-1">
            <ArrowRight className="ml-2 h-5 w-5" />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Gallery;
