import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111827", // body text — near-black, not literal black
        cobalt: {
          DEFAULT: "#0d3b6f", // matched to the Spartan-warrior logo navy
          light: "#2c5f9e",
          dark: "#082746",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      maxWidth: {
        prose: "68ch",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(15,23,32,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
