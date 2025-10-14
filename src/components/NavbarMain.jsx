 import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import AuthModal from "./AuthModal";

const NavbarMain = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Background same as CollegeRecommender.jsx */}
      <div className="bg-gradient-to-br from-[#dbeafe] via-[#bfdbfe] to-[#93c5fd]">
        <header
          className="flex justify-between items-center px-8 py-4 sticky top-0 z-50 w-full text-black backdrop-blur-sm bg-white/40 shadow-md font-orbitron"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          {/* Brand Name */}
          <div className="text-xl md:text-2xl font-medium tracking-wider uppercase">
            Guide-One
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden cursor-pointer" onClick={toggleMenu}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </div>

          {/* Navigation Links */}
          <nav
            className={`${
              menuOpen
                ? "flex flex-col items-center gap-4 py-4 absolute top-full left-0 right-0 bg-white/80 text-black md:hidden shadow-md"
                : "hidden md:flex items-center gap-8"
            }`}
          >
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold"
                  : "hover:text-blue-700 transition"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/college"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold"
                  : "hover:text-blue-700 transition"
              }
            >
              College
            </NavLink>

            <NavLink
              to="/courses"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold"
                  : "hover:text-blue-700 transition"
              }
            >
              Resources
            </NavLink>

            <NavLink
              to="/softskill"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold"
                  : "hover:text-blue-700 transition"
              }
            >
              Soft-skill
            </NavLink>

            {/* New Resume Link */}
            <NavLink
              to="/resume"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold"
                  : "hover:text-blue-700 transition"
              }
            >
              Resume
            </NavLink>

            {/* New Hackathon Link */}
            <NavLink
              to="/hackathon"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold"
                  : "hover:text-blue-700 transition"
              }
            >
              Hackathon
            </NavLink>

            {/* Login / Signup Modal Button */}
            <button
              onClick={() => {
                setAuthOpen(true);
                closeMenu();
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded font-semibold text-sm hover:bg-blue-700 transition"
            >
              Login / Signup
            </button>
          </nav>
        </header>
      </div>

      {/* Authentication Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default NavbarMain;
