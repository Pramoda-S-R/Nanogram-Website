import React from "react";
import {
  Wrench,
  Folder,
  Users,
  Cpu,
  Lightbulb,
  SquareTerminal,
} from "lucide-react";

const initiatives = [
  { Icon: Wrench, label: "Hands-On Learning" },
  { Icon: Folder, label: "Project-Based Learning" },
  { Icon: Users, label: "Collaborative Learning" },
  { Icon: Cpu, label: "Technical Skill Development" },
  { Icon: Lightbulb, label: "Innovation-Driven Projects" },
  { Icon: SquareTerminal, label: "Organizing Hackathons" },
  // Add more initiatives here
];

const KeyInitiativeItem = ({ Icon, label }) => {
  return (
    <div className="flex flex-col items-center p-2">
      <div className="rounded-full bg-blue-100 dark:bg-blue-950 hover:bg-blue-200 dark:hover:bg-blue-800 w-16 h-16 p-4 flex justify-center items-center transition-transform duration-300 hover:scale-110">
        <Icon className="w-8 h-8 text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200" />
      </div>
      <p className="text-lg font-normal text-slate-600 dark:text-slate-300 mt-4 text-center">
        {label}
      </p>
    </div>
  );
};

const KeyIn = () => {
  return (
    <section className="flex-grow bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-50 p-8 border-none outline-none pb-20">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-medium mb-4">Our Key Initiatives</h1>
        <p className="text-lg font-normal text-slate-600 dark:text-slate-300">
          Explore the main activities and projects our club is engaged in.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-16 pt-16 justify-items-center">
        {initiatives.map((initiative, index) => (
          <KeyInitiativeItem key={index} {...initiative} />
        ))}
      </div>
    </section>
  );
};

export default KeyIn;
