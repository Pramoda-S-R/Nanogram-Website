import React from "react";
import { motion, useAnimation } from "framer-motion";
import { Users, Cake, Cog, GraduationCap } from "lucide-react";
import { useInView } from "react-intersection-observer";

const Achievements = () => {
  const stats = [
    {
      icon: <Cake size={24} />,
      title: "Founded",
      value: 2024,
      color: "bg-primary",
      textcolor: "text-neutral-white",
    },
    {
      icon: <Users size={24} />,
      title: "Active Members",
      value: "50+",
      color: "bg-neutral-white",
      textcolor: "text-neutral-black",
    },
    {
      icon: <Cog size={24} />,
      title: "Workshops and Events",
      value: "10+",
      color: "bg-primary",
      textcolor: "text-neutral-white",
    },
    {
      icon: <GraduationCap size={24} />,
      title: "Students Reached",
      value: "350+",
      color: "bg-neutral-white",
      textcolor: "text-neutral-black",
    },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const valueVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="w-full pt-14" ref={ref}>
      <div className="w-full flex flex-col gap-5 text-center">
        <h2 className="text-5xl font-medium mb-4">Achievements</h2>
        <p className="text-lg font-normal text-neutral-black/70 px-4 mb-10">
          Nanogram - The Tech Hub has been at the forefront of technological
          innovation and education.
          <br />
          We are proud of our accomplishments and the growth of our community.
        </p>
      </div>

      {/* Wrapper for proper spacing */}
      <div className="mb-16">
        <div className="relative">
          <img
            src="/assets/images/gallery_16.jpg"
            alt="Team collaboration"
            className="w-full h-[400px] object-cover grayscale"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-4 p-4 transform translate-y-1/2"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.title}
                variants={itemVariants}
                className={`${stat.color} ${stat.textcolor} p-6 rounded-lg shadow-lg w-[40%] md:w-48 text-center`}
              >
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <h3 className="text-lg font-semibold mb-1">{stat.title}</h3>
                <motion.span
                  variants={valueVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="text-3xl font-bold"
                >
                  {stat.value}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
