import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LocationIdentifier from "@/components/LocationIdentifier";
import { menu } from "@/lib/content";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Yiros, packs, platters, chips and drinks from Yianni's on Hindley Street, Adelaide CBD.",
};

export default function MenuPage() {
  return (
    <div className="container-page relative py-10 sm:py-14">
      <Image
        src="/images/medallion-512.png"
        alt=""
        width={512}
        height={512}
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-4 hidden h-52 w-52 opacity-[0.07] sm:block"
      />
      <h1 className="font-display text-3xl font-semibold text-cobalt-dark sm:text-4xl">Menu</h1>
      <div className="meander-divider-navy mt-4 w-24 opacity-70" aria-hidden="true" />
      <p className="mt-4 max-w-prose text-ink/60">
        Standing outside at 10pm? Jump straight to a category below.
      </p>

      <LocationIdentifier className="mt-6" />

      {/* Jump nav — scannable on mobile */}
      <nav
        aria-label="Menu categories"
        className="menu-panel sticky top-[72px] z-20 -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 py-3 sm:-mx-8 sm:px-8"
      >
        {menu.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            className="shrink-0 whitespace-nowrap rounded-full border border-cobalt/20 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-cobalt-dark/80 transition-colors hover:border-cobalt hover:text-cobalt"
          >
            {category.title}
          </a>
        ))}
      </nav>

      <div className="mt-6 space-y-8">
        {menu.map((category) => (
          <section key={category.id} id={category.id} className="carved-panel scroll-mt-32 p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-cobalt-dark sm:text-2xl">
              {category.title}
            </h2>
            <div className="meander-divider-navy mt-3 w-16 opacity-25" aria-hidden="true" />
            {category.note && (
              <p className="mt-3 text-sm text-ink/60">{category.note}</p>
            )}
            <ul className="mt-4 divide-y divide-cobalt/10">
              {category.items.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-4 py-4">
                  <div>
                    <p className="font-display text-base font-semibold text-cobalt-dark">
                      {item.name}
                    </p>
                    {item.description && (
                      <p className="mt-0.5 max-w-md text-sm text-ink/60">{item.description}</p>
                    )}
                  </div>
                  <p className="shrink-0 font-display text-base font-semibold text-cobalt">
                    {item.price}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-14 border-t border-cobalt/10 pt-8 text-center">
        <Link href="/order" className="btn-orb-blue">
          Order Online
        </Link>
      </div>
    </div>
  );
}
