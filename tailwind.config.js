/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      aspectRatio: {
        "2/3": "2 / 3",
      },
      display: ["group-hover"],
    },
  },
  // add daisyUI plugin
  plugins: [require("daisyui"), require("tailwindcss-animated")],

  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: [
      {
        "oni-dark": {
          //primary is for blue buttons
          primary: "#3b82f6",
          "primary-focus": "#2563eb",
          "primary-content": "#60a5fa",
          //secondary is for red buttons
          secondary: "#ef4444",
          "secondary-focus": "#dc2626",
          "secondary-content": "#f87171",
          //accent is for texts
          accent: "#a0b1c5",
          "accent-focus": "#d3d5f3",
          "accent-content": "#fefefe",
          //neutral is for dark background content
          neutral: "#151f2e",
          //base is for dark backgrounds
          "base-content": "#11161d",
          "base-300": "#0b1622",
          "base-200": "#151f2e",
          "base-100": "#152232",
          info: "#3ABFF8", //...blue at moment
          success: "#86efac", //...green at moment
          warning: "#fde047", //...yellow at moment
          error: "#fb7185", //...red at moment
        },
        "oni-ligth": {
          //primary is for blue buttons
          primary: "#3b82f6",
          "primary-focus": "#2563eb",
          "primary-content": "#60a5fa",
          //secondary is for red buttons
          secondary: "#ef4444",
          "secondary-focus": "#dc2626",
          "secondary-content": "#f87171",
          //accent is for texts
          accent: "#404e5c",
          "accent-focus": "#283641",
          "accent-content": "#26343f",
          //neutral is for ligth background content
          neutral: "#fbfbfb",
          //base is for ligth backgrounds
          "base-content": "#e5ebf1",
          "base-300": "#e5ebf1",
          "base-200": "#edf1f5",
          "base-100": "#fbfbfb",
          info: "#3ABFF8", //...blue at moment
          success: "#86efac", //...green at moment
          warning: "#fde047", //...yellow at moment
          error: "#fb7185", //...red at moment
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "oni-dark",
  },
};
