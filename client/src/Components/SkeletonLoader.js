import React from "react";

const SkeletonLoader = ({ width = "100%", height = "20px" }) => {
    return (
        <div
            className="bg-base-100 animate-pulse duration-75 rounded-md border border-secondary"
            style={{ width, height }}
        ></div>
    );
};

export default SkeletonLoader;
