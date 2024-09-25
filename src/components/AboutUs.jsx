import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "./utils/Navbar";
import Hero from "./aboutus/Hero";
import Footer from "./utils/Footer";

const Mission = lazy(() => import("./aboutus/Mission"));
const Team = lazy(() => import("./aboutus/Team"));

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const LazyMotionComponent = ({ children }) => {
  // Use Intersection Observer
  const [ref, inView] = useInView({
    triggerOnce: true, // Ensures animation only triggers once per load
    threshold: 0.2, // Adjust how much of the component should be visible before triggering
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      {children}
    </motion.div>
  );
};

function AboutUs() {
  return (
    <div className=" bg-slate-50 dark:bg-slate-800  text-slate-900 dark:text-slate-50 min-h-screen">
      <Navbar />
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <LazyMotionComponent>
          <Mission />
        </LazyMotionComponent>
        <LazyMotionComponent>
          <Team />
        </LazyMotionComponent>
      </Suspense>
      <Footer />
    </div>
  );
}

export default AboutUs;
