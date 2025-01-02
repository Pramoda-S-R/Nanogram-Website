import React, { useEffect, useState } from "react";
import MouseImageTrail from "../../components/motion/HoverTrail";
import Waterfall from "../../components/shared/Waterfall";

const Gallery = () => {
  const [isMouseAvailable, setIsMouseAvailable] = useState(false);

  useEffect(() => {
    // Check for devices with fine pointer (e.g., mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsMouseAvailable(mediaQuery.matches);

    // Add a listener for changes
    const handleMediaChange = (e) => setIsMouseAvailable(e.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    // Cleanup the listener on unmount
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const images = [
    "https://picsum.photos/200/300",
    "https://picsum.photos/300/400",
    "https://picsum.photos/400/500",
    "https://picsum.photos/500/600",
    "https://picsum.photos/600/700",
    "https://picsum.photos/700/800",
    "https://picsum.photos/200/75",
    "https://picsum.photos/300/100",
    "https://picsum.photos/400/200",
    "https://picsum.photos/500/300",
    "https://picsum.photos/600/400",
    "https://picsum.photos/700/500",
  ];

  return (
    <div className="default-container">
      {isMouseAvailable && (
        <MouseImageTrail
          renderImageBuffer={50}
          rotationRange={25}
          images={images}
        >
          <div className="grid h-96 w-full place-content-center bg-neutral-white">
            <p className="flex items-center gap-2 text-7xl font-bold uppercase text-neutral-black">
              <span>The Motion Mosaic</span>
            </p>
          </div>
        </MouseImageTrail>
      )}
      <Waterfall images={images} />
    </div>
  );
};

export default Gallery;
