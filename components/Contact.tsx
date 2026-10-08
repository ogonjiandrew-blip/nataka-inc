import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { waLink, PHONE_DISPLAY, PHONE_HREF } from "@/lib/whatsapp";
import Reveal from "@/components/Reveal";

const EMAIL = "andrew@natakainc.com";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/natakainc/" },
  { label: "TikTok", href: "https://www.tiktok.com/@natakainc" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/128374044" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-white/8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_15%_100%,rgb(var(--c-ember)/0.5),rgb(var(--c-ember)/0.12)_50%,transparent_75%)]" />
      <div aria-hidden="true" className="halftone absolute inset-0 -z-10 opacity-[0.09] [mask-image:radial-gradient(60%_80%_at_100%_0%,black,transparent_75%)]" />
      <div className="px-6 md:px-12 py-24 md:py-36 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[0.96] text-[clamp(2.3rem,6.4vw,5.6rem)] max-w-[16ch] [text-wrap:balance]">
            Tell us what you&apos;re <span className="text-accent-dark">launching</span><span className="text-signal">.</span>
          </h2>
          <p className="mt-6 font-sans text-cream/70 text-base md:text-lg leading-relaxed max-w-[50ch]">
            Send your company, the goal, a target date and a working budget. We reply with the scope that fits.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <a
              href={waLink("Source: natakainc.com (contact)\nHi Nataka, I'd like to start a project. My company, the goal, target date and budget: ")}
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-primary"
            >
              Start a project
              <ArrowRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <Link
              href="/campaign-brief"
              className="font-heading font-semibold text-sm text-cream/80 underline underline-offset-[6px] decoration-white/25 hover:decoration-white hover:text-white"
            >
              Still shaping it? Build a free campaign brief
            </Link>
          </div>
        </Reveal>

        <dl className="mt-20 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/10 pt-10">
          <div>
            <dt className="font-mono text-xs text-cream/60">Email</dt>
            <dd className="mt-2"><a href={`mailto:${EMAIL}`} className="font-sans text-cream/85 hover:text-accent transition-colors">{EMAIL}</a></dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-cream/60">Phone and WhatsApp</dt>
            <dd className="mt-2"><a href={PHONE_HREF} className="font-sans text-cream/85 hover:text-accent transition-colors tabular-nums">{PHONE_DISPLAY}</a></dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-cream/60">Studio</dt>
            <dd className="mt-2 font-sans text-cream/85">Westlands, Nairobi, Kenya</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-cream/60">Follow</dt>
            <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="font-sans text-cream/85 hover:text-accent transition-colors">
                  {s.label}
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
