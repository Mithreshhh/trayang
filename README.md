# Trayang marketing site (Next.js)

Scroll-driven marketing agency site for Trayang. One container moves through a tightened 17-screen story while a pinned stage presents the positioning, approach, integrated capabilities, services, proof narrative, questions and footer.

The primary storytelling slots use project-ready marketing imagery in the Trayang palette. Supporting icons remain lightweight SVG assets.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Brand palette

| Token | Hex | Used for |
| --- | --- | --- |
| `--brown` | `#3B2112` | navbar, hero, footer, dark backgrounds |
| `--gold` | `#D89B52` | logo, buttons, headings, icons, borders |
| `--gold-light` | `#F0C27A` | hovers, gradients, highlights |
| `--cream` | `#E8DDC5` | light sections, cards |
| `--dark` | `#0B1012` | text on light backgrounds |

All tokens are defined at the top of `app/globals.css`.

## Where things live

| Path | What it is |
| --- | --- |
| `data/site.ts` | All copy, links, contact details, cards, captions and image paths |
| `lib/scrollStory.ts` | The scroll engine: converts scroll position into the 38 animation stages |
| `app/globals.css` | All styling (palette tokens at the top) |
| `components/TrayangScroller.tsx` | The scroll container: sticky stage + 17 spacer screens, mounts the engine, owns the enquiry card |
| `components/sections/*.tsx` | Landing, Connect, FeaturesIntro, FeaturesCarousel, Showcase, Questions |
| `components/Navbar.tsx` | Blurred top bar; last link is the gold pill; hamburger menu locks the scroller on mobile |
| `components/MessageBanner.tsx` | Promo strip that fades out after 9 seconds |
| `components/ContactOverlay.tsx` | Enquiry card (email, WhatsApp, call) opened from the hero button or any `#contact` link |
| `components/Footer.tsx`, `components/Preloader.tsx` | Footer and the four-bar loading screen |
| `docs/jaxl-scroll-spec.md`, `docs/reference/` | Spec and captures of the layout reference the scroll story was built from |

## Editing the copy

Everything is in `data/site.ts`: `brand`, `contact`, `navLinks`, `bannerMessage`, `hero`, `connect`, `featuresIntro`, `carousel`, `showcase`, `questions`, `contactCard`, `footerColumns`, `socialLinks`. The current text positions Trayang as an integrated marketing studio and can evolve with the offer.

## Replacing the placeholder images

Put your files in `public/images/` and update the paths in `data/site.ts`. Any format works.

| Slot | Placeholder file | Used for | Suggested size |
| --- | --- | --- | --- |
| `images.logo` | `logo.svg` | Navbar logo, gold on brown | 147x35 |
| `images.footerLogo` | `footer-logo.svg` | Footer logo | 170x32 |
| `images.ctaIcon` | `cta-icon.svg` | Small dark arrow in the gold hero button | 20x20 |
| `images.heroShowcase` | `hero-showcase.svg` | Product / brand visual at the bottom of the hero | 840x588, transparent |
| `images.bgGradient` | `bg-gradient.svg` | Blurred gold glow behind the hero | 1600x900 |
| `images.showcaseLeft` / `showcaseRight` | `showcase-left.svg`, `showcase-right.svg` | Visuals that slide in from each side in "Crafted beyond Expectations" | 656x548 / 741x618, transparent |
| `connect.points[].icon` | `point-quality.svg`, `point-service.svg`, `point-trust.svg`, `point-delivery.svg` | Gold glyphs in the cream circles | 36x36 |
| `images.introBg` / `introBg2` | `intro-bg.svg`, `intro-bg-2.svg` | Photos behind the "Elevate your everyday" / "Curating signature services" headings | 1600x900 |
| `images.ellipse` | `ellipse.svg` | Glossy cream sphere | 162x162 |
| `images.emblem` | `emblem.svg` | Gold emblem. It is scaled ~137x to fill the screen, so keep it solid gold around its centre | 74x74 |
| `carousel.cards[].image` | `card-consultation.svg` (wide) and nine more `card-*.svg` | Service card illustrations | 216x216 (first one 600x216) |
| `showcase.tiles[].image` | `tile-1.svg` … `tile-4.svg` | Collection tiles | 432x297 |
| `images.question` | `question.svg` | Speech-bubble illustration | 425x455 |
| `images.scrollTop` | `scroll-top.svg` | Back-to-top button | 60x60 |
| `images.mail`, `phone`, `whatsapp`, `instagram`, `facebook`, `linkedin`, `youtube` | matching `*.svg` | Footer and enquiry-card icons, cream | 20x20 |
| `images.contactIllustration`, `close` | `contact-illustration.svg`, `close.svg` | Enquiry card | 242x242, 22x22 |

## How the scroll works (short version)

`#trayang-scroller` is the only scrollable element. Inside it, `#trayang-sections` is `position: sticky` and 100dvh tall, followed by 26 empty 100dvh spacers. The engine reads `scrollTop / clientHeight` (0 to 25) and, for each stage in `lib/scrollStory.ts`, converts the position inside that stage's `[start, end]` range into a 0 to 100 percentage which sets inline transforms and opacities. Stage end and start states are applied once when crossed, element lookups are cached, and pixel-based stages are recomputed on resize.

## Notes

* `/about/`, `/services/`, `/contact/`, `/terms/`, `/privacy/` and `/faq/` are implemented as static routes.
* Add only verified social profiles to `socialLinks` in `data/site.ts`; none are displayed by default.
