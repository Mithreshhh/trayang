/**
 * Single place to edit all Trayang site content and image paths.
 * Glyph names refer to the overlap artwork in components/Glyph.tsx.
 */

const img = (name: string) => `/images/${name}`;

export const brand = {
  name: "Trayang",
  wordmark: "TRAYANG",
  signoff: "TRAYANG · RISE BEYOND",
  motto: ["Think clearly.", "Build purposefully.", "Move forward."],
  tagline: "We build brands. We move businesses forward.",
  description:
    "Trayang brings strategy, creativity and execution together to help businesses, startups and creators build their identity, reach the right audiences and grow with purpose.",
};

export const contact = {
  email: "hello@trayang.com",
};

export const images = {
  studio: img("artisan-studio.webp"), // team working across a moodboard table
  growth: img("gift-service.webp"), // gold growth bars on a desk
  emblem: img("emblem.svg"), // gold diamond, scaled to fill the screen behind the carousel
};

export const navLinks = [
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "FAQs", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
];

export const primaryCta = { label: "Plan your growth", href: "/contact/" };

/** The four pillars, used in the hero band and the services index. */
export const pillars = [
  { label: "Consulting and startup support", glyph: "consulting" },
  { label: "Branding and creative", glyph: "branding" },
  { label: "Marketing and customer acquisition", glyph: "marketing" },
  { label: "Influencer management and events", glyph: "influence" },
] as const;

/** Stage 1: hero */
export const hero = {
  lines: [
    { text: "We build brands.", ink: "brown" },
    { text: "We move businesses forward.", ink: "gold" },
  ],
  body: brand.description,
  secondary: { label: "Explore services", href: "/services/" },
  passes: ["Strategy", "Creativity", "Execution"],
};

/** Stage 2: the five purpose lines, one at a time along the registration dots. */
export const connect = {
  heading: { before: "Creative with a ", highlight: "commercial purpose", after: "." },
  points: [
    { id: "direction", icon: "compass", desc: "Strategy that turns ambition into direction." },
    { id: "apart", icon: "diamond", desc: "Brands built to stand apart." },
    { id: "forward", icon: "arrow", desc: "Marketing that moves business forward." },
    { id: "ideas", icon: "blocks", desc: "Ideas turned into businesses." },
    { id: "influence", icon: "spark", desc: "Influence and experiences that create opportunity." },
  ],
};

/** Stage 3: the emblem zooms in to become the gold backdrop of the carousel. */
export const featuresIntro = {
  headingDown: { before: "From the first idea to the final execution, ", highlight: "every move has a purpose", after: "." },
  headingUp: { before: "We connect strategy, creativity and execution so ", highlight: "every part moves in the same direction", after: "." },
  bottom: { before: "Growth, ", highlight: "built with purpose", after: "." },
};

/** Stage 4: one screen of scroll per capability. */
export const carousel = {
  heading: "Think clearly. Build purposefully. Move forward.",
  cards: [
    {
      title: "Business & Brand Strategy",
      lead: "Build with clarity. Grow with purpose.",
      body: "We turn business ideas into clear direction through audience research, market positioning and strategic planning that aligns your brand with your goals.",
      glyph: "strategy",
    },
    {
      title: "Branding & Visual Identity",
      lead: "Become a brand people remember.",
      body: "We create distinctive brand identities through logo design, typography, colour systems and brand guidelines that bring consistency to every touchpoint.",
      glyph: "identity",
    },
    {
      title: "Creative & Content",
      lead: "Turn ideas into attention.",
      body: "From campaign concepts and copywriting to social creatives and brand storytelling, we develop content that captures interest and communicates your value.",
      glyph: "content",
    },
    {
      title: "Website & Digital Presence",
      lead: "Make your first impression count.",
      body: "We build clear, responsive business websites and digital touchpoints that communicate your value, strengthen credibility and guide visitors towards action.",
      glyph: "website",
    },
    {
      title: "Social Media & Community",
      lead: "Build a presence worth following.",
      body: "We plan social media content, create platform-ready creatives and shape consistent communication that helps your business stay relevant and connected to its audience.",
      glyph: "social",
    },
    {
      title: "Digital Marketing & Advertising",
      lead: "Reach the people who matter.",
      body: "We develop targeted digital marketing and advertising campaigns to increase brand awareness, attract relevant audiences and generate meaningful business enquiries.",
      glyph: "advertising",
    },
    {
      title: "Business Launch & Go-to-Market",
      lead: "Turn your idea into a market-ready business.",
      body: "We help shape your launch strategy, define your target audience, coordinate your brand and marketing essentials, and prepare your business to enter the market.",
      glyph: "launch",
    },
    {
      title: "Market Research & Opportunity",
      lead: "Understand the market before you move.",
      body: "We help businesses explore customer needs, competitor positioning, market demand and location opportunities to make better-informed decisions.",
      glyph: "research",
    },
    {
      title: "Business Growth & Optimisation",
      lead: "Build better. Learn faster. Grow smarter.",
      body: "We identify opportunities to improve your marketing and business performance through practical recommendations, performance reviews and continuous refinement.",
      glyph: "growth",
    },
    {
      title: "Influencer & Creator Management",
      lead: "Turn your influence into opportunity.",
      body: "We help creators build their personal brand, manage their social media presence, grow their audience and develop meaningful brand partnerships.",
      glyph: "creator",
    },
  ],
};

/** Stage 5: four touchpoint prints fan out, then fly off as the statement reads. */
export const showcase = {
  heading: "One brand. Every touchpoint connected.",
  desc: "Strategy, creativity and execution—working together to move your business forward.",
  detail1: "We connect brand thinking, campaign creative, digital experience and performance so each part strengthens the next. ",
  detail2: "The result is marketing that feels consistent to your audience and accountable to your business.",
};

/** Stage 6 */
export const questions = {
  heading: "Have questions? Let's make things clear.",
  body: "From our services and process to timelines, pricing and getting started, find the answers you need before taking the next step.",
  button: "Explore FAQs",
  href: "/faq/",
  preview: ["working-together", "timelines", "getting-started"],
};

export const footer = {
  heading: { before: "Let's build ", highlight: "what comes next", after: "." },
  body: "Whether you're launching an idea, building a brand or looking for new ways to grow, let's explore the right next step together.",
  columns: [
    {
      heading: "Company",
      items: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about/" },
        { label: "Contact", href: "/contact/" },
      ],
    },
    {
      heading: "Services",
      items: [
        { label: "Marketing", href: "/services/#marketing" },
        { label: "Branding & Creative", href: "/services/#branding" },
        { label: "Business Consulting", href: "/services/#consulting" },
        { label: "Startup Support", href: "/services/#startup" },
        { label: "Creator Management", href: "/services/#creators" },
        { label: "Events & Activations", href: "/services/#events" },
      ],
    },
    {
      heading: "Info",
      items: [
        { label: "FAQs", href: "/faq/" },
        { label: "Terms & Conditions", href: "/terms/" },
        { label: "Privacy Policy", href: "/privacy/" },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Supporting pages                                                    */
/* ------------------------------------------------------------------ */

export const about = {
  title: "Clear thinking. Distinctive brands. Meaningful growth.",
  intro:
    "Trayang brings strategy, creativity and execution together to help businesses, startups and creators build their identity, reach the right audiences and grow with purpose.",
  scope:
    "We work across marketing, branding, business consulting, startup support, creator management and brand experiences—connecting the right ideas and solutions to the goals that matter.",
  principles: [
    {
      label: "How we think",
      title: "Start with the real opportunity.",
      body: "We begin by understanding the business, the audience and the challenge before identifying the right approach. Because effective solutions start with asking the right questions.",
      pass: "Strategy",
    },
    {
      label: "How we work",
      title: "Strategy and creativity, working together.",
      body: "From developing business ideas and building brands to executing campaigns and managing creator partnerships, we connect strategic thinking with purposeful execution.",
      pass: "Creativity",
    },
    {
      label: "What we value",
      title: "Clarity, craft and accountability.",
      body: "We believe in thoughtful decisions, purposeful creative work, honest communication and clear expectations at every stage.",
      pass: "Execution",
    },
  ],
  purpose: {
    title: "Creative with a commercial purpose.",
    body: "Every idea should do more than look good. It should strengthen your brand, connect with the right audience or move your business towards a meaningful goal.",
    lines: [
      "Creative with a commercial purpose.",
      "Strategy that turns ambition into direction.",
      "Brands built to stand apart.",
      "Marketing that moves business forward.",
      "Ideas turned into businesses.",
      "Influence and experiences that create opportunity.",
    ],
    closing: "From the first idea to the final execution, every move has a purpose.",
  },
  statement: "From building your brand to growing your business, every decision starts with your goals.",
  cta: {
    title: "Let's build what comes next.",
    body: "Whether you're launching an idea, building a brand or looking for new ways to grow, let's explore the right next step together.",
  },
};

export const services = {
  title: "The strategy, creativity and expertise to move your business forward.",
  intro:
    "From building a brand and launching a business to reaching new customers and growing a creator's presence, Trayang brings the right capabilities together to help you take the next step.",
  pillars: [
    {
      id: "marketing",
      name: "Marketing",
      title: "Get seen. Get chosen. Grow.",
      body: "Integrated marketing that helps businesses build visibility, connect with the right audience and turn attention into action. From websites and content to SEO, campaigns, sales and e-commerce growth, we connect the pieces around your goals.",
      glyph: "marketing",
    },
    {
      id: "branding",
      name: "Branding & Creative",
      title: "Build a brand people remember.",
      body: "Develop a distinctive identity through brand strategy, positioning, naming, visual identity, messaging and creative direction that makes your business recognisable and relevant.",
      glyph: "branding",
    },
    {
      id: "consulting",
      name: "Business Consulting",
      title: "Find clarity. Make better moves.",
      body: "Make informed business decisions through market research, strategic planning, business model development, competitive positioning and growth recommendations.",
      glyph: "consulting",
    },
    {
      id: "startup",
      name: "Startup Support",
      title: "Turn your idea into a business.",
      body: "Get support across idea validation, business planning, branding, launch strategy, market entry and early-stage marketing to move from concept towards launch.",
      glyph: "launch",
    },
    {
      id: "creators",
      name: "Influencer & Creator Management",
      title: "Build your influence into an opportunity.",
      body: "Help creators develop their identity, manage their social presence, plan content, grow their audience, pursue brand partnerships and build monetisation opportunities.",
      glyph: "influence",
    },
    {
      id: "events",
      name: "Events & Activations",
      title: "Bring your brand to life.",
      body: "Create meaningful audience experiences through product launches, brand activations, promotional events, creator collaborations and on-ground marketing.",
      glyph: "events",
    },
  ],
  detailTitle: "Every capability, connected.",
  detailIntro: "We connect strategy, creativity and execution so every part moves in the same direction.",
  /** The ten capabilities (carousel.cards, by title) grouped under the three passes. */
  capabilityGroups: [
    { pass: "Strategy", titles: ["Business & Brand Strategy", "Market Research & Opportunity", "Business Launch & Go-to-Market", "Business Growth & Optimisation"] },
    { pass: "Creativity", titles: ["Branding & Visual Identity", "Creative & Content", "Influencer & Creator Management"] },
    { pass: "Execution", titles: ["Website & Digital Presence", "Social Media & Community", "Digital Marketing & Advertising"] },
  ],
  cta: {
    title: "Have a goal in mind? Let's make a plan.",
    body: "Tell us what you're building, what you're trying to solve or where you want to grow.",
  },
};

export const contactPage = {
  title: "Let's build your next opportunity.",
  intro:
    "Tell us what you're working towards, what challenges you're facing or what you'd like to create. We'll explore how TRAYANG can help you move forward.",
  details: [
    {
      title: "Tell us a little about your goals.",
      body: "Share your business or idea, the support you're looking for, your timeline and your approximate budget. If you have a website or social profile, include the link so we can understand your needs better.",
    },
    {
      title: "A conversation with a clear direction.",
      body: "We'll review your enquiry, ask any necessary questions and discuss the most suitable next steps, scope and priorities.",
    },
  ],
  cta: {
    title: "Ready to get started?",
    body: "Have a question or a project in mind? We'd love to hear from you.",
    button: "Email TRAYANG",
  },
};

/** Options offered in the enquiry form. */
export const enquiry = {
  support: ["Marketing", "Branding & Creative", "Business Consulting", "Startup Support", "Creator Management", "Events & Activations", "Not sure yet"],
  timelines: ["As soon as possible", "Within 1–3 months", "In 3–6 months", "Just exploring"],
};

export const faq = {
  title: "The useful details, upfront.",
  intro: "A quick guide to our services, project scope, timelines, pricing and how working with TRAYANG begins.",
  items: [
    {
      id: "working-together",
      topic: "Working together",
      q: "Do you offer projects or ongoing partnerships?",
      a: "Both. Some engagements have a defined scope and timeline, while ongoing marketing, content and optimisation can be structured as continuing partnerships. We recommend the approach that best fits your goals.",
    },
    {
      id: "who-we-help",
      topic: "Who we help",
      q: "What kinds of businesses do you work with?",
      a: "We work with startups, growing businesses, established brands and creators. Our approach depends on your stage, audience, challenges and objectives.",
    },
    {
      id: "timelines",
      topic: "Timelines",
      q: "How long does a project take?",
      a: "Timelines depend on the scope, complexity and deliverables. Once we understand your requirements, we'll outline a realistic schedule, key milestones and next steps.",
    },
    {
      id: "collaboration",
      topic: "Collaboration",
      q: "Can you work with our existing team?",
      a: "Yes. We can collaborate with your internal marketing, sales, product or operations teams, with responsibilities and communication agreed at the outset.",
    },
    {
      id: "measuring-progress",
      topic: "Measuring progress",
      q: "How do you measure success?",
      a: "We define suitable measures around the engagement's goals. Depending on the work, these may include brand awareness, audience engagement, qualified enquiries, conversions, launch readiness or business performance.",
    },
    {
      id: "getting-started",
      topic: "Getting started",
      q: "What do you need to prepare a proposal?",
      a: "Start with your business or idea, what you want to achieve, the support you need and your expected timeline. An indicative budget is helpful too, but you don't need a complete brief to start a conversation.",
    },
  ],
  cta: {
    title: "Tell us where you want to grow.",
    body: "Share your goals, challenges and what you have in mind. We'll explore the right next steps together.",
    button: "Start a conversation",
  },
};

export const terms = {
  title: "A clear basis for working together.",
  intro:
    "These plain-language terms explain how enquiries, proposals and service engagements are handled. The specific terms for each project will be confirmed in its proposal or agreement.",
  sections: [
    {
      title: "Proposals and payment",
      body: "Each proposal will specify its validity period, fees, payment schedule and any advance payment required. Work begins once the proposal has been accepted, the agreed initial payment has been received, and the necessary project information is available.",
    },
    {
      title: "Scope and changes",
      body: "The proposal will define the agreed deliverables, responsibilities and included revisions. Requests outside the agreed scope may require additional fees or a revised timeline, subject to mutual approval.",
    },
    {
      title: "Timelines and approvals",
      body: "Delivery dates depend on timely feedback, approvals and materials from everyone involved. Delays in receiving these may affect the schedule, and any revised dates will be communicated.",
    },
    {
      title: "Intellectual property",
      body: "Ownership, usage rights, third-party assets and the transfer of final deliverables will be specified in the project agreement. Any transfer or licence will follow the agreed terms, including applicable payment conditions.",
    },
  ],
};

export const privacy = {
  title: "Your information stays purposeful.",
  intro:
    "We use the information you share to respond to enquiries, manage our working relationship, deliver agreed services and improve your experience with TRAYANG.",
  sections: [
    {
      title: "Information we receive",
      body: "We may receive your name, contact details, company information and details about your business or project when you contact us, request a proposal or engage our services. We may also collect basic technical information through the website, depending on the tools in use.",
    },
    {
      title: "How we use it",
      body: "We use information to respond to enquiries, understand your requirements, prepare proposals, deliver services, communicate updates, provide support and meet applicable legal obligations. We use it for other purposes only where permitted and, when required, with your consent.",
    },
    {
      title: "Sharing and retention",
      body: "We may share relevant information with service providers who help operate our website or deliver agreed services, where appropriate safeguards apply. We retain information only for as long as needed for the stated purposes, contractual obligations and applicable legal requirements.",
    },
    {
      title: "Your choices",
      body: "You may contact us to ask about your personal information or request access, correction or deletion where applicable. Some information may need to be retained to meet legal or contractual obligations. We will handle requests in accordance with applicable law.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Proof slots: each block renders only once it has real entries.      */
/* Never add placeholder or invented clients, results or quotes.        */
/* ------------------------------------------------------------------ */

export const proof: {
  clients: Array<{ name: string; logo?: string; href?: string }>;
  caseStudies: Array<{ client: string; title: string; summary: string; href?: string }>;
  testimonials: Array<{ quote: string; name: string; role: string }>;
} = {
  clients: [],
  caseStudies: [],
  testimonials: [],
};

// Add only verified Trayang profiles, e.g. { label: "Instagram", href: "https://instagram.com/..." }.
export const socialLinks: Array<{ label: string; href: string }> = [];

export const copyright = `© ${new Date().getFullYear()} Trayang. All rights reserved.`;
