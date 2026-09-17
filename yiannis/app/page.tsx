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
      {/* HERO — marble still-life as the ground, medallion as the centrepiece */}
      <section className="scene-bg relative overflow-hidden bg-mist">
        {/* Light wash so type stays readable over the marble without hiding it */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-sand/70 via-sand/55 to-sand"
          aria-hidden="true"
        />

        <div className="container-page relative flex flex-col items-center py-16 text-center sm:py-24">
          <Image
            src="/images/medallion-512.png"
            alt="Yianni's Hellenic Yiros"
            width={512}
            height={512}
            priority
            className="h-36 w-36 drop-shadow-[0_18px_30px_rgba(28,56,80,0.28)] sm:h-52 sm:w-52"
          />

          <p className="mt-7 font-script text-xl italic text-cobalt/80 sm:text-2xl">
            Est. on Hindley Street
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-[2.1rem] font-semibold leading-[1.08] text-cobalt-dark sm:text-6xl">
            {heroCopy.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
            {heroCopy.subheading}
          </p>

          {/* Orb controls, echoing the marble spheres in the reference */}
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <TrackedLink
              href="/order"
              event={{ name: "order_online_click", path: "pickup" }}
              className="btn-orb-blue"
            >
              Order Online
            </TrackedLink>
            <Link href="/menu" className="btn-orb">
              View Menu
            </Link>
            <TrackedAnchor
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              event={{ name: "get_directions_click" }}
              className="btn-orb"
            >
              Find Us
            </TrackedAnchor>
          </div>
        </div>

        <div className="meander-divider-navy relative opacity-20" aria-hidden="true" />
      </section>

      {/* LOCATION IDENTIFIER */}
      <section className="marble-surface border-b border-cobalt/10">
        <div className="container-page py-8">
          <LocationIdentifier />
        </div>
      </section>

      {/* FEATURED FOOD — each dish stands on a marble plinth */}
      <section className="marble-wash py-16 sm:py-20">
        <div className="container-page">
          <p className="font-script text-xl italic text-cobalt/70">Fresh, every day</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-cobalt-dark sm:text-3xl">
            What&rsquo;s Cooking
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-7 lg:grid-cols-4">
            {featuredFood.map((item) => (
              <div key={item.label}>
                <div className="plinth">
                  <PlaceholderImage label={item.label} aspect="square" />
                </div>
                <p className="mt-4 font-display text-base font-semibold text-cobalt-dark">
                  {item.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">{item.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY YIANNI'S — deep blue band, marble scene showing through */}
      <section className="scene-bg relative bg-cobalt py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-cobalt/88" aria-hidden="true" />
        <div className="container-page relative">
          <div className="meander-divider w-24 opacity-50" aria-hidden="true" />
          <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
            Why Yianni&rsquo;s
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {whyYiannis.map((reason) => (
              <li key={reason.title} className="border-t border-white/25 pt-4">
                <p className="font-display text-base font-semibold">{reason.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{reason.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MENU PREVIEW */}
      <section className="py-16 sm:py-20">
        <div className="container-page flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-cobalt-dark sm:text-3xl">
              Yiros, Platters, Packs &amp; More
            </h2>
            <p className="mt-2 max-w-md text-ink/60">
              The full menu, built for ordering fast on your phone — even at 10pm.
            </p>
          </div>
          <Link href="/menu" className="btn-orb shrink-0">
            View Full Menu
          </Link>
        </div>
      </section>

      {/* ABOUT — columns literally supporting the shopfront image */}
      <section className="marble-surface py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative px-10 sm:px-14">
            <Image
              src="/images/column-left.png"
              alt=""
              width={154}
              height={519}
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 left-0 h-[86%] w-auto opacity-90"
            />
            <Image
              src="/images/column-right.png"
              alt=""
              width={250}
              height={670}
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 right-0 h-[94%] w-auto opacity-90"
            />
            <div className="plinth relative">
              <PlaceholderImage label="Interior — Hindley Street shopfront" aspect="wide" />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-cobalt-dark sm:text-3xl">
              {aboutCopy.eyebrow}
            </h2>
            <p className="mt-4 max-w-prose leading-relaxed text-ink/70">{aboutCopy.body}</p>
            <Link href="/about" className="btn-orb mt-7">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS — carved bas-relief panels */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <h2 className="font-display text-2xl font-semibold text-cobalt-dark sm:text-3xl">
            What Adelaide Says
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="carved-panel p-6">
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
            className="mt-6 inline-block text-sm font-medium text-cobalt underline underline-offset-4"
          >
            Read reviews on Facebook
          </a>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="marble-surface border-y border-cobalt/10 py-10">
        <div className="container-page flex flex-wrap items-center justify-center gap-8">
          <a
            href={business.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium tracking-wide text-cobalt-dark/70 hover:text-cobalt"
          >
            Facebook
          </a>
          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium tracking-wide text-cobalt-dark/70 hover:text-cobalt"
          >
            Instagram
          </a>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-cobalt-dark sm:text-3xl">
              Find Us
            </h2>
            <p className="mt-3 text-ink/70">{fullAddress}</p>
            <dl className="mt-6 space-y-1 text-sm">
              {openingHours.map((row) => (
                <div
                  key={row.day}
                  className="flex justify-between gap-4 border-b border-cobalt/10 py-1.5"
                >
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
              className="btn-orb mt-7"
            >
              Get Directions
            </TrackedAnchor>
          </div>
          <div
            className="carved-panel flex min-h-[280px] items-center justify-center text-center text-sm text-ink/50"
            role="img"
            aria-label="Placeholder: embedded Google Map of 270 Hindley Street"
          >
            Map embed — 270 Hindley Street, Adelaide SA 5000
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="scene-bg relative bg-cobalt py-16 text-center text-white sm:py-24">
        <div className="absolute inset-0 bg-cobalt/88" aria-hidden="true" />
        <div className="container-page relative">
          <p className="font-script text-2xl italic text-white/85">Yamas!</p>
          <h2 className="mt-1 font-display text-2xl font-semibold sm:text-4xl">
            Order Your Yiros
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <TrackedLink
              href="/order"
              event={{ name: "order_online_click", path: "pickup" }}
              className="btn-orb"
            >
              Order Online
            </TrackedLink>
            <TrackedAnchor
              href={business.phoneHref}
              event={{ name: "phone_click" }}
              className="btn-orb-blue !bg-none !bg-white/10 !shadow-none ring-1 ring-inset ring-white/40 hover:!bg-white/15"
            >
              Call {business.phone}
            </TrackedAnchor>
          </div>
        </div>
      </section>
    </>
  );
}
