 import { NavLink } from "react-router-dom";
import { Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative w-full bg-black text-gray-300 overflow-hidden border-t border-white/10"
      style={{ fontFamily: "Orbitron, sans-serif" }}
    >
      {/* 🔹 Animated Gradient Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fa6304]/10 via-transparent to-[#8af6fc]/10 blur-2xl opacity-60 pointer-events-none" />

      {/* 🔸 Top Section */}
      <div className="relative w-full max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 z-10">
        
        {/* Brand & Mission */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#fa6304] to-[#8af6fc] bg-clip-text text-transparent">
            Guide-One
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            🌟 Your all-in-one mentor for skills, courses, college guidance,
            soft skills, and career growth. Find your path to success with
            AI-powered guidance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#fa6304]">
            Explore
          </h3>
          <ul className="flex flex-col gap-2">
            <li>
              <NavLink
                to="/"
                className="hover:text-[#8af6fc] transition-colors duration-200"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/college"
                className="hover:text-[#8af6fc] transition-colors duration-200"
              >
                College
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                className="hover:text-[#8af6fc] transition-colors duration-200"
              >
                Resources
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/internships-jobs"
                className="hover:text-[#8af6fc] transition-colors duration-200"
              >
                Soft-skill
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className="hover:text-[#8af6fc] transition-colors duration-200"
              >
                Login / Signup
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#8af6fc]">
            Get in Touch
          </h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-[#fa6304]" />
              <a
                href="mailto:info@Guide-One.com"
                className="hover:text-[#8af6fc] transition-colors duration-200"
              >
                info@Guide-One.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Twitter size={18} className="text-[#8af6fc]" />
              <a
                href="https://twitter.com/GuideOne"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fa6304] transition-colors duration-200"
              >
                @GuideOne
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Linkedin size={18} className="text-[#8af6fc]" />
              <a
                href="https://www.linkedin.com/company/guide-one"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fa6304] transition-colors duration-200"
              >
                Guide-One
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-white/10"></div>

      {/* 🔹 Bottom Section with Glow */}
      <div className="relative w-full text-center text-gray-500 text-sm py-6">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-[#fa6304]">Guide-One</span>. All rights reserved.
        </p>

        {/* Neon glow strip */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[3px] bg-gradient-to-r from-[#fa6304] via-[#8af6fc] to-[#fa6304] blur-md opacity-60 rounded-full" />
      </div>
    </footer>
  );
}
