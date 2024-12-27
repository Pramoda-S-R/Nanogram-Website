import React, { useState } from "react";
import { Accordion } from "../../../components/ui/Accordion";

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

const Faq = () => {
  // Track the currently open FAQ index
  const [openIndex, setOpenIndex] = useState(null);

  // Toggle the FAQ section
  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle between open/close
  };

  return (
    <div
      className="py-10 text-neutral-black"
      id="faq"
    >
      <div className="px-4 py-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-24">
          {/* Image Section */}
          <div className="object-cover w-full h-auto aspect-[4/3] md:aspect-[3/4] rounded-2xl">
            <img
              alt="Image"
              className="object-cover w-full h-auto aspect-[4/3] md:aspect-[3/4] rounded-2xl"
              src="/assets/images/faq.webp"
              loading="lazy"
            />
          </div>
          {/* FAQ Section */}
          <div>
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                <p className="font-semibold tracking-widest text-primary uppercase">
                  FAQs
                </p>
                <h2 className="text-5xl mb-12 font-semibold text-neutral-black">
                  Frequently Asked Questions
                </h2>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="-my-8 divide-y divide-neutral-black/50">
              {faqData.map((faq, index) => (
                <Accordion
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
    </div>
  );
};

export default Faq;
