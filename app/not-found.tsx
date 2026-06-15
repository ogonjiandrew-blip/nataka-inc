import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Nataka Inc",
};

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] bg-ink text-cream flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* oversized ghost 404 */}
      <span
        aria-hidden
        className="absolute font-geist font-black text-[40vw] leading-none text-white/[0.03] select-none pointer-events-none"
      >
        404
      </span>

      <div className="relative z-10 text-center max-w-lg">
        <p className="font-mono text-[11px] text-teal tracking-[0.35em] uppercase mb-6">
          Lost the frame
        </p>
        <h1 className="font-geist font-black text-[clamp(2rem,6vw,4rem)] text-white uppercase leading-none mb-6">
          This Shot
          <br />
          <span className="text-teal">Didn&apos;t Make</span>
          <br />
          The Cut.
        </h1>
        <p className="font-sans text-cream/60 text-base leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist — or it&apos;s still in
          post-production. Let&apos;s get you back to something worth watching.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-block font-geist font-black text-xs text-ink bg-teal px-8 py-4 uppercase tracking-widest hover:bg-teal-light transition-colors duration-200"
          >
            Back to Home
          </Link>
          <Link
            href="/gallery"
            className="inline-block font-sans text-xs text-white border border-white/25 px-8 py-4 uppercase tracking-widest hover:border-teal hover:text-teal transition-colors duration-200"
          >
            Explore the Gallery
          </Link>
        </div>
      </div>
    </main>
  );
}
