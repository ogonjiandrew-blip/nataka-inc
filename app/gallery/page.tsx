import type { Metadata } from "next";
import GalleryClient from "@/components/GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | Nataka Inc — Film & Music Video Production Nairobi",
  description:
    "Explore Nataka Inc's work in an immersive 3D gallery — music videos, films and campaigns produced in Nairobi, Kenya. Drag to look around, click a card to open a project.",
  alternates: { canonical: "https://www.natakainc.com/gallery" },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
