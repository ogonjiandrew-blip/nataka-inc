import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import LoopVideo from "@/components/LoopVideo";

/** Full-bleed feature for the AI production case study (AANOTHER). */
export default function AiBandFeature() {
  return (
    <section
      aria-labelledby="ai-band-title"
      className="relative overflow-hidden min-h-[640px] md:min-h-[86vh] flex items-end"
    >
      <LoopVideo src="/ai/aanother/aanother-feature.mp4" poster="/ai/aanother/aanother-feature-poster.jpg" lazy />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/45 to-ink/5" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent" />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
        <p className="font-sans font-medium text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-cream/70 mb-6">
          Case study: AANOTHER
        </p>
        <h2
          id="ai-band-title"
          className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[0.95] text-[clamp(1.75rem,5.6vw,5rem)] max-w-[16ch]"
        >
          We built a rock band <span className="text-accent-dark">that doesn&apos;t exist</span>
          <span className="text-signal">.</span>
        </h2>
        <p className="mt-6 font-sans text-cream/80 text-base md:text-lg leading-relaxed max-w-[46ch]">
          Four AI band members with the same faces in every frame, three music videos and over 650 finished shots. No
          cameras, no venue, no crew day. The same pipeline makes AI commercials and brand characters.
        </p>
        <Link
          href="/services/ai-video-production-kenya#case-study"
          className="group mt-9 inline-flex items-center gap-3 border border-white/30 text-white font-heading font-bold text-xs uppercase tracking-[0.16em] px-9 py-[1.1rem] hover:border-white/70 active:translate-y-px transition-colors"
        >
          See how we made it
          <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
