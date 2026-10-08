import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const proof = [
  { text: "Directed Kwanini for Ssaru x Fathermoh", href: "/work/ssaru-fathermoh-kwanini" },
  { text: "Built AANOTHER, an AI band, over 650 finished shots", href: "/services/ai-video-production-kenya#case-study" },
  { text: "Published the Nataka AI Standard for safe AI video", href: "/ai-standard" },
];

export default function About() {
  return (
    <section id="about" className="border-y border-white/8 bg-white/[0.025]">
      <div className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <Reveal className="lg:col-span-5 relative aspect-[4/5] overflow-hidden rounded-[22px] ring-1 ring-white/10 bg-ink-50" as="figure">
          <Image
            src="/stills/1/27.jpg"
            alt="Film still by Nataka Inc: a woman with natural hair in soft daylight"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            quality={85}
            className="object-cover object-[30%_50%] scale-[1.04]"
          />
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[1] text-[clamp(1.6rem,3.5vw,2.9rem)] [text-wrap:balance]">
              Directors, not an <span className="text-accent-dark">account team</span><span className="text-signal">.</span>
            </h2>
            <p className="mt-6 font-sans text-cream/75 text-base md:text-lg leading-relaxed max-w-[58ch]">
              Nataka Inc is a media and marketing agency in Westlands, Nairobi. We plan campaigns, shoot films and
              commercials, run social and paid media and make AI video, with one small senior team.
            </p>
            <p className="mt-4 font-sans text-cream/60 text-base leading-relaxed max-w-[58ch]">
              The person who directed your film is the person on your WhatsApp.
            </p>
          </Reveal>

          <ul className="mt-10 border-t border-white/10">
            {proof.map((p, i) => (
              <Reveal as="li" key={p.href} delay={i * 0.06}>
                <Link
                  href={p.href}
                  className="group flex items-center justify-between gap-6 py-5 border-b border-white/10 font-heading font-semibold text-base md:text-lg text-white hover:text-accent transition-colors"
                >
                  {p.text}
                  <span aria-hidden="true" className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
