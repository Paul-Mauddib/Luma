import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1c2433",
          soft: "#3d4356",
          mute: "#57607a",
          faint: "#8a90a3",
        },
        sand: {
          DEFAULT: "#fbfbf9",
          deep: "#f1f2ef",
        },
        terra: {
          DEFAULT: "#2f5fe0",
          soft: "#e9eefc",
          dark: "#2448b8",
          mid: "#7ea1f0",
          faint: "#b9cbf7",
        },
        sea: {
          DEFAULT: "#1d7a60",
          soft: "#e5f4ef",
        },
        night: {
          DEFAULT: "#131a2a",
          card: "#1d2639",
          line: "#2c3850",
        },
      },
      fontFamily: {
        display: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        body: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        wrap: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
