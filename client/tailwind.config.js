/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        displayStar: {
          '0%': { transform: 'rotateX(100deg) rotateY(100deg) translateY(10px)' },
          '100%': { transform: 'rotateX(0deg) rotateY(0deg) translateY(0px)' }
        },
        checkStar: {
          '0%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(-20deg)' },
          '50%': { transform: 'rotate(20deg)' },
          '80%': { transform: 'rotate(-20deg)' },
          '100%': { transform: 'rotate(0deg)' }
        }
      }
    }
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      // {
      //   lofi: {
      //     ...require("daisyui/src/theming/themes")["[data-theme=lofi]"],
      //     "header": "#8b5cf6",
      //      },
      // },
        "lofi",
      "dim",
    ],
  },

}