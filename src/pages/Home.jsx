 "use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaBookOpen, // Study Resources
  FaUniversity, // College Finder
  FaBriefcase, // Internships & Jobs
  FaFileAlt, // Resume Analyzer
  FaComments, // Mock Interviews
  FaTrophy, // Hackathons
} from "react-icons/fa";

// ✅ Import Hero component
import Hero from "../components/hero";
import AuthModal from "../components/AuthModal";

const Home = () => {
  const [authOpen, setAuthOpen] = React.useState(false);
  const gridRef = useRef(null);

  // Animation setup for background motion (same as Hero)
  const gridX = useMotionValue(0);
  const gridY = useMotionValue(0);
  const rotateX = useSpring(useTransform(gridY, [-100, 100], [15, -15]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(gridX, [-100, 100], [-15, 15]), {
    stiffness: 100,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    gridX.set((e.clientX - centerX) / 50);
    gridY.set((e.clientY - centerY) / 50);
  };

  const handleMouseLeave = () => {
    gridX.set(0);
    gridY.set(0);
  };

  // Gradient from Hero for cards
  const cardGradient = "bg-gradient-to-r from-[#fa6304] via-[#ffb347] to-[#8af6fc]";

  return (
    <>
      {/* ✅ Hero Section */}
      <Hero />

      {/* ✅ Home Section with animated grid */}
      <div
        className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 pt-12 pb-20 bg-black overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* ---------------- GRID BACKGROUND ---------------- */}
        <motion.div
          ref={gridRef}
          className="absolute inset-0 pointer-events-none"
          style={{ x: gridX, y: gridY }}
        >
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
        </motion.div>

        {/* ---------------- HEADING ---------------- */}
        <div className="relative z-10 text-center mt-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Your Academic <span className="text-[#fa6304]">Companion</span>
          </motion.h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Find colleges, materials, internships, and resources — all in one place.
          </p>
        </div>

        {/* ---------------- CARDS SECTION ---------------- */}
        <motion.div
          className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-20 w-full max-w-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* 🏫 College Finder */}
          <Link to="/college">
            <motion.div
              whileHover={{ scale: 1.05, rotateX: 3, rotateY: -3 }}
              className={`p-8 rounded-2xl text-center shadow-lg transition-all duration-300 cursor-pointer ${cardGradient}`}
            >
              <FaUniversity className="text-4xl mx-auto text-white" />
              <h3 className="text-xl font-semibold mt-4 mb-2 text-white">
                College Finder
              </h3>
              <p className="text-white/90">
                Search and compare top colleges with detailed course insights.
              </p>
            </motion.div>
          </Link>

          {/* 📚 Study Resources */}
          <Link to="/courses">
            <motion.div
              whileHover={{ scale: 1.05, rotateX: -3, rotateY: 3 }}
              className={`p-8 rounded-2xl text-center shadow-lg transition-all duration-300 cursor-pointer ${cardGradient}`}
            >
              <FaBookOpen className="text-4xl mx-auto text-white" />
              <h3 className="text-xl font-semibold mt-4 mb-2 text-white">
                Study Resources
              </h3>
              <p className="text-white/90">
                Access curated notes, PDFs, and tutorials for your subjects.
              </p>
            </motion.div>
          </Link>

          {/* 🧠 Resume Analyzer */}
          <Link to="/resume">
            <motion.div
              whileHover={{ scale: 1.05, rotateX: 3, rotateY: 3 }}
              className={`p-8 rounded-2xl text-center shadow-lg transition-all duration-300 cursor-pointer ${cardGradient}`}
            >
              <FaFileAlt className="text-4xl mx-auto text-white" />
              <h3 className="text-xl font-semibold mt-4 mb-2 text-white">
                Resume Analyzer
              </h3>
              <p className="text-white/90">
                Get instant feedback and skill match analysis on your resume.
              </p>
            </motion.div>
          </Link>

          {/* 💼 Internships & Jobs */}
          <Link to="/internships-jobs">
            <motion.div
              whileHover={{ scale: 1.05, rotateX: -3, rotateY: -3 }}
              className={`p-8 rounded-2xl text-center shadow-lg transition-all duration-300 cursor-pointer ${cardGradient}`}
            >
              <FaBriefcase className="text-4xl mx-auto text-white" />
              <h3 className="text-xl font-semibold mt-4 mb-2 text-white">
                Internships & Jobs
              </h3>
              <p className="text-white/90">
                Find internships and jobs that match your academic background.
              </p>
            </motion.div>
          </Link>

          {/* 🗣️ Mock Interviews */}
          <Link to="/mock-interview">
            <motion.div
              whileHover={{ scale: 1.05, rotateX: 3, rotateY: 3 }}
              className={`p-8 rounded-2xl text-center shadow-lg transition-all duration-300 cursor-pointer ${cardGradient}`}
            >
              <FaComments className="text-4xl mx-auto text-white" />
              <h3 className="text-xl font-semibold mt-4 mb-2 text-white">
                Mock Interviews
              </h3>
              <p className="text-white/90">
                Practice interviews with feedback to boost your confidence.
              </p>
            </motion.div>
          </Link>

          {/* 🏆 Hackathon Tracker */}
          <Link to="/hackathon">
            <motion.div
              whileHover={{ scale: 1.05, rotateX: -3, rotateY: 3 }}
              className={`p-8 rounded-2xl text-center shadow-lg transition-all duration-300 cursor-pointer ${cardGradient}`}
            >
              <FaTrophy className="text-4xl mx-auto text-white" />
              <h3 className="text-xl font-semibold mt-4 mb-2 text-white">
                Hackathon Tracker
              </h3>
              <p className="text-white/90">
                Stay updated with college-level and national hackathon events.
              </p>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Home;
