import Link from "next/link";

/** Homepage strip pointing to the AI production case study (AANOTHER). */
export default function AiBandFeature() {
  return (
    <section aria-labelledby="ai-band-title" className="px-6 md:px-12 pb-24 md:pb-32 max-w-7xl mx-auto">
      <Link
        href="/services/ai-video-production-kenya#case-study"
        className="group grid md:grid-cols-12 border border-white/10 hover:border-teal/40 transition-colors duration-300 overflow-hidden"
      >
        <div className="relative md:col-span-7 aspect-[4/3] md:aspect-auto md:min-h-[420px] bg-black overflow-hidden">
          <video
            src="/ai/aanother/aanother-loop.mp4"
            poster="/ai/aanother/aanother-loop-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
          <span className="absolute top-4 left-4 font-sans text-[10px] tracking-widest uppercase text-white/85 bg-ink/60 px-3 py-1.5">
            AI production · Every frame
          </span>
        </div>
        <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-b from-white/[0.03] to-transparent">
          <p className="font-sans text-[10px] text-teal tracking-widest uppercase mb-4">Case study · AANOTHER</p>
          <h2 id="ai-band-title" className="leading-[0.95] mb-5">
            <span className="font-geist font-black text-[clamp(1.6rem,3.6vw,2.8rem)] text-white uppercase block">We built a rock band</span>
            <span className="font-display font-semibold italic text-[clamp(1.6rem,3.6vw,2.8rem)] text-teal block">that doesn&apos;t exist.</span>
          </h2>
          <p className="font-sans text-cream/70 text-sm md:text-base leading-relaxed mb-8">
            Four AI band members, the same faces in every frame, three music videos and the cut-downs for every feed. No cameras, no venue, no crew day. The same pipeline makes AI commercials and brand characters.
          </p>
          <span className="font-geist font-black text-xs text-teal uppercase tracking-widest group-hover:translate-x-1 transition-transform">
            See how we made it →
          </span>
        </div>
      </Link>
    </section>
  );
}
