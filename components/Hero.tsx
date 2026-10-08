import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import LoopVideo from "@/components/LoopVideo";
import { waLink } from "@/lib/whatsapp";

/**
 * The hero is a screen in a dark room: the reel plays inside a rounded frame,
 * inset from the window edge, with the red room light glowing behind it.
 * Server-rendered: the headline is real text in the first HTML byte, and the
 * line wipes and fades are CSS (globals.css: .hero-wipe, .hero-rise).
 */
const lines = [
  { text: "We create", tone: "text-white" },
  { text: "what moves", tone: "text-accent-dark" },
  { text: "people", tone: "text-white", stop: true },
];

export default function Hero() {
  return (
    <section className="relative isolate px-2.5 pt-2.5 md:px-4 md:pt-4">
      {/* Room light spilling from behind the screen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-[10%] -top-[10%] -bottom-[30%] -z-10 bg-[radial-gradient(55%_45%_at_50%_62%,rgb(var(--c-ember)/0.62),rgb(var(--c-ember)/0.18)_45%,transparent_72%)]"
      />

      <div className="relative isolate flex min-h-[calc(100dvh-20px)] md:min-h-[calc(100dvh-32px)] flex-col justify-end overflow-hidden rounded-[22px] md:rounded-[32px] ring-1 ring-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
        <LoopVideo
          src="/videos/hero-reel-v3.mp4"
          srcMobile="/videos/hero-reel-v3-mobile.mp4"
          poster="/videos/hero-reel-v3-poster.jpg"
        />

        {/* A light veil keeps the footage visible; the washes carry the type */}
        <div aria-hidden="true" className="absolute inset-0 bg-ink/20" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/35 to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent" />
        {/* Print dots over the lower left, where the type sits */}
        <div aria-hidden="true" className="halftone absolute inset-0 opacity-[0.16] [mask-image:radial-gradient(70%_80%_at_0%_100%,black,transparent_70%)]" />
        {/* Room light rising from the bottom edge of the frame */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ember/35 to-transparent mix-blend-screen" />

        <div className="relative w-full max-w-7xl mx-auto px-5 md:px-12 pt-28 pb-12 md:pb-20">
          <p className="hero-rise flex flex-col sm:flex-row sm:items-center gap-y-1.5 font-sans font-medium text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-cream/75 mb-6 md:mb-8">
            <span>Nairobi, Kenya</span>
            <span aria-hidden="true" className="hidden sm:inline mx-3 text-signal">/</span>
            <span>Marketing &amp; brand promotion</span>
          </p>

          <h1 className="font-heading font-extrabold uppercase stretch-wide leading-[0.94] tracking-[-0.025em] text-[clamp(2rem,8.6vw,8.25rem)]">
            <span className="sr-only">Nataka Inc, marketing and brand promotion agency in Nairobi, Kenya. </span>
            {lines.map((l, i) => (
              <span
                key={l.text}
                className={`hero-wipe block whitespace-nowrap ${l.tone}`}
                style={{ animationDelay: `${120 + i * 170}ms` }}
              >
                {l.text}
                {l.stop && <span className="text-signal">.</span>}
              </span>
            ))}
          </h1>

          <div className="mt-7 md:mt-9 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <p
              className="hero-rise font-sans text-cream/80 text-base md:text-lg leading-relaxed max-w-[46ch]"
              style={{ animationDelay: "700ms" }}
            >
              Marketing campaigns, brand films and social content for businesses in Kenya. Strategy, cinematic
              production and rollout, built around your next launch.
            </p>

            <div className="hero-rise flex flex-col sm:flex-row gap-3" style={{ animationDelay: "820ms" }}>
              <a
                href={waLink("Source: natakainc.com (homepage)\nHi Nataka, I'd like to start a project. My company, the goal and our target date: ")}
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-primary"
              >
                Start a project
                <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#work" className="btn-ghost">
                See our work
              </a>
            </div>
          </div>

          {/* Our AI Standard, rule 02: AI that could pass as real is labelled */}
          <p className="hero-rise mt-8 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/45" style={{ animationDelay: "900ms" }}>
            Our shoots, our VFX for @dance10fikshun and AI footage from AANOTHER
          </p>
        </div>
      </div>
    </section>
  );
}
