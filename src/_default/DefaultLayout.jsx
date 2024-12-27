import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { useEffect } from "react";

const DefaultLayout = () => {
  const location = useLocation();

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
      <Navbar />
      <div className="flex">
        <section className="flex flex-1 bg-neutral-white">
          <Outlet />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
