import React from "react";

const SkeletonLoader = ({ width = "100%", height = "20px" }) => {
  return (
    <div
      className="bg-gray-200 animate-pulse duration-300 rounded-md border border-gray-300"
      style={{ width, height }}
    ></div>
  );
};

export default SkeletonLoader;
