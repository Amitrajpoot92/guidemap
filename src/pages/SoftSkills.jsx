 "use client";
import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaComments, FaLightbulb, FaClock, FaBrain } from "react-icons/fa";

const skills = [
  {
    title: "Communication",
    description:
      "Improve your verbal and written communication for better teamwork and client interaction.",
    icon: <FaComments className="text-4xl text-white mx-auto" />,
  },
  {
    title: "Teamwork",
    description:
      "Learn how to collaborate effectively in teams and manage group projects smoothly.",
    icon: <FaUsers className="text-4xl text-white mx-auto" />,
  },
  {
    title: "Leadership",
    description:
      "Develop the ability to guide, motivate, and take responsibility within a team or organization.",
    icon: <FaLightbulb className="text-4xl text-white mx-auto" />,
  },
  {
    title: "Problem Solving",
    description:
      "Sharpen your analytical thinking and find innovative solutions to complex problems.",
    icon: <FaBrain className="text-4xl text-white mx-auto" />,
  },
  {
    title: "Time Management",
    description:
      "Master prioritization, planning, and scheduling to complete projects efficiently.",
    icon: <FaClock className="text-4xl text-white mx-auto" />,
  },
];

const SoftSkills = () => {
  const cardGradient =
    "bg-gradient-to-r from-[#fa6304] via-[#ffb347] to-[#8af6fc]";

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden py-20 px-6 sm:px-10">
      {/* 🔹 Animated Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 w-full h-px bg-white/5"
            style={{ top: `${(i * 100) / 40}%` }}
          />
        ))}
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 h-full w-px bg-white/5"
            style={{ left: `${(i * 100) / 80}%` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-black/0 to-white/5 pointer-events-none" />
      </div>

      {/* 🔹 Page Title */}
      <motion.h1
        className="relative z-10 text-4xl md:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Soft Skills <span className="text-[#fa6304]">Development</span>
      </motion.h1>

      {/* 🔹 Skills Cards */}
      <motion.div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotateX: 3, rotateY: -3 }}
            className={`p-8 rounded-2xl text-center shadow-lg transition-all duration-300 ${cardGradient}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="mb-4">{skill.icon}</div>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              {skill.title}
            </h2>
            <p className="text-white/90">{skill.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SoftSkills;
