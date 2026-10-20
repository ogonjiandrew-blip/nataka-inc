import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "K-Wave registrations closed | Nataka Inc" },
  description:
    "First 100 and K-Wave registrations are closed. Nataka is not handling K-pop fan signups or ticket enquiries.",
  alternates: { canonical: "https://www.natakainc.com/kwave" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "K-Wave registrations closed | Nataka Inc",
    description: "First 100 and K-Wave registrations are closed.",
    url: "https://www.natakainc.com/kwave",
  },
};

// Keep old bookmarks useful without sending fan or ticket enquiries to sales.
export default function KWavePage() {
  return (
    <main id="main-content" className="min-h-screen bg-ink text-cream px-6 py-16 md:px-12 md:py-24">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="font-nataka font-black text-xl text-white tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
          NATAKA<span className="text-signal">.</span>INC
        </Link>
        <section className="mt-24 md:mt-32 border-t border-white/15 pt-10">
          <p className="font-mono text-xs uppercase tracking-widest text-cream/65 mb-5">
            K-Wave · First 100
          </p>
          <h1 className="font-heading font-black text-4xl md:text-6xl leading-tight tracking-tight text-white">
            Registrations are closed.
          </h1>
          <p className="mt-6 font-sans text-base md:text-lg leading-relaxed text-cream/75">
            Nataka is not accepting First 100 or K-Wave signups and is not handling
            K-pop fan or ticket enquiries.
          </p>
          <p className="mt-4 font-sans text-base leading-relaxed text-cream/75">
            For event dates and tickets, please contact the event organiser directly.
          </p>
          <Link href="/" className="inline-block mt-10 font-heading font-semibold text-sm underline underline-offset-4 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
            Return to Nataka
          </Link>
        </section>
      </div>
    </main>
  );
}
