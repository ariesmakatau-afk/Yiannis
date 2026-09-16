"use client";

import Link from "next/link";
import { fullAddress } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  fullAddress
)}`;

// SITE_STRUCTURE.md: fixed bottom bar, always visible, thumb-reachable.
// Hidden on the /order page itself to avoid competing with its own CTAs.
export default function BottomNav() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-ink/10 bg-white text-ink shadow-[0_-1px_8px_rgba(0,0,0,0.06)] md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <Link
        href="/menu"
        onClick={() => trackEvent({ name: "menu_page_view" })}
        className="flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-semibold"
      >
        <IconMenu />
        Menu
      </Link>
      <Link
        href="/order"
        className="flex flex-col items-center justify-center gap-1 border-x border-ink/10 bg-cobalt py-2.5 text-xs font-semibold text-white"
      >
        <IconBag />
        Order Online
      </Link>
      <a
        href={directionsHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent({ name: "get_directions_click" })}
        className="flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-semibold"
      >
        <IconPin />
        Directions
      </a>
    </nav>
  );
}

function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconBag() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 8h12l1 12H5L6 8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M9 8a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
