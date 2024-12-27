import GridTeamList from "../../../components/shared/GridTeamList";

const teamMembers = [
  {
    name: "Pramoda S R",
    role: "Viceroy",
    image: "assets/images/placeholder.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/pramoda-s-r-1957382b0/",
      github: "https://github.com/Pramoda-S-R/",
    },
  },
  {
    name: "Varun D",
    role: "General Secretary",
    image: "/assets/images/placeholder.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/gengeek",
      instagram: "https://www.instagram.com/wildly_mystic",
    },
  },
  {
    name: "Fardeen S Khadri",
    role: "Legacy Sentinal",
    image: "/assets/images/placeholder.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/fardeen-khadri-58a842220",
      github: "https://github.com/fardeenKhadri",
    },
  },
  {
    name: "S Nidhi",
    role: "HR & Operations Officer",
    image: "/assets/images/placeholder.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/s-nidhi-b0475b232",
    },
  },
  {
    name: "Anusha Rao M",
    role: "Operations Officer",
    image: "/assets/images/placeholder.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/anusha-rao-m-3ab3711b3",
    },
  },
  {
    name: "Chetan P",
    role: "Treasurer",
    image: "/assets/images/placeholder.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/chethan-p-87766b232",
    },
  },
  {
    name: "Chandana B L",
    role: "Project Manager",
    image: "/assets/images/placeholder.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/chandana-bl",
    },
  },
  {
    name: "Hrithik Jaiswal",
    role: "Marketing Lead",
    image: "/assets/images/placeholder.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/hritik-jaiswal-a54a91276",
    },
  },
  // Add more team members here easily
];

const Team = () => {
  return (
    <div className="w-full pt-20" id="team">
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-4xl font-extrabold text-neutral-black">
            Meet Our Team
          </h2>
          <p className="mt-6 text-base font-normal text-neutral-black/70">
            Our team consists of passionate professionals dedicated to advancing
            technology.
          </p>
        </div>

        <GridTeamList teamMembers={teamMembers} />
      </div>
    </div>
  );
};

export default Team;
