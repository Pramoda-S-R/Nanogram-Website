import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const RootLayout = () => {
  return (
    <div className="w-full">
      <Navbar />
      <section className="flex flex-1 h-full bg-neutral-white">
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;
