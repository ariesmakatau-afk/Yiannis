import type { Metadata } from "next";
import Image from "next/image";
import PlaceholderImage from "@/components/PlaceholderImage";
import LocationIdentifier from "@/components/LocationIdentifier";
import { aboutCopy } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "30 years of Greek yiros on Hindley Street, Adelaide CBD — the story behind Yianni's.",
};

export default function AboutPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Our Story</h1>
      <div className="meander-divider-navy mt-4 w-24 opacity-70" aria-hidden="true" />
      <LocationIdentifier className="mt-6" />

      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
        <PlaceholderImage label="Yianni's storefront on Hindley Street" aspect="wide" />
        <div>
          <Image
            src="/images/logo-navy.png"
            alt="Yianni's on Hindley Street"
            width={1212}
            height={797}
            className="h-24 w-auto"
          />
          <h2 className="mt-6 font-display text-2xl font-semibold">{aboutCopy.eyebrow}</h2>
          <p className="mt-4 max-w-prose leading-relaxed text-ink/70">{aboutCopy.body}</p>
        </div>
      </div>

      <div className="mt-14 max-w-prose">
        <h2 className="font-display text-xl font-semibold">
          The Hindley Street location, specifically
        </h2>
        <p className="mt-3 leading-relaxed text-ink/70">
          There&rsquo;s more than one Yianni&rsquo;s in Adelaide — this one is on Hindley Street,
          right in the CBD. If a friend sent you a link expecting the Hindley Street shop, you&rsquo;re
          in the right place.
        </p>
      </div>
    </div>
  );
}
