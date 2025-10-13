 "use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook

import logo from "../assets/hero.png";

// Typing words
const words = ["college", "resources", "career", "guide", "dream"];

const Hero = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation

  const cardRef = useRef(null);
  const gridRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), {
    stiffness: 100,
    damping: 20,
  });

  const gridX = useMotionValue(0);
  const gridY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX);
    y.set(offsetY);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    gridX.set((e.clientX - centerX) / 50);
    gridY.set((e.clientY - centerY) / 50);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    gridX.set(0);
    gridY.set(0);
  };

  // Typing effect
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingSpeed = isDeleting ? 50 : 120;
    let currentWord = words[wordIndex % words.length];

    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? currentWord.substring(0, prev.length - 1)
          : currentWord.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 800);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <div
      className="relative w-full min-h-screen flex flex-col lg:flex-row items-start justify-between px-6 sm:px-8 lg:px-12 pt-12 pb-16 bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ---------------- 3D GRID LINES ---------------- */}
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

      {/* ---------------- LEFT CONTENT ---------------- */}
      <div className="relative z-10 w-full lg:w-1/2 text-left">
        <p className="mt-2 tracking-tighter text-white">
          <span className="font-sans font-normal text-6xl md:text-7xl">
            Search Smart,
          </span>
          <br />
          <span className="font-serif italic font-normal text-7xl md:text-8xl text-[#fa6304]">
            Study Smarter
          </span>
          <span
            className="ml-2 text-3xl md:text-4xl font-sans text-transparent stroke-white inline-block min-h-[3rem]"
            style={{ WebkitTextStroke: "1px white" }}
          >
            {text}
          </span>
        </p>

        <h2 className="mt-3 font-sans text-lg md:text-xl text-[#8af6fc] font-normal leading-relaxed">
          Discover Your Perfect college Among Our Million Options
        </h2>

        <div className="flex items-center mt-8 space-x-4 relative">
          {/* 🔹 Button: Navigate to College Page */}
          <motion.button
            onClick={() => navigate("/college")} // ✅ Go to College.jsx page
            animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="inline-flex items-center justify-center px-6 py-2 font-sans text-base font-semibold transition-all duration-200 border-2 border-transparent rounded-full sm:leading-8 bg-[#fa6304] sm:text-lg text-white hover:bg-[#ff8645] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa6304]"
          >
            Search college
          </motion.button>

          <motion.a
            animate={{ y: [0, 5, 0], x: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-2 font-sans text-base font-semibold transition-all duration-200 bg-transparent border-2 rounded-full sm:leading-8 text-[#8af6fc] border-[#8af6fc] hover:bg-[#8af6fc] hover:text-black sm:text-lg focus:ring-2 focus:ring-offset-2 focus:ring-[#8af6fc]"
          >
            Contact us
          </motion.a>
        </div>
      </div>

      {/* ---------------- RIGHT ANIMATED CARD ---------------- */}
      <div className="relative w-full lg:w-1/2 flex justify-center mt-20 lg:mt-20">
        <motion.div
          ref={cardRef}
          style={{ rotateX, rotateY }}
          className="relative w-[280px] sm:w-[340px] md:w-[400px] lg:w-[460px] xl:w-[500px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
        >
          <motion.img
            src={logo}
            alt="Hero Logo"
            className="w-full h-full object-cover rounded-3xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#fa6304]/30 to-[#8af6fc]/20 shadow-2xl pointer-events-none" />
        </motion.div>

        <div className="absolute bottom-[-30px] w-[75%] h-10 bg-[#fa6304]/40 blur-3xl opacity-40 rounded-full" />
      </div>
    </div>
  );
};

export default Hero;
