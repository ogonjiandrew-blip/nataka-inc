import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import Preloader from "@/components/Preloader";
import WhatsAppButton from "@/components/WhatsAppButton";
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

const siteUrl = "https://www.natakainc.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Nataka.inc | Media & Marketing Agency in Nairobi, Kenya",
    template: "%s | Nataka.inc — Nairobi Media & Marketing",
  },

  description:
    "Nataka.inc is a top-rated media and marketing agency in Nairobi, Kenya. We offer video production, brand strategy, digital marketing, creative production, and PR for brands across East Africa. Trusted by 80+ brands.",

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

  // Tells Google this is for Kenya and English
  alternates: {
    canonical: siteUrl,
    languages: { "en-KE": siteUrl },
  },

  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    siteName: "Nataka Inc",
    title: "Nataka.inc | Media & Marketing Agency in Nairobi, Kenya",
    description:
      "Award-winning media and marketing agency based in Nairobi, Kenya. Video production, brand strategy, digital campaigns, and PR for brands that refuse to be ignored.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Nataka.inc — Media & Marketing Agency, Nairobi Kenya",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nataka.inc | Media & Marketing Agency in Nairobi, Kenya",
    description:
      "Nairobi's leading media and marketing agency. Video production, brand strategy, digital marketing & PR.",
    images: [`${siteUrl}/og-image.jpg`],
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
  },

  category: "business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-KE" className={`${cormorant.variable} ${dmSans.variable} ${GeistSans.variable}`}>
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Geo targeting signals — tells search engines this business is in Kenya */}
        <meta name="geo.region" content="KE-30" />
        <meta name="geo.placename" content="Nairobi, Kenya" />
        <meta name="geo.position" content="-1.2921;36.8219" />
        <meta name="ICBM" content="-1.2921, 36.8219" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Organisation + LocalBusiness schema — tells Google exactly who Nataka is */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "ProfessionalService"],
              "@id": "https://www.natakainc.com/#organization",
              name: "Nataka Inc",
              alternateName: "Nataka.inc",
              description:
                "Nairobi-based video production and creative agency specialising in music videos, brand films, commercial production, and digital marketing for artists and brands across East Africa.",
              url: "https://www.natakainc.com",
              telephone: "+254725107294",
              email: "andrew@natakainc.com",
              foundingDate: "2020",
              areaServed: [
                { "@type": "City", name: "Nairobi" },
                { "@type": "Country", name: "Kenya" },
                { "@type": "Place", name: "East Africa" },
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nairobi",
                addressCountry: "KE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -1.2921,
                longitude: 36.8219,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                  opens: "08:00",
                  closes: "20:00",
                },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Video Production & Creative Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Music Video Production", url: "https://www.natakainc.com/services/music-video-production-nairobi" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Video Production", url: "https://www.natakainc.com/services/video-production-nairobi" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Strategy", url: "https://www.natakainc.com/services/brand-strategy-kenya" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing", url: "https://www.natakainc.com/services/digital-marketing-nairobi" } },
                ],
              },
              sameAs: [
                "https://www.instagram.com/natakainc",
                "https://www.tiktok.com/@natakainc",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "32",
                bestRating: "5",
              },
            }),
          }}
        />
      </head>
      <body>
        <Preloader />
        {children}
        <WhatsAppButton />
        <SoundToggle />
      </body>
    </html>
  );
}
