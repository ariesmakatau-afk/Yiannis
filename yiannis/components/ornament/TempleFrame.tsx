import Column from "@/components/ornament/Column";

type TempleFrameProps = {
  children: React.ReactNode;
  className?: string;
  /** Tone of the stonework. "light" for dark sections, "dark" for pale ones. */
  tone?: "light" | "dark";
};

/**
 * Two columns carrying a lintel, with content standing between them —
 * the pillars from the reference actually holding something up rather
 * than decorating a margin.
 *
 * The columns are hidden below `sm`: at phone width there isn't room for
 * them to read as architecture, and squeezing them in just steals space
 * from the content they're meant to frame.
 */
export default function TempleFrame({
  children,
  className = "",
  tone = "dark",
}: TempleFrameProps) {
  const stone = tone === "light" ? "text-white" : "text-cobalt-dark";

  return (
    <div className={`relative ${className}`}>
      {/* Lintel / entablature resting on both capitals */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 hidden sm:block ${stone}`}
      >
        <div className="h-3 rounded-sm bg-current opacity-[0.13]" />
        <div className="mx-6 h-2 bg-current opacity-[0.09]" />
      </div>

      {/* The pair of columns */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 hidden w-[52px] sm:block lg:w-[68px] ${stone}`}
      >
        <Column className="h-full w-full" />
      </div>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 hidden w-[52px] sm:block lg:w-[68px] ${stone}`}
      >
        <Column className="h-full w-full" />
      </div>

      {/* Content sits between the columns, clear of the lintel */}
      <div className="relative px-0 pt-8 sm:px-[76px] lg:px-[96px]">{children}</div>

      {/* Stylobate — the step the columns stand on */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 hidden sm:block ${stone}`}
      >
        <div className="mx-4 h-2 bg-current opacity-[0.09]" />
        <div className="h-3 rounded-sm bg-current opacity-[0.13]" />
      </div>
    </div>
  );
}
