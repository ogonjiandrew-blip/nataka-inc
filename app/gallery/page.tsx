import type { Metadata } from "next";
import GalleryExperience from "@/components/GalleryExperience";
import GalleryGrid from "@/components/GalleryGrid";

const siteUrl = "https://www.natakainc.com";

export const metadata: Metadata = {
  title: "Gallery | Nataka Inc — Film & Music Video Production Nairobi",
  description:
    "Explore Nataka Inc's work — music videos, films, campaigns and studio stills produced in Nairobi, Kenya. Switch between the immersive 3D gallery and a full grid view.",
  alternates: { canonical: `${siteUrl}/gallery` },
  openGraph: {
    title: "Gallery | Nataka Inc — Nairobi Media & Marketing",
    description: "Music videos, films, campaigns and studio stills produced in Nairobi, Kenya.",
    url: `${siteUrl}/gallery`,
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <GalleryExperience>
      <GalleryGrid />
    </GalleryExperience>
  );
}
