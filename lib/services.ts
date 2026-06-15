export type ServicePage = {
  slug: string;
  /** Keyword-rich page title for <title> tag */
  metaTitle: string;
  metaDescription: string;
  /** Short label, e.g. "Video Production" */
  label: string;
  /** Big hero headline */
  headline: string;
  headlineAccent: string;
  heroImage: string;
  intro: string;
  /** What's included */
  deliverables: { title: string; description: string }[];
  /** Why Nataka for this service */
  whyUs: string[];
  /** Process steps */
  process: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  /** Related blog slugs */
  relatedPosts: string[];
  keywords: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "video-production-nairobi",
    metaTitle: "Video Production Company in Nairobi, Kenya | Nataka Inc",
    metaDescription:
      "Nataka Inc is a leading video production company in Nairobi, Kenya. Cinematic brand films, commercials, corporate videos and campaign content for brands across East Africa. Get a quote today.",
    label: "Video Production",
    headline: "Video Production",
    headlineAccent: "In Nairobi.",
    heroImage: "/stills/1/1.jpg",
    intro:
      "Nataka Inc is a full-service video production company based in Nairobi, Kenya. We produce cinematic brand films, television commercials, corporate videos, and campaign content for brands that refuse to be ignored. From concept development to final delivery, every frame is crafted with intention — by a Kenyan team that meets global standards.",
    deliverables: [
      { title: "Brand Films", description: "90-second to 3-minute cinematic films that tell your brand's story — for your website, pitches, social media, and events." },
      { title: "TV & Digital Commercials", description: "Broadcast-quality commercial production for television, YouTube, and paid social campaigns across Kenya and East Africa." },
      { title: "Corporate Video", description: "Company culture films, product launches, executive interviews, and internal communications — produced at a standard that reflects your business." },
      { title: "Event Coverage", description: "Multi-camera coverage of launches, conferences, and activations — turned into content that extends the life of your event." },
      { title: "Social Content Series", description: "Short-form video built for TikTok, Instagram Reels, and YouTube Shorts — high frequency, platform-native, on brand." },
    ],
    whyUs: [
      "End-to-end production under one roof — concept, scripting, shooting, editing, colour grade, sound mix, and delivery.",
      "Cinema-grade equipment and a crew that has produced work for major brands including Nike.",
      "Deep knowledge of Nairobi's best locations, light, and logistics — we shoot faster and better because we know this city.",
      "Honest budgets. We tell you what's achievable at your budget and make every shilling visible on screen.",
    ],
    process: [
      { step: "01", title: "Discovery", description: "We learn your brand, your audience, and what this video needs to achieve." },
      { step: "02", title: "Concept & Script", description: "Creative concepts, scripts, and storyboards — presented for your approval before any camera rolls." },
      { step: "03", title: "Production", description: "Shoot days planned to the minute. Director, DP, lighting, sound, art direction — full crew, no compromises." },
      { step: "04", title: "Post-Production", description: "Edit, colour grade, sound design, and motion graphics. Review rounds included until it's right." },
      { step: "05", title: "Delivery", description: "Final files in every format you need — TV, YouTube, Instagram, TikTok, your website." },
    ],
    faqs: [
      { question: "How much does video production cost in Nairobi?", answer: "Video production in Nairobi ranges from around Ksh 80,000 for a simple corporate video to Ksh 2,000,000+ for a full cinematic campaign. The main cost drivers are shoot days, crew size, locations, and post-production complexity. Contact us for a tailored quote." },
      { question: "How long does a video production project take?", answer: "A typical brand film takes 3–6 weeks from brief to delivery: one week for concept and pre-production, one to two shoot days, and two to three weeks of post-production. Rush deliveries are possible." },
      { question: "Do you handle everything or do we need to hire other vendors?", answer: "Everything is in-house at Nataka Inc — concept, script, casting, locations, filming, editing, colour grading, sound, and delivery. One team, one point of contact." },
    ],
    relatedPosts: [
      "best-video-production-companies-nairobi-kenya",
      "why-nairobi-brands-need-video-marketing-2026",
    ],
    keywords: [
      "video production company Nairobi",
      "video production Kenya",
      "corporate video production Nairobi",
      "TV commercial production Kenya",
      "brand film Kenya",
    ],
  },
  {
    slug: "music-video-production-nairobi",
    metaTitle: "Music Video Production in Nairobi, Kenya | Nataka Inc",
    metaDescription:
      "Nataka Inc directs and produces music videos for Kenya's top artists including Ssaru and Fathermoh. Cinematic music video production in Nairobi — concept to final cut. Book your shoot.",
    label: "Music Video Production",
    headline: "Music Videos",
    headlineAccent: "That Travel.",
    heroImage: "/stills/4/1.jpg",
    intro:
      "Nataka Inc is one of Nairobi's leading music video production companies. We've directed videos for artists including Ssaru and Fathermoh — work that matches the ambition of the music. From concept development and creative direction to filming and post-production, we build visual worlds around your sound.",
    deliverables: [
      { title: "Creative Direction", description: "We listen to your track until it tells us what it wants to look like — then build a concept that serves the music, not the director's ego." },
      { title: "Full Production", description: "Locations, casting, wardrobe, art direction, cinema cameras, lighting, and a crew that moves fast without cutting corners." },
      { title: "Post-Production", description: "Edit, colour grade, and VFX that make your video impossible to scroll past. The grade is where good footage becomes a great video." },
      { title: "Artist Visual Identity", description: "Beyond a single video — we help artists build a consistent visual world across videos, cover art, and social content." },
    ],
    whyUs: [
      "We directed Ssaru x Fathermoh's 'Kwanini' — watch it and judge our work yourself.",
      "We understand Kenyan music culture from the inside — genge, drill, arbantone, gengetone — each genre has its own visual language and we speak them all.",
      "Videos built to perform on YouTube, TikTok, and television simultaneously.",
      "Honest about budgets. Great work is possible at every tier — we'll tell you exactly what yours can achieve.",
    ],
    process: [
      { step: "01", title: "The Listen", description: "Send us the track. We listen until we hear the video inside it." },
      { step: "02", title: "Concept", description: "Treatment with visual references, locations, and styling direction — built around you as an artist." },
      { step: "03", title: "The Shoot", description: "One to three shoot days depending on scope. Planned tight, executed loose enough to catch magic." },
      { step: "04", title: "The Cut", description: "Edit and grade timed to the emotional arc of the track. Review rounds until you love it." },
    ],
    faqs: [
      { question: "How much does a music video cost in Kenya?", answer: "Music video budgets in Kenya range from Ksh 80,000 for a single-location performance video to Ksh 1,500,000+ for full cinematic productions. Most artists releasing a lead single invest Ksh 200,000–500,000. We work across every tier." },
      { question: "Which artists has Nataka Inc worked with?", answer: "We've directed and produced work for Kenyan artists including Ssaru and Fathermoh — including the official video for 'Kwanini'. We work with established artists and rising talent alike." },
      { question: "How long until my music video is ready?", answer: "Typically 2–4 weeks from concept approval to final delivery, depending on the complexity of the shoot and post-production. We can move faster for release-date deadlines." },
    ],
    relatedPosts: [
      "ssaru-fathermoh-kwanini-music-video-nataka-inc",
      "how-much-does-music-video-cost-kenya",
      "music-video-production-nairobi-lessons-kwanini",
    ],
    keywords: [
      "music video production Nairobi",
      "music video director Kenya",
      "music video production company Kenya",
      "best music video directors Nairobi",
    ],
  },
  {
    slug: "brand-strategy-kenya",
    metaTitle: "Brand Strategy Agency in Nairobi, Kenya | Nataka Inc",
    metaDescription:
      "Nataka Inc builds distinctive brands for the East African market. Brand strategy, identity, positioning and messaging for Kenyan businesses that refuse to blend in. Start with a conversation.",
    label: "Brand Strategy",
    headline: "Brands Built",
    headlineAccent: "To Last.",
    heroImage: "/stills/ssaru/2.jpg",
    intro:
      "Most brands in Nairobi look and sound the same — safe, generic, forgettable. Nataka Inc builds brands that stand apart. We start with strategy: who you are, who you're for, why it matters. Then we build the identity, voice, and visual world to prove it. For businesses and artists across Kenya and East Africa.",
    deliverables: [
      { title: "Brand Strategy", description: "Purpose, positioning, audience definition, and competitive differentiation — the foundation everything else is built on." },
      { title: "Visual Identity", description: "Logo, colour, typography, photography direction, and graphic language — a system, not just a logo file." },
      { title: "Brand Voice & Messaging", description: "How your brand talks — taglines, tone of voice, and messaging frameworks your whole team can use." },
      { title: "Brand Guidelines", description: "A practical playbook that keeps every touchpoint consistent — from Instagram captions to billboard campaigns." },
    ],
    whyUs: [
      "We build brands rooted in East African culture that meet global creative standards — not imported templates.",
      "Strategy and production under one roof — the team that defines your brand also brings it to life on screen.",
      "We've elevated 80+ brands across Kenya and East Africa.",
      "We ask the hard questions other agencies avoid. Clarity beats comfort.",
    ],
    process: [
      { step: "01", title: "Brand Audit", description: "Where your brand stands today — honestly assessed against your market and competitors." },
      { step: "02", title: "Strategy", description: "Workshops and research that define your purpose, positioning, audience, and voice." },
      { step: "03", title: "Identity", description: "Visual and verbal identity designed from the strategy — presented, refined, finalised." },
      { step: "04", title: "Rollout", description: "Guidelines, templates, and launch assets — plus production support to bring the brand to market." },
    ],
    faqs: [
      { question: "What does brand strategy cost in Kenya?", answer: "Brand strategy projects at Nataka Inc typically range from Ksh 150,000 for a focused strategy sprint to Ksh 1,000,000+ for complete brand creation including identity and launch assets. Every engagement is scoped to your needs." },
      { question: "How long does a branding project take?", answer: "A complete brand strategy and identity project typically takes 4–8 weeks. Focused strategy sprints can be completed in 2 weeks." },
      { question: "Do you work with startups or only established companies?", answer: "Both. We work with startups defining their brand for the first time and established companies repositioning for growth. The strategy process adapts to where you are." },
    ],
    relatedPosts: [
      "brand-strategy-nairobi-building-brand-east-africa",
      "ssaru-brand-identity-kenyan-music-visual-storytelling",
    ],
    keywords: [
      "brand strategy Kenya",
      "branding agency Nairobi",
      "brand identity design Kenya",
      "brand positioning Nairobi",
    ],
  },
  {
    slug: "digital-marketing-nairobi",
    metaTitle: "Digital Marketing Agency in Nairobi, Kenya | Nataka Inc",
    metaDescription:
      "Nataka Inc is a digital marketing agency in Nairobi offering social media management, content strategy, SEO and paid advertising for Kenyan brands. Data-driven campaigns that actually convert.",
    label: "Digital Marketing",
    headline: "Marketing That",
    headlineAccent: "Converts.",
    heroImage: "/stills/1/6.jpg",
    intro:
      "Attention is the scarcest resource in Kenya's digital market — and most brands are wasting their budget chasing it badly. Nataka Inc builds digital marketing engines that earn attention and convert it: social media strategy, content production, SEO, and paid campaigns, all connected to business results you can measure.",
    deliverables: [
      { title: "Social Media Management", description: "Strategy, content production, posting, and community management across Instagram, TikTok, LinkedIn, and X — with our production quality behind every post." },
      { title: "Content Strategy & Production", description: "A content engine built around your brand — short-form video, photography, and copy that's platform-native and unmistakably yours." },
      { title: "Paid Advertising", description: "Meta, Google, TikTok, and YouTube campaigns engineered for return — not vanity metrics." },
      { title: "SEO", description: "Technical SEO, content strategy, and local search optimisation that puts your business in front of people already searching for what you do." },
    ],
    whyUs: [
      "Production quality most marketing agencies can't match — our content team is a film production company.",
      "We measure what matters: leads, sales, and brand growth — not just likes.",
      "Deep understanding of the Kenyan consumer across every platform and demographic.",
      "One partner for strategy, content, and distribution — no fragmented vendor chains.",
    ],
    process: [
      { step: "01", title: "Audit & Strategy", description: "We assess your current digital presence and build a channel strategy around your goals." },
      { step: "02", title: "Content Engine", description: "Production calendar, shoot days, and a content library that keeps your channels consistently excellent." },
      { step: "03", title: "Distribution", description: "Organic posting, paid amplification, and SEO working together." },
      { step: "04", title: "Optimise", description: "Monthly reporting on what's working, what isn't, and where the next opportunity is." },
    ],
    faqs: [
      { question: "How much does digital marketing cost in Kenya?", answer: "Monthly digital marketing retainers in Kenya typically range from Ksh 50,000 for focused social media management to Ksh 500,000+ for full-service strategy, content production, and paid media. We scope to your goals and budget." },
      { question: "Which social media platforms should my Kenyan business be on?", answer: "It depends on your audience. TikTok and Instagram dominate for consumer brands targeting 18–35s; LinkedIn for B2B; YouTube for long-form authority. We help you choose the two or three platforms where your audience actually is — and win there." },
      { question: "How long before digital marketing shows results?", answer: "Paid campaigns generate data within days and results within weeks. Organic social and SEO compound over 3–6 months. We set realistic expectations upfront and report transparently every month." },
    ],
    relatedPosts: [
      "why-nairobi-brands-need-video-marketing-2026",
      "brand-strategy-nairobi-building-brand-east-africa",
    ],
    keywords: [
      "digital marketing agency Nairobi",
      "social media marketing Kenya",
      "SEO agency Nairobi",
      "paid advertising Kenya",
    ],
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return servicePages.find((s) => s.slug === slug);
}

export function getAllServices(): ServicePage[] {
  return servicePages;
}
