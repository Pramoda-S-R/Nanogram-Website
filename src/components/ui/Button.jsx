import React from "react";
import clsx from "clsx";

const Button = ({ children, onClick, variant = "primary", className, disabled, type = "button" }) => {
  const baseStyles =
    "px-4 py-2 rounded-md font-semibold text-sm flex gap-3 items-center justify-center text-center";
  const variantStyles = {
    primary: "bg-primary text-neutral-white hover:bg-primary/85",
    secondary: "bg-secondary text-neutral-black hover:bg-secondary/50",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border-2 border-neutral-black text-neutral-black bg-neutral-white hover:bg-neutral-white/70",
    ghost: "text-primary hover:bg-primary/10",
    link: "text-primary/70 hover:text-primary hover:underline",
  };
  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], className, {
        [disabledStyles]: disabled,
      })}
      onClick={!disabled ? onClick : undefined} // Prevent clicking when disabled
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
