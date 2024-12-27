import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const Accordion = ({ question, answer, isOpen, onClick }) => (
  <div className="py-8">
    <button
      className="flex items-center text-left justify-between w-full py-6 text-lg font-bold text-neutral-black/70"
      onClick={onClick}
    >
      {question}{" "}
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-base text-neutral-black/70">{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
