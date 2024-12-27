import GridTeamList from "../../../components/shared/GridTeamList";

const teamMembers = [
  {
    name: "Akshay Shandilya",
    role: "Viceroy & Treasurer - 2024",
    image: "/assets/images/placeholder.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/akshay-r-792a78205",
      instagram: "https://www.instagram.com/_.akshay_r",
    },
  },
  {
    name: "Anirudh Harish Bhat",
    role: "General Secretary & Operations Officer - 2024",
    image: "/assets/images/placeholder.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/anirudh-harish-bhat-3801a6288",
      instagram: "https://www.instagram.com/just_a_dope_dude",
    },
  },
  {
    name: "Arun Kumar",
    role: "Legacy Sentinal - 2024",
    image: "/assets/images/placeholder.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/arun-kumar-n-58b321208",
      instagram: "https://www.instagram.com/_its_me_arun_006",
    },
  },
  // Add more team members here easily
];

const Alumini = () => {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-4xl font-extrabold text-neutral-black">
            Core Collective
          </h2>
          <p className="mt-6 text-base font-normal text-neutral-black/70">
            A tribute to the alumini who took Nanogram to greater heights.
          </p>
        </div>
        <GridTeamList teamMembers={teamMembers} />
      </div>
    </section>
  );
};

export default Alumini;
