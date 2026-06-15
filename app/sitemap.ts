import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllServices } from "@/lib/services";
import { getAllCaseStudies } from "@/lib/caseStudies";

const siteUrl = "https://www.natakainc.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const services = getAllServices();
  const caseStudies = getAllCaseStudies();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...services.map((s) => ({
      url: `${siteUrl}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...caseStudies.map((c) => ({
      url: `${siteUrl}/work/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    {
      url: `${siteUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
