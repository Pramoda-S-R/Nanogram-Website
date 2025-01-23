import React, { useState, useEffect } from "react";
import GridTeamList from "../../../components/shared/GridTeamList";
import { getCoreMembers } from "../../../lib/appwrite/api";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getCoreMembers();
        setTeamMembers(data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    fetchTeam();
  }, []);
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
