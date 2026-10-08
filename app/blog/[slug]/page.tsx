import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const siteUrl = "https://www.natakainc.com";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  const url = `${siteUrl}/blog/${post.slug}`;
  return {
    // absolute avoids the root template appending a second brand suffix, and
    // metaTitle already carries the brand.
    title: { absolute: `${post.title} | Nataka Inc` },
    description: post.excerpt,
    // Was inheriting the root layout's homepage canonical → post looked like a
    // duplicate of "/" and got de-indexed. Self-canonical fixes it.
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      images: [{ url: `${siteUrl}${post.coverImage}` }],
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${siteUrl}${post.coverImage}`],
    },
  };
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 3);

  const url = `${siteUrl}/blog/${post.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#post`,
        headline: post.title,
        description: post.excerpt,
        image: `${siteUrl}${post.coverImage}`,
        datePublished: post.date,
        dateModified: post.date,
        author: { "@id": `${siteUrl}/#org` },
        publisher: { "@id": `${siteUrl}/#org` },
        mainEntityOfPage: url,
        url,
        articleSection: post.category,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Insights", item: `${siteUrl}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen text-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />

      {/* Cover, framed like every screen on the site */}
      <section className="relative isolate px-2.5 pt-2.5 md:px-4 md:pt-4">
        <div className="relative isolate flex min-h-[72vh] md:min-h-[80vh] flex-col justify-end overflow-hidden rounded-[22px] md:rounded-[32px] ring-1 ring-white/10">
          <Image src={post.coverImage} alt={post.title} fill priority sizes="100vw" quality={88} className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />
          <div className="relative w-full max-w-7xl mx-auto px-5 md:px-12 pt-32 pb-12 md:pb-16">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center font-sans font-medium text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-cream/70">
              <Link href="/blog" className="hover:text-white transition-colors">Insights</Link>
              <span aria-hidden="true" className="mx-3 text-signal">/</span>
              <span>{post.category}</span>
            </nav>
            <h1 className="mt-6 font-heading font-extrabold stretch-semi text-white tracking-[-0.025em] leading-[1.04] text-[clamp(1.9rem,4.4vw,4rem)] max-w-[22ch] [text-wrap:balance]">
              {post.title}
            </h1>
            <p className="mt-6 font-mono text-xs text-cream/60">
              {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              <span className="mx-3 text-cream/30">/</span>
              {post.readTime}
              <span className="mx-3 text-cream/30">/</span>
              Nataka Inc
            </p>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="px-6 md:px-12 pt-16 md:pt-24 pb-20 max-w-3xl mx-auto">
        <p className="font-heading font-medium text-white text-xl md:text-2xl leading-snug tracking-[-0.01em] mb-12">
          {post.excerpt}
        </p>
        <div className="prose-nataka" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="mt-20 rounded-[22px] bg-white/[0.035] ring-1 ring-white/10 p-8 md:p-10">
          <h2 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.02em] leading-[1.02] text-[clamp(1.4rem,2.6vw,2rem)]">
            Planning something like this?
          </h2>
          <p className="mt-4 font-sans text-cream/70 leading-relaxed max-w-[52ch]">
            Send us the goal, the date and a working budget. We reply with the scope that fits.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <Link href="/#contact" className="group btn-primary self-start">
              Start a project
              <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/blog" className="font-heading font-semibold text-sm text-cream/80 underline underline-offset-[6px] decoration-white/25 hover:decoration-white hover:text-white">
              More insights
            </Link>
          </div>
        </div>
      </article>

      {/* Related */}
      {allPosts.length > 0 && (
        <section className="border-t border-white/8">
          <div className="px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto">
            <h2 className="mb-10 font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.02em] leading-[1] text-[clamp(1.5rem,3vw,2.4rem)]">
              More insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12">
              {allPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] ring-1 ring-white/10 bg-ink-50 transition-[box-shadow] duration-500 group-hover:ring-signal/50">
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={80}
                      className="object-cover scale-[1.02] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                    />
                  </div>
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">{p.category}</p>
                  <h3 className="mt-2 font-heading font-bold text-lg text-white tracking-tight leading-snug">{p.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
