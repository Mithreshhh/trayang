# Trayang marketing site (Next.js)

Marketing site for Trayang, a strategy, branding, marketing and business-consulting studio. The home page is an ordinary scrolling page of chapters, each a sheet of stock lying on the one above (hero, purpose, approach, services, touchpoints, questions), with eased wheel scrolling (Lenis) on every page and scroll-linked motion done in CSS. About, Services, Contact, FAQs, Terms and Privacy are ordinary pages in the same visual world.

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
| `app/globals.css` | All styling |
| `app/page.tsx` | The home page: stacks the chapters |
| `components/story/*.tsx` | The home chapters: Hero, Purpose, Approach (discs into register), Capabilities (sticky index + entries), Touchpoints (line + statement), Questions, and the ChapterRail |
| `components/SmoothScroll.tsx` | Lenis eased wheel scrolling, mounted once in `app/layout.tsx` |
| `components/Print.tsx` | World primitives: `Pass` (heading printed in three passes), `InkLink`, `PrintPlate`, `Rule`, `RegCorners`, `Wordmark` |
| `components/Glyph.tsx` | Overlap artwork for every service and the purpose-point icons |
| `components/Navbar.tsx`, `Footer.tsx`, `Preloader.tsx` | Header band (shared by story and pages), footer, loading screen |
| `components/SitePage.tsx` | Page shell, `PageHero`, `CtaBand`, `ProofSlots` |
| `components/EnquiryForm.tsx` | Contact form that opens a ready-to-send email to hello@trayang.com |
| `components/FaqList.tsx`, `LegalPage.tsx`, `Reveal.tsx` | FAQ accordion, terms/privacy template, scroll-in printing of headings |
| `docs/jaxl-scroll-spec.md`, `docs/reference/` | Historical: captures of the scroll-jacked reference the first version cloned (no longer used) |

## Adding proof

`proof` (clients, case studies, testimonials) and `socialLinks` in `data/site.ts` are empty on purpose. Each block appears on the About and Services pages, and the social links in the footer, as soon as it has real entries. Never add placeholder clients, results or quotes.

## Images

`public/images/artisan-studio.webp` and `gift-service.webp` are printed as brown and gold duotones by CSS, so any photo works; replace the files or change `images` in `data/site.ts`.

## How the scrolling works (short version)

The document scrolls normally. `components/SmoothScroll.tsx` runs Lenis, which only eases wheel input: touch keeps the platform's own momentum, and nothing is smoothed for people who ask for reduced motion. In-page links (the chapter rail, the services index) glide to their target and stop below the sticky header thanks to `scroll-padding-top` on `html`; the mobile menu pauses Lenis while it is open.

Scroll-linked motion is plain CSS (`animation-timeline: view()` and named view timelines), so it runs off the main thread: purpose lines ink in, the approach discs move into register, services entries rise, the touchpoint line draws and lights each node, and the statement inks word by word. All of it sits inside `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`; anywhere else the finished state shows. The purpose heading and the services index are `position: sticky` within their sections, and the services highlight follows the entry crossing the middle of the screen (IntersectionObserver).
