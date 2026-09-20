"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type Item = { name: string; quantity: number; notes?: string };
type Order = {
  id: string;
  created_at: string;
  customer_name: string;
  phone: string;
  pickup_time: string;
  email: string | null;
  order_notes: string | null;
  items: Item[];
  status: "new" | "accepted" | "rejected" | "collected";
  wait_minutes: number | null;
};

const WAIT_OPTIONS = [10, 15, 20, 30, 45];
const POLL_MS = 15000;

export default function KitchenBoard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const knownIds = useRef<Set<string>>(new Set());
  const firstLoad = useRef(true);

  /** A short beep via WebAudio — no audio file to ship or fail to load. */
  const beep = useCallback(() => {
    if (!soundOn) return;
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.62);
    } catch {
      // Sound is a nicety; never let it break the board.
    }
  }, [soundOn]);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/kitchen/orders", { cache: "no-store" });
      if (res.status === 401) {
        window.location.href = "/staff?next=/kitchen";
        return;
      }
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Could not load orders.");

      const next: Order[] = body.orders ?? [];

      // Beep only for genuinely new arrivals, and never on first paint.
      const incoming = next.filter((o) => o.status === "new" && !knownIds.current.has(o.id));
      if (!firstLoad.current && incoming.length > 0) beep();
      next.forEach((o) => knownIds.current.add(o.id));
      firstLoad.current = false;

      setOrders(next);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load orders.");
    } finally {
      setLoading(false);
    }
  }, [beep]);

  useEffect(() => {
    load();
    const id = window.setInterval(load, POLL_MS);
    return () => window.clearInterval(id);
  }, [load]);

  async function patch(id: string, patchBody: Record<string, unknown>) {
    // Optimistic: the kitchen shouldn't wait on a round trip mid-service.
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              ...(patchBody.status ? { status: patchBody.status as Order["status"] } : {}),
              ...(patchBody.waitMinutes !== undefined
                ? { wait_minutes: patchBody.waitMinutes as number | null }
                : {}),
            }
          : o
      )
    );
    try {
      const res = await fetch("/api/kitchen/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...patchBody }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setError("That change didn't save — reloading.");
      load();
    }
  }

  const active = orders.filter((o) => o.status === "new" || o.status === "accepted");
  const done = orders.filter((o) => o.status === "collected" || o.status === "rejected");

  return (
    <div className="min-h-screen bg-mist">
      <header className="sticky top-0 z-10 border-b border-cobalt/15 bg-white/95 backdrop-blur">
        <div className="container-page flex items-center justify-between gap-4 py-3.5">
          <div>
            <p className="font-display text-lg font-semibold text-cobalt-dark">Kitchen</p>
            <p className="text-xs text-ink/50">
              {active.length} active · refreshes every 15s
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundOn((s) => !s)}
              className="rounded-full border border-ink/20 px-3 py-1.5 text-xs font-semibold"
            >
              {soundOn ? "🔔 Sound on" : "🔕 Sound off"}
            </button>
            <Link href="/admin" className="rounded-full border border-ink/20 px-3 py-1.5 text-xs font-semibold">
              Admin
            </Link>
          </div>
        </div>
      </header>

      <main className="container-page py-6">
        {error && (
          <p role="alert" className="mb-4 rounded-sm bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
            {error}
          </p>
        )}

        {loading ? (
          <p className="py-16 text-center text-ink/50">Loading…</p>
        ) : active.length === 0 ? (
          <div className="carved-panel px-6 py-16 text-center">
            <p className="font-display text-xl font-semibold text-cobalt-dark">
              No orders waiting
            </p>
            <p className="mt-2 text-sm text-ink/55">New ones appear here automatically.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {active.map((order) => (
              <OrderCard key={order.id} order={order} onPatch={patch} />
            ))}
          </div>
        )}

        {done.length > 0 && (
          <details className="mt-10">
            <summary className="cursor-pointer text-sm font-semibold text-ink/60">
              Finished today ({done.length})
            </summary>
            <ul className="mt-3 space-y-1.5">
              {done.map((o) => (
                <li key={o.id} className="flex items-center gap-3 text-sm text-ink/55">
                  <span
                    className={
                      o.status === "rejected" ? "text-red-700" : "text-green-700"
                    }
                  >
                    {o.status === "rejected" ? "✕" : "✓"}
                  </span>
                  <span className="font-medium">{o.customer_name}</span>
                  <span>{o.pickup_time}</span>
                </li>
              ))}
            </ul>
          </details>
        )}
      </main>
    </div>
  );
}

function OrderCard({
  order,
  onPatch,
}: {
  order: Order;
  onPatch: (id: string, patch: Record<string, unknown>) => void;
}) {
  const isNew = order.status === "new";
  const placed = new Date(order.created_at).toLocaleTimeString("en-AU", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <article
      className={`rounded-sm border bg-white p-5 ${
        isNew ? "border-cobalt ring-2 ring-cobalt/20" : "border-cobalt/15"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-semibold text-cobalt-dark">
            {order.customer_name}
          </p>
          <a href={`tel:${order.phone}`} className="text-sm font-medium text-cobalt">
            {order.phone}
          </a>
        </div>
        <div className="text-right">
          {isNew ? (
            <span className="rounded-full bg-cobalt px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
              New
            </span>
          ) : (
            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-green-800">
              Accepted
            </span>
          )}
          <p className="mt-1.5 text-xs text-ink/45">placed {placed}</p>
        </div>
      </div>

      <p className="mt-3 text-sm">
        <span className="text-ink/50">Pickup:</span>{" "}
        <span className="font-semibold">{order.pickup_time}</span>
        {order.wait_minutes != null && (
          <span className="ml-2 rounded bg-brass/15 px-2 py-0.5 text-xs font-semibold text-brass-deep">
            told {order.wait_minutes} min
          </span>
        )}
      </p>

      <ul className="mt-4 space-y-2 border-t border-cobalt/10 pt-3">
        {order.items.map((item, i) => (
          <li key={i} className="text-sm">
            <span className="font-semibold">{item.quantity}×</span> {item.name}
            {item.notes && <span className="ml-1 text-ink/45">({item.notes})</span>}
          </li>
        ))}
      </ul>

      {order.order_notes && (
        <p className="mt-3 rounded-sm bg-amber-50 px-3 py-2 text-sm text-amber-900">
          <span className="font-semibold">Note:</span> {order.order_notes}
        </p>
      )}

      {isNew ? (
        <>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {WAIT_OPTIONS.map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => onPatch(order.id, { status: "accepted", waitMinutes: mins })}
                className="rounded-full border border-cobalt/30 px-3 py-1.5 text-xs font-semibold text-cobalt-dark transition-colors hover:border-cobalt hover:bg-cobalt/5 active:scale-95"
              >
                {mins} min
              </button>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => onPatch(order.id, { status: "accepted" })}
              className="flex-1 rounded-sm bg-cobalt py-2.5 text-sm font-semibold text-white transition-transform active:scale-[0.98]"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm(`Reject ${order.customer_name}'s order? Call them first.`)) {
                  onPatch(order.id, { status: "rejected" });
                }
              }}
              className="rounded-sm border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-700 transition-transform active:scale-[0.98]"
            >
              Reject
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={() => onPatch(order.id, { status: "collected" })}
          className="mt-4 w-full rounded-sm border border-green-600 py-2.5 text-sm font-semibold text-green-700 transition-transform active:scale-[0.98]"
        >
          Mark collected
        </button>
      )}
    </article>
  );
}
