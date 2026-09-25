type VerginaSunProps = {
  className?: string;
};

/**
 * The Vergina sun — sixteen rays around a disc — drawn as vector. It is
 * the sun that sets in the backdrop scene, so wherever it appears as a
 * watermark it ties that section back to the evening going on behind the
 * page. Inherits `currentColor`; meant for 5–8% background use.
 */
export default function VerginaSun({ className = "" }: VerginaSunProps) {
  const rays = 16;

  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className} fill="none">
      <g fill="currentColor">
        {Array.from({ length: rays }).map((_, i) => {
          const a = (i / rays) * Math.PI * 2 - Math.PI / 2;
          // Alternate long and short rays, as on the Vergina larnax.
          const outer = i % 2 === 0 ? 96 : 78;
          const inner = 34;
          const spread = Math.PI / rays / 1.9;
          const tipX = 100 + Math.cos(a) * outer;
          const tipY = 100 + Math.sin(a) * outer;
          const aX = 100 + Math.cos(a - spread) * inner;
          const aY = 100 + Math.sin(a - spread) * inner;
          const bX = 100 + Math.cos(a + spread) * inner;
          const bY = 100 + Math.sin(a + spread) * inner;
          return (
            <path
              key={i}
              d={`M${aX.toFixed(2)} ${aY.toFixed(2)}L${tipX.toFixed(2)} ${tipY.toFixed(2)}L${bX.toFixed(2)} ${bY.toFixed(2)}Z`}
              opacity={i % 2 === 0 ? 0.9 : 0.6}
            />
          );
        })}
      </g>

      {/* The disc, with a rosette ring of dots */}
      <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="3" />
      <circle cx="100" cy="100" r="22" fill="currentColor" opacity="0.35" />
      <g fill="currentColor">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={(100 + Math.cos(a) * 14).toFixed(2)}
              cy={(100 + Math.sin(a) * 14).toFixed(2)}
              r="2.2"
            />
          );
        })}
      </g>
      <circle cx="100" cy="100" r="5" fill="currentColor" />
    </svg>
  );
}
