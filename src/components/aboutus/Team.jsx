import React from "react";
import { Linkedin, Instagram, Github } from "lucide-react";

const teamMembers = [
  {
    name: "Pramoda S R",
    role: "Viceroy",
    image: "team/1.webp",
    socials: {
      linkedin: "https://www.linkedin.com/in/pramoda-s-r-1957382b0/",
      github: "https://github.com/Pramoda-S-R/",
    },
  },
  {
    name: "Varun D",
    role: "General Secretary",
    image: "/team/2.webp",
    socials: {
      linkedin: "https://www.linkedin.com/in/gengeek",
      instagram: "https://www.instagram.com/wildly_mystic",
    },
  },
  {
    name: "Fardeen S Khadri",
    role: "Legacy Sentinal",
    image: "/team/3.webp",
    socials: {
      linkedin: "https://www.linkedin.com/in/fardeen-khadri-58a842220",
      github: "https://www.linkedin.com/in/fardeen-khadri-58a842220",
    },
  },
  {
    name: "S Nidhi",
    role: "HR & Operations Officer",
    image: "/team/4.webp",
    socials: {
      linkedin: "https://www.linkedin.com/in/s-nidhi-b0475b232",
    },
  },
  {
    name: "Anusha Rao M",
    role: "Operations Officer",
    image: "/team/5.webp",
    socials: {
      linkedin: "https://www.linkedin.com/in/anusha-rao-m-3ab3711b3",
    },
  },
  {
    name: "Chetan P",
    role: "Treasurer",
    image: "/team/6.webp",
    socials: {
      linkedin: "https://www.linkedin.com/in/chethan-p-87766b232",
    },
  },
  {
    name: "Chandana B L",
    role: "Project Manager",
    image: "/team/7.webp",
    socials: {
      linkedin: "https://www.linkedin.com/in/chandana-bl",
    },
  },
  {
    name: "Chetana N Raj",
    role: "Chronicler",
    image: "/team/8.webp",
    socials: {
      linkedin: "https://www.linkedin.com/in/chethana-n-raj-97ba93279",
    },
  },
  {
    name: "Hrithik Jaiswal",
    role: "Marketing Lead",
    image: "/team/9.webp",
    socials: {
      linkedin: "https://www.linkedin.com/in/hritik-jaiswal-a54a91276",
    },
  },
  // Add more team members here easily
];

const Team = () => {
  return (
    <section
      className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-50"
      id="team"
    >
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white/90">
            Meet Our Team
          </h2>
          <p className="mt-6 text-base font-normal text-slate-700 dark:text-white/90">
            Our team consists of passionate professionals dedicated to advancing
            technology.
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

export default Team;
