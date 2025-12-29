import { Pizza } from "lucide-react";
import React from "react";

const DemoSection = () => {
  return (
    <div className="flex flex-col items-center wrapper mt-0 py-15  px-10 sm:px-30">
      <Pizza size={40} className="text-rose-700" />
      <h2 className="text-center text-wrap mt-4">
        Watch how Summarize AI{" "}
        <span className="font-black bg-linear-to-r from-rose-700 via-rose-400 to-rose-950 bg-clip-text text-transparent">
          TRANSFORMS
        </span>{" "}
        this PDF file into an easy-to-read summary!
      </h2>
    </div>
  );
};

export default DemoSection;
