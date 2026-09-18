import Image from "next/image";
import Link from "next/link";
import LocationIdentifier from "@/components/LocationIdentifier";
import MapEmbed from "@/components/MapEmbed";
import StatsBand from "@/components/StatsBand";
import Rosette from "@/components/ornament/Rosette";
import TempleFrame from "@/components/ornament/TempleFrame";
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
  {
    label: "Yiros",
    blurb: "Carved off the charcoal, wrapped in warm pita.",
    image: "/images/food-yiros.jpg",
  },
  {
    label: "Packs & Platters",
    blurb: "Same meat, more of it, room to share.",
    image: "/images/food-platters.jpg",
  },
  {
    label: "AB Packs",
    blurb: "Chips underneath. Sauce over everything.",
    image: "/images/food-chips.jpg",
  },
  {
    label: "Greek Coffee",
    blurb: "Short, black, one sugar. As it should be.",
    image: "/images/food-drinks.jpg",
  },
];

const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  fullAddress
)}`;

const featuredReviews = [
  {
    quote:
      "An institution for a long time. Charcoal-roasted spit meat — best yiros in town. Highly recommend the pork and lamb, no lettuce, extra garlic sauce and onion.",
    author: "brianhissy",
    date: "April 2022",
  },
  {
    quote:
      "Lamb yiros were sensational and fully loaded with so much meat. Super delicious — the only ones as nice were when travelling around Greece.",
    author: "David Maddison",
    date: "February 2025",
  },
  {
    quote:
      "Awesome yiros, flavoured over the charcoal grill. Best I've had without a doubt. Got the lot and so worth it — good value even for the mini. Service was pretty quick considering the crowd.",
    author: "Andrew Jones",
    date: "January 2025",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO — a temple façade: columns carrying the name */}
      <section className="scene-atmosphere relative overflow-hidden bg-sand">
        {/* Faint rosette behind the medallion, echoing the carved wall */}
        <Rosette
          className="pointer-events-none absolute left-1/2 top-4 h-[420px] w-[420px] -translate-x-1/2 text-cobalt opacity-[0.07] sm:h-[560px] sm:w-[560px]"
        />

        <div className="container-page relative py-14 sm:py-20">
          <TempleFrame tone="dark">
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/medallion-512.png"
                alt="Yianni's Hellenic Yiros"
                width={512}
                height={512}
                priority
                className="h-32 w-32 drop-shadow-[0_18px_30px_rgba(28,56,80,0.28)] sm:h-44 sm:w-44"
              />

              <h1 className="mt-7 max-w-3xl font-display text-[2.1rem] font-semibold leading-[1.08] text-cobalt-dark sm:text-6xl">
                {heroCopy.headline}
              </h1>
              <div className="meander-divider-brass mt-6 w-28 opacity-80" aria-hidden="true" />
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
                {heroCopy.subheading}
              </p>

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
              </div>
            </div>
          </TempleFrame>
        </div>
      </section>

      {/* LOCATION IDENTIFIER */}
      <section className="border-y border-cobalt/10 bg-mist">
        <div className="container-page py-8">
          <LocationIdentifier />
        </div>
      </section>

      {/* FEATURED FOOD */}
      <section className="bg-sand py-16 sm:py-20">
        <div className="container-page">
          <p className="eyebrow-brass">Lamb, chicken, pork</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-cobalt-dark sm:text-3xl">
            How You Want It
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-7 lg:grid-cols-4">
            {featuredFood.map((item) => (
              <div key={item.label}>
                <div className="plinth overflow-hidden rounded-sm">
                  <Image
                    src={item.image}
                    alt={item.label}
                    width={600}
                    height={600}
                    className="aspect-square w-full object-cover"
                  />
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

      {/* HOUSE NUMBERS — deep cobalt band, colonnade of stats */}
      <section className="scene-atmosphere scene-atmosphere-dark relative bg-cobalt-dark py-16 sm:py-20">
        <div className="container-page relative">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-light">
              The house numbers
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
              Four Decades, Briefly Summarised
            </h2>
          </div>
          <div className="mt-12">
            <StatsBand />
          </div>
        </div>
      </section>

      {/* WHY — pale band, brass accents */}
      <section className="marble-surface border-y border-cobalt/10 py-16 sm:py-20">
        <div className="container-page">
          <p className="eyebrow-brass">Why it&rsquo;s lasted</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-cobalt-dark sm:text-3xl">
            The Short Version
          </h2>
          <ul className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {whyYiannis.map((reason) => (
              <li key={reason.title} className="border-t border-brass/40 pt-4">
                <p className="font-display text-base font-semibold text-cobalt-dark">
                  {reason.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">{reason.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MENU PREVIEW */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="container-page flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow-brass">The whole list</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-cobalt-dark sm:text-3xl">
              The Whole Menu, Three Meats Deep
            </h2>
            <p className="mt-2 max-w-md text-ink/60">
              Pick your meat, pick how it&rsquo;s served, add what you want. That&rsquo;s it.
            </p>
          </div>
          <Link href="/menu" className="btn-orb shrink-0">
            View Full Menu
          </Link>
        </div>
      </section>

      {/* ABOUT — columns carrying the shopfront image */}
      <section className="bg-sand py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <TempleFrame tone="dark">
            <div className="plinth relative overflow-hidden rounded-sm">
              <Image
                src="/images/interior-wide.jpg"
                alt="Charcoal rotisserie and a fresh yiros wrap at Yianni's"
                width={1920}
                height={822}
                className="aspect-[4/3] w-full object-cover sm:aspect-[21/9]"
              />
            </div>
          </TempleFrame>

          <div>
            <p className="eyebrow-brass">Our story</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-cobalt-dark sm:text-3xl">
              {aboutCopy.eyebrow}
            </h2>
            <p className="mt-4 max-w-prose leading-relaxed text-ink/70">{aboutCopy.body}</p>
            <Link href="/about" className="btn-orb mt-7">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS — carved bas-relief panels on the pale band */}
      <section className="marble-surface border-y border-cobalt/10 py-16 sm:py-20">
        <div className="container-page">
          <p className="eyebrow-brass">In their words</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-cobalt-dark sm:text-3xl">
            What Adelaide Says
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {featuredReviews.map((review) => (
              <div key={review.author} className="carved-panel flex flex-col p-6">
                <div className="text-sm tracking-wide text-brass" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <p className="mt-4 font-display text-sm font-semibold text-cobalt-dark">
                  {review.author}
                </p>
                <p className="text-xs text-ink/50">{review.date}</p>
              </div>
            ))}
          </div>
          <a
            href={business.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm font-medium text-cobalt underline underline-offset-4"
          >
            Read more reviews
          </a>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="bg-sand py-10">
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
          <MapEmbed
            address={fullAddress}
            label="Map of Yianni's on Hindley Street, 270 Hindley Street, Adelaide SA 5000"
            className="min-h-[280px]"
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="scene-atmosphere scene-atmosphere-dark relative bg-cobalt py-16 text-center text-white sm:py-24">
        <Rosette className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 text-white opacity-[0.06]" />
        <div className="container-page relative">
          <p className="font-script text-2xl italic text-brass-light">Yamas!</p>
          <h2 className="mt-1 font-display text-2xl font-semibold sm:text-4xl">
            The Spit&rsquo;s Already Turning
          </h2>
          <div className="meander-divider-brass mx-auto mt-6 w-28 opacity-70" aria-hidden="true" />
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
