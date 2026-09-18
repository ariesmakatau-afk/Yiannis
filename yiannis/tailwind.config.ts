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
        ink: "#20242c", // body text — warm near-black, not literal black
        cobalt: {
          DEFAULT: "#2f5578", // softened harbor blue — was #0d3b6f, still reads as "the blue"
          light: "#6d93b4", // hover states, lighter accents
          dark: "#1c3850", // deep overlay tone, gradients — was #082746
        },
        mist: {
          DEFAULT: "#eef3f5", // pale cool blue-grey — the "marble" tint, alternating sections
          deep: "#dce6ea",
        },
        sand: {
          DEFAULT: "#faf8f4", // warm off-white body background, replaces stark white
        },
      },
      fontFamily: {
        display: ["var(--font-display)"], // Fraunces — quirky premium-food display serif, headings
        script: ["var(--font-script)"], // Fraunces italic — accent taglines
        body: ["var(--font-body)"], // Sora — geometric sans, body/UI
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
