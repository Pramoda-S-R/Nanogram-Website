import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Sidebar from "../components/shared/Sidebar";
import Bottombar from "../components/shared/Bottombar";
import React, { useEffect } from "react";
import { updateUserKarma } from "../lib/appwrite/api";

const RootLayout = () => {
  useEffect(() => {
    const interval = setInterval(updateUserKarma, 10000);

    return () => clearInterval(interval);
  }, []);
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
