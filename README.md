# Trayang marketing site (Next.js)

Marketing site for Trayang, a strategy, branding, marketing and business-consulting studio. The home page is a scroll-driven story: one container moves through 17 screens while a pinned stage presents the hero, the purpose points, the capabilities, the joined-up approach, common questions and the closing footer. About, Services, Contact, FAQs, Terms and Privacy are ordinary pages in the same visual world.

The visual world is screenprint ("registered overprint"): cream paper and brown kraft stocks, brown and gold inks printed as translucent passes that mix where they overlap, stencil poster type, registration marks and ink buttons.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Brand palette

| Token | Hex | Used for |
| --- | --- | --- |
| `--brown` | `#3B2112` | kraft stock, header band, footer, key ink on cream |
| `--gold` | `#D89B52` | gold ink, gold stock behind the capability cards, buttons |
| `--gold-light` | `#F0C27A` | the light ghost pass, overlaps |
| `--cream` | `#E8DDC5` | paper stock, key ink on brown |
| `--dark` | `#0B1012` | deepest shadows, the fourth swatch |
| `--gold-ink` | `#9A6526` | gold deepened for text on cream so it stays readable |

All tokens are at the top of `app/globals.css`. `.stock-cream`, `.stock-brown` and `.stock-gold` set the paper and which inks print on it.

## Where things live

| Path | What it is |
| --- | --- |
| `data/site.ts` | All copy, links, form options, image paths and the proof slots |
| `lib/scrollStory.ts` | The scroll engine: converts scroll position into the stage animations |
| `app/globals.css` | All styling |
| `components/TrayangScroller.tsx` | The scroll container: sticky stage + 17 spacer screens, mounts the engine |
| `components/sections/*.tsx` | The six home stages: Landing, Connect, FeaturesIntro, FeaturesCarousel, Showcase, Questions |
| `components/Print.tsx` | World primitives: `Pass` (heading printed in three passes), `InkLink`, `PrintPlate`, `Rule`, `RegCorners`, `Wordmark` |
| `components/Glyph.tsx` | Overlap artwork for every service and the purpose-point icons |
| `components/Navbar.tsx`, `Footer.tsx`, `Preloader.tsx` | Header band (shared by story and pages), footer, loading screen |
| `components/SitePage.tsx` | Page shell, `PageHero`, `CtaBand`, `ProofSlots` |
| `components/EnquiryForm.tsx` | Contact form that opens a ready-to-send email to hello@trayang.com |
| `components/FaqList.tsx`, `LegalPage.tsx`, `Reveal.tsx` | FAQ accordion, terms/privacy template, scroll-in printing of headings |
| `docs/jaxl-scroll-spec.md`, `docs/reference/` | Spec and captures of the layout reference the scroll story was built from |

## Adding proof

`proof` (clients, case studies, testimonials) and `socialLinks` in `data/site.ts` are empty on purpose. Each block appears on the About and Services pages, and the social links in the footer, as soon as it has real entries. Never add placeholder clients, results or quotes.

## Images

`public/images/artisan-studio.webp` and `gift-service.webp` are printed as brown and gold duotones by CSS, so any photo works; replace the files or change `images` in `data/site.ts`. `emblem.svg` is the gold diamond the engine scales about 137 times to flood the screen behind the capability cards, so keep it solid gold.

## How the scroll works (short version)

`#trayang-scroller` is the only scrollable element on the home page. Inside it, `#trayang-sections` is `position: sticky` and 100dvh tall, followed by 17 empty 100dvh spacers. The engine reads `scrollTop / clientHeight` and, for each stage in `lib/scrollStory.ts`, converts the position inside that stage's `[start, end]` range into a 0 to 100 percentage that sets inline transforms and opacities. The purpose points share one window, so adding or removing a point in `data/site.ts` re-times them automatically. Stage end and start states are applied once when crossed, element lookups are cached, and pixel-based stages are recomputed on resize.
