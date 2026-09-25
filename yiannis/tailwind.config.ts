import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // "Hindley Dusk" — the palette of the backdrop scene: an Aegean
      // sunset that sinks as you scroll, down to the charcoal the meat is
      // cooked over. Every token is named for where it comes from in that
      // scene, so a component reads its role from its colour.
      colors: {
        ink: "#2a1b15", // body text — charred walnut, not literal black
        // Terracotta ember: the glow of the coals and the roof tiles of the
        // island village. The brand colour — buttons, links, prices.
        ember: {
          DEFAULT: "#a43d24",
          light: "#d9774f", // hover states, the glow at the heart of a coal
          dark: "#3d1f16", // headings, deep bands — spent charcoal
        },
        // Sun-baked clay wash — alternating sections, chips, soft fills.
        clay: {
          DEFAULT: "#f4e5d4",
          deep: "#ead2b9",
        },
        // Limewashed linen — the base page, the tablecloth under everything.
        linen: {
          DEFAULT: "#fbf5ec",
        },
        // Saffron / olive-oil gold — the accent: eyebrows, stars, trims.
        saffron: {
          DEFAULT: "#c2892b",
          light: "#e8bb66",
          deep: "#86560f",
        },
        // Olive grove — the hills in the backdrop; used sparingly for
        // confirmations and natural accents.
        olive: {
          DEFAULT: "#5f6b3a",
          light: "#9aa56a",
          dark: "#343b1d",
        },
        // The Aegean — the strip of sea at the horizon.
        aegean: {
          DEFAULT: "#2f6e8c",
          light: "#7fb0c4",
        },
        // Night over the spit — footer and the darkest bands.
        char: {
          DEFAULT: "#1f1511",
          light: "#33231c",
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
        card: "0 1px 0 0 rgba(61,31,22,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
