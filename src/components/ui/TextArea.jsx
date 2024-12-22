import React, { forwardRef } from "react";
import clsx from "clsx";

// ForwardRef to pass ref down to the <textarea> element
const TextArea = forwardRef(
  (
    {
      placeholder = "Enter your text...",
      rows = 4,
      className = "",
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const baseStyles =
      "w-full px-4 py-2 rounded-md border-2 text-sm font-medium focus:outline-none";
    const activeStyles =
      "bg-neutral-white text-neutral-black border-neutral-black";
    const disabledStyles = "opacity-50 cursor-not-allowed";

    return (
      <textarea
        ref={ref}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          baseStyles,
          activeStyles,
          { [disabledStyles]: disabled },
          className
        )}
        {...rest}
      />
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
