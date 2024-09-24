import React from "react";
import { Cpu, Bot, SatelliteDish, CodeXml } from "lucide-react";

const initiatives = [
  { Icon: Cpu, label: "Innovative Workshops" },
  { Icon: Bot, label: "Robotics Competitions" },
  { Icon: SatelliteDish, label: "Tech Talks and Seminars" },
  { Icon: CodeXml, label: "Coding Bootcamps" },
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
    <section className="flex-grow bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-50 p-8 border-none outline-none">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-medium mb-4">Our Key Initiatives</h1>
        <p className="text-lg font-normal text-slate-600 dark:text-slate-300">
          Explore the main activities and projects our club is engaged in.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-16 pt-16 justify-items-center">
        {initiatives.map((initiative, index) => (
          <KeyInitiativeItem key={index} {...initiative} />
        ))}
      </div>
    </section>
  );
};

export default KeyIn;
