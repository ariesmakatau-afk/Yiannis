import Image from "next/image";
import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";
import LocationIdentifier from "@/components/LocationIdentifier";
import TrackedLink from "@/components/TrackedLink";
import TrackedAnchor from "@/components/TrackedAnchor";
import {
  aboutCopy,
  business,
  fullAddress,
  heroCopy,
  openingHours,
  whyYiannis,
} from "@/lib/content";

const featuredFood = [
  { label: "Yiros", blurb: "Lamb, chicken, pork or combo, built fresh." },
  { label: "Platters & Packs", blurb: "Generous, shareable, dine-in or take away." },
  { label: "Chips & Sides", blurb: "Crispy, golden, family-size if you're hungry." },
  { label: "Drinks", blurb: "Including a proper Greek coffee." },
];

const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  fullAddress
)}`;

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-cobalt text-white sm:min-h-[80vh]">
        <div className="absolute inset-0">
          <PlaceholderImage
            label="Hero — fresh yiros on the grill"
            aspect="wide"
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cobalt-dark via-cobalt/70 to-cobalt/20" />
          <Image
            src="/images/icon-white.png"
            alt=""
            width={815}
            height={478}
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-10 hidden w-[420px] opacity-[0.08] sm:block lg:w-[520px]"
          />
        </div>

        <div className="container-page relative pb-14 pt-24 sm:pb-20">
          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">
            {heroCopy.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {heroCopy.subheading}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedLink
              href="/order"
              event={{ name: "order_online_click", path: "pickup" }}
              className="btn-primary"
            >
              Order Online
            </TrackedLink>
            <Link href="/menu" className="btn-secondary">
              View Menu
            </Link>
            <TrackedAnchor
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              event={{ name: "get_directions_click" }}
              className="btn-secondary"
            >
              Find Us
            </TrackedAnchor>
          </div>
        </div>
      </section>

      {/* LOCATION IDENTIFIER */}
      <section className="bg-cobalt/5">
        <div className="container-page py-8">
          <LocationIdentifier />
        </div>
      </section>

      {/* FEATURED FOOD */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">What&rsquo;s Cooking</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {featuredFood.map((item) => (
              <div key={item.label}>
                <PlaceholderImage label={item.label} aspect="square" />
                <p className="mt-3 font-display text-base font-semibold">{item.label}</p>
                <p className="mt-1 text-sm text-ink/60">{item.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY YIANNI'S */}
      <section className="bg-cobalt py-16 text-white sm:py-20">
        <div className="container-page">
          <div className="meander-divider w-24 opacity-60" aria-hidden="true" />
          <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
            Why Yianni&rsquo;s
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {whyYiannis.map((reason) => (
              <li key={reason.title} className="border-t border-white/20 pt-4">
                <p className="font-display text-base font-semibold">{reason.title}</p>
                <p className="mt-1 text-sm text-white/70">{reason.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MENU PREVIEW */}
      <section className="py-16 sm:py-20">
        <div className="container-page flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Yiros, Platters, Packs &amp; More
            </h2>
            <p className="mt-2 max-w-md text-ink/60">
              The full menu, built for ordering fast on your phone — even at 10pm.
            </p>
          </div>
          <Link href="/menu" className="btn-outline-dark shrink-0">
            View Full Menu
          </Link>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-cobalt/5 py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <PlaceholderImage label="Interior — Hindley Street shopfront" aspect="wide" />
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">{aboutCopy.eyebrow}</h2>
            <p className="mt-4 max-w-prose text-ink/70">{aboutCopy.body}</p>
            <Link href="/about" className="btn-outline-dark mt-6 inline-flex">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            What Adelaide Says
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="border border-ink/10 bg-white p-6">
                <p className="text-sm text-ink/50">
                  [PLACEHOLDER — featured review pending client sign-off on which Facebook
                  reviews to use]
                </p>
              </div>
            ))}
          </div>
          <a
            href={business.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm font-semibold text-cobalt underline underline-offset-4"
          >
            Read reviews on Facebook
          </a>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="border-y border-ink/10 py-10">
        <div className="container-page flex flex-wrap items-center justify-center gap-8">
          <a
            href={business.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold tracking-wide text-ink/70 hover:text-ink"
          >
            Facebook
          </a>
          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold tracking-wide text-ink/70 hover:text-ink"
          >
            Instagram
          </a>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Find Us</h2>
            <p className="mt-3 text-ink/70">{fullAddress}</p>
            <dl className="mt-6 space-y-1 text-sm">
              {openingHours.map((row) => (
                <div key={row.day} className="flex justify-between gap-4 border-b border-ink/10 py-1.5">
                  <dt className="text-ink/60">{row.day}</dt>
                  <dd>{row.hours}</dd>
                </div>
              ))}
            </dl>
            <TrackedAnchor
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              event={{ name: "get_directions_click" }}
              className="btn-outline-dark mt-6 inline-flex"
            >
              Get Directions
            </TrackedAnchor>
          </div>
          <div
            className="flex min-h-[280px] items-center justify-center border border-dashed border-ink/25 bg-ink/[0.04] text-center text-sm text-ink/50"
            role="img"
            aria-label="Placeholder: embedded Google Map of 270 Hindley Street"
          >
            Map embed — 270 Hindley Street, Adelaide SA 5000
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-cobalt py-16 text-center text-white sm:py-24">
        <div className="container-page">
          <h2 className="font-display text-2xl font-semibold sm:text-4xl">
            Order Your Yiros
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <TrackedLink
              href="/order"
              event={{ name: "order_online_click", path: "pickup" }}
              className="btn-primary"
            >
              Order Online
            </TrackedLink>
            <TrackedAnchor
              href={business.phoneHref}
              event={{ name: "phone_click" }}
              className="btn-secondary"
            >
              Call {business.phone}
            </TrackedAnchor>
          </div>
        </div>
      </section>
    </>
  );
}
