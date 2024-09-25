import React from "react";
import Navbar from "./utils/Navbar";
import Photos from "./misc/Photos";
import Footer from "./utils/Footer";

const Gallery = () => {
  return (
    <div className=" bg-slate-50 dark:bg-slate-800  text-slate-900 dark:text-slate-50 min-h-screen">
      <Navbar />
      <Photos />
      <Footer />
    </div>
  );
};

export default Gallery;
