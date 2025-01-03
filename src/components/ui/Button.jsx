import React, { forwardRef } from "react";
import clsx from "clsx";

const Button = forwardRef(
  (
    {
      children,
      onClick,
      variant = "primary",
      padding = "px-4 py-2",
      className,
      disabled,
      type = "button",
    },
    ref
  ) => {
    const baseStyles =
      "rounded-md font-semibold text-sm flex gap-3 items-center justify-center text-center";
    const variantStyles = {
      primary: "bg-primary text-neutral-white hover:bg-primary/85",
      secondary: "bg-secondary text-neutral-black hover:bg-secondary/50",
      destructive: "bg-red-600 text-white hover:bg-red-700",
      outline:
        "border-2 border-neutral-black text-neutral-black bg-neutral-white hover:bg-neutral-white/70",
      ghost: "text-primary hover:bg-primary/10",
      link: "text-primary/70 hover:text-primary hover:underline",
    };
    const disabledStyles = "opacity-50 cursor-not-allowed";

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, padding, variantStyles[variant], className, {
          [disabledStyles]: disabled,
        })}
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
        type={type}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
