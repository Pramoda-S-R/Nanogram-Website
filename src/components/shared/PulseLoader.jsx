import React from "react";
import clsx from "clsx";

const PulseLoader = ({ className }) => {
  const baseStyles = "animate-pulse rounded-full bg-neutral-white";

  return (
    <div className={clsx(baseStyles, className)}></div>
  );
};

export default PulseLoader;
