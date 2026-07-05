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
  {
    slug: "teslah-music-video",
    client: "Teslah",
    title: "Teslah",
    metaTitle: "Teslah Music Video — Nataka Inc Case Study",
    metaDescription:
      "Nataka Inc directed and produced the Teslah music video — a studio-built visual world shot in Nairobi. Cinematic music video production in Kenya.",
    category: "Music Video · Direction",
    year: "2026",
    heroImage: "/stills/teslah/cover.jpg",
    gallery: ["/stills/teslah/1.jpg", "/stills/teslah/6.jpg", "/stills/teslah/4.jpg", "/stills/teslah/2.jpg", "/stills/teslah/7.jpg", "/stills/teslah/9.jpg"],
    summary:
      "A studio-built music video for Teslah — a controlled, high-contrast visual world engineered frame by frame, from clean performance to a darker narrative undercurrent.",
    facts: [
      { label: "Client", value: "Teslah" },
      { label: "Service", value: "Music Video Production" },
      { label: "Role", value: "Direction · Production" },
      { label: "Location", value: "Nairobi, Kenya" },
      { label: "Year", value: "2026" },
    ],
    challenge:
      "Make a music video that lives or dies on craft rather than budget spectacle — a controlled studio environment that still feels cinematic, gives the artist a commanding stage, and carries a narrative charge without leaning on location or scale.",
    approach: [
      "Designed the whole film around a studio cyclorama and hard, motivated lighting — treating colour and shadow as the set, so every frame reads deliberate rather than incidental.",
      "Directed the performance for presence: full-body confidence, tight close-ups, and framing that makes the artist the undisputed centre of the world.",
      "Threaded a darker, surreal narrative undercurrent through the performance beats — imagery that gives the video something to say beyond the song.",
      "Graded for contrast and mood — deep blues against clean skin tones — to hold a consistent, ownable look from first frame to last.",
    ],
    result:
      "A film Nataka directed and produced end to end in Nairobi, built to sit alongside international music video work. Ahead of release — get in touch to see the full cut.",
  },
  {
    slug: "otamatsuri-promo-film",
    client: "Otamatsuri",
    title: "Otamatsuri",
    metaTitle: "Otamatsuri Promo Film — Nataka Inc Case Study",
    metaDescription:
      "Nataka Inc directed and produced Otamatsuri — a cinematic, anime-inspired promo film shot on location in Kenya. Story-driven promo production in Nairobi.",
    category: "Promo Film · Direction",
    year: "2026",
    heroImage: "/stills/otamatsuri/cover.jpg",
    gallery: ["/stills/otamatsuri/1.jpg", "/stills/otamatsuri/4.jpg", "/stills/otamatsuri/3.jpg", "/stills/otamatsuri/2.jpg", "/stills/otamatsuri/6.jpg", "/stills/otamatsuri/8.jpg"],
    summary:
      "A cinematic promo film that brings an anime-inspired world to life on Kenyan locations — costume, character and sweeping golden-hour frames built into a story-driven piece.",
    facts: [
      { label: "Client", value: "Otamatsuri" },
      { label: "Service", value: "Promo Film Production" },
      { label: "Role", value: "Direction · Production" },
      { label: "Location", value: "Kenya" },
      { label: "Year", value: "2026" },
    ],
    challenge:
      "Translate a beloved anime aesthetic into live action without it feeling like cosplay — real costume and character work, real locations, and a cinematic grade that earns the fantasy rather than winking at it.",
    approach: [
      "Built the world on real Kenyan locations — lakeside, open country, golden-hour light — grounding a fantastical concept in a tangible, filmable place.",
      "Committed fully to costume, character and prop detail so the world reads as designed, not improvised.",
      "Shot for scale and silhouette — sweeping hero frames and backlit sunset compositions that give the piece its poster moments.",
      "Graded warm and filmic to bind the whole promo into one cohesive, cinematic look.",
    ],
    result:
      "A bold promo film Nataka directed and produced from concept to final cut — proof the studio can build a fully realised cinematic world in Kenya. Ahead of release.",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}
