import React from "react";
import { motion, useAnimation } from "framer-motion";
import { FileText, Users, Globe, Gift } from "lucide-react";
import { useInView } from "react-intersection-observer";

const Achievements = () => {
  const stats = [
    {
      icon: <FileText size={24} />,
      title: "Percent chance of loosing my sanity",
      value: 100,
      color: "bg-primary",
      textcolor: "text-neutral-white",
    },
    {
      icon: <Users size={24} />,
      title: "Number of times I've wanted to quit",
      value: 80,
      color: "bg-neutral-white",
      textcolor: "text-neutral-black",
    },
    {
      icon: <Globe size={24} />,
      title: "Hours wasted on making this stupid website",
      value: 6000,
      color: "bg-primary",
      textcolor: "text-neutral-white",
    },
    {
      icon: <Gift size={24} />,
      title: "Brain Aneurysms",
      value: 76,
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
            src="/assets/images/placeholder.png"
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
