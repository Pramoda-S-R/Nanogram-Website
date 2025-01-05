import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import { Eye, EyeOff } from "lucide-react"; // Assuming you're using lucide-react for icons

const Input = forwardRef(
  ({ type = "text", placeholder = "", icon, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="flex w-full items-center relative">
        {icon && (
          <div className="absolute left-3 text-neutral-black flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          className={`w-full h-12 pl-12 pr-12 border border-accent-gray rounded-md focus:ring-2 focus:ring-primary focus:outline-none focus:border-primary hover:shadow-md transition duration-200 ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 text-neutral-black flex items-center justify-center"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    );
  }
);

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  className: PropTypes.string,
};

Input.displayName = "Input"; // Important for debugging with forwardRef

export default Input;
