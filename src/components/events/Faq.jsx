import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// FAQ Data (You can easily add new items here)
const faqData = [
  {
    question: "How can I join an event?",
    answer:
      "You can join an event by registering on our website. Visit the Events page and select the event you are interested in.",
  },
  {
    question: "Are the events free?",
    answer:
      "Most of our events are free for members. Some specialized workshops may have a nominal fee.",
  },
  {
    question: "Do I need prior knowledge to attend?",
    answer:
      "No prior knowledge is required for most events. We welcome enthusiasts of all skill levels.",
  },
  {
    question: "How can I become a member?",
    answer:
      "You can become a member by signing up on our website. Visit the Membership page for more details.",
  },
];

// Individual FAQ Item Component
const FaqItem = ({ question, answer, isOpen, onClick }) => (
  <div className="py-8">
    <button
      className="flex items-center justify-between w-full py-6 text-lg font-bold"
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
          <p className="text-base text-slate-600 dark:text-white/90">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Faq = () => {
  // Track the currently open FAQ index
  const [openIndex, setOpenIndex] = useState(null);

  // Toggle the FAQ section
  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle between open/close
  };

  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-50" id="faq">
      <div className="px-4 py-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-24">
          {/* Image Section */}
          <div className="object-cover w-full h-auto aspect-[4/3] md:aspect-[3/4] rounded-2xl bg-slate-100">
            <img
              alt="Image"
              className="object-cover w-full h-auto aspect-[4/3] md:aspect-[3/4] rounded-2xl"
              src="/1.png"
            />
          </div>
          {/* FAQ Section */}
          <div>
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                <p className="font-semibold tracking-widest text-sky-500 uppercase">
                  FAQs
                </p>
                <h2 className="text-5xl mb-12 font-semibold text-slate-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="-my-8 divide-y divide-black/10 dark:divide-white/10">
              {faqData.map((faq, index) => (
                <FaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => toggleIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
