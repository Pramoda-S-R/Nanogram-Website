import React, { lazy } from 'react';
import Footer from "./headfoot/Footer";
const Error = lazy(() => import("./headfoot/Error"));

function NotFound() {
  return (
    <div className="min-h-screen">
      <Error />
      <Footer />
    </div>
  );
}

export default NotFound;
