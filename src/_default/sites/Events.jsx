import React from "react";
import {
  EventGallery,
  Faq,
  NextEvent,
  RecentEvent,
  Upcoming,
} from "../frames/Events";
import { LazyMotionComponent } from "../../components/motion/LazyMotionComponent";

const Events = () => {
  return (
    <div className="default-container" id="top">
        <NextEvent />
      <LazyMotionComponent>
        <RecentEvent />
      </LazyMotionComponent>
      <LazyMotionComponent>
        <Upcoming />
      </LazyMotionComponent>
      <LazyMotionComponent>
        <EventGallery />
      </LazyMotionComponent>
      <LazyMotionComponent>
        <Faq />
      </LazyMotionComponent>
    </div>
  );
};

export default Events;
