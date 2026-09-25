type ArchFrameProps = {
  children: React.ReactNode;
  className?: string;
  /** Tone of the limewash line. "light" for dark sections, "dark" for pale ones. */
  tone?: "light" | "dark";
};

/**
 * A whitewashed Cycladic arch with content standing in the opening — the
 * doorway you look out of at the sunset in the backdrop. The crown carries
 * a saffron keystone; the base sits on a threshold step. The glow inside
 * the opening is the evening light coming through.
 *
 * The arch scales with its content (the crown is a percentage of the
 * height, capped), so it works around a hero headline or a single photo.
 * The side gutters only open up from `sm`, so on a phone the arch is drawn
 * without stealing width from what it frames.
 */
export default function ArchFrame({ children, className = "", tone = "dark" }: ArchFrameProps) {
  const line = tone === "light" ? "text-white" : "text-ember-dark";

  return (
    <div className={`relative ${className}`}>
      <div aria-hidden="true" className={`arch-frame__opening pointer-events-none ${line}`} />

      <div className="relative px-3 pb-8 pt-14 sm:px-[64px] sm:pt-16 lg:px-[84px]">
        {children}
      </div>

      <div aria-hidden="true" className={`arch-frame__step pointer-events-none ${line}`} />
    </div>
  );
}
