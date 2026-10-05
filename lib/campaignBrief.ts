export const campaignGoals = [
  {
    id: "launch", label: "Launch a product or service", service: "product-launch-video-kenya",
    focus: "Give the launch one clear message and one next step for the customer.",
    checklist: ["Confirm the product, offer and launch date.", "Choose the launch film, cutdowns and stills you need.", "Separate production costs from distribution and media spend.", "Agree who approves the work and how launch enquiries will be handled."],
    measure: "Choose a primary measure such as qualified enquiries, bookings or sales. Decide who will record it.",
  },
  {
    id: "promotion", label: "Promote our brand", service: "brand-promotion-kenya",
    focus: "Start with the audience you need to reach and the reason they should care.",
    checklist: ["Name one priority audience and the problem you solve for them.", "Choose the message, proof and customer call to action.", "List the film, social and creator assets the campaign needs.", "Agree the rollout channels, approvals and reporting before production."],
    measure: "Define what a useful response looks like, then track qualified conversations separately from views.",
  },
  {
    id: "social", label: "Improve our social content", service: "social-media-marketing-kenya",
    focus: "Build content around the questions your customers ask before buying.",
    checklist: ["Identify the platforms your customers actually use.", "Bring examples of existing content and recurring buyer questions.", "Agree the shoot schedule, formats and monthly deliverables.", "Assign someone to handle comments and incoming enquiries."],
    measure: "Track useful enquiries and sales alongside reach, saves and watch time. Each measures a different part of the journey.",
  },
  {
    id: "film", label: "Create a brand or corporate film", service: "corporate-video-production-kenya",
    focus: "Decide what the viewer needs to understand or do after watching.",
    checklist: ["Name the audience and the main message.", "Confirm interviewees, locations and access requirements.", "List the master film, cutdowns, subtitles and aspect ratios.", "Agree usage rights, approval stages and revision rounds."],
    measure: "Match the measure to the film's use: a sales conversation, an event, recruitment or a website visit.",
  },
] as const;

export type BriefInput = {
  company: string; goal: string; audience: string; timing: string; budget: string; notes: string;
};

export function getCampaignGoal(id: string) {
  return campaignGoals.find((goal) => goal.id === id) ?? campaignGoals[1];
}

export function buildCampaignBrief(input: BriefInput): string {
  const goal = getCampaignGoal(input.goal);
  const value = (text: string, limit: number) => text.trim().slice(0, limit) || "To discuss";
  return [
    "Hi Nataka, I'd like to discuss this campaign.", "",
    `Company: ${value(input.company, 100)}`,
    `Goal: ${goal.label}`,
    `Audience: ${value(input.audience, 180)}`,
    `Target date: ${value(input.timing, 100)}`,
    `Working budget: ${value(input.budget, 100)}`,
    `More about the project: ${value(input.notes, 600)}`,
    "", "Planning checklist:", ...goal.checklist.map((item) => `- ${item}`),
    "", `Measurement: ${goal.measure}`, "",
    "Prepared with https://www.natakainc.com/campaign-brief",
  ].join("\n");
}
