import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import LoopVideo from "@/components/LoopVideo";
import { waLink } from "@/lib/whatsapp";

/**
 * Server-rendered hero. The headline is real text in the first HTML byte, so
 * it is both the LCP element and the H1 search engines read; the line wipes
 * and the fade are CSS (globals.css: .hero-wipe, .hero-rise), so they run
 * before hydration.
 */
const lines = [
  { text: "We create", tone: "text-white" },
  { text: "what moves", tone: "text-accent-dark" },
  { text: "people", tone: "text-white", stop: true },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden">
      <LoopVideo src="/videos/hero-reel.mp4" poster="/videos/hero-reel-poster.jpg" />

      {/* A light veil keeps the footage visible; the left and bottom washes carry the type */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink/20" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent" />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16 md:pb-24">
        <p className="hero-rise flex flex-col sm:flex-row sm:items-center gap-y-1.5 font-sans font-medium text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-cream/70 mb-6 md:mb-8">
          <span>Nairobi, Kenya</span>
          <span aria-hidden="true" className="hidden sm:inline mx-3 text-cream/35">/</span>
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

        <p
          className="hero-rise mt-7 md:mt-9 font-sans text-cream/80 text-base md:text-lg leading-relaxed max-w-[46ch]"
          style={{ animationDelay: "700ms" }}
        >
          Marketing campaigns, brand films and social content for businesses in Kenya. Strategy, cinematic production
          and rollout, built around your next launch.
        </p>

        <div className="hero-rise mt-9 md:mt-10 flex flex-col sm:flex-row gap-3" style={{ animationDelay: "820ms" }}>
          <a
            href="#work"
            className="inline-flex items-center justify-center bg-white text-ink font-heading font-bold text-xs uppercase tracking-[0.16em] px-9 py-[1.1rem] hover:bg-accent active:translate-y-px transition-colors"
          >
            See our work
          </a>
          <a
            href={waLink("Source: natakainc.com (homepage)\nHi Nataka, I'd like to start a project. My company, the goal and our target date: ")}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 border border-white/30 text-white font-heading font-bold text-xs uppercase tracking-[0.16em] px-9 py-[1.1rem] hover:border-white/70 active:translate-y-px transition-colors"
          >
            Start a project
            <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
