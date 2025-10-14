 "use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResumeGuide() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorPopup, setErrorPopup] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorPopup("");
    setResult(null);

    const formData = new FormData();
    formData.append("resume", document.getElementById("resume").files[0]);
    formData.append(
      "job_description",
      document.getElementById("job_description").value
    );

    try {
      const response = await fetch(
        "https://resume-screener-dummy-19tg.onrender.com/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        setResult(data.data);
      } else {
        setErrorPopup(data.message || "Something went wrong!");
      }
    } catch (err) {
      setErrorPopup("⚠️ Failed to connect: " + err.message);
    }
    setLoading(false);
  };

  const cardGradient =
    "bg-gradient-to-r from-[#fa6304] via-[#ffb347] to-[#8af6fc]";

  return (
    <motion.div
      className="bg-black min-h-screen px-6 md:px-12 py-16 flex flex-col items-center text-white relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
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

      {/* Title Section */}
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-3">
          📄 AI <span className="text-[#fa6304]">Resume Analyzer</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Upload your resume and job description to discover your <br />
          <span className="text-[#fa6304] font-semibold">
            match score, missing skills, and suggestions
          </span>
        </p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 mt-12 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full max-w-4xl border border-white/10"
      >
        <h2 className="text-2xl font-bold text-[#fa6304] mb-8 text-center">
          Upload & Analyze Resume
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Resume Upload */}
          <div>
            <label className="block mb-2 font-semibold text-gray-200">
              📂 Upload Resume (PDF)
            </label>
            <input
              type="file"
              id="resume"
              accept="application/pdf"
              required
              className="w-full p-3 rounded-xl bg-black border border-white/20 focus:ring-2 focus:ring-[#fa6304] text-white placeholder-gray-400"
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block mb-2 font-semibold text-gray-200">
              🧾 Paste Job Description
            </label>
            <textarea
              id="job_description"
              rows="6"
              required
              className="w-full p-3 rounded-xl bg-black border border-white/20 focus:ring-2 focus:ring-[#fa6304] text-white placeholder-gray-400"
              placeholder="E.g. React Developer role requiring frontend skills..."
            ></textarea>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            className="w-full mt-6 py-3 text-lg font-semibold rounded-xl shadow-lg transition-all bg-gradient-to-r from-[#fa6304] via-[#ffb347] to-[#8af6fc] text-black"
          >
            {loading ? "🔄 Analyzing..." : "🔍 Analyze Resume"}
          </motion.button>
        </form>
      </motion.div>

      {/* Results Section */}
      <div className="relative z-10 mt-12 w-full max-w-4xl mx-auto">
        {loading && (
          <div className="flex justify-center items-center flex-col text-[#fa6304] font-semibold text-lg bg-white/5 p-10 rounded-2xl">
            <div className="w-10 h-10 border-4 border-[#fa6304] border-t-transparent rounded-full animate-spin mb-3"></div>
            Analyzing your resume...
          </div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`mt-8 p-8 rounded-2xl shadow-lg ${cardGradient} text-black`}
          >
            <h2 className="text-2xl font-bold mb-4">✅ Match Score</h2>
            <div className="w-full bg-black/20 rounded-full h-5 mb-2">
              <div
                className="h-5 rounded-full bg-black/70"
                style={{ width: `${parseInt(result.match_score)}%` }}
              ></div>
            </div>
            <p className="text-lg font-semibold mb-6">
              {result.match_score}% Match
            </p>

            {/* Missing Skills */}
            <h3 className="text-xl font-semibold mb-2">❌ Missing Skills</h3>
            <ul className="list-disc pl-6 mb-6">
              {result.missing_skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            {/* Suggestions */}
            <h3 className="text-xl font-semibold mb-2">💡 Suggestions</h3>
            <ul className="list-disc pl-6 mb-6">
              {result.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            {/* Summary */}
            <h3 className="text-xl font-semibold mb-2">📝 Summary</h3>
            <p>{result.summary}</p>
          </motion.div>
        )}
      </div>

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
              <h2 className="text-2xl font-bold text-[#fa6304] mb-3">🚫 Oops!</h2>
              <p className="text-gray-300 mb-6">{errorPopup}</p>
              <button
                onClick={() => setErrorPopup("")}
                className="bg-gradient-to-r from-[#fa6304] via-[#ffb347] to-[#8af6fc] px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform text-black"
              >
                Got it 👍
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
