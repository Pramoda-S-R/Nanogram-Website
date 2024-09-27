import React, { useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "./utils/Navbar";
import Hero from "./aboutus/Hero";
import Footer from "./utils/Footer";

const Mission = lazy(() => import("./aboutus/Mission"));
const Team = lazy(() => import("./aboutus/Team"));
const Pillars = lazy(() => import("./aboutus/Pillars"));
const Quotes = lazy(() => import("./aboutus/Quotes"));
const Dedication = lazy(() => import("./aboutus/Dedication"));
const ContactUs = lazy(() => import("./aboutus/ContactUs"));

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const LazyMotionComponent = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
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
  const scrollToSection = () => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      setTimeout(scrollToSection, 100); // Delay for lazy-loaded components to render
    };

    // Initial scroll on load
    setTimeout(scrollToSection, 100); // Initial delay on load

    // Add hash change listener
    window.addEventListener("hashchange", handleHashChange);

    // Clean up listener on unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-50 min-h-screen">
      <Navbar />
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <LazyMotionComponent>
          <Mission />
        </LazyMotionComponent>
        <LazyMotionComponent>
          <Team />
        </LazyMotionComponent>
        <LazyMotionComponent>
          <Pillars />
        </LazyMotionComponent>
        <LazyMotionComponent>
          <Quotes />
        </LazyMotionComponent>
        <LazyMotionComponent>
          <Dedication />
        </LazyMotionComponent>
        <LazyMotionComponent>
          <ContactUs />
        </LazyMotionComponent>
      </Suspense>
      <Footer />
    </div>
  );
}

export default AboutUs;
