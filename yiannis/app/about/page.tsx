import type { Metadata } from "next";
import Image from "next/image";
import LocationIdentifier from "@/components/LocationIdentifier";
import TempleFrame from "@/components/ornament/TempleFrame";
import { aboutCopy, fullAddress } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "30 years of Greek yiros on Hindley Street, Adelaide CBD — the story behind Yianni's.",
};

export default function AboutPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <p className="eyebrow-brass">Hindley Street, Adelaide</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-cobalt-dark sm:text-4xl">
        Our Story
      </h1>
      <div className="meander-divider-brass mt-4 w-24 opacity-80" aria-hidden="true" />
      <LocationIdentifier className="mt-6" />

      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
        <TempleFrame tone="dark">
          <div className="plinth overflow-hidden rounded-sm">
            <Image
              src="/images/storefront-wide.jpg"
              alt="Yianni's Hellenic Yiros storefront on Hindley Street, Adelaide"
              width={2048}
              height={877}
              className="aspect-[4/3] w-full object-cover sm:aspect-[21/9]"
            />
          </div>
        </TempleFrame>
        <div>
          <Image
            src="/images/medallion-512.png"
            alt="Yianni's Hellenic Yiros"
            width={512}
            height={512}
            className="h-28 w-28 drop-shadow-[0_14px_24px_rgba(28,56,80,0.25)]"
          />
          <h2 className="mt-6 font-display text-2xl font-semibold">{aboutCopy.eyebrow}</h2>
          <p className="mt-4 max-w-prose leading-relaxed text-ink/70">{aboutCopy.body}</p>
        </div>
      </div>

      <div className="mt-14 max-w-prose">
        <h2 className="font-display text-xl font-semibold text-cobalt-dark">
          There is one Yianni&rsquo;s on Hindley Street
        </h2>
        <p className="mt-3 leading-relaxed text-ink/70">
          Other shops around Adelaide trade under a similar name. None of them are us, none of
          them are branches of us, and none of them are connected to this business in any way.
          We have never opened a second location, which tends to surprise people — it is
          usually the first thing a place does once it gets busy.
        </p>
        <p className="mt-4 leading-relaxed text-ink/70">
          We stayed put because the charcoal, the spit and the recipes do not travel. If you
          want the yiros people have been driving across town for since the nineties, there is
          exactly one address for it: {fullAddress}. Anywhere else, you are getting someone
          else&rsquo;s idea of it.
        </p>
      </div>
    </div>
  );
}
