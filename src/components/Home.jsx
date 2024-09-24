import React, { lazy, Suspense } from 'react';
import Navbar from './headfoot/Navbar';
import Hero from './home/Hero';
import Footer from './headfoot/Footer';
import { motion } from 'framer-motion';

const KeyIn = lazy(() => import('./home/KeyIn'));
const Gallery = lazy(() => import('./home/Gallery'));
const Team = lazy(() => import('./home/Team'));
const Dashboard = lazy(() => import('./home/Dashboard'));
const EventHighlights = lazy(() => import('./home/EventHighlights'));
const Join = lazy(() => import('./home/Join'));

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <KeyIn />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Gallery />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Team />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Dashboard />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <EventHighlights />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Join />
        </motion.div>
      </Suspense>
      <Footer />
    </div>
  );
}

export default Home;
