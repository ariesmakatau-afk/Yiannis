import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-prose py-10 sm:py-14">
      <h1 className="font-display text-3xl font-semibold">Privacy Policy</h1>
      <div className="mt-6 border border-dashed border-ink/25 bg-ink/[0.04] p-6 text-sm text-ink/60">
        <p className="font-semibold text-ink/70">[PLACEHOLDER]</p>
        <p className="mt-2">
          No privacy policy text was supplied in the project brief. This page collects the
          pickup order form&rsquo;s name/phone/pickup-time details and, if enabled, Google
          Analytics usage data — replace this placeholder with real policy text (ideally
          reviewed by the client or a solicitor) before launch.
        </p>
      </div>
    </div>
  );
}
