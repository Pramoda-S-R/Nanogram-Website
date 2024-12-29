import React from "react";
import {
  ContactRound,
  Folder,
  Users,
  Cpu,
  Lightbulb,
  SquareTerminal,
} from "lucide-react";

const initiatives = [
    { Icon: ContactRound, label: "Networking" },
    { Icon: Cpu, label: "Workshops" },
    { Icon: SquareTerminal, label: "Hackathons" },
    { Icon: Lightbulb, label: "Innovation-Driven Projects" },
    { Icon: Users, label: "Peer Learning" },
  { Icon: Folder, label: "Project-Based Learning" },
  // Add more initiatives here
];

const KeyInitiativeItem = ({ Icon, label }) => {
  return (
    <div className="flex flex-col items-center p-2">
      <div className="rounded-full bg-secondary hover:bg-primary/70 w-16 h-16 p-4 flex justify-center items-center transition-transform duration-300 hover:scale-110">
        <Icon className="w-8 h-8 text-neutral-white" />
      </div>
      <p className="text-lg font-normal text-neutral-black mt-4 text-center">
        {label}
      </p>
    </div>
  );
};

const Initiatives = () => {
  return (
    <section className="flex-grow p-8 border-none outline-none pb-20">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-medium mb-4">Our Key Initiatives</h1>
        <p className="text-lg font-normal text-neutral-black/70">
          Explore the main activities and projects our club is engaged in.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-16 pt-16 justify-items-center">
        {initiatives.map((initiative, index) => (
          <KeyInitiativeItem key={index} {...initiative} />
        ))}
      </div>
    </section>
  );
};

export default Initiatives;
