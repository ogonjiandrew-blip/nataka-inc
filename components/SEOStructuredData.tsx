/**
 * SEO Structured Data (JSON-LD)
 *
 * Implements:
 *  - LocalBusiness  → shows Nataka in Google Maps / local search results
 *  - Organization   → brand knowledge panel
 *  - WebSite        → enables the search box inside Google results
 *  - VideoObject ×2 → registers showreels with Google Video search
 *  - FAQPage        → earns "People also ask" boxes in Google
 *  - BreadcrumbList → breadcrumb trail in search results
 */

const siteUrl = "https://www.natakainc.com";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MarketingAgency", "VideoProductionCompany"],
  "@id": `${siteUrl}/#business`,
  name: "Nataka Inc",
  alternateName: ["Nataka.inc", "Nataka Media", "Nataka Marketing Kenya"],
  description:
    "Nataka Inc is a leading media and marketing agency based in Nairobi, Kenya, offering brand strategy, video production, digital marketing, creative production, and PR & communications services to brands across East Africa.",
  url: siteUrl,
  email: "niajekoki@gmail.com",
  telephone: "+254725107294",
  foundingDate: "2020",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 5, maxValue: 30 },

  address: {
    "@type": "PostalAddress",
    streetAddress: "Westlands",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    addressCountry: "KE",
    postalCode: "00100",
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: -1.2921,
    longitude: 36.8219,
  },

  areaServed: [
    { "@type": "Country", name: "Kenya" },
    { "@type": "Country", name: "Uganda" },
    { "@type": "Country", name: "Tanzania" },
    { "@type": "Country", name: "Rwanda" },
    { "@type": "AdministrativeArea", name: "East Africa" },
  ],

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],

  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Media & Marketing Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Brand Strategy",
          description:
            "Brand identity, positioning, messaging frameworks and brand architecture for businesses in Kenya and East Africa.",
          provider: { "@id": `${siteUrl}/#business` },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Video Production",
          description:
            "Cinematic video production, music videos, corporate films, and creative content for brands and artists in Kenya.",
          provider: { "@id": `${siteUrl}/#business` },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Digital Marketing",
          description:
            "Social media management, SEO, paid advertising, and content strategy for businesses in Nairobi and Kenya.",
          provider: { "@id": `${siteUrl}/#business` },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "PR & Communications",
          description:
            "Public relations, media outreach, influencer marketing, and event campaigns for brands in East Africa.",
          provider: { "@id": `${siteUrl}/#business` },
        },
      },
    ],
  },

  sameAs: [
    "https://www.instagram.com/natakainc",
    "https://www.tiktok.com/@natakainc",
    "https://www.linkedin.com/company/128374044",
    "https://www.youtube.com/@natakainc",
  ],

  keywords:
    "media company Kenya, production company Kenya, marketing agency Nairobi, creative agency Kenya, video production Kenya, music video production Nairobi, digital marketing Nairobi, brand strategy Kenya, PR agency Kenya",

  image: `${siteUrl}/og-image.jpg`,
  logo: { "@type": "ImageObject", url: `${siteUrl}/og-image.jpg` },

  priceRange: "KES KES KES",
  currenciesAccepted: "KES",
  paymentAccepted: "Cash, Bank Transfer, M-Pesa",
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#org`,
  name: "Nataka Inc",
  url: siteUrl,
  logo: { "@type": "ImageObject", url: `${siteUrl}/og-image.jpg` },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+254725107294",
    email: "niajekoki@gmail.com",
    contactType: "customer service",
    availableLanguage: ["English", "Swahili"],
    areaServed: "KE",
  },
  sameAs: [
    "https://www.instagram.com/natakainc",
    "https://www.tiktok.com/@natakainc",
    "https://www.linkedin.com/company/128374044",
    "https://www.youtube.com/@natakainc",
  ],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Nataka Inc",
  description: "Media & Marketing Agency in Nairobi, Kenya",
  publisher: { "@id": `${siteUrl}/#org` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

// VideoObject — registers our showreels with Google Video Search
const videoShowreel = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Nataka Inc — Creative Showreel 2026",
  description:
    "Nataka Inc's 2026 creative showreel. A showcase of our music video, film, brand campaign, and commercial production work across Kenya and East Africa. Based in Nairobi.",
  thumbnailUrl: `${siteUrl}/stills/1/1.jpg`,
  uploadDate: "2026-01-01T00:00:00+03:00",
  duration: "PT2M",
  contentUrl: "https://player.vimeo.com/video/1198466430",
  embedUrl: "https://player.vimeo.com/video/1198466430",
  publisher: {
    "@type": "Organization",
    name: "Nataka Inc",
    logo: { "@type": "ImageObject", url: `${siteUrl}/og-image.jpg` },
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
  thumbnailUrl: `${siteUrl}/stills/1/3.jpg`,
  uploadDate: "2026-01-01T00:00:00+03:00",
  duration: "PT2M",
  contentUrl: "https://player.vimeo.com/video/1198467290",
  embedUrl: "https://player.vimeo.com/video/1198467290",
  publisher: {
    "@type": "Organization",
    name: "Nataka Inc",
    logo: { "@type": "ImageObject", url: `${siteUrl}/og-image.jpg` },
  },
  author: { "@id": `${siteUrl}/#org` },
  keywords:
    "Nataka Inc reel, film production Nairobi, video production Kenya, brand film Kenya, cinematic production Nairobi",
};

// FAQ schema lives in FAQ.tsx alongside the visible content — keeping it there prevents duplicates

// Breadcrumb — hash anchors removed, only valid full-page URLs
const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Insights", item: `${siteUrl}/blog` },
  ],
};

export default function SEOStructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoShowreel) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoReel2) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
