import React, { useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "./utils/Navbar";
import Hero from "./home/Hero";
import Footer from "./utils/Footer";

const KeyIn = lazy(() => import("./home/KeyIn"));
const Gallery = lazy(() => import("./home/Gallery"));
const Team = lazy(() => import("./home/Team"));
const Dashboard = lazy(() => import("./home/Dashboard"));
const EventHighlights = lazy(() => import("./home/EventHighlights"));
const Join = lazy(() => import("./home/Join"));

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

function Home() {
  useEffect(() => {
    // Check if there's a hash in the URL and scroll to the corresponding section
    if (window.location.hash) {
      const id = window.location.hash.substring(1); // Remove the '#' from the hash
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  return (
    <div className=" bg-slate-50 dark:bg-slate-800  text-slate-900 dark:text-slate-50 min-h-screen">
      <Navbar />
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <LazyMotionComponent>
          <KeyIn />
        </LazyMotionComponent>
        <LazyMotionComponent>
          <Gallery />
        </LazyMotionComponent>
        <LazyMotionComponent>
          <Team />
        </LazyMotionComponent>
        <LazyMotionComponent>
          <Dashboard />
        </LazyMotionComponent>
        <LazyMotionComponent>
          <EventHighlights />
        </LazyMotionComponent>
        <LazyMotionComponent>
          <Join />
        </LazyMotionComponent>
      </Suspense>
      <Footer />
    </div>
  );
}

export default Home;
