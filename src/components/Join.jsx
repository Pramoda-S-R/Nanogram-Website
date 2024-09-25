import React from "react";
import Navbar from "./utils/Navbar";
import Apply from "./misc/Apply";
import Footer from "./utils/Footer";

const Join = () => {
  return (
    <div className=" bg-slate-50 dark:bg-slate-800  text-slate-900 dark:text-slate-50 min-h-screen">
      <Navbar />
      <Apply />
      <Footer />
    </div>
  );
};

export default Join;
