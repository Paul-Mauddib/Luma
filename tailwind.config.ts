import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#101f33",
          soft: "#2b3d55",
          mute: "#5d6d84",
        },
        sand: {
          DEFAULT: "#faf7f1",
          deep: "#f1ebe0",
        },
        terra: {
          DEFAULT: "#d95f36",
          soft: "#fbe9e1",
          dark: "#b74a26",
        },
        sea: {
          DEFAULT: "#1f7a6d",
          soft: "#e2f2ef",
        },
      },
      fontFamily: {
        display: ["Georgia", "'Times New Roman'", "serif"],
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
