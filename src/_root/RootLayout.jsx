import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Sidebar from "../components/shared/Sidebar";
import Bottombar from "../components/shared/Bottombar";
import React from "react";


const RootLayout = () => {
  return (
    <div className="w-full ">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex flex-1 h-full bg-neutral-white">
          <Outlet />
        </section>
      </div>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
