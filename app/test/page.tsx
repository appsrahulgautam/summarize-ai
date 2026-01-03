"use client";
import React, { useRef, useState } from "react";

const Test = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <video
        ref={videoRef}
        className="w-full rounded-2xl bg-black"
        playsInline
        muted
        preload="auto"
        controls={false}
      >
        {/* <source src="/summarizeai_rahulgautam.mp4" type="video/mp4" /> */}
        <source src="/video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Test;
