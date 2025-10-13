 "use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const CollegeRecommender = () => {
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [interest, setInterest] = useState("");
  const [customInterest, setCustomInterest] = useState("");
  const [course, setCourse] = useState("");
  const [customCourse, setCustomCourse] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutput(null);

    const finalInterest = interest === "Other" ? customInterest : interest;
    const finalCourse = course === "Other" ? customCourse : course;

    const data = {
      location,
      budget,
      interest: finalInterest,
      course: finalCourse,
    };

    try {
      const res = await fetch(
        "https://college-recommender-app.onrender.com/recommend_colleges/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const json = await res.json();
      setOutput(json);
    } catch (error) {
      setOutput({ error: "❌ Unable to connect to server." });
    } finally {
      setLoading(false);
    }
  };

  const cardGradient = "bg-gradient-to-r from-[#fa6304] via-[#ffb347] to-[#8af6fc]";

  return (
    <div className="min-h-screen bg-black text-white px-6 sm:px-10 lg:px-20 py-16 overflow-hidden relative">
      {/* Background Grid Lines */}
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

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        <h1 className="text-5xl font-bold mb-3">
          🎓 College <span className="text-[#fa6304]">Recommender</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Discover your perfect college match based on your preferences
        </p>
      </motion.div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 mt-12 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full max-w-4xl mx-auto border border-white/10"
      >
        <h2 className="text-2xl font-bold text-[#fa6304] mb-8 text-center">
          Find Your Perfect College
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Location */}
          <div>
            <label className="font-semibold text-gray-200 mb-1 block">
              📍 Preferred Location
            </label>
            <input
              type="text"
              placeholder="e.g., Delhi, Maharashtra, Bangalore"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full rounded-xl p-3 bg-black border border-white/20 focus:ring-2 focus:ring-[#fa6304] text-white placeholder-gray-400"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="font-semibold text-gray-200 mb-1 block">
              💰 Budget Range (in ₹)
            </label>
            <input
              type="text"
              placeholder="e.g., 5-10 Lakhs"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
              className="w-full rounded-xl p-3 bg-black border border-white/20 focus:ring-2 focus:ring-[#fa6304] text-white placeholder-gray-400"
            />
          </div>

          {/* Interest */}
          <div>
            <label className="font-semibold text-gray-200 mb-1 block">
              🎯 Interest Field
            </label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              required
              className="w-full rounded-xl p-3 bg-black border border-white/20 focus:ring-2 focus:ring-[#fa6304] text-white"
            >
              <option value="">--Select Your Field--</option>
              <option>Engineering</option>
              <option>Medical</option>
              <option>Science</option>
              <option>Arts</option>
              <option>Commerce</option>
              <option>Law</option>
              <option>Management</option>
              <option>Design</option>
              <option>Other</option>
            </select>

            {interest === "Other" && (
              <input
                type="text"
                placeholder="Enter your interest"
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                className="mt-3 w-full rounded-xl p-3 bg-black border border-white/20 focus:ring-2 focus:ring-[#fa6304] text-white placeholder-gray-400"
              />
            )}
          </div>

          {/* Course */}
          <div>
            <label className="font-semibold text-gray-200 mb-1 block">
              📚 Course
            </label>
            <input
              type="text"
              placeholder="e.g., B.Tech, MBA, MBBS"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
              className="w-full rounded-xl p-3 bg-black border border-white/20 focus:ring-2 focus:ring-[#fa6304] text-white placeholder-gray-400"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            className="md:col-span-2 mt-6 py-3 text-lg font-semibold rounded-xl shadow-lg transition-all bg-gradient-to-r from-[#fa6304] via-[#ffb347] to-[#8af6fc] text-black"
          >
            🔍 Find My Perfect Colleges
          </motion.button>
        </form>
      </motion.div>

      {/* Output Section */}
      <div className="relative z-10 mt-12 w-full max-w-4xl mx-auto">
        {loading && (
          <div className="flex justify-center items-center flex-col text-[#fa6304] font-semibold text-lg bg-white/5 p-10 rounded-2xl">
            <div className="w-10 h-10 border-4 border-[#fa6304] border-t-transparent rounded-full animate-spin mb-3"></div>
            Searching for the best colleges for you...
          </div>
        )}

        {!loading && !output && (
          <div className="text-center text-gray-400 text-lg bg-white/5 p-10 rounded-2xl">
            🎯 Fill the form above to discover your perfect college match!
          </div>
        )}

        {!loading && output && output.error && (
          <div className="text-center bg-red-500/20 text-red-400 font-semibold py-4 rounded-lg">
            ⚠️ {output.error}
          </div>
        )}

        {!loading &&
          output &&
          Array.isArray(output.result) &&
          output.result.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`mt-8 p-6 rounded-2xl shadow-lg ${cardGradient} text-black`}
            >
              <h3 className="text-2xl font-bold mb-4">{c.college_name}</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-black/70 uppercase">🏆 NIRF Rank</p>
                  <p className="font-semibold">{c.nirf_rank}</p>
                </div>
                <div>
                  <p className="text-sm text-black/70 uppercase">📚 Course</p>
                  <p className="font-semibold">{c.course_offered}</p>
                </div>
                <div>
                  <p className="text-sm text-black/70 uppercase">📝 Entrance Exam</p>
                  <p className="font-semibold">{c.entrance_exam}</p>
                </div>
                <div>
                  <p className="text-sm text-black/70 uppercase">💵 Fee</p>
                  <p className="font-semibold">{c.expected_price_per_course}</p>
                </div>
              </div>
              <a
                href={c.official_website}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-black text-white py-2 px-5 rounded-lg shadow hover:translate-x-1 transition-transform"
              >
                🌐 Visit Website →
              </a>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default CollegeRecommender;
