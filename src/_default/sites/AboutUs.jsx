import React from "react";
import { LazyMotionComponent } from "../../components/motion/LazyMotionComponent";
import { Activities, Alumini, Contact, Mission, Team, Unique } from "../frames/AboutUs";

const AboutUs = () => {
  return (
    <div className="default-container" id="top">
      <Mission />
      <LazyMotionComponent>
        <Unique />
      </LazyMotionComponent>
      <LazyMotionComponent>
        <Team />
      </LazyMotionComponent>
      <LazyMotionComponent>
        <Alumini />
      </LazyMotionComponent>
      <LazyMotionComponent>
        <Activities />
      </LazyMotionComponent>
      <LazyMotionComponent>
        <Contact />
      </LazyMotionComponent>
    </div>
  );
};

export default AboutUs;
