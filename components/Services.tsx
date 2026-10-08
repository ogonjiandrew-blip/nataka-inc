import ServiceIndex, { type ServiceItem } from "@/components/ServiceIndex";

const services: ServiceItem[] = [
  {
    title: "AI video",
    line: "AI commercials, music videos and brand characters, directed shot by shot.",
    href: "/services/ai-video-production-kenya",
    image: "/ai/aanother/frontman.jpg",
    alt: "AANOTHER frontman on stage, an AI band made by Nataka Inc",
  },
  {
    title: "Film & commercials",
    line: "Brand films, TV and online commercials, shot by our own crew.",
    href: "/services/video-production-nairobi",
    image: "/stills/1/46.jpg",
    alt: "Film still by Nataka Inc: a man in a hat against a bright sky",
  },
  {
    title: "Music videos",
    line: "Concept, shoot and edit for artists, plus the cut-downs for release week.",
    href: "/services/music-video-production-nairobi",
    image: "/stills/4/p5.jpg",
    alt: "Still from the Kwanini music video directed by Nataka Inc",
  },
  {
    title: "Launch campaigns",
    line: "The idea, the hero film, the social cutdowns and the rollout plan.",
    href: "/services/brand-promotion-kenya",
    image: "/videos/sarit-poster-clean.jpg",
    alt: "Frame from the Sarit Centre commercial by Nataka Inc",
  },
  {
    title: "Digital marketing",
    line: "Paid social, search and content plans built around enquiries, not likes.",
    href: "/services/digital-marketing-nairobi",
    image: "/stills/teslah/2.jpg",
    alt: "Studio portrait from a Nataka Inc music video shoot",
  },
  {
    title: "Brand strategy",
    line: "Positioning, identity and messaging, so every ad says the same thing.",
    href: "/services/brand-strategy-kenya",
    image: "/stills/fashion/6.jpg",
    alt: "Fashion editorial portrait by Nataka Inc",
  },
];

/** Homepage services: the six most-asked-for, as a typographic index. */
export default function Services() {
  return (
    <ServiceIndex
      id="services"
      title="What we make"
      note="Six services, one team. Most clients start with one and add the rest once it works."
      items={services}
    />
  );
}
