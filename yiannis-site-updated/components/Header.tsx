"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { business } from "@/lib/content";

const primaryLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/location", label: "Location" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-cobalt/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/icon-white.png"
            alt=""
            width={44}
            height={44}
            className="h-10 w-10 shrink-0"
            priority
          />
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Yianni&rsquo;s
            <span className="block text-[11px] font-body font-normal tracking-wide text-white/75">
              on Hindley Street
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/order"
            className="inline-flex items-center justify-center rounded-sm bg-white px-6 py-3 text-sm font-semibold tracking-wide text-cobalt transition-colors hover:bg-white/90"
          >
            Order Online
          </Link>
        </div>

        {/* Mobile hamburger — collapses About/Contact per SITE_STRUCTURE.md */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-white/10 bg-cobalt px-5 pb-6 pt-2 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {primaryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium text-white/90"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={business.phoneHref} className="block py-3 text-base font-medium text-white/90">
                Call {business.phone}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
