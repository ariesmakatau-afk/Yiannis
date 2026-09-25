"use client";

import { useEffect } from "react";
import VerginaSun from "@/components/ornament/VerginaSun";

// Houses on the island, left to right: [x, y (top), width, height].
// Hand-placed so the village climbs the hill and clusters near the church.
const houses: [number, number, number, number][] = [
  [560, 118, 22, 18],
  [586, 110, 18, 22],
  [608, 104, 26, 20],
  [640, 96, 20, 22],
  [664, 92, 28, 18],
  [700, 84, 22, 24],
  [770, 82, 24, 22],
  [798, 88, 20, 20],
  [822, 94, 26, 18],
  [852, 100, 20, 20],
  [876, 108, 24, 16],
  [904, 114, 18, 18],
  [930, 122, 22, 14],
];

// Sparks rising off the coals: horizontal position, size, duration, delay, sway.
const embers = [
  ["6%", 4, 15, 0, 22],
  ["14%", 3, 12, 4, -16],
  ["23%", 5, 17, 8, 26],
  ["31%", 3, 13, 2, -20],
  ["42%", 4, 16, 10, 18],
  ["50%", 3, 11, 6, -12],
  ["58%", 5, 18, 1, 24],
  ["67%", 3, 14, 9, -22],
  ["74%", 4, 12, 3, 16],
  ["82%", 3, 16, 12, -18],
  ["90%", 5, 13, 5, 20],
  ["96%", 3, 17, 7, -14],
] as const;

/**
 * The scene the whole site sits on — "Hindley Dusk".
 *
 * An island village at sunset: sky, a Vergina sun, the Aegean, the white
 * houses on the far shore and the olive hills in front, with sparks from
 * the charcoal drifting up through all of it. It is fixed behind the page
 * and every section is a translucent veil over it, so the story keeps
 * going underneath the content rather than being a picture at the top.
 *
 * Scrolling is the passage of the evening: this writes the reader's
 * progress down the page to `--dusk` (0 → 1) on <html>. The CSS in
 * globals.css uses it to sink the sun into the sea, deepen the sky, bring
 * the hills up and fan the embers, so by the footer it is night over the
 * spit. One rAF-throttled listener, transforms and opacity only.
 */
export default function DuskBackdrop() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    function update() {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.style.setProperty("--dusk", progress.toFixed(4));
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Page height changes on client-side navigation and as images load.
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="dusk-backdrop">
      <div className="dusk-layer dusk-sky" />
      <div className="dusk-layer dusk-sky-late" />

      <div className="dusk-sun">
        <VerginaSun />
      </div>

      <div className="dusk-sea" />

      <div className="dusk-village">
        {/* The village climbs the left headland; the sun sets to its right. */}
        <svg viewBox="0 0 1440 200" preserveAspectRatio="xMidYMax slice">
          {/* The island */}
          <path
            d="M0 150 C80 132 150 112 230 98 C300 84 360 70 400 70 C450 70 490 84 540 100 C620 128 700 144 800 150 C960 160 1200 170 1440 174 V200 H0Z"
            fill="currentColor"
            opacity="0.75"
          />
          {/* Limewashed houses, catching the last light */}
          <g fill="#fbeee3" opacity="0.8" transform="translate(-340 0)">
            {houses.map(([x, y, w, h]) => (
              <rect key={x} x={x} y={y} width={w} height={h} rx="1.5" />
            ))}
          </g>
          {/* The church — blue dome, bell cross */}
          <g transform="translate(-340 0)">
            <rect x="728" y="70" width="34" height="26" fill="#fbeee3" opacity="0.85" />
            <path d="M728 70 a17 17 0 0 1 34 0Z" fill="#2f6e8c" opacity="0.7" />
            <path d="M745 44 v10 M741 48 h8" stroke="#2f6e8c" strokeWidth="2" opacity="0.7" />
          </g>
          {/* A windmill on the ridge */}
          <g opacity="0.7" transform="translate(-340 0)">
            <path d="M1010 132 l6 -26 h8 l6 26Z" fill="#fbeee3" />
            <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M1020 106 l-14 -14 M1020 106 l14 -14 M1020 106 l-14 14 M1020 106 l14 14" />
            </g>
          </g>
        </svg>
      </div>

      <div className="dusk-hills">
        <svg viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice">
          <path
            d="M0 120 C120 96 220 92 320 108 C420 124 500 150 620 146 C760 142 820 104 960 100 C1100 96 1200 124 1300 126 C1370 128 1410 118 1440 112 V220 H0Z"
            fill="currentColor"
            opacity="0.55"
          />
          <path
            d="M0 170 C180 150 320 160 480 176 C640 192 780 170 940 162 C1100 154 1260 172 1440 164 V220 H0Z"
            fill="currentColor"
            opacity="0.7"
          />
          {/* Olive trees — soft, windblown crowns on crooked trunks */}
          <g fill="#8a7a4f" opacity="0.45">
            <OliveTree x={140} y={112} />
            <OliveTree x={250} y={104} scale={0.8} />
            <OliveTree x={1180} y={118} />
            <OliveTree x={1290} y={124} scale={0.85} />
            <OliveTree x={1380} y={116} scale={0.7} />
          </g>
        </svg>
      </div>

      <div className="dusk-embers">
        {embers.map(([x, s, d, delay, sway]) => (
          <span
            key={x}
            style={
              {
                "--x": x,
                "--s": `${s}px`,
                "--d": `${d}s`,
                "--delay": `-${delay}s`,
                "--sway": `${sway}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="dusk-layer dusk-grain" />
    </div>
  );
}

function OliveTree({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0 0 C-2 -10 3 -16 1 -26" stroke="#6b5a3a" strokeWidth="3" fill="none" />
      <ellipse cx="-10" cy="-30" rx="16" ry="9" />
      <ellipse cx="10" cy="-34" rx="15" ry="9" />
      <ellipse cx="0" cy="-42" rx="13" ry="8" />
    </g>
  );
}
