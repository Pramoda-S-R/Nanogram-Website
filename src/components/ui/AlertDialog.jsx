import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";

const AlertDialog = ({
  isOpen,
  onClose,
  title,
  description,
  confirmButtonTitle,
  onConfirm,
  cancelButtonTitle,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-neutral-white p-6 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h2 className="text-neutral-black text-xl font-semibold mb-4">{title}</h2>
        <p className="text-neutral-black/70 mb-6">{description}</p>
        <div className="flex justify-end gap-4">
          <Button
            onClick={onCancel}
            variant="destructive"
          >
            {cancelButtonTitle}
          </Button>
          <Button
            onClick={onConfirm}
            variant="primary"
          >
            {confirmButtonTitle}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AlertDialog;