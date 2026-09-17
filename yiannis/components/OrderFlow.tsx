"use client";

import { useMemo, useState } from "react";
import { business, menu, orderableCategoryIds } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

type CartLine = {
  categoryId: string;
  itemId: string;
  name: string;
  price: string;
  quantity: number;
};

type Step = "choose" | "build" | "details" | "sent";

const orderableMenu = menu.filter((c) => orderableCategoryIds.includes(c.id));

export default function OrderFlow() {
  const [path, setPath] = useState<"none" | "pickup">("none");
  const [step, setStep] = useState<Step>("choose");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalItems = useMemo(
    () => cart.reduce((sum, line) => sum + line.quantity, 0),
    [cart]
  );

  function addItem(categoryId: string, itemId: string, name: string, price: string) {
    setCart((prev) => {
      const existing = prev.find((l) => l.itemId === itemId);
      if (existing) {
        return prev.map((l) =>
          l.itemId === itemId ? { ...l, quantity: l.quantity + 1 } : l
        );
      }
      return [...prev, { categoryId, itemId, name, price, quantity: 1 }];
    });
  }

  function changeQty(itemId: string, delta: number) {
    setCart((prev) =>
      prev
        .map((l) => (l.itemId === itemId ? { ...l, quantity: l.quantity + delta } : l))
        .filter((l) => l.quantity > 0)
    );
  }

  async function submitOrder() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          pickupTime,
          orderNotes,
          items: cart.map((l) => ({ name: `${l.name} (${l.price})`, quantity: l.quantity })),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong sending your order.");
      }
      trackEvent({ name: "pickup_order_submitted" });
      setStep("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please call us instead.");
    } finally {
      setSubmitting(false);
    }
  }

  // ---- Step 1: choose a path -------------------------------------------
  if (path === "none") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href={business.uberEatsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent({ name: "order_online_click", path: "uber_eats" })}
          className="flex flex-col justify-between border border-cobalt/15 bg-white p-6 transition-colors hover:border-cobalt"
        >
          <div>
            <p className="font-display text-xl font-semibold">Order via Uber Eats</p>
            <p className="mt-2 text-sm text-ink/60">
              Delivery, handled entirely by Uber Eats — menu, pricing and payment all happen over
              there.
            </p>
          </div>
          <span className="mt-6 text-sm font-semibold text-cobalt">Opens Uber Eats ↗</span>
        </a>

        <button
          type="button"
          onClick={() => {
            setPath("pickup");
            setStep("build");
            trackEvent({ name: "order_online_click", path: "pickup" });
          }}
          className="flex flex-col justify-between border border-cobalt/15 bg-white p-6 text-left transition-colors hover:border-cobalt"
        >
          <div>
            <p className="font-display text-xl font-semibold">Order for Pickup</p>
            <p className="mt-2 text-sm text-ink/60">
              Build your order here, tell us when you&rsquo;ll swing by, and pay in-store when you
              collect it. No online payment.
            </p>
          </div>
          <span className="mt-6 text-sm font-semibold text-cobalt">Start your order →</span>
        </button>
      </div>
    );
  }

  // ---- Step 4: confirmation ----------------------------------------------
  if (step === "sent") {
    return (
      <div className="border border-cobalt/15 bg-white p-8 text-center">
        <p className="font-display text-2xl font-semibold">Order sent!</p>
        <p className="mt-3 text-ink/70">
          We&rsquo;ve got your order — pay in-store when you pick it up. See you soon.
        </p>
        <p className="mt-6 text-sm text-ink/50">
          Running early or late? Call us on{" "}
          <a href={business.phoneHref} className="font-semibold text-cobalt">
            {business.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  // ---- Step 3: customer details ------------------------------------------
  if (step === "details") {
    return (
      <div className="border border-cobalt/15 bg-white p-6 sm:p-8">
        <button
          type="button"
          onClick={() => setStep("build")}
          className="text-sm font-semibold text-cobalt"
        >
          ← Back to your order
        </button>
        <p className="mt-3 font-display text-xl font-semibold">Your details</p>
        <p className="mt-1 text-sm text-ink/60">
          Pay in-store on pickup — no payment happens here.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            submitOrder();
          }}
        >
          <div>
            <label htmlFor="customerName" className="block text-sm font-semibold">
              Name
            </label>
            <input
              id="customerName"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="mt-1 w-full border border-ink/20 px-3 py-2.5 text-base"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full border border-ink/20 px-3 py-2.5 text-base"
            />
          </div>
          <div>
            <label htmlFor="pickupTime" className="block text-sm font-semibold">
              Pickup time
            </label>
            <input
              id="pickupTime"
              required
              placeholder="e.g. Tonight, 8:30pm"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="mt-1 w-full border border-ink/20 px-3 py-2.5 text-base"
            />
          </div>
          <div>
            <label htmlFor="orderNotes" className="block text-sm font-semibold">
              Notes <span className="font-normal text-ink/50">(optional)</span>
            </label>
            <textarea
              id="orderNotes"
              rows={3}
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              className="mt-1 w-full border border-ink/20 px-3 py-2.5 text-base"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting} className="btn-orb-blue w-full disabled:opacity-60">
            {submitting ? "Sending order…" : "Send Order"}
          </button>
        </form>
      </div>
    );
  }

  // ---- Step 2: build the order -------------------------------------------
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-10">
        {orderableMenu.map((category) => (
          <section key={category.id}>
            <h2 className="font-display text-lg font-semibold">{category.title}</h2>
            <ul className="mt-3 divide-y divide-cobalt/10 border-y border-cobalt/10">
              {category.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-sm text-ink/50">{item.price}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addItem(category.id, item.id, item.name, item.price)}
                    className="shrink-0 border border-ink/20 px-3 py-1.5 text-sm font-semibold hover:border-cobalt hover:text-cobalt"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Cart summary */}
      <aside className="h-fit border border-cobalt/15 bg-white p-5 lg:sticky lg:top-24">
        <p className="font-display text-lg font-semibold">Your Order</p>
        {cart.length === 0 ? (
          <p className="mt-3 text-sm text-ink/50">Add items from the menu to get started.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {cart.map((line) => (
              <li key={line.itemId} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{line.name}</p>
                  <p className="text-xs text-ink/50">{line.price}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Remove one ${line.name}`}
                    onClick={() => changeQty(line.itemId, -1)}
                    className="h-7 w-7 border border-ink/20 text-sm"
                  >
                    −
                  </button>
                  <span className="w-4 text-center text-sm">{line.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Add one more ${line.name}`}
                    onClick={() => changeQty(line.itemId, 1)}
                    className="h-7 w-7 border border-ink/20 text-sm"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          disabled={cart.length === 0}
          onClick={() => setStep("details")}
          className="btn-orb-blue mt-5 w-full disabled:opacity-40"
        >
          Continue ({totalItems} item{totalItems === 1 ? "" : "s"})
        </button>
        <p className="mt-3 text-xs text-ink/50">
          Prices shown are menu prices — final total is confirmed in-store, since some combos
          (e.g. Lamb) carry a surcharge noted on the menu.
        </p>
      </aside>
    </div>
  );
}
