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
    line: "Strategy, content, paid campaigns and enquiry journeys for companies in Kenya.",
    href: "/services/digital-marketing-nairobi",
    image: "/stills/teslah/2.jpg",
    alt: "Studio portrait from a Nataka Inc music video shoot",
  },
  {
    title: "Social media marketing",
    line: "Monthly shoot days, short videos and a content calendar. Content from KES 150K a month.",
    href: "/services/social-media-marketing-kenya",
    image: "/stills/maxus/t60-highway.jpg",
    alt: "MAXUS T60 campaign still from Nataka Inc's automotive films and social content",
  },
  {
    title: "Brand strategy",
    line: "Positioning, identity and messaging, so every ad says the same thing.",
    href: "/services/brand-strategy-kenya",
    image: "/stills/fashion/6.jpg",
    alt: "Fashion editorial portrait by Nataka Inc",
  },
];

/** Homepage service paths, as a typographic index. */
export default function Services() {
  return (
    <ServiceIndex
      id="services"
      title="What we make"
      note="Campaigns, production and marketing from one team. Start with the work your company needs."
      items={services}
    />
  );
}
