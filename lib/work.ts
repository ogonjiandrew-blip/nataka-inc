/**
 * Nataka's published work, in one place. The homepage grid and the
 * "Selected work" strip on every service page pick projects from here by id,
 * so a poster, a preview loop or a credit only ever changes once.
 */
export type Project = {
  id: string;
  title: string;
  meta: string;
  poster: string;
  alt: string;
  /** Short muted loop that plays while the pointer is over the tile. */
  preview?: string;
  /** Stills that cycle on hover when there is no motion preview. */
  gallery?: string[];
  /** Full film with sound, opened in the player. */
  film?: string;
  /** Case-study page, or the original post when the film lives on a creator's account. */
  href?: string;
};

export const projects: Record<string, Project> = {
  "gun-vs-sword": {
    id: "gun-vs-sword",
    title: "Gun vs Sword 2",
    meta: "Fight film for @dance10fikshun, 3M followers. VFX by Andrew Ogonji",
    poster: "/videos/gun-vs-sword-poster.jpg",
    alt: "Gun vs Sword 2, a sword and gunfire fight film with VFX by Andrew Ogonji of Nataka Inc",
    preview: "/videos/previews/gun-vs-sword.mp4",
    href: "https://www.instagram.com/p/DePV0_QCLEM/",
  },
  "za-mabuda": {
    id: "za-mabuda",
    title: "Za Mabuda",
    meta: "Vijana Barubaru ft. Scar Mkadinali. Period film, directed by Andrew Ogonji",
    poster: "/videos/za-mabuda-still.jpg",
    alt: "Za Mabuda: two men in flat caps stand in front of an explosion",
    preview: "/videos/previews/za-mabuda.mp4",
    film: "/videos/za-mabuda.mp4",
  },
  sarit: {
    id: "sarit",
    title: "Your City",
    meta: "Sarit Centre. Brand commercial",
    poster: "/videos/sarit-poster-clean.jpg",
    alt: "Sarit Centre commercial: friends dancing in a bowling alley",
    preview: "/videos/previews/sarit-v2.mp4",
    film: "/videos/sarit.mp4",
  },
  kwanini: {
    id: "kwanini",
    title: "Kwanini",
    meta: "Ssaru x Fathermoh. Music video",
    poster: "/stills/4/p5.jpg",
    alt: "Still from the Kwanini music video directed by Nataka Inc",
    gallery: ["/stills/4/p5.jpg", "/stills/4/p1.jpg", "/stills/4/p4.jpg"],
    href: "/work/ssaru-fathermoh-kwanini",
  },
  teslah: {
    id: "teslah",
    title: "Teslah",
    meta: "Studio music video",
    poster: "/stills/teslah/web-6.jpg",
    alt: "Teslah music video still: the artist in a pale blue studio",
    gallery: ["/stills/teslah/web-6.jpg", "/stills/teslah/web-5.jpg", "/stills/teslah/web-1.jpg", "/stills/teslah/web-4.jpg"],
    href: "/work/teslah-music-video",
  },
  "save-her": {
    id: "save-her",
    title: "Save Her",
    meta: "Music video. Direction and post",
    poster: "/videos/save-her-poster.jpg",
    alt: "Save Her: extreme close-up of a woman's eyes in warm light",
    preview: "/videos/previews/save-her.mp4",
    film: "/videos/save-her.mp4",
  },
  "cool-in-school": {
    id: "cool-in-school",
    title: "Cool in School",
    meta: "Music video. Direction and post",
    poster: "/videos/cool-in-school-poster.jpg",
    alt: "Cool in School music video: friends laughing in sunglasses",
    preview: "/videos/previews/cool-in-school.mp4",
    film: "/videos/cool-in-school.mp4",
  },
  otamatsuri: {
    id: "otamatsuri",
    title: "Otamatsuri",
    meta: "Festival promo film. Direction and production",
    poster: "/stills/otamatsuri/web-cover.jpg",
    alt: "Otamatsuri promo film still by Nataka Inc, shot on location in Kenya",
    gallery: ["/stills/otamatsuri/web-cover.jpg", "/stills/otamatsuri/web-1.jpg", "/stills/otamatsuri/web-2.jpg", "/stills/otamatsuri/web-8.jpg"],
    href: "/work/otamatsuri-promo-film",
  },
  aanother: {
    id: "aanother",
    title: "AANOTHER",
    meta: "An AI rock band and three music videos. Every frame made with AI",
    poster: "/ai/aanother/aanother-feature-poster.jpg",
    alt: "AANOTHER, the AI band made by Nataka Inc, on stage",
    preview: "/videos/previews/aanother.mp4",
    href: "/services/ai-video-production-kenya#case-study",
  },
};

export function getProjects(ids: string[]): Project[] {
  return ids.map((id) => projects[id]).filter((p): p is Project => Boolean(p));
}
