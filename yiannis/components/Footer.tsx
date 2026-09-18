import Image from "next/image";
import Link from "next/link";
import { business, fullAddress, openingHours } from "@/lib/content";
import TrackedAnchor from "@/components/TrackedAnchor";

export default function Footer() {
  return (
    <footer className="bg-cobalt pb-24 pt-14 text-white/80 md:pb-14">
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
            Adelaide CBD &middot; Greek yiros for 30 years.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Visit</h2>
          <p className="mt-3 text-sm leading-relaxed">{fullAddress}</p>
          <TrackedAnchor
            href={business.phoneHref}
            event={{ name: "phone_click" }}
            className="mt-2 block text-sm hover:text-white"
          >
            {business.phone}
          </TrackedAnchor>
          <a href={`mailto:${business.email}`} className="mt-1 block text-sm hover:text-white">
            {business.email}
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
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a
              href={business.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Facebook
            </a>
            <a
              href={business.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Instagram
            </a>
          </div>
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

      <div className="meander-divider mt-10 opacity-60" aria-hidden="true" />

      <p className="container-page mt-6 pb-16 text-xs text-white/40 md:pb-0">
        &copy; {new Date().getFullYear()} Yianni&rsquo;s on Hindley Street, Adelaide CBD. All
        rights reserved.
      </p>
    </footer>
  );
}
