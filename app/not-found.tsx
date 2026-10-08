import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Page Not Found | Nataka Inc",
};

export default function NotFound() {
  return (
    <main id="main-content" className="relative isolate min-h-[100dvh] overflow-hidden text-cream">
      <Navbar />

      {/* The lit room, as on the contact section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_15%_100%,rgb(var(--c-ember)/0.5),rgb(var(--c-ember)/0.12)_50%,transparent_75%)]" />
      <div aria-hidden="true" className="halftone absolute inset-0 -z-10 opacity-[0.09] [mask-image:radial-gradient(60%_80%_at_100%_0%,black,transparent_75%)]" />

      <div className="flex min-h-[100dvh] flex-col justify-end px-6 md:px-12 pt-36 pb-20 md:pb-28 max-w-7xl mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-cream/55">
          <span className="text-signal">404</span> / Lost the frame
        </p>
        <h1 className="mt-6 font-heading font-extrabold uppercase stretch-wide tracking-[-0.025em] leading-[0.95] text-[clamp(2.3rem,7vw,6.4rem)] max-w-[14ch]">
          <span className="text-white">This shot didn&apos;t </span>
          <span className="text-accent-dark">make the cut</span>
          <span className="text-signal">.</span>
        </h1>
        <p className="mt-7 font-sans text-cream/70 text-base md:text-lg leading-relaxed max-w-[48ch]">
          The page you&apos;re looking for doesn&apos;t exist, or it&apos;s still in post-production. Let&apos;s get you back
          to something worth watching.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link href="/" className="group btn-primary">
            Back to home
            <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link href="/#work" className="btn-ghost">
            See our work
          </Link>
        </div>
      </div>
    </main>
  );
}
