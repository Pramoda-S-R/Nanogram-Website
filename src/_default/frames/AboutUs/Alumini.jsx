import React, { useEffect, useState } from "react";
import GridTeamList from "../../../components/shared/GridTeamList";
import { getAluminiMembers } from "../../../lib/appwrite/api";

const Alumini = () => {
  const [alumini, setAlumini] = useState([]);

  useEffect(() => {
    const fetchAlumini = async () => {
      try {
        const data = await getAluminiMembers();
        setAlumini(data);
      } catch (error) {
        console.error("Error fetching alumini members:", error);
      }
    };
    fetchAlumini();
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-4xl font-extrabold text-neutral-black">
            Core Collective
          </h2>
          <p className="mt-6 text-base font-normal text-neutral-black/70">
            A tribute to the alumini who took Nanogram to greater heights.
          </p>
        </div>
        <GridTeamList teamMembers={alumini} />
      </div>
    </div>
  );
};

export default Alumini;
