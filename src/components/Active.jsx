import React from "react";
import Navbar from "./utils/Navbar";
import CurrentEvent from "./misc/CurrentEvent";
import Footer from "./utils/Footer";

const Active = () => {
  return (
    <div className=" bg-slate-50 dark:bg-slate-800  text-slate-900 dark:text-slate-50 min-h-screen">
      <Navbar />
      <CurrentEvent />
      <Footer />
    </div>
  );
};

export default Active;
