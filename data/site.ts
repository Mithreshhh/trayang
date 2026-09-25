/**
 * Single place to edit all Trayang site content and image paths.
 * Drop your real images into /public/images and update the paths below
 * (any format works; README lists the size each slot expects).
 */

const img = (name: string) => `/images/${name}`;

export const brand = {
  name: "Trayang",
  tagline: "Strategy that moves brands forward.",
  description:
    "Trayang is a full-service marketing studio helping ambitious brands clarify their story, reach the right audience and turn attention into growth.",
};

export const contact = {
  email: "hello@trayang.com",
  address: "India",
};

export const images = {
  // navbar / footer
  logo: img("logo.svg"), // "Trayang" wordmark, gold on brown
  footerLogo: img("footer-logo.svg"),
  // hero
  ctaIcon: img("cta-icon.svg"), // small dark arrow inside the gold pill
  heroShowcase: img("hero-lifestyle.webp"),
  bgGradient: img("bg-gradient.svg"), // blurred gold glow behind the hero
  // "Crafted beyond Expectations" section
  showcaseLeft: img("artisan-studio.webp"),
  showcaseRight: img("gift-service.webp"),
  // signature services intro
  introBg: img("artisan-studio.webp"),
  introBg2: img("gift-service.webp"),
  ellipse: img("ellipse.svg"), // glossy cream sphere
  emblem: img("emblem.svg"), // gold emblem (scaled ~137x to fill the screen)
  // questions
  question: img("question.svg"),
  // chrome
  scrollTop: img("scroll-top.svg"),
  mail: img("mail.svg"),
  phone: img("phone.svg"),
  whatsapp: img("whatsapp.svg"),
  instagram: img("instagram.svg"),
  facebook: img("fb.svg"),
  linkedin: img("linkedin.svg"),
  youtube: img("youtube.svg"),
  // contact overlay
  contactIllustration: img("contact-illustration.svg"),
  close: img("close.svg"),
};

export const navLinks = [
  { label: "About Us", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Contact Us", href: "/contact/" },
  { label: "Get a Quote", href: "#contact" }, // last link is the highlighted pill; #contact opens the enquiry card
];

export const bannerMessage = "Now accepting campaign and brand-growth projects for Q4";

/** Stage 1: hero */
export const hero = {
  heading: { before: "Marketing that turns ", highlight: "attention into momentum", after: "." },
  cta: "Plan your growth",
  /** Shown one line at a time; the last item repeats the first so the ticker loops. */
  points: [
    "Brand strategy built around real business goals",
    "Campaigns designed to reach and convert",
    "Creative content with a clear job to do",
    "Reporting that turns data into the next move",
    "Brand strategy built around real business goals",
  ],
};

/** Stage 2: two visuals slide in, then four promise points pop in one by one. */
export const connect = {
  heading: { before: "Creative with a ", highlight: "commercial purpose", after: "" },
  points: [
    { id: "quality", icon: img("point-quality.svg"), desc: "A clear strategy connects every channel, campaign and creative decision" },
    { id: "service", icon: img("point-service.svg"), desc: "One collaborative team from positioning and content to launch and optimisation" },
    { id: "trust", icon: img("point-trust.svg"), desc: "Transparent scope, practical timelines and reporting you can actually use" },
    { id: "delivery", icon: img("point-delivery.svg"), desc: "Fast, thoughtful execution without losing sight of the long-term brand" },
  ],
};

/** Stage 3: the emblem zooms in to become the gold backdrop of the carousel. */
export const featuresIntro = {
  headingDown: { before: "From first insight to final report, ", highlight: "every move connects", after: "." },
  headingUp: { before: "The right mix of ", highlight: "strategy, creative and growth", after: "." },
  bottom: { before: "Growth, shaped by ", highlight: "Trayang", after: "" },
};

/** Stage 4: one screen of scroll per card. `lead` is dark, `rest` is muted. */
export const carousel = {
  heading: "Capabilities built around growth",
  cards: [
    { title: "Brand Strategy", lead: "Know what you stand for.", rest: "Positioning, audience and messaging that make every channel clearer.", image: img("card-consultation.svg") },
    { title: "Visual Identity", lead: "Look as strong as your ambition.", rest: "Identity systems designed for recognition, consistency and growth.", image: img("card-collections.svg") },
    { title: "Content & Creative", lead: "Make every idea earn attention.", rest: "Campaign concepts, social content and brand storytelling with purpose.", image: img("card-design.svg") },
    { title: "Web Experiences", lead: "Turn visits into action.", rest: "Clear, fast websites designed around your audience and conversion goals.", image: img("card-delivery.svg") },
    { title: "Social Media", lead: "Build relevance consistently.", rest: "Channel strategy, content systems and community-led execution.", image: img("card-care.svg") },
    { title: "Performance Marketing", lead: "Spend with intent.", rest: "Search and social campaigns focused on qualified demand and return.", image: img("card-rewards.svg") },
    { title: "Campaigns", lead: "Bring the big idea to life.", rest: "Integrated launches shaped for the right message, moment and audience.", image: img("card-gifting.svg") },
    { title: "B2B Growth", lead: "Create a stronger pipeline.", rest: "Focused content and demand programmes for considered buying journeys.", image: img("card-corporate.svg") },
    { title: "SEO & Discovery", lead: "Be useful where people search.", rest: "Search strategy and content built for durable, compounding visibility.", image: img("card-guidance.svg") },
    { title: "Analytics & Optimisation", lead: "Learn, improve, repeat.", rest: "Useful reporting, testing and decisions that move performance forward.", image: img("card-support.svg") },
  ],
};

/** Stage 5: four tiles fan out to the corners, then fly off as the detail copy fades in. */
export const showcase = {
  heading: "One brand. Every touchpoint connected.",
  desc: "Strategy gives the work direction. Creative gives it power.",
  detail1: "We connect brand thinking, campaign creative, digital experience and performance so each part strengthens the next. ",
  detail2: "The result is marketing that feels consistent to your audience and accountable to your business.",
  tiles: [
    { code: "one", image: img("hero-lifestyle.webp") },
    { code: "two", image: img("artisan-studio.webp") },
    { code: "three", image: img("gift-service.webp") },
    { code: "four", image: img("hero-lifestyle.webp") },
  ],
};

/** Stage 6 */
export const questions = {
  heading: "Have any questions?",
  body: "Find clear answers about scope, timelines, retainers, reporting and how we start—or speak with us directly.",
  button: "Explore FAQs",
  href: "/faq/",
};

export const contactCard = {
  heading: "Tell us where you want to grow",
  body: "Share your goal, current challenge, timing and approximate budget. We will reply with a useful next step within one working day.",
  note: "Start by email",
};

export const footerColumns = [
  {
    heading: "Company",
    items: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about/" },
      { label: "Contact us", href: "/contact/" },
    ],
  },
  {
    heading: "Services",
    items: [
      { label: "Brand strategy", href: "/services/#strategy" },
      { label: "Creative & content", href: "/services/#creative" },
      { label: "Growth marketing", href: "/services/#growth" },
    ],
  },
  {
    heading: "Info",
    items: [
      { label: "Terms & Conditions", href: "/terms/" },
      { label: "Privacy Policy", href: "/privacy/" },
      { label: "FAQs", href: "/faq/" },
    ],
  },
];

// Add only verified Trayang profiles here; empty is better than linking to placeholder accounts.
export const socialLinks: Array<{ label: string; href: string; icon: string }> = [];

export const copyright = `Copyright © ${new Date().getFullYear()} Trayang. All rights reserved.`;
