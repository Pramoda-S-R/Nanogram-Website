import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Sidebar from "../components/shared/Sidebar";
import Bottombar from "../components/shared/Bottombar";
import React, { useEffect } from "react";
import { updateUserKarma } from "../lib/appwrite/api";
import { useGetCurrentUser } from "../lib/react_query/queriesAndMutations";

const RootLayout = () => {
  const { data: currentUser } = useGetCurrentUser();
  useEffect(() => {
    updateUserKarma(currentUser);
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
