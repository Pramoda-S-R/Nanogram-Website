import React, { useEffect, useState } from "react";
import MouseImageTrail from "../../components/motion/HoverTrail";
import Waterfall from "../../components/shared/Waterfall";
import { allimages } from "../../constants";

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

  return (
    <div className="default-container">
      {isMouseAvailable && (
        <MouseImageTrail
          renderImageBuffer={50}
          rotationRange={25}
          images={allimages}
        >
          <div className="grid h-96 w-full place-content-center bg-neutral-white">
            <p className="flex items-center gap-2 text-7xl font-bold uppercase text-neutral-black">
              <span>The Motion Mosaic</span>
            </p>
          </div>
        </MouseImageTrail>
      )}
      <Waterfall images={allimages} />
    </div>
  );
};

export default Gallery;
