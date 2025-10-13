 "use client";
import React, { useState } from "react";
import {
  FileText,
  Code,
  Database,
  Shield,
  Monitor,
  Layout,
  Globe,
  BarChart,
  PenTool,
  Layers,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";

const defaultResources = [
  {
    title: "UI/UX Designer",
    description:
      "Discover the principles of user interface and user experience design with guides on wireframing, prototyping, and user testing.",
    link: "https://drive.google.com/file/d/1eAAHctAI7uKYWsia2lA2ZGl7HRt8bBBD/view?usp=drive_link",
    icon: Layers,
  },
  {
    title: "Software Engineer",
    description:
      "Resources for becoming a software engineer, including coding tutorials, project ideas, and interview preparation guides.",
    link: "https://drive.google.com/file/d/1HECT41TMhjKquPoW00xBXj51XZbxhshh/view?usp=drive_link",
    icon: Monitor,
  },
  {
    title: "Full Stack Engineer",
    description:
      "Master both front-end and back-end technologies to build complete web applications from start to finish.",
    link: "https://drive.google.com/file/d/1PjSzGpfGU85sDs_A-ErAEF-H3euRrMB8/view?usp=drive_link",
    icon: Code,
  },
  {
    title: "Frontend Engineer",
    description:
      "Build interactive and visually appealing user interfaces with HTML, CSS, and JavaScript frameworks.",
    link: "https://drive.google.com/file/d/1lqT-nEghVGSYY7GgNihIIYTy2X983znV/view?usp=drive_link",
    icon: Layout,
  },
  {
    title: "Digital Marketing",
    description:
      "Learn strategies for online marketing, social media, and search engine optimization.",
    link: "https://drive.google.com/file/d/1SXSutZO6_CeYdFPM72AYTijoN2qCjjbG/view?usp=drive_link",
    icon: Globe,
  },
  {
    title: "Data Analyst",
    description:
      "Learn to collect, process, and analyze data to help organizations make informed business decisions.",
    link: "https://drive.google.com/file/d/1tmPCF-IVhAZEdqV8h1i3Uz8DG1rjwaEk/view?usp=drive_link",
    icon: FileText,
  },
  {
    title: "Cybersecurity Analyst",
    description:
      "Learn about network security, ethical hacking, and risk management to protect digital assets.",
    link: "https://drive.google.com/file/d/1RzEDXNlh8cx8LH_6iQn6etkMOPrsg8FT/view?usp=drive_link",
    icon: Shield,
  },
  {
    title: "Content Creator",
    description:
      "Find resources for creating engaging digital content across various platforms.",
    link: "https://drive.google.com/file/d/1WbsS2Mu7S43z_xGKFC7l8eu4apoN0KFU/view?usp=drive_link",
    icon: PenTool,
  },
  {
    title: "Business Analyst",
    description:
      "Learn to analyze data and business processes to drive strategic decision-making.",
    link: "https://drive.google.com/file/d/11Wn8EeEytIqv53JP_v1vaPYQ8mzqpFDh/view?usp=drive_link",
    icon: BarChart,
  },
  {
    title: "Blockchain Developer",
    description:
      "Dive into decentralized applications, smart contracts, and cryptographic protocols.",
    link: "https://drive.google.com/file/d/1lLeNML_HiTl9ZOL7YF14vXf9HzWkKEvt/view?usp=drive_link",
    icon: Lock,
  },
  {
    title: "Backend Engineer",
    description:
      "Explore back-end technologies, including server-side logic, databases, and APIs.",
    link: "https://drive.google.com/file/d/1jkykKnCyBp2lAcx_xJUMvPvY7htxIaLH/view?usp=drive_link",
    icon: Database,
  },
].sort((a, b) => a.title.localeCompare(b.title));

const Resources = ({ resources = defaultResources }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleDownload = () => {
    if (!selectedDocument) return;
    const match = selectedDocument.link.match(/\/file\/d\/([^/]+)\//);
    if (match && match[1]) {
      const fileId = match[1];
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      window.open(downloadUrl, "_blank");
    } else {
      alert("Download link could not be generated.");
    }
  };

  const cardGradient =
    "bg-gradient-to-r from-[#fa6304] via-[#ffb347] to-[#8af6fc]";

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start bg-black text-white overflow-hidden py-20 px-6 sm:px-10">
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

      {/* 🔹 Heading */}
      <motion.div
        className="relative z-10 text-center mb-16 mt-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Career <span className="text-[#fa6304]">Resources</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Explore curated materials, guides, and PDFs designed to help you grow
          in your dream career path.
        </p>
      </motion.div>

      {/* 🔹 Resource Cards */}
      <motion.div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {resources.map((doc, index) => (
          <motion.div
            key={doc.title}
            whileHover={{ scale: 1.05, rotateX: 2, rotateY: -2 }}
            className={`rounded-2xl p-8 text-center shadow-lg transition-all duration-300 ${cardGradient}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="mb-4 flex justify-center">
              <doc.icon className="text-5xl text-white" />
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-white">
              {doc.title}
            </h2>
            <p className="text-white/90 mb-6">{doc.description}</p>
            <button
              onClick={() => setSelectedDocument(doc)}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full font-medium transition-all"
            >
              View
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* 🔹 Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-md">
          <div className="bg-[#0f0f1a] rounded-2xl shadow-2xl w-full max-w-[1300px] h-[90vh] flex flex-col overflow-hidden border border-[#fa6304]/40">
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-white/10 bg-[#1a1a2e]">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-[#fa6304]">
                <selectedDocument.icon size={26} /> {selectedDocument.title}
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="px-6 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full shadow hover:scale-105 transition"
                >
                  Download
                </button>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="px-6 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full shadow hover:scale-105 transition"
                >
                  Close
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <iframe
              title={selectedDocument.title}
              src={selectedDocument.link.replace(
                "/view?usp=drive_link",
                "/preview"
              )}
              className="flex-1 w-full border-0 rounded-b-2xl"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
