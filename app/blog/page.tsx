import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Insights | Nataka Inc — Media & Marketing Agency Nairobi",
  description:
    "Industry insights, pricing guides, and creative thinking from Nataka Inc — Nairobi's leading video production and marketing agency.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="min-h-screen bg-ink pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 md:mb-20">
          <span className="font-sans text-teal text-[10px] tracking-widest2 uppercase font-medium block mb-5">
            Insights
          </span>
          <h1 className="leading-none mb-6">
            <span className="font-geist font-black text-[clamp(2rem,7vw,6rem)] text-white uppercase block">
              Ideas &amp; Industry
            </span>
            <span className="font-display font-semibold italic text-[clamp(2rem,7vw,6rem)] text-teal block">
              Thinking.
            </span>
          </h1>
          <p className="font-sans text-cream/60 text-sm md:text-base max-w-xl leading-relaxed">
            Guides, perspectives, and industry thinking from Nairobi&apos;s creative front line.
          </p>
        </div>

        {/* Featured post */}
        <Link href={`/blog/${featured.slug}`} className="group block mb-12">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-ink-50 mb-6">
            <Image
              src={featured.coverImage}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="100vw"
              quality={90}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-5 md:p-12">
              <span className="font-sans text-[10px] text-teal tracking-widest uppercase border border-teal/40 px-3 py-1 bg-ink/60 backdrop-blur-sm font-medium inline-block mb-3 md:mb-4">
                {featured.category}
              </span>
              <h2 className="font-geist font-black text-lg sm:text-2xl md:text-4xl text-white uppercase leading-tight mb-3 max-w-3xl">
                {featured.title}
              </h2>
              <p className="font-sans text-cream/70 text-sm md:text-base max-w-2xl leading-relaxed hidden md:block">
                {featured.excerpt}
              </p>
            </div>
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-teal scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>
          <div className="flex items-center gap-4 font-sans text-white/35 text-xs">
            <span>{new Date(featured.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span>·</span>
            <span>{featured.readTime}</span>
          </div>
        </Link>

        <div className="h-px bg-white/8 mb-12" />

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-50 mb-5">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <span className="absolute top-4 left-4 font-sans text-[10px] text-teal tracking-widest uppercase border border-teal/40 px-3 py-1 bg-ink/60 backdrop-blur-sm font-medium">
                  {post.category}
                </span>
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-teal scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
              <h3 className="font-geist font-black text-lg text-white uppercase leading-tight mb-3 group-hover:text-teal transition-colors duration-200">
                {post.title}
              </h3>
              <p className="font-sans text-cream/55 text-sm leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 font-sans text-white/30 text-xs">
                <span>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 pt-16 border-t border-white/8 text-center">
          <p className="font-sans text-cream/50 text-sm mb-6">Ready to work together?</p>
          <Link
            href="/#contact"
            className="inline-block font-geist font-black text-sm text-ink bg-teal px-8 py-4 uppercase tracking-widest hover:bg-teal-light transition-colors duration-200"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </main>
  );
}
