 "use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Calendar, Star, MapPin } from "lucide-react";

const Hack = () => {
  const [contests, setContests] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorPopup, setErrorPopup] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Fetch contests from API
  const fetchContests = async () => {
    setLoading(true);
    setShowResults(true);
    setErrorPopup("");
    try {
      let url = "https://contest-hackathon-tracker-6j7r.onrender.com/api/all";
      const params = [];
      if (type) params.push(`type=${type}`);
      if (status) params.push(`status=${status}`);
      if (params.length) url += `?${params.join("&")}`;

      const res = await fetch(url);
      const data = await res.json();

      const filtered = data.filter(
        (item) =>
          item.title.toLowerCase().includes(searchText.toLowerCase()) ||
          item.platform.toLowerCase().includes(searchText.toLowerCase())
      );

      setContests(filtered);
      if (filtered.length === 0) setErrorPopup("🚫 No contests found.");
    } catch (err) {
      console.error("Error fetching contests:", err);
      setContests([]);
      setErrorPopup("Something went wrong while fetching contests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  return (
    <motion.div
      className="bg-black min-h-screen px-6 md:px-12 py-16 flex flex-col items-center text-white relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 w-full h-px bg-white/10"
            style={{ top: `${(i * 100) / 40}%` }}
          />
        ))}
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 h-full w-px bg-white/10"
            style={{ left: `${(i * 100) / 80}%` }}
          />
        ))}
      </div>

      {/* Heading */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-10 text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🚀 <span className="text-[#fa6304]">Hackathon</span> & Contest Tracker
      </motion.h1>

      {/* Filters */}
      <motion.div
        className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-2xl w-full max-w-4xl flex flex-wrap gap-4 items-center border border-white/10 mb-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <input
          type="text"
          placeholder="🔍 Search by title or platform..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-black border border-white/20 focus:ring-2 focus:ring-[#fa6304] text-white placeholder-gray-400"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-3 rounded-xl bg-black border border-white/20 focus:ring-2 focus:ring-[#fa6304] text-white"
        >
          <option value="">All Types</option>
          <option value="hackathon">Hackathon</option>
          <option value="contest">Contest</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-3 rounded-xl bg-black border border-white/20 focus:ring-2 focus:ring-[#fa6304] text-white"
        >
          <option value="">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="live">Live</option>
          <option value="past">Past</option>
        </select>
        <motion.button
          onClick={fetchContests}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-[#fa6304] via-[#ffb347] to-[#8af6fc] text-black px-6 py-3 rounded-xl font-semibold transition"
        >
          Search
        </motion.button>
      </motion.div>

      {/* Results */}
      {showResults && (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {loading ? (
            <div className="col-span-full text-center text-[#fa6304] font-semibold text-lg">
              ⏳ Loading contests...
            </div>
          ) : contests.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">
              No contests found.
            </div>
          ) : (
            contests.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10 hover:shadow-[0_0_15px_#fa6304aa] hover:bg-gradient-to-r hover:from-[#fa6304] hover:to-[#ffb347] hover:text-black transition-all"
              >
                <h3 className="text-xl font-bold mb-2 text-[#fa6304]">
                  {item.title}
                </h3>
                <p className="text-gray-300">
                  <strong>Platform:</strong> {item.platform}
                </p>
                <p className="text-gray-300 flex items-center gap-1">
                  <Calendar size={14} /> <strong>Start:</strong>{" "}
                  {item.start_date || "N/A"}
                </p>
                <p className="text-gray-300 flex items-center gap-1">
                  <Calendar size={14} /> <strong>End:</strong>{" "}
                  {item.end_date || "N/A"}
                </p>
                <p className="text-gray-300 flex items-center gap-1">
                  <Star size={14} /> <strong>Status:</strong>{" "}
                  {item.status || item.phase || "N/A"}
                </p>
                <p className="text-gray-300 flex items-center gap-1 mb-4">
                  <MapPin size={14} /> {item.location || "Remote"}
                </p>
                <a
                  href={item.apply_link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block w-full text-center bg-gradient-to-r from-[#fa6304] via-[#ffb347] to-[#8af6fc] text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 transition-transform"
                >
                  Apply / Open
                </a>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Error Popup */}
      <AnimatePresence>
        {errorPopup && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={() => setErrorPopup("")}
          >
            <div
              className="bg-[#1a103d] text-white p-6 rounded-2xl shadow-2xl max-w-md w-[92%] text-center border border-[#fa6304]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-[#fa6304] mb-3 flex items-center justify-center gap-2">
                <AlertTriangle className="text-[#fa6304]" /> Oops!
              </h2>
              <p className="text-gray-300 mb-6">{errorPopup}</p>
              <button
                onClick={() => setErrorPopup("")}
                className="bg-gradient-to-r from-[#fa6304] via-[#ffb347] to-[#8af6fc] px-6 py-2 rounded-lg font-semibold text-black hover:scale-105 transition-transform"
              >
                Got it 👍
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Hack;
