type ColumnProps = {
  className?: string;
  /** Number of flutes carved into the shaft. */
  flutes?: number;
};

/**
 * A fluted Doric column, drawn as vector rather than cropped from the
 * reference photograph. This matters: the photo crops carried their own
 * marble wall and drop shadow, so they could only ever be pasted on top of
 * a page. This composites cleanly at any size, tint or opacity, which is
 * what lets the columns actually *hold* things instead of sitting beside
 * them.
 *
 * Colour comes from `currentColor`, so a parent can tint it.
 */
export default function Column({ className = "", flutes = 7 }: ColumnProps) {
  const shaftTop = 46;
  const shaftBottom = 354;
  const shaftLeft = 15;
  const shaftRight = 65;
  const shaftWidth = shaftRight - shaftLeft;

  return (
    <svg
      viewBox="0 0 80 400"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <defs>
        {/* Cylindrical shading: light from upper-left, as in the reference. */}
        <linearGradient id="col-shaft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.10" />
          <stop offset="22%" stopColor="currentColor" stopOpacity="0.03" />
          <stop offset="55%" stopColor="currentColor" stopOpacity="0.14" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.30" />
        </linearGradient>
        <linearGradient id="col-slab" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.07" />
          <stop offset="45%" stopColor="currentColor" stopOpacity="0.03" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.26" />
        </linearGradient>
      </defs>

      {/* ---- Capital ---- */}
      {/* Abacus: the flat slab the entablature sits on */}
      <rect x="2" y="8" width="76" height="14" rx="1.5" fill="url(#col-slab)" />
      <rect x="2" y="8" width="76" height="2" fill="currentColor" opacity="0.10" />
      {/* Echinus: the flare from slab down to shaft */}
      <path d="M8 22h64l-7 13H15z" fill="url(#col-slab)" />
      {/* Necking rings */}
      <rect x="13" y="37" width="54" height="2.5" fill="currentColor" opacity="0.13" />
      <rect x="14" y="42" width="52" height="1.8" fill="currentColor" opacity="0.09" />

      {/* ---- Shaft ---- */}
      <rect
        x={shaftLeft}
        y={shaftTop}
        width={shaftWidth}
        height={shaftBottom - shaftTop}
        fill="url(#col-shaft)"
      />
      {/* Flutes: vertical grooves, each a light edge beside a shadow line */}
      {Array.from({ length: flutes }).map((_, i) => {
        const x = shaftLeft + ((i + 1) * shaftWidth) / (flutes + 1);
        return (
          <g key={i}>
            <line
              x1={x}
              y1={shaftTop + 3}
              x2={x}
              y2={shaftBottom - 3}
              stroke="currentColor"
              strokeOpacity="0.16"
              strokeWidth="1.1"
            />
            <line
              x1={x + 1.3}
              y1={shaftTop + 3}
              x2={x + 1.3}
              y2={shaftBottom - 3}
              stroke="#fff"
              strokeOpacity="0.30"
              strokeWidth="0.9"
            />
          </g>
        );
      })}

      {/* ---- Base ---- */}
      {/* Torus: the rounded swell where shaft meets plinth */}
      <path d="M13 354h54l4 12H9z" fill="url(#col-slab)" />
      <rect x="6" y="366" width="68" height="12" rx="1" fill="url(#col-slab)" />
      {/* Plinth block */}
      <rect x="1" y="378" width="78" height="16" rx="1" fill="url(#col-slab)" />
      <rect x="1" y="378" width="78" height="2" fill="#fff" opacity="0.22" />
    </svg>
  );
}
