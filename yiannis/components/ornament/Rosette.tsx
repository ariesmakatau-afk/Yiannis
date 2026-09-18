type RosetteProps = {
  className?: string;
};

/**
 * The carved rosette from the reference still-life, redrawn as vector so it
 * can sit in a background at 4–8% opacity without dragging a photographic
 * plaster wall along with it. Inherits `currentColor`.
 */
export default function Rosette({ className = "" }: RosetteProps) {
  const dentils = 48; // the rope/dentil ring
  const petals = 16; // inner sunburst

  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className} fill="none">
      {/* Outer mouldings */}
      <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="2.5" opacity="0.5" />
      <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="3" opacity="0.45" />

      {/* Dentil / rope ring */}
      <g opacity="0.6">
        {Array.from({ length: dentils }).map((_, i) => {
          const a = (i / dentils) * Math.PI * 2;
          const r1 = 66;
          const r2 = 74;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * r1}
              y1={100 + Math.sin(a) * r1}
              x2={100 + Math.cos(a) * r2}
              y2={100 + Math.sin(a) * r2}
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          );
        })}
      </g>

      <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="100" cy="100" r="44" stroke="currentColor" strokeWidth="2" opacity="0.4" />

      {/* Inner sunburst / acanthus star */}
      <g opacity="0.55">
        {Array.from({ length: petals }).map((_, i) => {
          const a = (i / petals) * Math.PI * 2;
          const inner = 16;
          const outer = 40;
          const spread = Math.PI / petals / 1.7;
          const tipX = 100 + Math.cos(a) * outer;
          const tipY = 100 + Math.sin(a) * outer;
          const aX = 100 + Math.cos(a - spread) * inner;
          const aY = 100 + Math.sin(a - spread) * inner;
          const bX = 100 + Math.cos(a + spread) * inner;
          const bY = 100 + Math.sin(a + spread) * inner;
          return (
            <path
              key={i}
              d={`M${aX} ${aY}L${tipX} ${tipY}L${bX} ${bY}Z`}
              stroke="currentColor"
              strokeWidth="1.4"
            />
          );
        })}
      </g>

      {/* Boss at the centre */}
      <circle cx="100" cy="100" r="13" stroke="currentColor" strokeWidth="2.2" opacity="0.5" />
      <circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.28" />
    </svg>
  );
}
