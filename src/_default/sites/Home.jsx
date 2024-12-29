import React from "react";
import { LazyMotionComponent } from "../../components/motion/LazyMotionComponent";
import { Hero, Initiatives } from "../frames/Home";

const Home = () => {
  return (
    <div className="default-container" id="top">
      <Hero />
      <LazyMotionComponent>
        <Initiatives />
      </LazyMotionComponent>
    </div>
  );
};

export default Home;
