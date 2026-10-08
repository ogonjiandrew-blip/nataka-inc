import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getAllPosts } from "@/lib/posts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const siteUrl = "https://www.natakainc.com";

export const metadata: Metadata = {
  title: { absolute: "Insights | Nataka Inc, Media and Marketing Agency in Nairobi" },
  description:
    "Pricing guides, production know-how and marketing thinking from Nataka Inc, the Nairobi production house for campaigns, films and AI video.",
  alternates: { canonical: `${siteUrl}/blog` },
};

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main id="main-content" className="min-h-screen text-cream">
      <Navbar />

      <section className="px-6 md:px-12 pt-36 md:pt-48 pb-12 md:pb-16 max-w-7xl mx-auto">
        <p className="font-sans font-medium text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-cream/70 mb-6">
          Insights
        </p>
        <h1 className="font-heading font-extrabold uppercase stretch-wide tracking-[-0.025em] leading-[0.95] text-[clamp(2.3rem,6.4vw,5.8rem)] max-w-[18ch]">
          <span className="text-white">Ideas and </span>
          <span className="text-accent-dark">industry thinking</span>
          <span className="text-signal">.</span>
        </h1>
        <p className="mt-6 font-sans text-cream/70 text-base md:text-lg leading-relaxed max-w-[52ch]">
          Pricing guides, production know-how and marketing thinking from our team in Nairobi.
        </p>
      </section>

      {/* Featured: a framed screen, like the work on the homepage */}
      <section className="relative isolate px-6 md:px-12 max-w-7xl mx-auto">
        <Link href={`/blog/${featured.slug}`} className="group block">
          <div className="relative overflow-hidden rounded-[24px] ring-1 ring-white/10 aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] bg-ink-50">
            <Image
              src={featured.coverImage}
              alt={featured.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              quality={88}
              className="object-cover scale-[1.02] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal">{featured.category}</p>
              <h2 className="mt-3 font-heading font-extrabold uppercase stretch-semi text-white tracking-[-0.02em] leading-[1.02] text-[clamp(1.4rem,3.2vw,2.8rem)] max-w-[24ch]">
                {featured.title}
              </h2>
              <p className="mt-4 hidden md:block font-sans text-cream/75 text-base leading-relaxed max-w-[60ch]">{featured.excerpt}</p>
            </div>
          </div>
          <p className="mt-4 font-mono text-xs text-cream/50">
            {fmt(featured.date)}
            <span className="mx-3 text-cream/25">/</span>
            {featured.readTime}
          </p>
        </Link>
      </section>

      <section className="px-6 md:px-12 pt-20 md:pt-28 pb-24 md:pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-14">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.06}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] ring-1 ring-white/10 bg-ink-50 transition-[box-shadow] duration-500 group-hover:ring-signal/50">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={82}
                    className="object-cover scale-[1.02] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">{post.category}</p>
                <h3 className="mt-2 font-heading font-bold text-lg md:text-xl text-white tracking-tight leading-snug">
                  {post.title}
                </h3>
                <p className="mt-3 font-sans text-cream/60 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                <p className="mt-4 font-mono text-xs text-cream/45">
                  {fmt(post.date)}
                  <span className="mx-3 text-cream/25">/</span>
                  {post.readTime}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 md:mt-32 border-t border-white/10 pt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <h2 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.02em] leading-[1] text-[clamp(1.6rem,3.4vw,2.8rem)]">
            Have a project in mind?
          </h2>
          <Link href="/#contact" className="group btn-primary self-start md:self-auto">
            Start a project
            <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
