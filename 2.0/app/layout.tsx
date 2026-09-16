import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import StructuredData from "@/components/StructuredData";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { siteMeta } from "@/lib/content";

// Cinzel — carved from Roman/Greek inscriptional lettering. Used for all headings.
const displayFont = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

// Cormorant Garamond italic — elegant script accent for taglines/eyebrows,
// in the spirit of the calligraphic touches on upscale Greek menu branding.
const scriptFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic"],
  variable: "--font-script",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: siteMeta.titleDefault,
    template: "%s | Yianni's on Hindley Street",
  },
  description: siteMeta.description,
  openGraph: {
    title: siteMeta.titleDefault,
    description: siteMeta.description,
    siteName: "Yianni's on Hindley Street",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${displayFont.variable} ${scriptFont.variable} ${bodyFont.variable}`}>
      <body className="flex min-h-screen flex-col">
        <StructuredData />
        <GoogleAnalytics />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-cobalt"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
