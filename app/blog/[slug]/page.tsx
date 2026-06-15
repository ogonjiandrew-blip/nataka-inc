import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug, getAllPosts } from "@/lib/posts";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Nataka Inc`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: "article",
    },
  };
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-ink">

      {/* Hero image */}
      <div className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />

        {/* Back link */}
        <div className="absolute top-8 left-6 md:left-12">
          <Link
            href="/blog"
            className="font-sans text-white/55 text-xs tracking-widest uppercase hover:text-teal transition-colors flex items-center gap-2"
          >
            ← Insights
          </Link>
        </div>

        {/* Post meta */}
        <div className="absolute bottom-0 inset-x-0 px-6 md:px-12 pb-12 max-w-4xl">
          <span className="font-sans text-[10px] text-teal tracking-widest uppercase border border-teal/40 px-3 py-1 bg-ink/60 backdrop-blur-sm font-medium inline-block mb-5">
            {post.category}
          </span>
          <h1 className="font-geist font-black text-[clamp(1.6rem,4vw,3.2rem)] text-white uppercase leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 font-sans text-white/40 text-xs">
            <span>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span className="text-teal">Nataka Inc</span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="px-6 md:px-12 py-16 max-w-3xl mx-auto">
        <p className="font-sans text-cream/70 text-base md:text-lg leading-relaxed mb-10 border-l-2 border-teal pl-6">
          {post.excerpt}
        </p>

        <div
          className="prose-nataka"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div className="mt-16 pt-12 border-t border-white/8">
          <p className="font-sans text-cream/50 text-sm mb-2">Ready to start a project?</p>
          <Link
            href="/#contact"
            className="inline-block font-geist font-black text-sm text-ink bg-teal px-8 py-4 uppercase tracking-widest hover:bg-teal-light transition-colors duration-200 mr-4"
          >
            Get in Touch
          </Link>
          <Link
            href="/blog"
            className="inline-block font-sans text-white/50 text-xs tracking-widest uppercase hover:text-teal transition-colors pt-4"
          >
            ← More Insights
          </Link>
        </div>
      </div>

      {/* Related posts */}
      {allPosts.length > 0 && (
        <div className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
          <div className="h-px bg-white/8 mb-12" />
          <h2 className="font-geist font-black text-xl text-white uppercase mb-8">More Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-50 mb-4">
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 inset-x-0 h-0.5 bg-teal scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
                <span className="font-sans text-[9px] text-teal tracking-widest uppercase font-medium block mb-1">{p.category}</span>
                <h3 className="font-geist font-black text-base text-white uppercase leading-tight group-hover:text-teal transition-colors duration-200">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
