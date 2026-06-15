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

  keywords: [
    // Primary — what people type into Google
    "media company Kenya",
    "production company Kenya",
    "marketing agency Nairobi",
    "creative agency Nairobi Kenya",
    "video production company Kenya",
    "advertising agency Nairobi",
    "branding agency Kenya",
    "content creation company Kenya",
    "digital marketing agency Nairobi",
    "PR agency Kenya",
    // Secondary
    "brand strategy Kenya",
    "social media marketing Kenya",
    "campaign agency East Africa",
    "influencer marketing Kenya",
    "photography company Nairobi",
    "motion graphics Kenya",
    "creative production house Kenya",
    "media house Nairobi",
    "marketing company Nairobi",
    "film production Kenya",
    // Long-tail
    "best marketing agency in Nairobi",
    "top creative agency Kenya",
    "media and marketing company Nairobi",
    "brand identity design Kenya",
    "corporate video production Nairobi",
    "Nataka inc",
    "Nataka media Kenya",
    // Music video & artist searches
    "music video production Nairobi",
    "music video director Kenya",
    "best music video directors in Kenya",
    "music video shooting Kenya price",
    "gengetone music video production",
    "arbantone music video director",
    "artist branding Kenya",
    // Hiring intent
    "hire video production company Nairobi",
    "video production near me Nairobi",
    "videographer Nairobi",
    "commercial video production Kenya cost",
    "TV advert production Kenya",
    "documentary production company Kenya",
    "event video coverage Nairobi",
    "product video production Kenya",
    // Comparison & question searches
    "how much does a music video cost in Kenya",
    "how much does video production cost in Kenya",
    "best production companies in Nairobi",
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
