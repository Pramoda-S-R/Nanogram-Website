import React, { useState } from "react";

const images = [
  "/gallery/1.jpg",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
  // Add more images here
];

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const nextImage = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );

  const prevImage = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );

  return (
    <div className="bg-slate-50 dark:bg-slate-800 py-10 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-10">
        Photo Album
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <img
              src={src}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center">
              <p className="text-white text-lg font-medium">
                Image {index + 1}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Section */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-3xl focus:outline-none"
            onClick={closeLightbox}
          >
            &times;
          </button>
          <div className="relative">
            <img
              src={images[currentIndex]}
              alt={`Lightbox image ${currentIndex + 1}`}
              className="max-h-screen max-w-full"
            />
            {/* Navigation Controls */}
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl focus:outline-none"
              onClick={prevImage}
            >
              &#8249;
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl focus:outline-none"
              onClick={nextImage}
            >
              &#8250;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
