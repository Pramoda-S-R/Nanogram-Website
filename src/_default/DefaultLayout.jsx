import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const DefaultLayout = () => {
  return (
    <div className="w-full">
      <Navbar />
      <section className="flex flex-1 bg-neutral-white">
        <Outlet />
      </section>
    </div>
  );
};

export default DefaultLayout;
