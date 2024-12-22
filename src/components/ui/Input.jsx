import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Input = forwardRef(({ type = "text", placeholder = "", icon, className, ...props }, ref) => {
  return (
    <div className="flex w-full items-center relative">
      {icon && (
        <div className="absolute left-3 text-neutral-black flex items-center justify-center">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`w-full h-12 pl-12 pr-4 border border-accent-gray rounded-md focus:ring-2 focus:ring-primary focus:outline-none focus:border-primary hover:shadow-md transition duration-200 ${className}`}
        {...props}
      />
    </div>
  );
});

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  className: PropTypes.string,
};

Input.displayName = "Input"; // Important for debugging with forwardRef

export default Input;
