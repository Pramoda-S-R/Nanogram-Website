import React from "react";
import Navbar from "./headfoot/Navbar";
import Footer from "./headfoot/Footer";

function AboutUs() {
  return (
    <div className=" bg-slate-50 dark:bg-slate-800  text-slate-900 dark:text-slate-50 min-h-screen">
      <Navbar />
      <div>About us page here</div>
      <Footer />
    </div>
  );
}

export default AboutUs;
