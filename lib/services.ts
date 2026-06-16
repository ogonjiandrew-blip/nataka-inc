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
  {
    slug: "corporate-video-production-kenya",
    metaTitle: "Corporate Video Production in Kenya | Nataka Inc",
    metaDescription:
      "Corporate video production for Kenyan companies and East African enterprises — brand films, executive profiles, training and internal comms shot to a standard your board will be proud of. Get a quote.",
    label: "Corporate Video",
    headline: "Corporate Video",
    headlineAccent: "Worth Watching.",
    heroImage: "/stills/1/2.jpg",
    intro:
      "Most corporate video in Kenya is forgettable — talking heads, stock music, a logo at the end. Nataka Inc produces corporate films people actually watch to the end. For banks, SACCOs, NGOs, manufacturers and listed companies across Kenya and East Africa, we turn company stories, product lines and annual results into film that earns attention from staff, clients, partners and investors alike.",
    deliverables: [
      { title: "Brand & Company Films", description: "The film that explains who you are and why you matter — for your website, investor decks, AGMs and onboarding." },
      { title: "Executive & Leadership Profiles", description: "CEO messages, founder stories and leadership interviews directed so your people come across as human, credible and in command." },
      { title: "Training & Internal Comms", description: "Onboarding, safety and process videos staff actually retain — far cheaper than repeating the same briefing a hundred times." },
      { title: "CSR & Impact Films", description: "Documentary-style films that prove your impact to donors, regulators and the public — not just claim it." },
      { title: "Results & Annual Report Videos", description: "Financial results and year-in-review films that make the numbers land with shareholders and the market." },
    ],
    whyUs: [
      "Production values that match international agencies — at Nairobi rates, with a team that understands your market.",
      "Discreet, professional crews used to corporate environments, NDAs, factory floors and C-suite schedules.",
      "One accountable partner from script to delivery — no chasing three vendors to finish one video.",
      "We make your budget visible on screen and tell you honestly what each tier buys.",
    ],
    process: [
      { step: "01", title: "Brief & Objectives", description: "We align on audience, message and where the video will live before proposing anything." },
      { step: "02", title: "Script & Treatment", description: "Script, shot list and treatment approved by your team — and legal, if needed — before the shoot." },
      { step: "03", title: "Production", description: "Efficient shoot days planned around your operations, with minimal disruption to the business." },
      { step: "04", title: "Post & Delivery", description: "Edit, grade, motion graphics, subtitles and versions for every platform, with review rounds included." },
    ],
    faqs: [
      { question: "How much does corporate video production cost in Kenya?", answer: "A straightforward corporate video in Kenya typically starts around Ksh 120,000, while a flagship brand film with multiple shoot days and motion graphics can run Ksh 800,000+. Cost depends on shoot days, locations and post-production complexity. We scope to your budget and brief." },
      { question: "Can you shoot at our offices or factory outside Nairobi?", answer: "Yes. We regularly travel across Kenya and East Africa for shoots. Travel and logistics are quoted transparently upfront." },
      { question: "Do you handle scripting and on-screen presenters?", answer: "Yes — scripting, teleprompter, presenter coaching and professional voice-over are all part of what we do. We make non-actors look comfortable on camera." },
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
      "Automotive marketing for car dealerships and motor brands in Kenya — cinematic car films, showroom content, test-drive videos and social campaigns that move metal. Talk to Nataka Inc.",
    label: "Automotive Marketing",
    headline: "Marketing That",
    headlineAccent: "Moves Metal.",
    heroImage: "/stills/3/1.jpg",
    intro:
      "Cars sell on desire, and desire is visual. Nataka Inc builds automotive marketing for dealerships, importers and motor brands across Kenya — cinematic vehicle films, high-volume showroom content, and social campaigns engineered to fill your sales floor with qualified buyers. We make a Ksh 3M SUV look like the Ksh 3M decision it is.",
    deliverables: [
      { title: "Cinematic Vehicle Films", description: "Hero films for new arrivals and flagship models — the kind of footage that makes someone book a test drive from their phone." },
      { title: "Showroom & Stock Content", description: "Fast, consistent, high-volume content for your live inventory, shot to a system so every unit looks its best." },
      { title: "Test-Drive & Review Videos", description: "Walkarounds, feature breakdowns and test-drive films that answer buyer questions before they walk in." },
      { title: "Social & Paid Campaigns", description: "TikTok, Instagram and YouTube campaigns with the targeting and creative to turn views into showroom visits." },
      { title: "Launch & Event Coverage", description: "Model launches, motor shows and dealership events covered and cut for maximum reach." },
    ],
    whyUs: [
      "We understand the Kenyan car buyer — from first-car imports to high-end showrooms — and what makes each segment act.",
      "Cinematic production plus performance marketing in one team: the content and the campaign that sells it.",
      "Systems for high-volume stock content so your inventory never looks flat or inconsistent.",
      "We track to test drives and enquiries, not just views.",
    ],
    process: [
      { step: "01", title: "Audit & Goals", description: "We look at your inventory, your buyers and your current marketing to find the fastest wins." },
      { step: "02", title: "Creative Plan", description: "A content and campaign plan tied to the models and margins that matter most to you." },
      { step: "03", title: "Production", description: "Efficient shoot days at your showroom or on location — multiple vehicles captured per session." },
      { step: "04", title: "Launch & Optimise", description: "We publish, run the paid campaigns and report on enquiries and test drives, then double down on what works." },
    ],
    faqs: [
      { question: "How much does automotive video and marketing cost in Kenya?", answer: "A single cinematic vehicle film typically starts around Ksh 100,000, while an ongoing dealership content-and-campaign retainer ranges from Ksh 150,000 to Ksh 600,000+ per month depending on volume and ad spend. We scope to your inventory and goals." },
      { question: "Can you produce content for our full stock regularly?", answer: "Yes. We build a repeatable shoot system so your live inventory gets consistent, high-quality content at volume — not a one-off shoot that goes stale." },
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
      "Event video production in Nairobi and across Kenya — launches, conferences, concerts and activations covered with multi-camera crews and cut into content that outlives the day. Book Nataka Inc.",
    label: "Event Video",
    headline: "Events That",
    headlineAccent: "Outlive The Day.",
    heroImage: "/stills/2/1.jpg",
    intro:
      "An event lasts hours; the content from it should work for months. Nataka Inc covers launches, conferences, concerts, galas and brand activations across Kenya with multi-camera crews — then turns the footage into highlight films, social cut-downs and recap reels that keep the moment selling long after the lights go down.",
    deliverables: [
      { title: "Multi-Camera Coverage", description: "Full-event capture with multiple operators, so nothing important is missed and every angle is covered." },
      { title: "Highlight & Recap Films", description: "A cinematic 60–120 second highlight film that captures the energy and sells next year's edition." },
      { title: "Same-Day & Social Edits", description: "Fast-turnaround vertical cut-downs for Instagram, TikTok and LinkedIn — sometimes before guests have gone home." },
      { title: "Speaker & Session Recordings", description: "Clean, multi-angle recordings of keynotes and panels for on-demand, training or sponsor value." },
      { title: "Sponsor & Brand Deliverables", description: "Edits built specifically to prove ROI to sponsors and partners." },
    ],
    whyUs: [
      "Crews experienced in live, one-take-only environments — we don't get a second chance and we know it.",
      "Fast turnaround without sacrificing the cinematic look that makes your event feel premium.",
      "We cover the full range — corporate conferences to sold-out concerts — and adapt to each.",
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
      { question: "Can you deliver edits the same day for social media?", answer: "Yes. With the right crew size we can turn around vertical social edits during or immediately after the event — ideal for keeping momentum live." },
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
    metaTitle: "Product Launch Video & Campaigns in Kenya | Nataka Inc",
    metaDescription:
      "Product launch videos and campaigns in Kenya — teasers, hero films and launch-day content that build anticipation and drive sales. Nataka Inc launches products people actually notice.",
    label: "Product Launch",
    headline: "Launches People",
    headlineAccent: "Notice.",
    heroImage: "/stills/1/4.jpg",
    intro:
      "Most product launches in Kenya land with a single post and a shrug. Nataka Inc builds launch campaigns with an arc — tease, reveal, sustain — so your product enters the market with momentum, not silence. From hero films to launch-day social content, we make sure the right people are paying attention the moment you go live.",
    deliverables: [
      { title: "Launch Hero Film", description: "The centrepiece film that defines the product and sets the look and tone for every other asset." },
      { title: "Teaser Campaign", description: "Pre-launch teasers engineered to build anticipation and a waiting audience before day one." },
      { title: "Launch-Day Content Kit", description: "A full set of platform-native assets — reels, stories, posts, thumbnails — ready to deploy across every channel." },
      { title: "Demo & Explainer Videos", description: "Clear, attractive demonstrations that answer 'what is it and why do I want it' in seconds." },
      { title: "Paid Launch Campaign", description: "Targeted paid media to put the launch in front of the exact audience most likely to buy." },
    ],
    whyUs: [
      "We think in campaigns with a beginning, middle and end — not isolated posts that vanish in an hour.",
      "Strategy, film and distribution under one roof, so the launch is coherent from teaser to sale.",
      "Content built for the platforms your buyers actually use, in the formats those platforms reward.",
      "We tie the launch to outcomes — pre-orders, sign-ups, sales — not just reach.",
    ],
    process: [
      { step: "01", title: "Launch Strategy", description: "We define the audience, the message and the campaign arc across the weeks around launch." },
      { step: "02", title: "Production", description: "Hero film, teasers and the full content kit shot in one coordinated production." },
      { step: "03", title: "Rollout", description: "A scheduled teaser-to-launch sequence across organic and paid channels." },
      { step: "04", title: "Sustain & Measure", description: "Post-launch content and reporting to hold momentum and prove results." },
    ],
    faqs: [
      { question: "How much does a product launch campaign cost in Kenya?", answer: "A focused launch film starts around Ksh 150,000, while a full teaser-to-launch campaign with paid media typically runs Ksh 400,000 to Ksh 1,500,000+ depending on scope and ad spend. We build the campaign to your budget and goals." },
      { question: "How far ahead should we start before launch day?", answer: "Ideally 4–6 weeks, so there's time to build a teaser sequence and an audience before the reveal. We can compress this for tighter timelines." },
      { question: "Can you handle both the content and the advertising?", answer: "Yes — we produce the campaign and run the paid media behind it, so the whole launch is coordinated and accountable to one team." },
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
    metaTitle: "Social Media Marketing Agency in Kenya | Nataka Inc",
    metaDescription:
      "Social media marketing for Kenyan brands — content systems, short-form video, community management and paid social that turn followers into customers. Nataka Inc runs socials that sell.",
    label: "Social Media Marketing",
    headline: "Social That",
    headlineAccent: "Sells.",
    heroImage: "/stills/4/p1.jpg",
    intro:
      "Followers are not the goal — customers are. Nataka Inc runs social media for Kenyan brands as a system, not a guessing game: a content engine of scroll-stopping short-form video, consistent posting, real community management and paid social that turns attention into enquiries. With a film production team behind every post, your feed finally looks like the brand you actually are.",
    deliverables: [
      { title: "Content Systems", description: "A monthly engine of platform-native video and photography, planned and produced so your channels are never empty or off-brand." },
      { title: "Short-Form Video", description: "TikToks, Reels and Shorts built to be watched, saved and shared — the format that actually grows accounts in 2026." },
      { title: "Community Management", description: "Replies, DMs and comment moderation handled in your voice, so engagement turns into relationships and sales." },
      { title: "Paid Social", description: "Meta and TikTok ad campaigns engineered for leads and sales, not vanity metrics." },
      { title: "Analytics & Reporting", description: "Monthly reporting on what's working and what to do next — in plain language, tied to business goals." },
    ],
    whyUs: [
      "Our content team is a film production company — your short-form will outshine competitors shooting on a phone.",
      "We know the Kenyan feed: the trends, sounds, humour and timing that actually travel here.",
      "One team for strategy, content and ads — no disconnect between what's posted and what's promoted.",
      "We optimise toward enquiries and sales, and report on them honestly.",
    ],
    process: [
      { step: "01", title: "Audit & Strategy", description: "We assess your channels and audience and build a platform strategy around your goals." },
      { step: "02", title: "Content Engine", description: "A production calendar and shoot rhythm that keeps your channels consistently excellent." },
      { step: "03", title: "Publish & Engage", description: "Posting, community management and paid amplification working together." },
      { step: "04", title: "Optimise", description: "Monthly reporting and adjustments based on what's actually driving results." },
    ],
    faqs: [
      { question: "How much does social media marketing cost in Kenya?", answer: "Social media retainers at Nataka Inc typically range from Ksh 50,000 per month for a focused single-platform package to Ksh 350,000+ for full-service content production, community management and paid social. We scope to your goals." },
      { question: "Which platforms should my Kenyan brand focus on?", answer: "For most consumer brands, TikTok and Instagram drive the most growth; LinkedIn wins for B2B. We help you focus on the two or three platforms where your audience actually is and win there, rather than spreading thin." },
      { question: "Do you create the content or just schedule it?", answer: "We create it. Strategy, filming, editing, copy and scheduling are all in-house — that's the difference between a feed that grows and one that just stays busy." },
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
    metaTitle: "Influencer Marketing Agency in Kenya | Nataka Inc",
    metaDescription:
      "Influencer and creator marketing in Kenya — matched creators, managed campaigns and content that converts. Nataka Inc runs influencer campaigns built on results, not just reach.",
    label: "Influencer Marketing",
    headline: "Creators Who",
    headlineAccent: "Actually Convert.",
    heroImage: "/stills/ssaru/1.jpg",
    intro:
      "Anyone can pay a creator to hold up a product. Nataka Inc runs influencer marketing in Kenya as a campaign with strategy behind it — the right creators for your audience, briefs that protect your brand, content that fits each platform, and measurement that tells you what it actually did for sales. We have the cultural relationships and the production muscle to make creator campaigns work.",
    deliverables: [
      { title: "Creator Matching", description: "We identify and vet creators whose audience and tone genuinely fit your brand — not just whoever has the biggest follower count." },
      { title: "Campaign Management", description: "Outreach, negotiation, contracts, briefs and timelines handled end-to-end, so you don't chase creators." },
      { title: "Branded Content Production", description: "We produce or co-produce content with creators so it meets your brand standard and the platform's." },
      { title: "Whitelisting & Amplification", description: "Turn the best creator content into paid ads from the creator's handle for far better performance." },
      { title: "Reporting & ROI", description: "Clear measurement of reach, engagement and conversions — so you know which creators to keep." },
    ],
    whyUs: [
      "Real relationships across Kenyan music, comedy, fashion and lifestyle creators — we've worked with names like Ssaru and Mulamwah.",
      "We protect your brand with proper briefs, contracts and approvals — no off-brand surprises.",
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
      { question: "How do you choose the right influencers?", answer: "We start from your audience, not the creator's follower count — matching tone, audience overlap and authenticity, then vetting engagement quality before recommending anyone." },
      { question: "Can you manage the whole campaign?", answer: "Yes — from creator sourcing and contracts to content approval, posting and reporting. You get one accountable team instead of managing creators yourself." },
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
    metaTitle: "Creative Agency in Nairobi, Kenya | Nataka Inc",
    metaDescription:
      "Nataka Inc is a full-service creative agency in Nairobi — strategy, film, design and campaigns for brands that refuse to blend in. One team from idea to execution across East Africa.",
    label: "Creative Agency",
    headline: "A Creative Agency",
    headlineAccent: "Built Different.",
    heroImage: "/stills/1/27.jpg",
    intro:
      "A creative agency should give you ideas and the ability to make them real. Most in Nairobi do one or the other. Nataka Inc does both — strategy, film, design and distribution under one roof, so the big idea doesn't get watered down on its way to the screen. We partner with brands across Kenya and East Africa that would rather be unmistakable than safe.",
    deliverables: [
      { title: "Creative Strategy", description: "The thinking that makes everything else work — positioning, campaign ideas and the insight underneath them." },
      { title: "Film & Photography", description: "In-house cinematic production and editorial photography, so your ideas are executed to a global standard." },
      { title: "Design & Identity", description: "Visual identity, campaign design and brand systems that hold together across every touchpoint." },
      { title: "Integrated Campaigns", description: "Campaigns that run across film, social, paid and PR — coordinated, not fragmented." },
      { title: "Always-On Content", description: "Ongoing content partnerships that keep your brand consistently excellent, not just at launch." },
    ],
    whyUs: [
      "Idea and execution in one team — no creative lost in translation between agency and production house.",
      "Cinematic production capability most Nairobi agencies have to outsource.",
      "Rooted in East African culture, built to global creative standards.",
      "We ask the hard questions and tell you the truth — clarity beats comfort.",
    ],
    process: [
      { step: "01", title: "Discovery", description: "We learn your brand, market and ambition before proposing anything." },
      { step: "02", title: "The Big Idea", description: "A creative platform and campaign ideas built on a real insight." },
      { step: "03", title: "Make", description: "Film, design and content produced in-house to the standard the idea deserves." },
      { step: "04", title: "Launch & Grow", description: "Distribution across channels and ongoing partnership to keep momentum." },
    ],
    faqs: [
      { question: "What does a creative agency in Nairobi cost?", answer: "It depends on scope. Project work at Nataka Inc ranges from focused engagements around Ksh 150,000 to integrated campaigns of Ksh 1,000,000+. Many clients work with us on monthly retainers. We scope honestly to your goals and budget." },
      { question: "What makes Nataka different from other Nairobi agencies?", answer: "We're a creative agency and a film production company in one. The team that has the idea also shoots, edits and ships it — so quality and intent survive all the way to the final cut." },
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
    metaTitle: "Brand Video Production in Kenya | Nataka Inc",
    metaDescription:
      "Brand video production in Kenya — cinematic brand films that make people feel something and remember you. Nataka Inc builds the film at the heart of your brand. Get a quote.",
    label: "Brand Video",
    headline: "Brand Films That",
    headlineAccent: "Make You Feel.",
    heroImage: "/stills/1/8.jpg",
    intro:
      "A brand video isn't a product demo — it's the film that makes someone feel who you are before they ever buy. Nataka Inc produces cinematic brand films for Kenyan companies and challengers across East Africa: emotive, story-led films built for your homepage, your launch, your pitch and your socials. Functionality is for the spec sheet; brand films are for the heart.",
    deliverables: [
      { title: "Brand Story Films", description: "The emotive hero film that captures who you are and why you exist — your most-used asset for years." },
      { title: "Manifesto & Campaign Films", description: "Bold, idea-led films built around a single powerful message for a campaign or moment." },
      { title: "Founder & Origin Stories", description: "The human story behind the brand, told with cinematic craft instead of a flat interview." },
      { title: "Brand Social Cut-Downs", description: "Vertical and short-form edits of the brand film, built for the feed where most people will meet you." },
      { title: "Recurring Brand Content", description: "Ongoing brand-led content so the feeling carries beyond a single film." },
    ],
    whyUs: [
      "We lead with emotion and story, not features — because that's what makes a brand stick.",
      "Cinematic craft end-to-end: direction, cinematography, grade and sound that rival global work.",
      "Strategy in the same building means the film actually says the right thing, beautifully.",
      "African stories told to a world-class standard — not imported clichés.",
    ],
    process: [
      { step: "01", title: "Brand Immersion", description: "We get under the skin of your brand, audience and the feeling you want to create." },
      { step: "02", title: "Concept & Script", description: "A story-led concept, script and treatment approved before the shoot." },
      { step: "03", title: "Production", description: "A full cinematic shoot — direction, cinematography, art and sound." },
      { step: "04", title: "Post & Delivery", description: "Edit, grade, sound design and cut-downs for every channel you need." },
    ],
    faqs: [
      { question: "How much does a brand film cost in Kenya?", answer: "A cinematic brand film in Kenya typically ranges from Ksh 200,000 for a focused single-day production to Ksh 1,500,000+ for a flagship film with multiple locations and full post-production. We scope to your ambition and budget." },
      { question: "What's the difference between a brand film and a corporate video?", answer: "A corporate video usually informs — products, processes, results. A brand film makes you feel something about the company. We do both, but brand films are where we make audiences care, not just understand." },
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
      "Nataka Inc is a video production company serving all of Kenya — brand films, commercials, corporate and music videos produced in Nairobi and on location across the country. Get a quote.",
    label: "Video Production Kenya",
    headline: "Video Production",
    headlineAccent: "Across Kenya.",
    heroImage: "/stills/1/6.jpg",
    intro:
      "Great video shouldn't require a Nairobi address. Nataka Inc is a full-service video production company that works across all of Kenya — from the capital to the coast, the Rift Valley to the lakeside counties. Brand films, commercials, corporate video and music videos, produced to a cinematic standard wherever your story lives. One national team, one consistent quality, on location anywhere in the country.",
    deliverables: [
      { title: "Brand Films & Commercials", description: "Cinematic films and broadcast-quality commercials for brands anywhere in Kenya." },
      { title: "Corporate & Organisational Video", description: "Company films, training and impact videos for businesses, NGOs and institutions across the country." },
      { title: "On-Location Production", description: "Full crews and equipment that travel to your county, your site, your story." },
      { title: "Music & Culture Videos", description: "Music videos and cultural films that capture Kenya beyond the capital." },
      { title: "Multi-Region Campaigns", description: "Coordinated shoots across several locations for national brands and campaigns." },
    ],
    whyUs: [
      "A national outlook — we plan logistics, permits and travel so a shoot upcountry is as smooth as one in Nairobi.",
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
      { question: "Do you travel outside Nairobi for shoots?", answer: "Yes — production anywhere in Kenya is core to what we do. We handle crew travel, equipment transport, permits and local logistics." },
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
    slug: "vfx-ai-video-editing",
    metaTitle: "VFX & AI Video Editing in Kenya | Nataka Inc",
    metaDescription:
      "VFX, motion graphics and AI-enhanced video editing in Kenya — post-production that elevates your footage or builds impossible shots from scratch. Nataka Inc, remote or in Nairobi.",
    label: "VFX & AI Editing",
    headline: "VFX & AI Editing",
    headlineAccent: "Beyond The Shoot.",
    heroImage: "/stills/ai/studio.png",
    intro:
      "Some of the best shots are never filmed — they're built. Nataka Inc offers VFX, motion graphics and AI-enhanced editing for brands, artists and agencies in Kenya and beyond. Whether you need existing footage elevated, impossible visuals created, or a faster, smarter post-production pipeline, we combine cinematic craft with the latest tools — and we work remotely, so location is no limit.",
    deliverables: [
      { title: "VFX & Compositing", description: "Set extensions, clean-ups, object removal and effects that look invisible — or impossible, on purpose." },
      { title: "Motion Graphics & Titles", description: "Animated titles, infographics and brand motion that make information beautiful." },
      { title: "AI-Enhanced Editing", description: "AI tools used with a craftsman's eye — upscaling, restoration, faster turnarounds and new creative options, never a shortcut on quality." },
      { title: "Colour Grading", description: "The grade that turns good footage into a film — mood, consistency and cinematic depth." },
      { title: "Edit-Only & Remote Post", description: "Send us your footage from anywhere; we deliver a finished edit. No shoot required." },
    ],
    whyUs: [
      "Cinematic taste plus technical skill — effects in service of the story, not showing off.",
      "Fluent in the newest AI and VFX tools, grounded in real film-craft fundamentals.",
      "Remote-first post-production — we work with clients across Kenya and internationally.",
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
      { question: "Can you edit footage we filmed ourselves?", answer: "Yes. Edit-only and remote post-production are a core service — send us your footage from anywhere and we deliver a finished, graded film." },
      { question: "Do you really use AI in your edits?", answer: "Where it genuinely improves the result — upscaling, restoration, rotoscoping, faster iterations and certain effects. We use AI as a tool in a craftsman's hands, never as an excuse to cut quality." },
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
