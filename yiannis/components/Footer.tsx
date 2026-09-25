import Image from "next/image";
import Link from "next/link";
import { business, fullAddress, openingHours } from "@/lib/content";
import TrackedAnchor from "@/components/TrackedAnchor";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer className="footer-night mt-14 pb-4 pt-14 text-white/80 md:pb-5">
      {/* Nightfall: the village and hills go to silhouette above the footer */}
      <div aria-hidden="true" className="footer-skyline">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" fill="currentColor">
          <path d="M0 40 C140 30 240 22 360 28 C440 32 500 18 560 14 V8 h14 v6 h10 V4 h16 v10 h12 V10 h14 v4 C700 10 740 2 780 4 C820 6 860 16 900 22 h10 V14 h16 v10 C1000 30 1100 26 1200 32 C1300 38 1380 36 1440 34 V56 H0Z" />
        </svg>
      </div>
      <div className="container-page grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/medallion-512.png"
            alt="Yianni's Hellenic Yiros"
            width={512}
            height={512}
            className="h-24 w-24 rounded-full shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)]"
          />
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Adelaide CBD &middot; Charcoal yiros, four decades on Hindley.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Visit</h2>
          <p className="mt-3 text-sm leading-relaxed">{fullAddress}</p>
          {/* Underlined with an icon: as plain text these read as body copy
              and nobody knows they're tappable until they try. */}
          <TrackedAnchor
            href={business.phoneHref}
            event={{ name: "phone_click" }}
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white underline decoration-saffron decoration-2 underline-offset-4 transition-colors hover:decoration-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            {business.phone}
          </TrackedAnchor>
          <a
            href={`mailto:${business.email}`}
            className="mt-2 flex items-center gap-2 text-sm font-medium text-white underline decoration-saffron decoration-2 underline-offset-4 transition-colors hover:decoration-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="m3.5 7 8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            <span className="truncate">{business.email}</span>
          </a>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
            Opening Hours
          </h2>
          <ul className="mt-3 space-y-1 text-sm">
            {openingHours.map((row) => (
              <li key={row.day} className="flex justify-between gap-4">
                <span className="text-white/60">{row.day}</span>
                <span>{row.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Follow</h2>
          <SocialLinks tone="light" className="mt-3" />
          <div className="mt-5 flex gap-4 text-xs text-white/50">
            <Link href="/privacy" className="hover:text-white/80">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/80">
              Terms
            </Link>
          </div>
        </div>
      </div>

      <div className="wave-divider-saffron mt-9 opacity-50" aria-hidden="true" />

      <p className="container-page mt-4 pb-14 text-xs text-white/40 md:pb-0">
        &copy; {new Date().getFullYear()} Yianni&rsquo;s on Hindley Street, Adelaide CBD. All
        rights reserved.
      </p>
    </footer>
  );
}
