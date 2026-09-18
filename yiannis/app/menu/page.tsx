import type { Metadata } from "next";
import Link from "next/link";
import LocationIdentifier from "@/components/LocationIdentifier";
import Rosette from "@/components/ornament/Rosette";
import {
  extras,
  formatMoney,
  meats,
  menuGroups,
  priceRange,
  SAUCE_PRICE,
  sauces,
} from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Lamb, chicken and pork off the charcoal. Yiros, packs, platters and drinks at Yianni's, 270 Hindley Street, Adelaide.",
};

export default function MenuPage() {
  return (
    <div className="container-page relative py-10 sm:py-14">
      <Rosette
        className="pointer-events-none absolute -right-16 -top-8 hidden h-[340px] w-[340px] text-cobalt opacity-[0.06] sm:block"
      />

      <p className="eyebrow-brass">270 Hindley Street</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-cobalt-dark sm:text-4xl">
        Menu
      </h1>
      <div className="meander-divider-brass mt-4 w-24 opacity-80" aria-hidden="true" />

      {/* The whole menu in one sentence. */}
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">
        Three meats off the charcoal — lamb, chicken, pork. Have one, or mix them. Then pick
        how you want it served.
      </p>

      <LocationIdentifier className="mt-6" />

      {/* Meat row — the one choice that runs through everything */}
      <div className="carved-panel mt-8 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
          Pick your meat
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
          {meats.map((meat) => (
            <p key={meat.id} className="font-display text-xl font-semibold text-cobalt-dark">
              {meat.name}
            </p>
          ))}
          <p className="font-display text-xl font-semibold text-cobalt">
            Mix
            <span className="ml-2 text-sm font-medium text-ink/50">any combination</span>
          </p>
        </div>
        <p className="mt-3 text-sm text-ink/55">
          Lamb carries a small premium — it varies by item, shown below.
        </p>
      </div>

      {/* Jump nav */}
      <nav
        aria-label="Menu sections"
        className="menu-panel sticky top-[72px] z-20 -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 py-3 sm:-mx-8 sm:px-8"
      >
        {menuGroups.map((group) => (
          <a
            key={group.id}
            href={`#${group.id}`}
            className="shrink-0 whitespace-nowrap rounded-full border border-cobalt/20 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-cobalt-dark/80 transition-colors hover:border-cobalt hover:text-cobalt"
          >
            {group.title}
          </a>
        ))}
      </nav>

      {/* Groups */}
      <div className="mt-6 space-y-6">
        {menuGroups.map((group) => (
          <section key={group.id} id={group.id} className="carved-panel scroll-mt-32 p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="font-display text-xl font-semibold text-cobalt-dark sm:text-2xl">
                {group.title}
              </h2>
              {group.products.some((p) => p.dineInOnly) && (
                <span className="rounded-full bg-cobalt/10 px-2.5 py-1 text-xs font-semibold text-cobalt">
                  Dine-in only
                </span>
              )}
            </div>
            <div className="meander-divider-brass mt-3 w-16 opacity-50" aria-hidden="true" />
            {group.blurb && <p className="mt-3 text-sm text-ink/60">{group.blurb}</p>}

            <ul className="mt-5 space-y-5">
              {group.products.map((product) => (
                <li key={product.id}>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-display text-base font-semibold text-cobalt-dark">
                      {product.name}
                    </p>
                    <p className="shrink-0 font-display text-base font-semibold text-cobalt">
                      {priceRange(product)}
                    </p>
                  </div>
                  {product.description && (
                    <p className="mt-0.5 max-w-md text-sm text-ink/60">{product.description}</p>
                  )}

                  {/* Sizes, when there's a real choice */}
                  {product.sizes.length > 1 && (
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                      {product.sizes.map((size) => (
                        <p key={size.id} className="text-sm text-ink/60">
                          {size.name}{" "}
                          <span className="font-medium text-ink/80">
                            {formatMoney(size.price)}
                          </span>
                          {size.lambSurcharge ? (
                            <span className="ml-1 text-ink/45">
                              (lamb +{formatMoney(size.lambSurcharge)})
                            </span>
                          ) : null}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Single-size products still need the lamb premium shown */}
                  {product.sizes.length === 1 && product.sizes[0].lambSurcharge ? (
                    <p className="mt-1 text-sm text-ink/50">
                      Lamb +{formatMoney(product.sizes[0].lambSurcharge)}
                    </p>
                  ) : null}

                  {/* Drink flavours etc. — listed as one quiet line, not a wall */}
                  {product.variant && (
                    <p className="mt-2 text-sm text-ink/50">
                      {product.variant.options.join(" · ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Extras — one shared block, since the rules differ per item */}
      <section id="extras" className="carved-panel mt-6 scroll-mt-32 p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold text-cobalt-dark sm:text-2xl">
          Make It Yours
        </h2>
        <div className="meander-divider-brass mt-3 w-16 opacity-50" aria-hidden="true" />
        <p className="mt-3 text-sm text-ink/60">
          Not every extra fits every item — chips already come in an AB Pack and a Yiros Pack
          isn&rsquo;t built for them, and a Meat Pack is all meat as it is. The order page only
          offers you what actually works.
        </p>
        <div className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {extras.map((extra) => (
            <div
              key={extra.id}
              className="flex items-baseline justify-between gap-4 border-b border-cobalt/10 pb-2"
            >
              <p className="text-sm font-medium">{extra.name}</p>
              <p className="shrink-0 text-sm font-semibold text-cobalt">
                +{formatMoney(extra.price)}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-ink/50">
          <strong className="font-semibold text-ink/70">
            Two sauces are included on every item, three on an AB Pack.
          </strong>{" "}
          Any more are {formatMoney(SAUCE_PRICE)} each. Choose from{" "}
          {sauces.join(", ").toLowerCase()}.
        </p>
      </section>

      <div className="mt-12 border-t border-cobalt/10 pt-8 text-center">
        <Link href="/order" className="btn-orb-blue">
          Start Your Order
        </Link>
      </div>
    </div>
  );
}
