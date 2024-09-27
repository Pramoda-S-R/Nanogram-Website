import React from "react";
import { Linkedin, Instagram, Github } from "lucide-react";

const teamMembers = [
  {
    name: "Akshay Shandilya",
    role: "Viceroy & Treasurer - 2024",
    image: "/team/A1.webp",
    socials: {
      linkedin: "https://www.linkedin.com/in/akshay-r-792a78205",
      instagram: "https://www.instagram.com/_.akshay_r",
    },
  },
  {
    name: "Anirudh Harish Bhat",
    role: "General Secretary & Operations Officer - 2024",
    image: "/team/A2.webp",
    socials: {
      linkedin: "https://www.linkedin.com/company/wix-com",
      instagram: "https://www.instagram.com/just_a_dope_dude",
    },
  },
  {
    name: "Arun Kumar",
    role: "Legacy Sentinal - 2024",
    image: "/team/A3.webp",
    socials: {
      linkedin: "https://www.linkedin.com/in/arun-kumar-n-58b321208",
      instagram: "https://www.instagram.com/_its_me_arun_006",
    },
  },
  // Add more team members here easily
];

const Pillars = () => {
  return (
    <section className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-50">
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white/90">
            Core Collective
          </h2>
          <p className="mt-6 text-base font-normal text-slate-700 dark:text-white/90">
            A tribute to the alumini who took Nanogram to greater heights.
          </p>
        </div>

        <ul className="mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-10">
          {teamMembers.map((member, index) => (
            <li key={index} className="flex flex-col gap-6 xl:flex-row">
              <div className="w-40 h-50 aspect-[4/5] flex-none rounded-2xl object-cover">
                <img
                  alt={member.name}
                  loading="lazy"
                  className="w-40 h-50 aspect-[4/5] flex-none rounded-2xl object-cover"
                  src={member.image}
                />
              </div>
              <div className="flex-auto">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-slate-900 dark:text-white/90">
                  {member.name}
                </h3>
                <p className="text-base leading-7 text-slate-600 dark:text-white/90">
                  {member.role}
                </p>

                {/* Social Links */}
                <div className="mt-6 flex space-x-4">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-900 dark:text-slate-50 hover:text-sky-400 dark:hover:text-sky-400"
                    >
                      <Linkedin />
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-900 dark:text-slate-50 hover:text-sky-400 dark:hover:text-sky-400"
                    >
                      <Instagram />
                    </a>
                  )}
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-900 dark:text-slate-50 hover:text-sky-400 dark:hover:text-sky-400"
                    >
                      <Github />
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Pillars;
