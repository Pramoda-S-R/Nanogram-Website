import React from "react";
import { LazyMotionComponent } from "../../components/motion/LazyMotionComponent";
import {
  Achievements,
  Gallery,
  Hero,
  Highlights,
  Initiatives,
  Testimonials,
} from "../frames/Home";

const Home = () => {
  return (
    <div className="default-container" id="top">
      <Hero />
      <LazyMotionComponent>
        <Initiatives />
      </LazyMotionComponent>
      <LazyMotionComponent>
        <Highlights />
      </LazyMotionComponent>
      <LazyMotionComponent>
        <Gallery />
      </LazyMotionComponent>
      <LazyMotionComponent>
        <Achievements />
      </LazyMotionComponent>
      <LazyMotionComponent>
        <Testimonials />
      </LazyMotionComponent>
    </div>
  );
};

export default Home;
