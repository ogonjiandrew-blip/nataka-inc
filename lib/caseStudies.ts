export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  year: string;
  /** Hero + gallery imagery */
  heroImage: string;
  gallery: string[];
  /** One-line summary under the title */
  summary: string;
  /** Quick-facts row */
  facts: { label: string; value: string }[];
  challenge: string;
  approach: string[];
  result: string;
  /** Optional external link (e.g. YouTube) */
  watchUrl?: string;
  watchLabel?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ssaru-fathermoh-kwanini",
    client: "Ssaru x Fathermoh",
    title: "Kwanini",
    metaTitle: "Kwanini — Ssaru x Fathermoh Music Video | Nataka Inc Case Study",
    metaDescription:
      "How Nataka Inc directed and produced the official music video for Ssaru x Fathermoh's 'Kwanini' — the brief, the approach, and the result. Cinematic music video production in Nairobi.",
    category: "Music Video · Direction",
    year: "2026",
    heroImage: "/stills/4/5.jpg",
    gallery: ["/stills/4/1.jpg", "/stills/4/2.jpg", "/stills/4/4.jpg", "/stills/4/6.jpg", "/stills/4/7.jpg"],
    summary:
      "An official music video for two of Kenya's most distinctive voices — built to match the emotional weight of the track and travel as far as the sound.",
    facts: [
      { label: "Client", value: "Ssaru x Fathermoh" },
      { label: "Service", value: "Music Video Production" },
      { label: "Role", value: "Direction · Production · Post" },
      { label: "Location", value: "Nairobi, Kenya" },
      { label: "Year", value: "2026" },
    ],
    challenge:
      "Ssaru and Fathermoh occupy different ends of the Kenyan sound spectrum — her raw, dominant energy against his measured intensity. The challenge was building a single visual world where both artists could exist fully, without either being diminished, and giving the track visuals strong enough to compete on a regional and international level. The brief gave us a feeling, not a storyboard: raw, real, and impossible to scroll past.",
    approach: [
      "Listened to the track until it told us what it wanted to look like — the visual language was discovered in the music, not imposed on it.",
      "Built the concept around the contrast at the heart of the collaboration, using composition and framing to give each artist their own visual identity within one coherent film.",
      "Shot on real Nairobi locations — drawing on the city's natural light and texture rather than manufacturing a look on a stage.",
      "Used deliberate, motivated camera movement and held shots longer than modern instinct allows, trusting the performances to carry the frame.",
      "Graded warm and saturated where the song is intimate, cool and cinematic where it opens up — breaking from the desaturated look that became a cliché in Kenyan music videos.",
    ],
    result:
      "A music video that represents what's possible when Kenyan artists and a Kenyan production team build something without compromise — conceived, shot, and finished entirely in Nairobi, at a standard that sits alongside the best work coming out of London, Lagos, or Johannesburg. It's one of the projects we're most proud of, and a clear statement of where Nataka Inc — and Nairobi's creative scene — is heading.",
    watchUrl: "https://www.youtube.com/watch?v=4oXe4H8vxbI",
    watchLabel: "Watch Kwanini on YouTube",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}
