export type CaseStudy = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  lede: string;
  loop: { src: string; poster: string; alt: string; tag: string; caption: string; duration: string };
  stats: { value: string; label: string }[];
  stills: { src: string; alt: string; caption: string }[];
  verticalsText: string;
  verticals: { src: string; poster: string; title: string; meta: string; duration: string }[];
  /** ISO date the videos went up on the site (VideoObject uploadDate) */
  published: string;
  forYou: string[];
  cta: { button: string; whatsappMessage: string; watchHref: string; watchLabel: string };
  disclosure: string;
};

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
  /** Optional muted hero loop (heroImage stays the poster + share image) */
  /** Background loop; `srcMobile` is a vertical cut for phones, `label` discloses AI footage (AI Standard rule 02). */
  heroVideo?: { src: string; poster: string; srcMobile?: string; label?: string };
  heroSummary?: string;
  /** Flagship piece of our own work, shown right after the intro */
  caseStudy?: CaseStudy;
  intro: string;
  audience?: { title: string; description: string }[];
  /** Project ids from lib/work.ts shown as "The work" on the page (first two) */
  work?: string[];
  /** What's included */
  deliverables: { title: string; description: string }[];
  /** Why Nataka for this service */
  whyUs: string[];
  /** Process steps */
  process: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string; link?: { href: string; label: string } }[];
  /** Related blog slugs */
  relatedPosts: string[];
  relatedServices?: string[];
  keywords: string[];
  /** Optional service-specific offer in the closing CTA (defaults to the generic block) */
  cta?: { headline: string; text: string; whatsappMessage: string; button: string };
};

export const servicePages: ServicePage[] = [
  {
    slug: "brand-promotion-kenya",
    metaTitle: "Brand Promotion & Marketing Campaigns in Kenya | Nataka Inc",
    metaDescription:
      "Brand promotion in Kenya for launches, retail and corporate campaigns. Nataka brings strategy, cinematic production and a clear rollout plan. Discuss your brief.",
    label: "Brand Promotion",
    headline: "Brand Promotion",
    headlineAccent: "in Kenya.",
    heroImage: "/videos/sarit-poster-clean.jpg",
    heroSummary: "Campaign strategy, brand films and social content for Kenyan businesses with a product to launch, a story to tell or a market to reach.",
    intro:
      "A brand campaign needs a clear message, the right creative and a plan for reaching buyers. Nataka Inc is a Nairobi media and marketing agency that brings those decisions together. We help marketing teams and business owners shape a campaign around the audience, the offer and the action they want people to take, then produce the film and social assets to carry it.",
    audience: [
      { title: "Marketing teams", description: "One campaign brief across film, social content and rollout, with deliverables and approval points agreed before production." },
      { title: "Retail & product brands", description: "Launches, seasonal promotions and product stories that give buyers a clear reason to visit, enquire or purchase." },
      { title: "Corporate & service businesses", description: "Brand films and campaign content that explain your value and help a prospective client assess your business." },
    ],
    work: ["sarit", "otamatsuri"],
    deliverables: [
      { title: "Campaign Strategy & Concept", description: "An audience, a campaign message and a creative direction tied to your business objective. We agree the channels, deliverables and review process in the brief." },
      { title: "Brand Film & Campaign Assets", description: "A hero film, product or brand photography, and the edits your campaign needs. Shoot days, locations, talent and final formats are scoped for your project." },
      { title: "Social Content & Rollout", description: "Short-form edits, launch teasers and a publishing plan that give each asset a role before, during and after the campaign. Asset quantities and publishing responsibilities are agreed in the proposal." },
      { title: "Creator & Paid Distribution", description: "Where relevant, we scope creator involvement and paid amplification alongside the creative. Creator fees, usage rights, media spend and campaign management are identified in the proposal before you commit." },
      { title: "Measurement & Next Steps", description: "We agree the useful measures in advance: attention and engagement for awareness, or enquiries and qualified leads for acquisition. Sales reporting depends on access to your sales data and an agreed way to attribute it." },
    ],
    whyUs: [
      "You can inspect the actual film work before discussing a campaign. Sarit and Otamatsuri show our commercial and promotional production approach.",
      "The creative starts with the buyer and the message, so your film, social edits and campaign plan share a clear purpose.",
      "A written scope gives your team a basis for approvals: deliverables, responsibilities, usage, timetable and cost.",
      "Reporting separates visibility from business outcomes. Views show attention; enquiries and sales need their own evidence.",
    ],
    process: [
      { step: "01", title: "Business Brief", description: "Share your audience, product or service, campaign goal, launch date and working budget. We identify what the campaign needs to achieve and how it will be judged." },
      { step: "02", title: "Concept & Scope", description: "Review the creative direction, production plan, deliverables and rollout. Agree the scope and approval points before work begins." },
      { step: "03", title: "Produce & Adapt", description: "Create the main film and supporting assets, then adapt the approved material for the agreed channels and formats." },
      { step: "04", title: "Launch & Review", description: "Roll out the campaign under the agreed responsibilities. Review available campaign and enquiry data to decide which creative and channels deserve the next iteration." },
    ],
    faqs: [
      { question: "What does a brand promotion agency in Kenya do?", answer: "Brand promotion connects your message with an audience through a coordinated campaign. Nataka's scope can bring together campaign strategy, film production, social content and distribution. We agree the exact mix around your goal rather than assuming every campaign needs every service." },
      { question: "How much does a brand promotion campaign cost?", answer: "The quote depends on the campaign's creative and production scope, rollout and third-party costs. Our packages page lists indicative starting ranges. We confirm your deliverables and costs in a proposal, including whether media spend, creators or talent are included.", link: { href: "/work-with-us#packages", label: "View campaign packages" } },
      { question: "Can you work with our in-house marketing team?", answer: "Yes. Share your brand guidelines, existing assets and approval process. We can scope production or campaign support around the work your team already handles, with a clear owner for each part of delivery." },
      { question: "Do we need influencers or paid ads for every campaign?", answer: "No. Distribution should follow the audience and objective. If creators or paid media suit the brief, we discuss the role, cost and measurement before including them. Your existing channels and sales team may also have an important part to play." },
      { question: "Can you guarantee sales or a return on investment?", answer: "We do not guarantee sales or a fixed return. Demand, the offer, media budget and your sales follow-up all affect the result. We agree the campaign objective and measurement before launch, and distinguish creative delivery, audience response and verified business outcomes." },
      { question: "Do you work beyond Nairobi?", answer: "Nataka is based in Nairobi and works on campaigns for brands across Kenya. Locations, travel and any local production requirements are discussed during scoping." },
    ],
    relatedPosts: ["why-nairobi-brands-need-video-marketing-2026", "brand-strategy-nairobi-building-brand-east-africa"],
    relatedServices: ["brand-strategy-kenya", "brand-video-production-kenya", "product-launch-video-kenya", "social-media-marketing-kenya", "influencer-marketing-kenya", "digital-marketing-nairobi"],
    keywords: ["brand promotion Kenya", "brand promotion agency Kenya", "marketing campaigns Kenya", "brand awareness campaigns Nairobi", "brand marketing agency Kenya"],
    cta: { headline: "Let's Shape Your Campaign.", text: "Share your business, the audience you want to reach and your target launch date. We'll discuss the right scope and the next step.", whatsappMessage: "Hi Nataka, I'd like to discuss a brand promotion campaign in Kenya. My business, campaign goal and target date: ", button: "Discuss This Campaign" },
  },
  {
    slug: "video-production-nairobi",
    metaTitle: "Video Production Company in Nairobi, Kenya | Nataka Inc",
    metaDescription:
      "Nataka Inc is a video production company in Nairobi, Kenya. Cinematic brand films, commercials, corporate videos and campaign content. Discuss your project brief.",
    label: "Video Production",
    headline: "Video Production",
    headlineAccent: "In Nairobi.",
    heroImage: "/videos/za-mabuda-still.jpg",
    heroVideo: {
      src: "/videos/hero-reel-v5.mp4",
      srcMobile: "/videos/hero-reel-v5-mobile.mp4",
      poster: "/videos/hero-reel-v5-poster.jpg",
      label: "Our shoots, our VFX for @dance10fikshun and AI footage from AANOTHER",
    },
    heroSummary: "Brand films, commercials and corporate video, from concept and script to the shoot, the grade and delivery in every format.",
    work: ["za-mabuda", "sarit"],
    intro:
      "Nataka Inc is a full-service video production company based in Nairobi, Kenya. We produce cinematic brand films, television commercials, corporate videos, and campaign content for brands that refuse to be ignored. From concept development to final delivery, every frame is crafted with intention, by a Kenyan team that meets global standards.",
    deliverables: [
      { title: "Brand Films", description: "90-second to 3-minute cinematic films that tell your brand's story, for your website, pitches, social media, and events." },
      { title: "TV & Digital Commercials", description: "Broadcast-quality commercial production for television, YouTube, and paid social campaigns across Kenya and East Africa." },
      { title: "Corporate Video", description: "Company culture films, product launches, executive interviews, and internal communications, produced at a standard that reflects your business." },
      { title: "Event Coverage", description: "Multi-camera coverage of launches, conferences, and activations, turned into content that extends the life of your event." },
      { title: "Social Content Series", description: "Short-form video built for TikTok, Instagram Reels, and YouTube Shorts: high frequency, platform-native, on brand." },
    ],
    whyUs: [
      "End-to-end production under one roof: concept, scripting, shooting, editing, colour grade, sound mix, and delivery.",
      "Inspect our published films to assess the cinematography, direction and post-production for your brief.",
      "Deep knowledge of Nairobi's best locations, light and logistics. We shoot faster and better because we know this city.",
      "Honest budgets. We tell you what's achievable at your budget and make every shilling visible on screen.",
    ],
    process: [
      { step: "01", title: "Discovery", description: "We learn your brand, your audience, and what this video needs to achieve." },
      { step: "02", title: "Concept & Script", description: "Creative concepts, scripts, and storyboards, presented for your approval before any camera rolls." },
      { step: "03", title: "Production", description: "Shoot days planned to the minute. Director, DP, lighting, sound, art direction: full crew, no compromises." },
      { step: "04", title: "Post-Production", description: "Edit, colour grade, sound design, and motion graphics. Structured review rounds are included, with clear approval stages to keep the project moving." },
      { step: "05", title: "Delivery", description: "Final files in every format you need: TV, YouTube, Instagram, TikTok, your website." },
    ],
    faqs: [
      { question: "How much does video production cost in Nairobi?", answer: "Video production in Nairobi ranges from around Ksh 80,000 for a simple corporate video to Ksh 2,000,000+ for a full cinematic campaign. The main cost drivers are shoot days, crew size, locations, and post-production complexity. Contact us for a tailored quote." },
      { question: "How long does a video production project take?", answer: "A typical brand film takes 3-6 weeks from brief to delivery: one week for concept and pre-production, one to two shoot days, and two to three weeks of post-production. Rush deliveries are possible." },
      { question: "Do you handle everything or do we need to hire other vendors?", answer: "Everything is in-house at Nataka Inc: concept, script, casting, locations, filming, editing, colour grading, sound, and delivery. One team, one point of contact." },
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
      "Nataka Inc directs and produces music videos for Kenya's top artists including Ssaru and Fathermoh. Cinematic music video production in Nairobi, concept to final cut. Book your shoot.",
    label: "Music Video Production",
    headline: "Music Videos",
    headlineAccent: "That Travel.",
    heroImage: "/stills/teslah/web-6.jpg",
    heroSummary: "Concept, shoot and edit for artists, plus the teasers and vertical cut-downs your release week needs.",
    work: ["kwanini", "cool-in-school"],
    intro:
      "Nataka Inc is one of Nairobi's leading music video production companies. We've directed videos for artists including Ssaru and Fathermoh, work that matches the ambition of the music. From concept development and creative direction to filming and post-production, we build visual worlds around your sound.",
    deliverables: [
      { title: "Creative Direction", description: "We listen to your track until it tells us what it wants to look like, then build a concept that serves the music, not the director's ego." },
      { title: "Full Production", description: "Locations, casting, wardrobe, art direction, cinema cameras, lighting, and a crew that moves fast without cutting corners." },
      { title: "Post-Production", description: "Edit, colour grade, and VFX that make your video impossible to scroll past. The grade is where good footage becomes a great video." },
      { title: "Artist Visual Identity", description: "Beyond a single video, we help artists build a consistent visual world across videos, cover art, and social content." },
    ],
    whyUs: [
      "We directed Ssaru x Fathermoh's 'Kwanini'. Watch it and judge our work yourself.",
      "We understand Kenyan music culture from the inside. Genge, drill, arbantone and gengetone each have their own visual language, and we speak them all.",
      "Videos built to perform on YouTube, TikTok, and television simultaneously.",
      "Honest about budgets. Great work is possible at every tier. We'll tell you exactly what yours can achieve.",
    ],
    process: [
      { step: "01", title: "The Listen", description: "Send us the track. We listen until we hear the video inside it." },
      { step: "02", title: "Concept", description: "Treatment with visual references, locations, and styling direction, built around you as an artist." },
      { step: "03", title: "The Shoot", description: "One to three shoot days depending on scope. Planned tight, executed loose enough to catch magic." },
      { step: "04", title: "The Cut", description: "Edit and grade timed to the emotional arc of the track. Structured review rounds with clear approval stages keep things moving." },
    ],
    faqs: [
      { question: "How much does a music video cost in Kenya?", answer: "Music video budgets in Kenya range from Ksh 80,000 for a single-location performance video to Ksh 1,500,000+ for full cinematic productions. Most artists releasing a lead single invest Ksh 200,000-500,000. We work across every tier." },
      { question: "Which artists has Nataka Inc worked with?", answer: "We've directed and produced work for Kenyan artists including Ssaru and Fathermoh, including the official video for 'Kwanini'. We work with established artists and rising talent alike." },
      { question: "How long until my music video is ready?", answer: "Typically 2-4 weeks from concept approval to final delivery, depending on the complexity of the shoot and post-production. We can move faster for release-date deadlines." },
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
    relatedServices: ["brand-promotion-kenya", "brand-video-production-kenya", "creative-agency-nairobi", "digital-marketing-nairobi"],
    metaTitle: "Brand Strategy Agency in Nairobi, Kenya | Nataka Inc",
    metaDescription:
      "Nataka Inc builds distinctive brands for the East African market. Brand strategy, identity, positioning and messaging for Kenyan businesses that refuse to blend in. Start with a conversation.",
    label: "Brand Strategy",
    headline: "Brands Built",
    headlineAccent: "To Last.",
    heroImage: "/stills/ssaru/2.jpg",
    heroSummary: "Positioning, identity and messaging that give every ad, film and post the same clear point.",
    work: ["sarit", "teslah"],
    intro:
      "Most brands in Nairobi look and sound the same: safe, generic, forgettable. Nataka Inc builds brands that stand apart. We start with strategy: who you are, who you're for, why it matters. Then we build the identity, voice, and visual world to prove it. For businesses and artists across Kenya and East Africa.",
    deliverables: [
      { title: "Brand Strategy", description: "Purpose, positioning, audience definition, and competitive differentiation, the foundation everything else is built on." },
      { title: "Visual Identity", description: "Logo, colour, typography, photography direction, and graphic language: a system, not just a logo file." },
      { title: "Brand Voice & Messaging", description: "How your brand talks: taglines, tone of voice, and messaging frameworks your whole team can use." },
      { title: "Brand Guidelines", description: "A practical playbook that keeps every touchpoint consistent, from Instagram captions to billboard campaigns." },
    ],
    whyUs: [
      "We build brands rooted in East African culture that meet global creative standards, not imported templates.",
      "Strategy and production under one roof: the team that defines your brand also brings it to life on screen.",
      "Positioning, messaging and campaign creative are developed around the audience your business needs to reach.",
      "We ask the hard questions other agencies avoid. Clarity beats comfort.",
    ],
    process: [
      { step: "01", title: "Brand Audit", description: "Where your brand stands today, honestly assessed against your market and competitors." },
      { step: "02", title: "Strategy", description: "Workshops and research that define your purpose, positioning, audience, and voice." },
      { step: "03", title: "Identity", description: "Visual and verbal identity designed from the strategy: presented, refined, finalised." },
      { step: "04", title: "Rollout", description: "Guidelines, templates, and launch assets, plus production support to bring the brand to market." },
    ],
    faqs: [
      { question: "What does brand strategy cost in Kenya?", answer: "Brand strategy projects at Nataka Inc typically range from Ksh 150,000 for a focused strategy sprint to Ksh 1,000,000+ for complete brand creation including identity and launch assets. Every engagement is scoped to your needs." },
      { question: "How long does a branding project take?", answer: "A complete brand strategy and identity project typically takes 4-8 weeks. Focused strategy sprints can be completed in 2 weeks." },
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
    relatedServices: ["brand-promotion-kenya", "social-media-marketing-kenya", "influencer-marketing-kenya", "product-launch-video-kenya"],
    metaTitle: "Digital Marketing Agency in Nairobi, Kenya | Nataka Inc",
    metaDescription:
      "Nataka Inc is a digital marketing agency in Nairobi offering social media management, content strategy, SEO and paid advertising for Kenyan brands. Data-driven campaigns that actually convert.",
    label: "Digital Marketing",
    headline: "Marketing That",
    headlineAccent: "Converts.",
    heroImage: "/stills/1/6.jpg",
    heroSummary: "Paid social, search and content plans built around enquiries and sales, with reporting you can act on.",
    work: ["sarit", "cool-in-school"],
    intro:
      "Attention is the scarcest resource in Kenya's digital market, and most brands are wasting their budget chasing it badly. Nataka Inc builds digital marketing engines that earn attention and convert it: social media strategy, content production, SEO, and paid campaigns, all connected to business results you can measure.",
    deliverables: [
      { title: "Social Media Management", description: "Strategy, content production, posting, and community management across Instagram, TikTok, LinkedIn, and X, with our production quality behind every post." },
      { title: "Content Strategy & Production", description: "A content engine built around your brand: short-form video, photography, and copy that's platform-native and unmistakably yours." },
      { title: "Paid Advertising", description: "Meta, Google, TikTok, and YouTube campaigns engineered for return, not vanity metrics." },
      { title: "SEO", description: "Technical SEO, content strategy, and local search optimisation that puts your business in front of people already searching for what you do." },
    ],
    whyUs: [
      "Production quality most marketing agencies can't match. Our content team is a film production company.",
      "We measure what matters: leads, sales, and brand growth, not just likes.",
      "Deep understanding of the Kenyan consumer across every platform and demographic.",
      "One partner for strategy, content and distribution, with no fragmented vendor chains.",
    ],
    process: [
      { step: "01", title: "Audit & Strategy", description: "We assess your current digital presence and build a channel strategy around your goals." },
      { step: "02", title: "Content Engine", description: "Production calendar, shoot days, and a content library that keeps your channels consistently excellent." },
      { step: "03", title: "Distribution", description: "Organic posting, paid amplification, and SEO working together." },
      { step: "04", title: "Optimise", description: "Monthly reporting on what's working, what isn't, and where the next opportunity is." },
    ],
    faqs: [
      { question: "How much does digital marketing cost in Kenya?", answer: "Monthly digital marketing retainers in Kenya typically range from Ksh 50,000 for focused social media management to Ksh 500,000+ for full-service strategy, content production, and paid media. We scope to your goals and budget." },
      { question: "Which social media platforms should my Kenyan business be on?", answer: "It depends on your audience. TikTok and Instagram dominate for consumer brands targeting 18-35s; LinkedIn for B2B; YouTube for long-form authority. We help you choose the two or three platforms where your audience actually is, and win there." },
      { question: "How long before digital marketing shows results?", answer: "Paid campaigns generate data within days and results within weeks. Organic social and SEO compound over 3-6 months. We set realistic expectations upfront and report transparently every month." },
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
  {
    slug: "corporate-video-production-kenya",
    metaTitle: "Corporate Video Production in Kenya | Nataka Inc",
    metaDescription:
      "Corporate video production for Kenyan companies and East African enterprises: brand films, executive profiles, training and internal comms shot to a standard your board will be proud of. Get a quote.",
    label: "Corporate Video",
    headline: "Corporate Video",
    headlineAccent: "Worth Watching.",
    heroImage: "/stills/1/2.jpg",
    heroSummary: "Company films, explainers and leadership interviews, produced to the standard your business keeps.",
    work: ["sarit", "za-mabuda"],
    intro:
      "Most corporate video in Kenya is forgettable: talking heads, stock music, a logo at the end. Nataka Inc produces corporate films people actually watch to the end. For banks, SACCOs, NGOs, manufacturers and listed companies across Kenya and East Africa, we turn company stories, product lines and annual results into film that earns attention from staff, clients, partners and investors alike.",
    deliverables: [
      { title: "Brand & Company Films", description: "The film that explains who you are and why you matter, for your website, investor decks, AGMs and onboarding." },
      { title: "Executive & Leadership Profiles", description: "CEO messages, founder stories and leadership interviews directed so your people come across as human, credible and in command." },
      { title: "Training & Internal Comms", description: "Onboarding, safety and process videos staff actually retain, far cheaper than repeating the same briefing a hundred times." },
      { title: "CSR & Impact Films", description: "Documentary-style films that prove your impact to donors, regulators and the public, not just claim it." },
      { title: "Results & Annual Report Videos", description: "Financial results and year-in-review films that make the numbers land with shareholders and the market." },
    ],
    whyUs: [
      "Production values that match international agencies, at Nairobi rates, with a team that understands your market.",
      "Discreet, professional crews used to corporate environments, NDAs, factory floors and C-suite schedules.",
      "One accountable partner from script to delivery. No chasing three vendors to finish one video.",
      "We make your budget visible on screen and tell you honestly what each tier buys.",
    ],
    process: [
      { step: "01", title: "Brief & Objectives", description: "We align on audience, message and where the video will live before proposing anything." },
      { step: "02", title: "Script & Treatment", description: "Script, shot list and treatment approved by your team (and legal, if needed) before the shoot." },
      { step: "03", title: "Production", description: "Efficient shoot days planned around your operations, with minimal disruption to the business." },
      { step: "04", title: "Post & Delivery", description: "Edit, grade, motion graphics, subtitles and versions for every platform, with review rounds included." },
    ],
    faqs: [
      { question: "How much does corporate video production cost in Kenya?", answer: "A straightforward corporate video in Kenya typically starts around Ksh 120,000, while a flagship brand film with multiple shoot days and motion graphics can run Ksh 800,000+. Cost depends on shoot days, locations and post-production complexity. We scope to your budget and brief." },
      { question: "Can you shoot at our offices or factory outside Nairobi?", answer: "Yes. We regularly travel across Kenya and East Africa for shoots. Travel and logistics are quoted transparently upfront." },
      { question: "Do you handle scripting and on-screen presenters?", answer: "Yes. Scripting, teleprompter, presenter coaching and professional voice-over are all part of what we do. We make non-actors look comfortable on camera." },
    ],
    relatedPosts: [
      "best-video-production-companies-nairobi-kenya",
      "why-nairobi-brands-need-video-marketing-2026",
    ],
    keywords: [
      "corporate video production Kenya",
      "corporate video production Nairobi",
      "company profile video Kenya",
      "training video production Kenya",
      "corporate film Nairobi",
    ],
  },
  {
    slug: "automotive-marketing-kenya",
    metaTitle: "Automotive Marketing & Car Video Production in Kenya | Nataka Inc",
    metaDescription:
      "Automotive marketing for car dealerships and motor brands in Kenya: cinematic car films, showroom content, test-drive videos and social campaigns that move metal. Talk to Nataka Inc.",
    label: "Automotive Marketing",
    headline: "Marketing That",
    headlineAccent: "Moves Metal.",
    heroImage: "/videos/save-her-car.jpg",
    heroSummary: "Launch films, showroom content and lead campaigns that help dealers and motor brands reach serious buyers.",
    work: ["maxus", "save-her"],
    intro:
      "Cars sell on desire, and desire is visual. Nataka Inc builds automotive marketing for dealerships, importers and motor brands across Kenya: cinematic vehicle films, high-volume showroom content, and social campaigns engineered to fill your sales floor with qualified buyers. We make a Ksh 3M SUV look like the Ksh 3M decision it is.",
    deliverables: [
      { title: "Cinematic Vehicle Films", description: "Hero films for new arrivals and flagship models, the kind of footage that makes someone book a test drive from their phone." },
      { title: "Showroom & Stock Content", description: "Fast, consistent, high-volume content for your live inventory, shot to a system so every unit looks its best." },
      { title: "Test-Drive & Review Videos", description: "Walkarounds, feature breakdowns and test-drive films that answer buyer questions before they walk in." },
      { title: "Social & Paid Campaigns", description: "TikTok, Instagram and YouTube campaigns with the targeting and creative to turn views into showroom visits." },
      { title: "Launch & Event Coverage", description: "Model launches, motor shows and dealership events covered and cut for maximum reach." },
    ],
    whyUs: [
      "We understand the Kenyan car buyer (from first-car imports to high-end showrooms) and what makes each segment act.",
      "Cinematic production plus performance marketing in one team: the content and the campaign that sells it.",
      "Systems for high-volume stock content so your inventory never looks flat or inconsistent.",
      "We track to test drives and enquiries, not just views.",
    ],
    process: [
      { step: "01", title: "Audit & Goals", description: "We look at your inventory, your buyers and your current marketing to find the fastest wins." },
      { step: "02", title: "Creative Plan", description: "A content and campaign plan tied to the models and margins that matter most to you." },
      { step: "03", title: "Production", description: "Efficient shoot days at your showroom or on location, multiple vehicles captured per session." },
      { step: "04", title: "Launch & Optimise", description: "We publish, run the paid campaigns and report on enquiries and test drives, then double down on what works." },
    ],
    faqs: [
      { question: "How much does automotive video and marketing cost in Kenya?", answer: "A single cinematic vehicle film typically starts around Ksh 100,000, while an ongoing dealership content-and-campaign retainer ranges from Ksh 150,000 to Ksh 600,000+ per month depending on volume and ad spend. We scope to your inventory and goals." },
      { question: "Can you produce content for our full stock regularly?", answer: "Yes. We build a repeatable shoot system so your live inventory gets consistent, high-quality content at volume, not a one-off shoot that goes stale." },
      { question: "Do you also run the ad campaigns, or just make the videos?", answer: "Both. We produce the content and run the Meta, TikTok and YouTube campaigns behind it, optimising toward test drives and enquiries." },
    ],
    relatedPosts: [
      "why-nairobi-brands-need-video-marketing-2026",
      "best-video-production-companies-nairobi-kenya",
    ],
    keywords: [
      "automotive marketing Kenya",
      "car dealership marketing Nairobi",
      "car video production Kenya",
      "automotive advertising Kenya",
      "vehicle photography Nairobi",
    ],
  },
  {
    slug: "event-video-production-kenya",
    metaTitle: "Event Video Production & Coverage in Kenya | Nataka Inc",
    metaDescription:
      "Event video production in Nairobi and across Kenya: launches, conferences, concerts and activations covered with multi-camera crews and cut into content that outlives the day. Book Nataka Inc.",
    label: "Event Video",
    headline: "Events That",
    headlineAccent: "Outlive The Day.",
    heroImage: "/stills/4/7.jpg",
    heroSummary: "Promo films before the day, multi-camera coverage on it, and recaps and sponsor clips after.",
    work: ["otamatsuri", "sarit"],
    intro:
      "An event lasts hours; the content from it should work for months. Nataka Inc covers launches, conferences, concerts, galas and brand activations across Kenya with multi-camera crews, then turns the footage into highlight films, social cut-downs and recap reels that keep the moment selling long after the lights go down.",
    deliverables: [
      { title: "Multi-Camera Coverage", description: "Full-event capture with multiple operators, so nothing important is missed and every angle is covered." },
      { title: "Highlight & Recap Films", description: "A cinematic 60-120 second highlight film that captures the energy and sells next year's edition." },
      { title: "Same-Day & Social Edits", description: "Fast-turnaround vertical cut-downs for Instagram, TikTok and LinkedIn, sometimes before guests have gone home." },
      { title: "Speaker & Session Recordings", description: "Clean, multi-angle recordings of keynotes and panels for on-demand, training or sponsor value." },
      { title: "Sponsor & Brand Deliverables", description: "Edits built specifically to prove ROI to sponsors and partners." },
    ],
    whyUs: [
      "Crews experienced in live, one-take-only environments. We don't get a second chance, and we know it.",
      "Fast turnaround without sacrificing the cinematic look that makes your event feel premium.",
      "We cover the full range (corporate conferences to major concerts) and adapt to each.",
      "Content planned around your marketing goals, not just documentation for its own sake.",
    ],
    process: [
      { step: "01", title: "Pre-Event Plan", description: "We map the run-of-show, key moments and deliverables with you before the day." },
      { step: "02", title: "On-the-Day Capture", description: "A coordinated multi-camera crew capturing every priority moment and the texture in between." },
      { step: "03", title: "Edit", description: "Highlight film, social cut-downs and full recordings, cut to your brand and timeline." },
      { step: "04", title: "Delivery", description: "Every format you need for socials, sponsors, press and next year's promotion." },
    ],
    faqs: [
      { question: "How much does event video coverage cost in Kenya?", answer: "Event coverage in Kenya typically ranges from Ksh 60,000 for a single-camera half-day to Ksh 400,000+ for multi-camera coverage of a large event with same-day edits. Crew size, hours and turnaround drive the cost." },
      { question: "Can you deliver edits the same day for social media?", answer: "Yes. With the right crew size we can turn around vertical social edits during or immediately after the event, ideal for keeping momentum live." },
      { question: "Do you cover events outside Nairobi?", answer: "Yes, we cover events across Kenya and East Africa. Travel is quoted transparently in advance." },
    ],
    relatedPosts: [
      "why-nairobi-brands-need-video-marketing-2026",
      "best-video-production-companies-nairobi-kenya",
    ],
    keywords: [
      "event video production Kenya",
      "event videographer Nairobi",
      "conference video coverage Kenya",
      "event coverage Nairobi",
      "concert videographer Kenya",
    ],
  },
  {
    slug: "product-launch-video-kenya",
    relatedServices: ["brand-promotion-kenya", "brand-video-production-kenya", "social-media-marketing-kenya", "digital-marketing-nairobi"],
    metaTitle: "Product Launch Video & Campaigns in Kenya | Nataka Inc",
    metaDescription:
      "Product launch videos and campaigns in Kenya: teasers, hero films and launch-day content that build anticipation and drive sales. Nataka Inc launches products people actually notice.",
    label: "Product Launch",
    headline: "Launches People",
    headlineAccent: "Notice.",
    heroImage: "/stills/1/4.jpg",
    heroSummary: "Hero films, teasers and launch-week content that give buyers a reason to look, then a reason to buy.",
    work: ["maxus", "kwanini"],
    intro:
      "Most product launches in Kenya land with a single post and a shrug. Nataka Inc builds launch campaigns with an arc (tease, reveal, sustain) so your product enters the market with momentum, not silence. From hero films to launch-day social content, we make sure the right people are paying attention the moment you go live.",
    deliverables: [
      { title: "Launch Hero Film", description: "The centrepiece film that defines the product and sets the look and tone for every other asset." },
      { title: "Teaser Campaign", description: "Pre-launch teasers engineered to build anticipation and a waiting audience before day one." },
      { title: "Launch-Day Content Kit", description: "A full set of platform-native assets (reels, stories, posts, thumbnails) ready to deploy across every channel." },
      { title: "Demo & Explainer Videos", description: "Clear, attractive demonstrations that answer 'what is it and why do I want it' in seconds." },
      { title: "Paid Launch Campaign", description: "Targeted paid media to put the launch in front of the exact audience most likely to buy." },
    ],
    whyUs: [
      "We think in campaigns with a beginning, middle and end, not isolated posts that vanish in an hour.",
      "Strategy, film and distribution under one roof, so the launch is coherent from teaser to sale.",
      "Content built for the platforms your buyers actually use, in the formats those platforms reward.",
      "We tie the launch to outcomes (pre-orders, sign-ups, sales), not just reach.",
    ],
    process: [
      { step: "01", title: "Launch Strategy", description: "We define the audience, the message and the campaign arc across the weeks around launch." },
      { step: "02", title: "Production", description: "Hero film, teasers and the full content kit shot in one coordinated production." },
      { step: "03", title: "Rollout", description: "A scheduled teaser-to-launch sequence across organic and paid channels." },
      { step: "04", title: "Sustain & Measure", description: "Post-launch content and reporting to hold momentum and prove results." },
    ],
    faqs: [
      { question: "How much does a product launch campaign cost in Kenya?", answer: "The quote depends on the creative concept, production, deliverables and rollout. See the Launch Campaign Package on our packages page for the current indicative range. We confirm the exact scope and whether media spend, talent or creator fees are included in your proposal.", link: { href: "/work-with-us#packages", label: "View the Launch Campaign Package" } },
      { question: "How far ahead should we start before launch day?", answer: "Ideally 4-6 weeks, so there's time to build a teaser sequence and an audience before the reveal. We can compress this for tighter timelines." },
      { question: "Can you handle both the content and the advertising?", answer: "Yes. We produce the campaign and run the paid media behind it, so the whole launch is coordinated and accountable to one team." },
    ],
    relatedPosts: [
      "why-nairobi-brands-need-video-marketing-2026",
      "brand-strategy-nairobi-building-brand-east-africa",
    ],
    keywords: [
      "product launch video Kenya",
      "product launch campaign Nairobi",
      "product video production Kenya",
      "launch marketing Kenya",
      "product teaser video Nairobi",
    ],
  },
  {
    slug: "social-media-marketing-kenya",
    relatedServices: ["brand-promotion-kenya", "digital-marketing-nairobi", "influencer-marketing-kenya", "product-launch-video-kenya"],
    metaTitle: "Social Media Marketing Agency in Kenya | Nataka Inc",
    metaDescription:
      "Social media marketing for Kenyan brands: content systems, short-form video, community management and paid social that turn followers into customers. Nataka Inc runs socials that sell.",
    label: "Social Media Marketing",
    headline: "Social That",
    headlineAccent: "Sells.",
    heroImage: "/stills/4/1.jpg",
    heroSummary: "A monthly shoot day, short-form video and a content calendar that keep your brand in the feed.",
    work: ["cool-in-school", "sarit"],
    intro:
      "Followers are not the goal, customers are. Nataka Inc runs social media for Kenyan brands as a system, not a guessing game: a content engine of scroll-stopping short-form video, consistent posting, real community management and paid social that turns attention into enquiries. With a film production team behind every post, your feed finally looks like the brand you actually are.",
    deliverables: [
      { title: "Content Systems", description: "A monthly engine of platform-native video and photography, planned and produced so your channels are never empty or off-brand." },
      { title: "Short-Form Video", description: "TikToks, Reels and Shorts built to be watched, saved and shared, the format that actually grows accounts in 2026." },
      { title: "Community Management", description: "Replies, DMs and comment moderation handled in your voice, so engagement turns into relationships and sales." },
      { title: "Paid Social", description: "Meta and TikTok ad campaigns engineered for leads and sales, not vanity metrics." },
      { title: "Analytics & Reporting", description: "Monthly reporting on what's working and what to do next, in plain language, tied to business goals." },
    ],
    whyUs: [
      "Our content team is a film production company, so your short-form will outshine competitors shooting on a phone.",
      "We know the Kenyan feed: the trends, sounds, humour and timing that actually travel here.",
      "One team for strategy, content and ads, so there is no disconnect between what's posted and what's promoted.",
      "We optimise toward enquiries and sales, and report on them honestly.",
    ],
    process: [
      { step: "01", title: "Audit & Strategy", description: "We assess your channels and audience and build a platform strategy around your goals." },
      { step: "02", title: "Content Engine", description: "A production calendar and shoot rhythm that keeps your channels consistently excellent." },
      { step: "03", title: "Publish & Engage", description: "Posting, community management and paid amplification working together." },
      { step: "04", title: "Optimise", description: "Monthly reporting and adjustments based on what's actually driving results." },
    ],
    faqs: [
      { question: "How much does social media marketing cost in Kenya?", answer: "Your quote depends on production, content volume, platforms and management responsibilities. See the Social Content Engine on our packages page for the current indicative range. Community management and paid media requirements are confirmed in the written scope, including whether media spend is included.", link: { href: "/work-with-us#packages", label: "View the Social Content Engine" } },
      { question: "Which platforms should my Kenyan brand focus on?", answer: "For most consumer brands, TikTok and Instagram drive the most growth; LinkedIn wins for B2B. We help you focus on the two or three platforms where your audience actually is and win there, rather than spreading thin." },
      { question: "Do you create the content or just schedule it?", answer: "We create it. Strategy, filming, editing, copy and scheduling are all in-house. That's the difference between a feed that grows and one that just stays busy." },
    ],
    relatedPosts: [
      "why-nairobi-brands-need-video-marketing-2026",
      "best-video-production-companies-nairobi-kenya",
    ],
    keywords: [
      "social media marketing Kenya",
      "social media agency Nairobi",
      "TikTok marketing Kenya",
      "content creation Nairobi",
      "Instagram marketing Kenya",
    ],
  },
  {
    slug: "influencer-marketing-kenya",
    relatedServices: ["brand-promotion-kenya", "social-media-marketing-kenya", "product-launch-video-kenya", "brand-video-production-kenya"],
    metaTitle: "Influencer Marketing Agency in Kenya | Nataka Inc",
    metaDescription:
      "Influencer and creator marketing in Kenya: matched creators, managed campaigns and content that converts. Nataka Inc runs influencer campaigns built on results, not just reach.",
    label: "Influencer Marketing",
    headline: "Creators Who",
    headlineAccent: "Actually Convert.",
    heroImage: "/stills/ssaru/1.jpg",
    heroSummary: "Creator campaigns matched to your audience, with briefs, usage rights and reporting agreed upfront.",
    work: ["cool-in-school", "gun-vs-sword"],
    intro:
      "Anyone can pay a creator to hold up a product. Nataka Inc runs influencer marketing in Kenya as a campaign with strategy behind it: the right creators for your audience, briefs that protect your brand, content that fits each platform, and measurement that tells you what it actually did for sales. We have the cultural relationships and the production muscle to make creator campaigns work.",
    deliverables: [
      { title: "Creator Matching", description: "We identify and vet creators whose audience and tone genuinely fit your brand, not just whoever has the biggest follower count." },
      { title: "Campaign Management", description: "Outreach, negotiation, contracts, briefs and timelines handled end-to-end, so you don't chase creators." },
      { title: "Branded Content Production", description: "We produce or co-produce content with creators so it meets your brand standard and the platform's." },
      { title: "Whitelisting & Amplification", description: "Turn the best creator content into paid ads from the creator's handle for far better performance." },
      { title: "Reporting & ROI", description: "Clear measurement of reach, engagement and conversions, so you know which creators to keep." },
    ],
    whyUs: [
      "Real relationships across Kenyan music, comedy, fashion and lifestyle creators. We've worked with names like Ssaru and Mulamwah.",
      "We protect your brand with proper briefs, contracts and approvals, so there are no off-brand surprises.",
      "Production capability means we can lift creator content to broadcast quality when it matters.",
      "We measure to conversions, not just impressions.",
    ],
    process: [
      { step: "01", title: "Strategy & Fit", description: "We define your audience and objectives and the kind of creator that genuinely matches." },
      { step: "02", title: "Creator Selection", description: "Sourcing, vetting and negotiating with creators whose audience overlaps yours." },
      { step: "03", title: "Campaign & Content", description: "Briefs, production and approvals that keep content on-brand and on-platform." },
      { step: "04", title: "Amplify & Measure", description: "Paid amplification of the best content and honest reporting on what converted." },
    ],
    faqs: [
      { question: "How much does influencer marketing cost in Kenya?", answer: "Influencer campaigns vary widely with creator size. A focused micro-influencer campaign can start around Ksh 100,000 including management, while campaigns with top-tier creators and paid amplification run Ksh 500,000+. We build to your budget and objectives." },
      { question: "How do you choose the right influencers?", answer: "We start from your audience, not the creator's follower count: matching tone, audience overlap and authenticity, then vetting engagement quality before recommending anyone." },
      { question: "Can you manage the whole campaign?", answer: "Yes. From creator sourcing and contracts to content approval, posting and reporting. You get one accountable team instead of managing creators yourself." },
    ],
    relatedPosts: [
      "ssaru-brand-identity-kenyan-music-visual-storytelling",
      "why-nairobi-brands-need-video-marketing-2026",
    ],
    keywords: [
      "influencer marketing Kenya",
      "influencer agency Nairobi",
      "creator marketing Kenya",
      "brand ambassador campaigns Kenya",
      "social media influencers Kenya",
    ],
  },
  {
    slug: "creative-agency-nairobi",
    relatedServices: ["brand-promotion-kenya", "brand-strategy-kenya", "brand-video-production-kenya", "product-launch-video-kenya"],
    metaTitle: "Creative Agency in Nairobi, Kenya | Nataka Inc",
    metaDescription:
      "Nataka Inc is a full-service creative agency in Nairobi: strategy, film, design and campaigns for brands that refuse to blend in. One team from idea to execution across East Africa.",
    label: "Creative Agency",
    headline: "A Creative Agency",
    headlineAccent: "Built Different.",
    heroImage: "/ai/aanother/lineup.jpg",
    heroSummary: "Ideas, design, film and campaigns from one Nairobi team, for brands that want to stand apart.",
    work: ["za-mabuda", "aanother"],
    intro:
      "A creative agency should give you ideas and the ability to make them real. Most in Nairobi do one or the other. Nataka Inc does both: strategy, film, design and distribution under one roof, so the big idea doesn't get watered down on its way to the screen. We partner with brands across Kenya and East Africa that would rather be unmistakable than safe.",
    deliverables: [
      { title: "Creative Strategy", description: "The thinking that makes everything else work: positioning, campaign ideas and the insight underneath them." },
      { title: "Film & Photography", description: "In-house cinematic production and editorial photography, so your ideas are executed to a global standard." },
      { title: "Design & Identity", description: "Visual identity, campaign design and brand systems that hold together across every touchpoint." },
      { title: "Integrated Campaigns", description: "Campaigns that run across film, social, paid and PR: coordinated, not fragmented." },
      { title: "Always-On Content", description: "Ongoing content partnerships that keep your brand consistently excellent, not just at launch." },
    ],
    whyUs: [
      "Idea and execution in one team, so nothing gets lost in translation between agency and production house.",
      "Cinematic production capability most Nairobi agencies have to outsource.",
      "Rooted in East African culture, built to global creative standards.",
      "We ask the hard questions and tell you the truth. Clarity beats comfort.",
    ],
    process: [
      { step: "01", title: "Discovery", description: "We learn your brand, market and ambition before proposing anything." },
      { step: "02", title: "The Big Idea", description: "A creative platform and campaign ideas built on a real insight." },
      { step: "03", title: "Make", description: "Film, design and content produced in-house to the standard the idea deserves." },
      { step: "04", title: "Launch & Grow", description: "Distribution across channels and ongoing partnership to keep momentum." },
    ],
    faqs: [
      { question: "What does a creative agency in Nairobi cost?", answer: "It depends on scope. Project work at Nataka Inc ranges from focused engagements around Ksh 150,000 to integrated campaigns of Ksh 1,000,000+. Many clients work with us on monthly retainers. We scope honestly to your goals and budget." },
      { question: "What makes Nataka different from other Nairobi agencies?", answer: "We're a creative agency and a film production company in one. The team that has the idea also shoots, edits and ships it, so quality and intent survive all the way to the final cut." },
      { question: "Do you work with brands outside Kenya?", answer: "Yes. We're based in Nairobi and work with brands across East Africa, with remote and travel production as needed." },
    ],
    relatedPosts: [
      "brand-strategy-nairobi-building-brand-east-africa",
      "why-nairobi-brands-need-video-marketing-2026",
    ],
    keywords: [
      "creative agency Nairobi",
      "creative agency Kenya",
      "advertising agency Nairobi",
      "branding agency Kenya",
      "creative production house Nairobi",
    ],
  },
  {
    slug: "brand-video-production-kenya",
    relatedServices: ["brand-promotion-kenya", "brand-strategy-kenya", "corporate-video-production-kenya", "product-launch-video-kenya"],
    metaTitle: "Brand Video Production in Kenya | Nataka Inc",
    metaDescription:
      "Brand video production in Kenya: cinematic brand films that make people feel something and remember you. Nataka Inc builds the film at the heart of your brand. Get a quote.",
    label: "Brand Video",
    headline: "Brand Films That",
    headlineAccent: "Make You Feel.",
    heroImage: "/stills/1/46.jpg",
    heroSummary: "Brand films that show who you are and why it matters, cut for your site, pitches and socials.",
    work: ["save-her", "sarit"],
    intro:
      "A brand video isn't a product demo. It's the film that makes someone feel who you are before they ever buy. Nataka Inc produces cinematic brand films for Kenyan companies and challengers across East Africa: emotive, story-led films built for your homepage, your launch, your pitch and your socials. Functionality is for the spec sheet; brand films are for the heart.",
    deliverables: [
      { title: "Brand Story Films", description: "The emotive hero film that captures who you are and why you exist, your most-used asset for years." },
      { title: "Manifesto & Campaign Films", description: "Bold, idea-led films built around a single powerful message for a campaign or moment." },
      { title: "Founder & Origin Stories", description: "The human story behind the brand, told with cinematic craft instead of a flat interview." },
      { title: "Brand Social Cut-Downs", description: "Vertical and short-form edits of the brand film, built for the feed where most people will meet you." },
      { title: "Recurring Brand Content", description: "Ongoing brand-led content so the feeling carries beyond a single film." },
    ],
    whyUs: [
      "We lead with emotion and story, not features, because that's what makes a brand stick.",
      "Cinematic craft end-to-end: direction, cinematography, grade and sound that rival global work.",
      "Strategy in the same building means the film actually says the right thing, beautifully.",
      "African stories told to a world-class standard, not imported clichés.",
    ],
    process: [
      { step: "01", title: "Brand Immersion", description: "We get under the skin of your brand, audience and the feeling you want to create." },
      { step: "02", title: "Concept & Script", description: "A story-led concept, script and treatment approved before the shoot." },
      { step: "03", title: "Production", description: "A full cinematic shoot: direction, cinematography, art and sound." },
      { step: "04", title: "Post & Delivery", description: "Edit, grade, sound design and cut-downs for every channel you need." },
    ],
    faqs: [
      { question: "How much does a brand film cost in Kenya?", answer: "A cinematic brand film in Kenya typically ranges from Ksh 200,000 for a focused single-day production to Ksh 1,500,000+ for a flagship film with multiple locations and full post-production. We scope to your ambition and budget." },
      { question: "What's the difference between a brand film and a corporate video?", answer: "A corporate video usually informs: products, processes, results. A brand film makes you feel something about the company. We do both, but brand films are where we make audiences care, not just understand." },
      { question: "How long should a brand film be?", answer: "Most brand films land between 60 and 120 seconds, with shorter social cut-downs alongside. We build the length around where it will be watched, not a fixed rule." },
    ],
    relatedPosts: [
      "why-nairobi-brands-need-video-marketing-2026",
      "brand-strategy-nairobi-building-brand-east-africa",
    ],
    keywords: [
      "brand video production Kenya",
      "brand film Nairobi",
      "brand storytelling video Kenya",
      "cinematic brand film Kenya",
      "brand video agency Nairobi",
    ],
  },
  {
    slug: "video-production-kenya",
    metaTitle: "Video Production Company in Kenya | Nataka Inc",
    metaDescription:
      "Nataka Inc is a video production company serving all of Kenya: brand films, commercials, corporate and music videos produced in Nairobi and on location across the country. Get a quote.",
    label: "Video Production Kenya",
    headline: "Video Production",
    headlineAccent: "Across Kenya.",
    heroImage: "/stills/1/5.jpg",
    heroSummary: "Brand films, commercials and campaign video shot anywhere in Kenya, with one team from brief to delivery.",
    work: ["za-mabuda", "save-her"],
    intro:
      "Great video shouldn't require a Nairobi address. Nataka Inc is a full-service video production company that works across all of Kenya: from the capital to the coast, the Rift Valley to the lakeside counties. Brand films, commercials, corporate video and music videos, produced to a cinematic standard wherever your story lives. One national team, one consistent quality, on location anywhere in the country.",
    deliverables: [
      { title: "Brand Films & Commercials", description: "Cinematic films and broadcast-quality commercials for brands anywhere in Kenya." },
      { title: "Corporate & Organisational Video", description: "Company films, training and impact videos for businesses, NGOs and institutions across the country." },
      { title: "On-Location Production", description: "Full crews and equipment that travel to your county, your site, your story." },
      { title: "Music & Culture Videos", description: "Music videos and cultural films that capture Kenya beyond the capital." },
      { title: "Multi-Region Campaigns", description: "Coordinated shoots across several locations for national brands and campaigns." },
    ],
    whyUs: [
      "A national outlook: we plan logistics, permits and travel so a shoot upcountry is as smooth as one in Nairobi.",
      "Consistent cinematic quality wherever we film, with the same core creative team.",
      "Deep knowledge of Kenya's locations, light and conditions, from city to bush.",
      "Honest, all-in budgets that account for travel transparently.",
    ],
    process: [
      { step: "01", title: "Discovery", description: "We learn your brand, audience and what the video needs to achieve." },
      { step: "02", title: "Concept & Logistics", description: "Creative concept plus a tight plan for crew, travel and locations." },
      { step: "03", title: "Production", description: "Cinematic shoot days, wherever in the country your story takes us." },
      { step: "04", title: "Post & Delivery", description: "Edit, grade and sound, delivered in every format you need." },
    ],
    faqs: [
      { question: "How much does video production cost in Kenya?", answer: "Video production in Kenya ranges from around Ksh 80,000 for a simple shoot to Ksh 2,000,000+ for a full cinematic campaign. For productions outside Nairobi we quote travel and logistics transparently upfront so there are no surprises." },
      { question: "Do you travel outside Nairobi for shoots?", answer: "Yes. Production anywhere in Kenya is core to what we do. We handle crew travel, equipment transport, permits and local logistics." },
      { question: "Are you based in Nairobi?", answer: "Yes, our base is Nairobi, but we produce across the entire country and East Africa. Wherever the story is, we bring the production to it." },
    ],
    relatedPosts: [
      "best-video-production-companies-nairobi-kenya",
      "why-nairobi-brands-need-video-marketing-2026",
    ],
    keywords: [
      "video production Kenya",
      "video production company Kenya",
      "videographer Kenya",
      "film production Kenya",
      "commercial production Kenya",
    ],
  },
  {
    slug: "ai-video-production-kenya",
    metaTitle: "AI Video Production & AI Commercials in Kenya | Nataka Inc",
    metaDescription:
      "Nataka Inc makes AI commercials, AI music videos, AI characters and VFX on real footage for brands in Nairobi and across Kenya. A real production house running a real AI pipeline. Free 48-hour concept.",
    label: "AI Video Production",
    headline: "AI Video Production",
    headlineAccent: "Made In Nairobi.",
    heroImage: "/ai/aanother/frontman.jpg",
    heroVideo: { src: "/ai/aanother/aanother-feature.mp4", poster: "/ai/aanother/aanother-feature-poster.jpg" },
    heroSummary:
      "AI commercials, AI music videos and AI characters, directed like a film. Proof below: we built a rock band that does not exist and made it three music videos.",
    intro:
      "Nataka Inc is a Nairobi production house that makes AI video for brands, artists and agencies: AI commercials, AI music videos, consistent AI characters, and AI effects composited into footage we shoot for real. Most people selling AI video in Kenya have never run a film set. We have, which is why our AI work is directed like a film, not typed into a prompt box and hoped for. You get shots that would cost a crane, a location permit or a helicopter, at a fraction of a traditional shoot, from a team that knows when AI is the right tool and when a camera still wins.",
    caseStudy: {
      eyebrow: "Case study · Every frame is AI",
      title: "We built a rock band",
      titleAccent: "that doesn't exist.",
      lede:
        "AANOTHER is a four-piece arena rock band: a frontman, a redhead on guitar, a drummer and a platinum-haired bassist. None of them are real. Neither is the crowd, the arena or the pyro. Nataka directed every shot like a film set, kept the same four faces in every frame, and made three music videos with the cut-downs to match.",
      loop: {
        src: "/ai/aanother/aanother-loop.mp4",
        poster: "/ai/aanother/aanother-loop-poster.jpg",
        alt: "AANOTHER, the AI rock band made by Nataka: opening of the I Mean It music video",
        tag: "AANOTHER · I MEAN IT",
        caption: "Opening of the I Mean It music video, upscaled to 4K. Graded as 1980s arena-rock broadcast footage.",
        duration: "PT12S",
      },
      stats: [
        { value: "3", label: "Music videos" },
        { value: "4", label: "AI band members, one face each" },
        { value: "650+", label: "Finished AI shots" },
        { value: "0", label: "Cameras, crews or venues" },
      ],
      stills: [
        { src: "/ai/aanother/lineup.jpg", alt: "AANOTHER on stage: frontman, guitarist, drummer and bassist under a wall of lights", caption: "The line-up" },
        { src: "/ai/aanother/frontman.jpg", alt: "AANOTHER frontman pointing at the crowd mid-song", caption: "On stage" },
        { src: "/ai/aanother/together.jpg", alt: "AANOTHER frontman and bassist in a slow dance on stage", caption: "I Mean It" },
        { src: "/ai/aanother/drum-riser.jpg", alt: "Frontman and redhead guitarist lying on the drum riser", caption: "I Mean It" },
        { src: "/ai/aanother/chain.jpg", alt: "Guitarist pulling the frontman down by his chain", caption: "I Mean It" },
        { src: "/ai/aanother/smile.jpg", alt: "Frontman smiling down at the guitarist by the drum kit", caption: "I Mean It" },
      ],
      published: "2026-10-08",
      verticalsText:
        "Every song ships as a full music video plus vertical cut-downs for Shorts, Reels and TikTok, each opening on its strongest moment.",
      verticals: [
        { src: "/ai/aanother/short-wire.mp4", poster: "/ai/aanother/short-wire-poster.jpg", title: "The wire snaps", meta: "Short · Stay Mad", duration: "PT15S" },
        { src: "/ai/aanother/short-flinch.mp4", poster: "/ai/aanother/short-flinch-poster.jpg", title: "He doesn't flinch", meta: "Short · Say It Again", duration: "PT12S" },
      ],
      forYou: [
        "A brand character who looks the same in your first post and your hundredth, with no talent fee per appearance.",
        "Arenas, stunts, crowds and pyro without a venue, a permit or a crew day.",
        "One production that feeds YouTube, Reels, TikTok and your ads, instead of a single video.",
      ],
      cta: {
        button: "Get a free AI concept for your brand",
        whatsappMessage: "Hi Nataka, I saw AANOTHER on your site and I'd like a free AI concept (code: AIWEB-BAND). The video is for ",
        watchHref: "https://www.youtube.com/@nataka_inc",
        watchLabel: "Watch AANOTHER on YouTube",
      },
      disclosure:
        "AANOTHER is a fictional band created by Nataka. The members, crowds and venues are AI-generated, and the videos carry YouTube's AI label.",
    },
    deliverables: [
      { title: "AI Commercials & Product Films", description: "15 to 60-second spots built from scratch or from a product photo. Impossible locations, weather, scale and camera moves, directed shot by shot with a storyboard you approve before we render." },
      { title: "AI Effects On Real Footage", description: "We shoot your people for real, then add what could never be filmed: destruction, transformations, environment swaps, anime powers. Real faces, real performance, impossible world." },
      { title: "AI Music Videos & Visualizers", description: "Full AI music videos, hybrid performance-plus-AI videos, and looping visualizers for Spotify Canvas, YouTube and TikTok. Built around the track, not a template." },
      { title: "AI Characters & Brand Mascots", description: "A consistent character who looks the same in every frame and every post. For brand ambassadors, series, explainers and mascots that do not need a talent fee per appearance." },
      { title: "AI Series & Micro-Dramas", description: "Episodic vertical stories with recurring characters, written for retention. The format audiences binge, now possible without a studio budget." },
      { title: "Live AI Experiences For Events", description: "AI photo and video booths and live AI mirrors that turn guests into anime heroes or film characters on the spot, delivered to their phone. Built and run by us at Otamatsuri 2026 in Nairobi." },
    ],
    whyUs: [
      "A production house first. We shoot, direct, edit and grade, so AI is one tool in a full pipeline, never the whole trick.",
      "Directed, not generated. Every piece starts with a shot list and storyboard, so you approve the idea before any render time is spent.",
      "Rights handled properly. We only animate real people who have signed a release, and we tell you which tools and licences were used on your work.",
      "Honest about the limits. Hands, text, long dialogue and product labels still fail in AI. We tell you upfront, and shoot those parts for real when needed.",
      "Built for Kenya. Kenyan faces, Kenyan streets, Kenyan light, instead of stock-looking Western defaults.",
    ],
    process: [
      { step: "01", title: "Brief", description: "Tell us the product, the audience and the one feeling the video must leave. WhatsApp is fine." },
      { step: "02", title: "Free Concept (48h)", description: "We send a written concept and a first AI frame so you can see the look before you commit a shilling." },
      { step: "03", title: "Storyboard & Lock", description: "Shot-by-shot storyboard, character sheets and style frames, approved by you." },
      { step: "04", title: "Generate, Shoot & Composite", description: "AI renders, live-action where it beats AI, and compositing that makes the two one film." },
      { step: "05", title: "Edit, Sound & Delivery", description: "Edit, sound design, music and grade, delivered in every format: TV, YouTube, Reels, TikTok, billboard stills." },
    ],
    faqs: [
      { question: "How much does an AI commercial cost in Kenya?", answer: "It depends on length, how many shots and whether we also shoot live footage. A short AI spot usually costs a fraction of an equivalent traditional shoot, because there is no location, crew-day or permit cost for the impossible shots. Send the brief on WhatsApp and we quote within 24 hours, with a free 48-hour concept." },
      { question: "Will people be able to tell it is AI?", answer: "Only if you want them to. We grade and composite AI shots to match real camera footage, and we avoid the things that give AI away: plastic skin, warped hands, melting text. Where AI cannot pass, we shoot that moment for real." },
      { question: "Can you put AI effects on video we already filmed?", answer: "Yes. Effects on real footage is one of our strongest services: send the clip and we add destruction, transformations, new environments or powers while keeping the real people and performance." },
      { question: "Is AI video safe for our brand, legally?", answer: "It is when it is made carefully. Every Nataka AI production follows seven published rules: written consent before any likeness, clear AI labels, a human director on every frame, a frame-by-frame check for AI mistakes, no fake customers, no political deepfakes, and a record of which tools touched your material. Ask for them in your contract.", link: { href: "/ai-standard", label: "Read the Nataka AI Standard" } },
      { question: "Can you create an AI version of our brand ambassador or a real person?", answer: "Only with that person's written consent and a signed release. We will not animate anyone's likeness without it. With consent, we can build a consistent character for campaigns and series." },
      { question: "Who owns the AI video you make for us?", answer: "You do. The finished video is licensed to you for the agreed use, and we document which tools were used so your legal team has a clear record." },
      { question: "Do you work with agencies and clients outside Nairobi?", answer: "Yes. AI production is fully remote-friendly. We work with agencies and brands across Kenya, East Africa and internationally." },
    ],
    relatedPosts: [
      "ai-video-production-kenya-guide",
      "best-video-production-companies-nairobi-kenya",
    ],
    keywords: [
      "AI video production Kenya",
      "AI video production Nairobi",
      "AI commercial Kenya",
      "AI advert agency Nairobi",
      "AI music video Kenya",
      "AI generated video company Kenya",
      "AI marketing agency Nairobi",
      "AI VFX Kenya",
    ],
    cta: {
      headline: "See Your Idea Before You Pay",
      text: "Send us your product, song or campaign on WhatsApp. Within 48 hours we send back a written concept and a first AI frame, free. If you like it, we build the rest.",
      whatsappMessage: "Hi Nataka, I'd like a free AI concept (code: AIWEB). The video is for ",
      button: "Get My Free AI Concept",
    },
  },
  {
    slug: "vfx-ai-video-editing",
    metaTitle: "VFX & AI Video Editing in Kenya | Nataka Inc",
    metaDescription:
      "VFX, motion graphics and AI-enhanced video editing in Kenya, post-production that elevates your footage or builds impossible shots from scratch. Nataka Inc, remote or in Nairobi.",
    label: "VFX & AI Editing",
    headline: "VFX & AI Editing",
    headlineAccent: "Beyond The Shoot.",
    heroImage: "/videos/za-mabuda-still.jpg",
    heroSummary: "Visual effects, colour and AI-enhanced editing that add what the shoot could not.",
    work: ["aanother", "gun-vs-sword"],
    intro:
      "Some of the best shots are never filmed. They're built. Nataka Inc offers VFX, motion graphics and AI-enhanced editing for brands, artists and agencies in Kenya and beyond. Whether you need existing footage elevated, impossible visuals created, or a faster, smarter post-production pipeline, we combine cinematic craft with the latest tools. We work remotely, so location is no limit.",
    deliverables: [
      { title: "VFX & Compositing", description: "Set extensions, clean-ups, object removal and effects that look invisible, or impossible on purpose." },
      { title: "Motion Graphics & Titles", description: "Animated titles, infographics and brand motion that make information beautiful." },
      { title: "AI-Enhanced Editing", description: "AI tools used with a craftsman's eye: upscaling, restoration, faster turnarounds and new creative options, never a shortcut on quality." },
      { title: "Colour Grading", description: "The grade that turns good footage into a film: mood, consistency and cinematic depth." },
      { title: "Edit-Only & Remote Post", description: "Send us your footage from anywhere; we deliver a finished edit. No shoot required." },
    ],
    whyUs: [
      "Cinematic taste plus technical skill: effects in service of the story, not showing off.",
      "Fluent in the newest AI and VFX tools, grounded in real film-craft fundamentals.",
      "Remote-first post-production: we work with clients across Kenya and internationally.",
      "Honest about what AI can and can't do well, so you get results, not hype.",
    ],
    process: [
      { step: "01", title: "Footage Review", description: "We review your material and brief to plan what's possible and what's worth doing." },
      { step: "02", title: "Plan & Look", description: "We agree the look, effects and references before post begins." },
      { step: "03", title: "Post-Production", description: "Edit, VFX, motion graphics and grade, with review rounds included." },
      { step: "04", title: "Review & Delivery", description: "Final files in every format you need, delivered remotely." },
    ],
    faqs: [
      { question: "How much do VFX and video editing cost in Kenya?", answer: "VFX and post-production are usually priced by scope and complexity. A motion-graphics package or full edit can start around Ksh 40,000, while heavy VFX and grading on a campaign runs Ksh 300,000+. Send us the footage and brief for an accurate quote." },
      { question: "Can you edit footage we filmed ourselves?", answer: "Yes. Edit-only and remote post-production are a core service: send us your footage from anywhere and we deliver a finished, graded film." },
      { question: "Do you really use AI in your edits?", answer: "Where it genuinely improves the result: upscaling, restoration, rotoscoping, faster iterations and certain effects. We use AI as a tool in a craftsman's hands, never as an excuse to cut quality." },
    ],
    relatedPosts: [
      "filmmaking-techniques-better-videos",
      "best-video-production-companies-nairobi-kenya",
    ],
    keywords: [
      "VFX video editing Kenya",
      "AI video editing Kenya",
      "motion graphics Nairobi",
      "video post production Kenya",
      "colour grading Nairobi",
    ],
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return servicePages.find((s) => s.slug === slug);
}

export function getAllServices(): ServicePage[] {
  return servicePages;
}
