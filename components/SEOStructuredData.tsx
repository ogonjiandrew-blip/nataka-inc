/**
 * Homepage-only VideoObject structured data (the two showreels).
 *
 * The business entity (Organization/LocalBusiness #org) and the WebSite node
 * are emitted site-wide from app/layout.tsx as a single @graph, so they are NOT
 * repeated here. This file used to also emit duplicate #business / #org
 * entities, a homepage BreadcrumbList, and a dead SearchAction — all removed.
 * VideoObjects reference the canonical org via @id.
 */

const siteUrl = "https://www.natakainc.com";

// VideoObject — registers our showreels with Google Video Search.
// contentUrl is intentionally omitted: a Vimeo player URL is not the video's
// media file, and Google accepts embedUrl as the alternative.
const videoShowreel = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Nataka Inc — Creative Showreel 2026",
  description:
    "Nataka Inc's 2026 creative showreel. A showcase of our music video, film, brand campaign, and commercial production work across Kenya and East Africa. Based in Nairobi.",
  thumbnailUrl: `${siteUrl}/stills/1/1.jpg`,
  uploadDate: "2026-01-01T00:00:00+03:00",
  duration: "PT2M",
  embedUrl: "https://player.vimeo.com/video/1198466430",
  publisher: {
    "@type": "Organization",
    name: "Nataka Inc",
    logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
  },
  author: { "@id": `${siteUrl}/#org` },
  keywords:
    "Nataka Inc showreel, video production Kenya, music video Nairobi, film production Kenya, creative agency Nairobi",
};

const videoReel2 = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Nataka Inc — Film & Production Reel 2026",
  description:
    "Nataka Inc's film and production reel showcasing cinematic work, music videos, and brand films produced in Nairobi, Kenya. Directed and produced by Nataka Inc.",
  // was /stills/1/3.jpg (404) — point at an existing still
  thumbnailUrl: `${siteUrl}/stills/1/2.jpg`,
  uploadDate: "2026-01-01T00:00:00+03:00",
  duration: "PT2M",
  embedUrl: "https://player.vimeo.com/video/1198467290",
  publisher: {
    "@type": "Organization",
    name: "Nataka Inc",
    logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
  },
  author: { "@id": `${siteUrl}/#org` },
  keywords:
    "Nataka Inc reel, film production Nairobi, video production Kenya, brand film Kenya, cinematic production Nairobi",
};

export default function SEOStructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoShowreel) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoReel2) }}
      />
    </>
  );
}
