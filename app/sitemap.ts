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
      url: `${siteUrl}/ai-standard`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/campaign-brief`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...services.map((s) => ({
      url: `${siteUrl}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...caseStudies.map((c) => ({
      url: `${siteUrl}/work/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    {
      url: `${siteUrl}/otamatsuri-2026`,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/community`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/community/otamatsuri-cosplay-nairobi`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/kwave`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/live`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/gallery`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
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
