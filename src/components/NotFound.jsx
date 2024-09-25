import React, { lazy } from "react";
import Footer from "./utils/Footer";
const Error = lazy(() => import("./utils/Error"));

function NotFound() {
  return (
    <div className="min-h-screen">
      <Error />
      <Footer />
    </div>
  );
}

export default NotFound;
