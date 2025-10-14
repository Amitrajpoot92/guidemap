 import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Components
import NavbarMain from "./components/NavbarMain";
import Footer from "./components/Footer";
 

// Pages
import Home from "./pages/Home";
import College from "./pages/College";
import Courses from "./pages/Courses";
import SoftSkills from "./pages/SoftSkills";
import Resume from "./pages/Resume";
import Hackathon from "./pages/Hackathon";
 

// Context
import { AuthProvider } from "./context/AuthContext";

// 👇 Automatically scrolls to top when route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <div className="bg-[#0f0425] min-h-screen flex flex-col font-inter text-white">
        {/* 🧭 Navbar always at top */}
        <NavbarMain />

        <main className="flex-1 font-serif">
          {/* 📜 Scroll to top on route change */}
          <ScrollToTop />

          {/* 🔗 Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/college" element={<College />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/softskill" element={<SoftSkills />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/hackathon" element={<Hackathon />} />
             
          </Routes>

           
        </main>

        {/* 🦶 Footer at the bottom */}
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
