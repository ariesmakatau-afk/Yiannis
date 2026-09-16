import type { Metadata } from "next";
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
    <div className="container-page py-10 sm:py-14">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Menu</h1>
      <div className="meander-divider-navy mt-4 w-24 opacity-70" aria-hidden="true" />
      <p className="mt-4 max-w-prose text-ink/60">
        Standing outside at 10pm? Jump straight to a category below.
      </p>

      <LocationIdentifier className="mt-6" />

      {/* Jump nav — scannable on mobile */}
      <nav
        aria-label="Menu categories"
        className="sticky top-16 z-20 -mx-5 mt-8 flex gap-2 overflow-x-auto bg-white px-5 py-3 sm:mx-0 sm:px-0"
      >
        {menu.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            className="shrink-0 whitespace-nowrap rounded-sm border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink/70 hover:border-cobalt hover:text-cobalt"
          >
            {category.title}
          </a>
        ))}
      </nav>

      <div className="mt-6 space-y-14">
        {menu.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-32">
            <h2 className="font-display text-xl font-semibold sm:text-2xl">{category.title}</h2>
            {category.note && (
              <p className="mt-1 text-sm text-ink/60">{category.note}</p>
            )}
            <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
              {category.items.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-4 py-4">
                  <div>
                    <p className="font-display text-base font-semibold">{item.name}</p>
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

      <div className="mt-14 border-t border-ink/10 pt-8 text-center">
        <Link href="/order" className="btn-primary">
          Order Online
        </Link>
      </div>
    </div>
  );
}
