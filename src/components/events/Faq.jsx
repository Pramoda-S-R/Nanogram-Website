import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// FAQ Data (You can easily add new items here)
const faqData = [
  {
    question: "What kind of activities does the technical club organize?",
    answer:
      "We host workshops, project building, hackathons, and guest lectures. Our projects range from beginner-friendly to advanced, covering various technical domains.",
  },
  {
    question:
      "Who can become a member of the technical club, and who can join our events?",
    answer:
      "ECE students can officially become members, while students from other branches are welcome to attend our events and workshops!",
  },
  {
    question: "How can I become a member of the technical club?",
    answer:
      "Simply fill out our membership form on the website. We welcome new members throughout the year, and the best part is there are no membership fees!",
  },
  {
    question: "Do I need prior experience to participate?",
    answer:
      "No prior experience is required! The club is beginner-friendly, though some workshops may need a basic understanding of the topic. Most importantly, anyone with an interest and passion for learning is encouraged to participate.",
  },
  {
    question: "How can I stay updated on club activities?",
    answer:
      "Follow us on our social media platforms and regularly check our website for updates on meetings, events, and workshops.",
  },
];

// Individual FAQ Item Component
const FaqItem = ({ question, answer, isOpen, onClick }) => (
  <div className="py-8">
    <button
      className="flex items-center text-left justify-between w-full py-6 text-lg font-bold"
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
    <section
      className="py-10 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-50"
      id="faq"
    >
      <div className="px-4 py-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-24">
          {/* Image Section */}
          <div className="object-cover w-full h-auto aspect-[4/3] md:aspect-[3/4] rounded-2xl bg-slate-100">
            <img
              alt="Image"
              className="object-cover w-full h-auto aspect-[4/3] md:aspect-[3/4] rounded-2xl"
              src="/show/8.webp"
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
