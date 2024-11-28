import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

// Lazy load the other components
const AboutUs = lazy(() => import("./components/AboutUs"));
const Events = lazy(() => import("./components/Events"));
const Gallery = lazy(() => import("./components/Gallery"));
const NotFound = lazy(() => import("./components/NotFound"));
const Join = lazy(() => import("./components/Join"));
const Active = lazy(() => import("./components/Active"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div className="text-center"></div>}>
        <Routes>
          {/* Landing page / Home page */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/join" element={<Join />} />
          <Route path="/events-active" element={<Active />} />
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
