import React, { useEffect } from "react";

export default function Sheet({ title, children, isOpen, onClose }) {
  // Close the sheet when the "Esc" key is pressed
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing on content click
      >
        <div className="p-4 border-b relative">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-black"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
