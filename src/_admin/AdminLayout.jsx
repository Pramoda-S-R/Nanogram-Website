import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SpinLoader from "../components/shared/SpinLoader";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { useGetCurrentUser } from "../lib/react_query/queriesAndMutations";
import Button from "../components/ui/Button";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: currentUser, isLoading } = useGetCurrentUser();

  const scrollToSection = () => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    scrollToSection();
  }, [location]);

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex-center h-screen">
          <SpinLoader />
        </div>
      ) : currentUser?.admin ? (
        <>
          <Navbar />
          <section className="flex flex-1 bg-neutral-white">
            <Outlet />
          </section>
          <Footer />
        </>
      ) : (
        <div className="flex-center flex-col h-screen gap-6">
          <div className="flex-center gap-5">
            <img
              src="/assets/images/nanogram_logo-bg-primary.svg"
              alt="Logo"
              className="md:w-1/6 rounded-full"
            />
            <h1 className="text-4xl font-bold text-primary nanogram mb-3">
              NANOGRAM
            </h1>
          </div>
          <div className="flex-center flex-col gap-5 px-6 text-center">
            <h2 className="text-3xl font-bold text-neutral-black">
              Unauthorized
            </h2>
            <p className="text-lg font-normal text-neutral-black/70">
              You are not authorized to access this page. May be one day you
              will be. Keep working hard.
            </p>
          </div>
          <Button onClick={() => navigate("/")}>Go Back Home</Button>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
