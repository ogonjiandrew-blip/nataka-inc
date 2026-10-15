import type { Metadata } from "next";
import GalleryExperience from "@/components/GalleryExperience";
import GalleryGrid from "@/components/GalleryGrid";

const siteUrl = "https://www.natakainc.com";

export const metadata: Metadata = {
  title: { absolute: "Nataka Inc Photos, Films & Campaign Stills | Kenya" },
  description:
    "Nataka Inc in pictures: automotive campaign images, films, music videos and labelled AI studio visuals. Browse captioned stills from our Nairobi portfolio.",
  alternates: { canonical: `${siteUrl}/gallery` },
  openGraph: {
    title: "Gallery | Nataka Inc, Nairobi Media and Marketing",
    description: "Music videos, films, campaigns and studio stills produced in Nairobi, Kenya.",
    url: `${siteUrl}/gallery`,
    type: "website",
    images: [{ url: `${siteUrl}/stills/maxus/d90-golden.jpg`, alt: "MAXUS D90 campaign still from the Nataka Inc portfolio" }],
  },
};

export default function GalleryPage() {
  return (
    <GalleryExperience>
      <GalleryGrid />
    </GalleryExperience>
  );
}
