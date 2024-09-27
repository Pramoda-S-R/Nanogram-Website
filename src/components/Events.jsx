import React, { useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "./utils/Navbar";
import Hero from "./events/Hero";
import Footer from "./utils/Footer";

const EventTime = lazy(() => import("./events/EventTime"));
const Highlights = lazy(() => import("./events/Highlights"));
const Involved = lazy(() => import("./events/Involved"));
const Faq = lazy(() => import("./events/Faq"));

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

function Events() {
  const scrollToSection = () => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Trigger scroll on mount and hash change
  useEffect(() => {
    scrollToSection();
    // Add a hash change listener
    const handleHashChange = () => {
      scrollToSection();
    };
    window.addEventListener("hashchange", handleHashChange);

    // Clean up listener
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className=" bg-slate-50 dark:bg-slate-800  text-slate-900 dark:text-slate-50 min-h-screen">
      <Navbar />
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <LazyMotionComponent>
          <EventTime />
        </LazyMotionComponent>
        <LazyMotionComponent>
          <Highlights />
        </LazyMotionComponent>
        <LazyMotionComponent>
          <Involved />
        </LazyMotionComponent>
        <LazyMotionComponent>
          <Faq />
        </LazyMotionComponent>
      </Suspense>
      <Footer />
    </div>
  );
}

export default Events;
