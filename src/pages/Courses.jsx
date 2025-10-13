 "use client";
import React from "react";
import Resources from "../components/Resources"; // Resources component import

export default function Courses() {
  return (
    <div className="bg-black text-white min-h-screen w-full flex flex-col">
      {/* Full height container */}
      <div className="flex-grow flex items-center justify-center">
        {/* Resources Component fills full height */}
        <div className="w-full h-full">
          <Resources />
        </div>
      </div>
    </div>
  );
}
