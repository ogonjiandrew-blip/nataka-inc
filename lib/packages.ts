/**
 * Nataka's packages and starting ranges. One source for the homepage
 * engagements list and the full /work-with-us page, so a price changes in
 * one place.
 */
export type Package = {
  name: string;
  short: string;
  who: string;
  range: string;
  includes: string[];
  cta: string;
  wa: string;
};

export const packages: Package[] = [
  {
    name: "Launch Campaign Package",
    short: "Launch campaign",
    who: "Brands launching a product, store, service, event or new campaign.",
    range: "KES 500K-2M+",
    includes: ["Campaign concept", "Hero video", "Short-form cutdowns", "Photo assets", "Distribution plan", "Optional influencer push"],
    cta: "Plan My Launch",
    wa: "Hi Nataka! I want the Launch Campaign Package. What I'm launching: ",
  },
  {
    name: "Social Content Engine",
    short: "Monthly social content",
    who: "Brands that need consistent, high-quality monthly content.",
    range: "KES 150K-700K / month",
    includes: ["Monthly shoot day", "8-20 short videos", "Captions & content direction", "Content calendar", "Performance review"],
    cta: "Build My Content Engine",
    wa: "Hi Nataka! I want the Social Content Engine. My brand is: ",
  },
  {
    name: "Premium Brand Film",
    short: "Brand film",
    who: "Companies that need credibility, trust and a polished public image.",
    range: "KES 300K-1.5M+",
    includes: ["Concept development", "Cinematic production", "Interviews / story structure", "Brand messaging", "Master film + cutdowns"],
    cta: "Create My Brand Film",
    wa: "Hi Nataka! I want a Premium Brand Film. My company is: ",
  },
  {
    name: "Music Video / Artist Campaign",
    short: "Music video",
    who: "Artists who need high-quality visuals and rollout content.",
    range: "KES 150K-1M+",
    includes: ["Concept & direction", "Shoot", "Music video", "Teaser edits", "Social rollout assets"],
    cta: "Plan My Music Video",
    wa: "Hi Nataka! I want the Music Video / Artist Campaign. My artist name and the track: ",
  },
  {
    name: "Event Content Package",
    short: "Event content",
    who: "Events that need promotion before, during and after.",
    range: "KES 100K-700K+",
    includes: ["Promo video", "Event coverage", "Highlight film", "Sponsor clips", "Social recap edits"],
    cta: "Promote My Event",
    wa: "Hi Nataka! I want the Event Content Package. The event and date: ",
  },
];

export const standard = [
  {
    title: "Agreed revisions",
    desc: "Before production, we agree the brief, deliverables and revision process in your scope of work.",
  },
  {
    title: "A locked delivery date",
    desc: "Every engagement gets a delivery date in writing before we shoot.",
  },
  {
    title: "The director answers",
    desc: "No account-manager wall. The person who directed your work is the person on your WhatsApp.",
  },
];
