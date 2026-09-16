import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <div className="container-page max-w-prose py-10 sm:py-14">
      <h1 className="font-display text-3xl font-semibold">Terms</h1>
      <div className="mt-6 border border-dashed border-ink/25 bg-ink/[0.04] p-6 text-sm text-ink/60">
        <p className="font-semibold text-ink/70">[PLACEHOLDER]</p>
        <p className="mt-2">
          No terms text was supplied in the project brief — replace this placeholder before
          launch. Note for drafting: pickup orders placed via <code>/order</code> are pay-in-store
          only, no online payment is processed on this site, and Uber Eats orders are governed by
          Uber Eats&rsquo; own terms.
        </p>
      </div>
    </div>
  );
}
