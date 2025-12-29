import React from "react";
import HowItWorksItem from "./howitworks_item";
import { BrainCircuit, FileText, TextInitial } from "lucide-react";

const HowItWorks = () => {
  const data = [
    {
      icon: FileText,
      title: "Upload your PDF",
      desc: "Simply drag and drop your PDF document or click to upload",
    },
    {
      icon: BrainCircuit,
      title: "AI Analysis",
      desc: "Our advanced AI processes and analyzes your document instantly",
    },
    {
      icon: TextInitial,
      title: "Get Summary",
      desc: "Receive a clear, concise summary of your document",
    },
  ];

  return (
    <div className="flex flex-col items-center wrapper  px-10 sm:px-30">
      <h2 className="font-bold text-red-600">How it works</h2>
      <h2 className="text-center text-wrap mt-4">
        {" "}
        <span className="font-black bg-linear-to-r from-rose-700 via-rose-400 to-rose-950 bg-clip-text text-transparent">
          Transform
        </span>{" "}
        any PDF into an easy-to-digest summary in{" "}
        <span className="font-black bg-linear-to-r from-rose-700 via-rose-400 to-rose-950 bg-clip-text text-transparent">
          three
        </span>{" "}
        simple steps
      </h2>

      <div className="grid grid-col-1 lg:grid-cols-3 gap-6 mt-10">
        {data.map((item, keyloop) => (
          <HowItWorksItem
            key={keyloop}
            title={item.title}
            desc={item.desc}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
