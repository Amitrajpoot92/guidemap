 import React from "react";
import { FaRegPaperPlane } from "react-icons/fa";

const RequestDemo = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-[#1a103d] p-8 rounded-2xl shadow-xl max-w-md w-full text-center relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        {/* Icon + Title */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaRegPaperPlane className="text-pink-500 text-4xl" />
          <h1 className="text-2xl font-bold text-white">Request a Demo</h1>
        </div>

        {/* Dummy Content */}
        <p className="text-gray-300 mb-6">
          This is a dummy demo request popup. Our team will add real features soon.
        </p>

        <button
          onClick={onClose}
          className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RequestDemo;
