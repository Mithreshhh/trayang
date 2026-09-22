/**
 * Single place to edit all Trayang site content and image paths.
 * Drop your real images into /public/images and update the paths below
 * (any format works; README lists the size each slot expects).
 */

const img = (name: string) => `/images/${name}`;

export const brand = {
  name: "Trayang",
  tagline: "Crafted with care. Delivered with pride.",
  description:
    "Trayang brings premium quality, personal service and honest craftsmanship to everything we do. Explore our signature services and collections.",
};

export const contact = {
  email: "hello@trayang.com",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsapp: "https://wa.me/919876543210",
  address: "Hyderabad, India",
};

export const images = {
  // navbar / footer
  logo: img("logo.svg"), // "Trayang" wordmark, gold on brown
  footerLogo: img("footer-logo.svg"),
  // hero
  ctaIcon: img("cta-icon.svg"), // small dark arrow inside the gold pill
  heroShowcase: img("hero-showcase.svg"), // product / brand visual at the bottom of the hero
  bgGradient: img("bg-gradient.svg"), // blurred gold glow behind the hero
  // "Crafted beyond Expectations" section
  showcaseLeft: img("showcase-left.svg"), // visual that enters from the left
  showcaseRight: img("showcase-right.svg"), // visual that enters from the right
  // signature services intro
  introBg: img("intro-bg.svg"), // photo behind "Elevate your everyday"
  introBg2: img("intro-bg-2.svg"), // photo behind "Curating signature services"
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

export const bannerMessage = "Festive offer: 15% off your first order with Trayang";

/** Stage 1: hero */
export const hero = {
  heading: { before: "Experience the ", highlight: "Art of Excellence", after: " with Trayang, like never before." },
  cta: "Get in Touch",
  /** Shown one line at a time; the last item repeats the first so the ticker loops. */
  points: [
    "✨ Crafted with care, every single time",
    "🏆 Premium quality you can feel",
    "🤝 Trusted by families and businesses",
    "🌿 Honest materials, authentic work",
    "⏱️ On time, every time",
    "💎 Attention to every detail",
    "📞 Personal support from real people",
    "🎁 Thoughtful gifting for every occasion",
    "🏢 Tailored solutions for businesses",
    "🔁 Loyalty rewards for regulars",
    "🚚 Doorstep delivery across the country",
    "🛡️ Lifetime after-sales care",
    "🧭 Expert guidance at every step",
    "🌍 Serving customers everywhere",
    "❤️ Made to be loved for years",
    "✨ Crafted with care, every single time",
  ],
};

/** Stage 2: two visuals slide in, then four promise points pop in one by one. */
export const connect = {
  heading: { before: "Crafted beyond ", highlight: "Expectations", after: "" },
  points: [
    { id: "quality", icon: img("point-quality.svg"), desc: "Premium materials and finishing on everything that carries the Trayang name" },
    { id: "service", icon: img("point-service.svg"), desc: "Personal, one-to-one service from the first conversation to long after delivery" },
    { id: "trust", icon: img("point-trust.svg"), desc: "Transparent pricing and honest advice, so you always know what you are getting" },
    { id: "delivery", icon: img("point-delivery.svg"), desc: "Careful packaging and on-time doorstep delivery, wherever you are" },
  ],
};

/** Stage 3: the emblem zooms in to become the gold backdrop of the carousel. */
export const featuresIntro = {
  headingDown: { before: "Elevate your everyday with 10 + ", highlight: "Signature services", after: "" },
  headingUp: { before: "Curating ", highlight: "Signature services", after: " just for you" },
  bottom: { before: "Powered by ", highlight: "10+ services", after: "" },
};

/** Stage 4: one screen of scroll per card. `lead` is dark, `rest` is muted. */
export const carousel = {
  heading: "Signature Services from Trayang",
  cards: [
    { title: "Bespoke Consultation", lead: "Start with a conversation.", rest: "We understand your needs before we suggest anything.", image: img("card-consultation.svg") },
    { title: "Premium Collections", lead: "Curated, not crowded.", rest: "A focused range where every piece earns its place.", image: img("card-collections.svg") },
    { title: "Custom Design", lead: "Made around you.", rest: "Sizes, finishes and details tailored to your space and story.", image: img("card-design.svg") },
    { title: "Doorstep Delivery", lead: "Packed with care, delivered on time.", rest: "Tracked from our door to yours.", image: img("card-delivery.svg") },
    { title: "After-sales Care", lead: "We stay in touch.", rest: "Maintenance, repairs and support long after the purchase.", image: img("card-care.svg") },
    { title: "Loyalty Rewards", lead: "Regulars are family.", rest: "Earn rewards and early access with every order.", image: img("card-rewards.svg") },
    { title: "Gifting & Occasions", lead: "Gifts that mean something.", rest: "Personalised wrapping and notes for every celebration.", image: img("card-gifting.svg") },
    { title: "Corporate Solutions", lead: "Built for businesses.", rest: "Bulk orders, branding and invoicing handled end to end.", image: img("card-corporate.svg") },
    { title: "Expert Guidance", lead: "Advice you can trust.", rest: "Our specialists help you choose what fits, not what sells.", image: img("card-guidance.svg") },
    { title: "Lifetime Support", lead: "One call away.", rest: "Real people on email, phone and WhatsApp whenever you need us.", image: img("card-support.svg") },
  ],
};

/** Stage 5: four tiles fan out to the corners, then fly off as the detail copy fades in. */
export const showcase = {
  heading: "Trayang's Signature Collection",
  desc: "Curated for you. Crafted to last.",
  detail1: "Every Trayang piece is designed with intent and made with honest materials, so it looks as good in ten years as it does today. ",
  detail2: "Whether it is for your home, your business or someone special, we help you choose what fits your story.",
  tiles: [
    { code: "one", image: img("tile-1.svg") },
    { code: "two", image: img("tile-2.svg") },
    { code: "three", image: img("tile-3.svg") },
    { code: "four", image: img("tile-4.svg") },
  ],
};

/** Stage 6 */
export const questions = {
  heading: "Have any questions?",
  body: "Check out our FAQ section for answers to common questions about orders, delivery, customisation and care. We have made it easy to find what you need.",
  button: "Explore FAQs",
  href: "/faq/",
};

export const contactCard = {
  heading: "Let's talk about what you need",
  body: "Tell us a little about your requirement and we will get back within one working day.",
  note: "Reach us directly",
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
      { label: "Consultation", href: "/services/#consultation" },
      { label: "Collections", href: "/services/#collections" },
      { label: "Corporate", href: "/services/#corporate" },
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

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/trayang", icon: images.instagram },
  { label: "Facebook", href: "https://facebook.com/trayang", icon: images.facebook },
  { label: "LinkedIn", href: "https://linkedin.com/company/trayang", icon: images.linkedin },
  { label: "YouTube", href: "https://youtube.com/@trayang", icon: images.youtube },
];

export const copyright = `Copyright © ${new Date().getFullYear()} Trayang. All rights reserved.`;
