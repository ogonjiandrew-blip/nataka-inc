import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Shippori_Mincho } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import Preloader from "@/components/Preloader";
import WhatsAppButton from "@/components/WhatsAppButton";
import Cursor from "@/components/Cursor";
import SoundToggle from "@/components/SoundToggle";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Japanese mincho, used only by the Otamatsuri scroll page. Same face as the
// printed Otamatsuri Vol. 001 scroll, so the page and the poster read as one
// identity.
//
// `subsets` only controls which files get preloaded; next/font self-hosts every
// @font-face Google returns, kanji chunks included. Latin is the only subset
// Google names for this family, and preloading the CJK chunks would be wrong
// anyway: they are unicode-range split, so a visitor downloads just the few
// chunks holding the characters actually on the page.
const shippori = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-jp",
  display: "swap",
});

const siteUrl = "https://www.natakainc.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Marketing & Brand Promotion Agency in Kenya | Nataka Inc",
    template: "%s | Nataka Inc",
  },

  description:
    "Nairobi-based marketing agency for Kenyan brands. Campaign strategy, brand films, social content and creator distribution. Discuss your next campaign with Nataka.",

  // A focused set of core terms. (Google ignores the keywords meta for ranking;
  // real targeting lives in page titles, H1s, content and the service landing pages.)
  keywords: [
    "media and marketing agency Nairobi",
    "video production company Nairobi",
    "video production company Kenya",
    "creative agency Nairobi",
    "music video production Nairobi",
    "brand strategy Kenya",
    "digital marketing agency Nairobi",
    "corporate video production Kenya",
    "social media marketing Kenya",
    "PR agency Kenya",
    "influencer marketing Kenya",
    "Nataka Inc",
  ],

  authors: [{ name: "Nataka Inc", url: siteUrl }],
  creator: "Nataka Inc",
  publisher: "Nataka Inc",

  // NOTE: canonical is intentionally NOT set here. A root-level canonical is
  // inherited by every child route, which previously made every blog post and
  // /work page canonicalise to the homepage (de-indexing them). Each page now
  // declares its own canonical; the homepage's lives in app/page.tsx.

  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    siteName: "Nataka Inc",
    title: "Marketing & Brand Promotion Agency in Kenya | Nataka Inc",
    description:
      "Campaign strategy, cinematic brand films and social content for businesses in Kenya. Plan your next brand campaign with Nataka Inc in Nairobi.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Nataka Inc — Marketing and Brand Promotion, Nairobi, Kenya",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Marketing & Brand Promotion Agency in Kenya | Nataka Inc",
    description:
      "Campaign strategy, cinematic brand films and social content for businesses in Kenya. Discuss your next campaign with Nataka Inc.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@natakainc",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "e223ee2dafac8bcd",
    // Other engines' webmaster tools: set the env var to the code each console gives you.
    ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ? { yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION } : {}),
    other: Object.fromEntries(
      [
        ["msvalidate.01", process.env.NEXT_PUBLIC_BING_VERIFICATION],
        ["naver-site-verification", process.env.NEXT_PUBLIC_NAVER_VERIFICATION],
        ["baidu-site-verification", process.env.NEXT_PUBLIC_BAIDU_VERIFICATION],
        ["seznam-wmt", process.env.NEXT_PUBLIC_SEZNAM_VERIFICATION],
      ].filter((e): e is [string, string] => Boolean(e[1]))
    ),
  },

  category: "business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-KE" className={`${cormorant.variable} ${dmSans.variable} ${GeistSans.variable} ${shippori.variable}`}>
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Geo targeting signals — tells search engines this business is in Kenya */}
        <meta name="geo.region" content="KE-30" />
        <meta name="geo.placename" content="Nairobi, Kenya" />

        {/* Icons are generated by app/icon.tsx (favicon) and app/apple-icon.tsx
            (apple-touch) via Next's file conventions — no manual <link> tags,
            no 404s. */}

        {/* Single canonical entity graph, emitted site-wide so every page's
            Service/VideoObject/BlogPosting @id references resolve to one org.
            One business node (#org) + the WebSite node. No aggregateRating
            (self-serving reviews violate Google policy), no invented types,
            no dead SearchAction. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["Organization", "LocalBusiness"],
                  "@id": `${siteUrl}/#org`,
                  name: "Nataka Inc",
                  alternateName: "Nataka.inc",
                  description:
                    "Nataka Inc is a media and marketing agency in Nairobi, Kenya. Services include brand promotion, brand strategy, digital marketing, brand films, corporate video, social content and creator campaigns for businesses in Kenya.",
                  url: siteUrl,
                  logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png`, width: 512, height: 512 },
                  image: `${siteUrl}/og-image.png`,
                  telephone: "+254117386206",
                  email: "andrew@natakainc.com",
                  knowsAbout: [
                    "brand promotion",
                    "video production",
                    "music video production",
                    "brand strategy",
                    "digital marketing",
                    "public relations",
                    "influencer marketing",
                    "AI video production",
                    "AI commercials",
                    "generative AI video",
                    "visual effects",
                    "AI music videos",
                    "consistent AI characters",
                    "AI advertising compliance in Kenya",
                    "AI content labelling",
                  ],
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Nairobi",
                    addressRegion: "Nairobi County",
                    addressCountry: "KE",
                  },
                  areaServed: [
                    { "@type": "City", name: "Nairobi" },
                    { "@type": "Country", name: "Kenya" },
                  ],
                  openingHoursSpecification: [
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                      opens: "08:00",
                      closes: "18:00",
                    },
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: "Saturday",
                      opens: "09:00",
                      closes: "14:00",
                    },
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+254117386206",
                    email: "andrew@natakainc.com",
                    contactType: "customer service",
                    availableLanguage: ["English", "Swahili"],
                    areaServed: "KE",
                  },
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Media & Marketing Services",
                    itemListElement: [
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Promotion", url: `${siteUrl}/services/brand-promotion-kenya` } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Music Video Production", url: `${siteUrl}/services/music-video-production-nairobi` } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Video Production", url: `${siteUrl}/services/video-production-nairobi` } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Strategy", url: `${siteUrl}/services/brand-strategy-kenya` } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing", url: `${siteUrl}/services/digital-marketing-nairobi` } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Video Production", url: `${siteUrl}/services/ai-video-production-kenya` } },
                    ],
                  },
                  sameAs: [
                    "https://www.google.com/maps/place/Nataka+Inc/data=!4m2!3m1!1s0x0:0x9234940868201192",
                    "https://www.instagram.com/natakainc",
                    "https://www.tiktok.com/@natakainc",
                    "https://www.linkedin.com/company/128374044",
                    "https://www.youtube.com/@nataka_inc",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: "Nataka Inc",
                  description: "Media & Marketing Agency in Nairobi, Kenya",
                  publisher: { "@id": `${siteUrl}/#org` },
                  inLanguage: "en-KE",
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <Preloader />
        <Cursor />
        {children}
        <WhatsAppButton />
        <SoundToggle />
      </body>
    </html>
  );
}
