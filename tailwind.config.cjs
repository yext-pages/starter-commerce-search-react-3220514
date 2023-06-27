// tailwind.config.cjs

// The following import is the path to where the component source code lives
const { ComponentsContentPath } = require("@yext/search-ui-react");

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./lib/**/*.{js,jsx}",
    // tailwind is applied to the components by adding the component path here
    ComponentsContentPath,
  ],
  theme: {
    // the default theme is extended with custom styling used by the components
    extend: {
      colors: {
        primary: "#a855f7",
        "primary-light": "#e9d5ff",
        "primary-dark": "#581c87",
        neutral: "#4b5563",
        "neutral-light": "#9ca3af",
        "neutral-dark": "#1f2937",
        secondary: "f0abfc",
      },
      keyframes: {
        rotate: {
          "100%": { transform: "rotate(360deg)" },
        },
        dash: {
          "0%": { transform: "rotate(0deg)", "stroke-dashoffset": 204 },
          "50%": { transform: "rotate(45deg)", "stroke-dashoffset": 52 },
          "100%": { transform: "rotate(360deg)", "stroke-dashoffset": 204 },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
