import React from "react";

const LoadingBar = () => {
  return (
    <div className="w-64 h-2 bg-gray-200 rounded overflow-hidden">
      <div className="h-full bg-rose-500 animate-pulse w-full" />
    </div>
  );
};

export default LoadingBar;
