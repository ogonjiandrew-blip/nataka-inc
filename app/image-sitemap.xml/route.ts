import { galleryImages } from "@/lib/galleryImages";
import { getAllPosts } from "@/lib/posts";
import { getAllServices } from "@/lib/services";
import { projects } from "@/lib/work";

export const dynamic = "force-static";
const site = "https://www.natakainc.com";
const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export function GET() {
  const pages = [
    { url: `${site}/gallery`, images: galleryImages.map((i) => i.src) },
    { url: site, images: Object.values(projects).map((p) => p.poster) },
    ...getAllServices().map((s) => ({ url: `${site}/services/${s.slug}`, images: [s.heroImage, ...(s.caseStudy?.stills.map((i) => i.src) ?? [])] })),
    ...getAllPosts().map((p) => ({ url: `${site}/blog/${p.slug}`, images: [p.coverImage] })),
  ];
  const urls = pages.map((p) => `<url><loc>${escape(p.url)}</loc>${Array.from(new Set(p.images)).map((src) => `<image:image><image:loc>${escape(`${site}${src}`)}</image:loc></image:image>`).join("")}</url>`).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
