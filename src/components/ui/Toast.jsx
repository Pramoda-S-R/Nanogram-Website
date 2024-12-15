import React, { useState, createContext, useContext } from "react";

// Toast Context for managing and triggering toasts
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Function to add a new toast
  const addToast = ({ title, description, action }) => {
    const id = new Date().getTime(); // Unique ID
    setToasts((prev) => [...prev, { id, title, description, action }]);

    // Automatically remove the toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  // Function to remove a toast
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 space-y-4 z-50">
        {toasts.map(({ id, title, description, action }) => (
          <div
            key={id}
            className="relative bg-neutral-white shadow-lg p-4 rounded-md max-w-sm w-full border border-accent-gray hover:shadow-xl"
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 p-1 rounded-full text-primary focus:outline-none"
              onClick={() => removeToast(id)}
            >
              ✕
            </button>

            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="text-sm text-neutral-black/80">{description}</p>
            {action && (
              <button
                className="text-primary hover:underline mt-2"
                onClick={action.onClick}
              >
                {action.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Hook to trigger toasts
export const useToast = () => {
  return useContext(ToastContext);
};
