import React from "react";

const Loader = ({ size = "64px" }) => {
    const styleWrapper = {
        "--s": size,
        width: "var(--s)",
        aspectRatio: "2",
        background: `
      radial-gradient(farthest-side,#000 90%,#0000) 0   50%/25% 50%,
      radial-gradient(farthest-side at bottom,#000 90%,#0000) 50%  calc(50% - var(--s)/16)/25% 25%,
      radial-gradient(farthest-side at top   ,#000 90%,#0000) 50%  calc(50% + var(--s)/16)/25% 25%,
      radial-gradient(farthest-side at bottom,#000 90%,#0000) 100% calc(50% - var(--s)/16)/25% 25%,
      radial-gradient(farthest-side at top   ,#000 90%,#0000) 100% calc(50% + var(--s)/16)/25% 25%`,
        backgroundRepeat: "no-repeat",
        animation: "l14 1s infinite"
    };

    return (
        <div style={styleWrapper}>
            <style>
                {`@keyframes l14 {
          25%  {background-position:0    50%,50% 0,50% 100%,100% 0,100% 100%}
          50%  {background-position:100% 50%,0   0,0   100%,50%  0,50%  100%}
          75%,
          100% {background-position:100% 50%,0 calc(50% - var(--s)/16),0 calc(50% + var(--s)/16),50% calc(50% - var(--s)/16),50% calc(50% + var(--s)/16)}
        }`}
            </style>
        </div>
    );
};

export default Loader;
