"use client";

import { Pizza, Play, Pause } from "lucide-react";
import React, { useRef, useState } from "react";

const DemoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    setProgress((currentTime / duration) * 100);
  };

  return (
    <div className="flex flex-col items-center wrapper mt-0 py-15 px-10 sm:px-30">
      <Pizza size={40} className="text-rose-700" />

      <h2 className="text-center mt-4">
        Watch how Summarize AI{" "}
        <span className="font-black bg-linear-to-r from-rose-700 via-rose-400 to-rose-950 bg-clip-text text-transparent">
          TRANSFORMS
        </span>{" "}
        this PDF file into an easy-to-read summary!
      </h2>

      {/* VIDEO WRAPPER */}
      <div className="relative group mt-8 w-full max-w-4xl px-2 pt-2 bg-rose-600 rounded-3xl overflow-hidden  isolate">
        <video
          ref={videoRef}
          src="/videos/summarizeai_rahulgautam.mp4"
          className="w-full aspect-video object-cover rounded-3xl"
          preload="metadata"
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
        />

        {/* CENTER CONTROL (HOVER-BASED) */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center
            transition-opacity duration-300
            ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}
          `}
        >
          <button
            onClick={togglePlay}
            className="bg-black/60 p-4 rounded-full hover:scale-110 transition-transform"
          >
            {isPlaying ? (
              <Pause size={48} className="text-white" />
            ) : (
              <Play size={48} className="text-white" />
            )}
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-white/20">
          <div
            className="h-full bg-yellow-500 transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default DemoSection;
