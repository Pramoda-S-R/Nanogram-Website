import React from "react";
import ShuffleGallery from "../../../components/motion/ShuffleGallery";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const navigate = useNavigate();

  const images = [
    "https://picsum.photos/100",
    "https://picsum.photos/150",
    "https://picsum.photos/200",
    "https://picsum.photos/250",
    "https://picsum.photos/300",
    "https://picsum.photos/350",
    "https://picsum.photos/400",
    "https://picsum.photos/450",
    "https://picsum.photos/500",
    "https://picsum.photos/550",
    "https://picsum.photos/600",
    "https://picsum.photos/650",
    "https://picsum.photos/700",
    "https://picsum.photos/750",
    "https://picsum.photos/800",
    "https://picsum.photos/850",
    "https://picsum.photos/900",
  ];
  return (
    <div className="w-full flex md:flex-row flex-col gap-5 md:px-20 px-4">
      <div className="w-full h-full">
        <ShuffleGallery images={images} />
      </div>
      <div className="w-full flex flex-col justify-center">
        <div className="flex flex-col gap-5 py-6">
          <h2 className="text-5xl font-medium mb-4">Glimpse of Nanogram</h2>
          <p className="px-4">
            A collection of photos from past activities at Nanogram
          </p>
          <Button
            variant="secondary"
            className={"w-fit"}
            onClick={() => navigate("/gallery")}
          >
            Vist the Gallery
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
