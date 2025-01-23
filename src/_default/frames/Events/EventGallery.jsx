import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/Carousel";
import { getEvents } from "../../../lib/appwrite/api";


const EventGallery = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className=" px-6 py-10 md:px-8 md:py-10">
      <div className="mx-auto w-full max-w-7xl flex flex-col gap-12">
        <div className="w-full flex flex-col gap-6 text-center md:text-left">
          <h2 className="text-4xl font-semibold">Event Gallery</h2>
          <p className="font-normal text-neutral-black/70">
            A glimpse into our past events and activities. Experience the
            excitement and innovation at Nanogram - The Tech Hub.
          </p>
        </div>
        <div className="px-10">
          <Carousel>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselContent>
              {events?.documents.map((highlight, index) => (
                <CarouselItem
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/5 "
                  key={index}
                >
                  <div className="relative group">
                    <div className="overflow-hidden aspect-w-3 aspect-h-4 flex justify-center items-center">
                      <div className="object-cover w-full h-full transition-all duration-300 origin-bottom group-hover:scale-110 aspect-[3/4]">
                        <img
                          alt={highlight.title}
                          className="object-cover w-full h-full transition-all duration-300 origin-bottom group-hover:scale-110 aspect-[3/4]"
                          src={highlight.imageUrl}
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute z-20 flex flex-col justify-center items-center">
                        <h3 className="text-base font-bold text-neutral-white">
                          {highlight.title}
                        </h3>
                        <p className="text-sm font-medium text-neutral-white/75">
                          {highlight.subtitle}
                        </p>
                      </div>
                      <div className="absolute z-10 inset-0 bg-black/20 pointer-events-none"></div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default EventGallery;
