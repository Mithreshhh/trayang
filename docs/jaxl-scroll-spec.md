# jaxl.com homepage – scroll experience spec

Everything needed to rebuild the jaxl.com landing page without visiting the live site again.
Captured 2026-09-20 from https://jaxl.com/ (asset version 1.0.377). Reference files live in `docs/reference/`:

| File | What it is |
| --- | --- |
| `reference/jaxl-phone.css` | Their full stylesheet, decoded, one rule per line. Copy values from here. |
| `reference/jaxl-dom-after-js.html` | The DOM after their JS built all six sections (image data stripped). |
| `reference/jaxl-home-controller.min.js` | The tail of their bundle: section builders + the 38 scroll stages. |
| `reference/scroll-state-log.json` | Section display/opacity at every 450px of scroll (1440x900). |
| `reference/screens/scrollTop-*.png` | Screenshots of the live page at those scroll positions. |
| `../lib/scrollStory.ts` | **Already-ported** TypeScript engine with all 38 stages. Done. |

## 1. Page mechanics

* `html, body { height:100%; overflow:hidden }` – the document never scrolls.
* `main.jaxl-app { display:grid; height:100dvh }`
* `#jaxl-phone` is the only scroller: `display:grid; overflow-y:auto; overflow-x:hidden; scroll-behavior:smooth; scroll-snap-type:y mandatory; background:#000; font-family:"DM Sans"`.
* Inside it, in order:
  1. `img.scroll-top-icon.hidden` (fixed, bottom-right, purple circle; shown when t > 0.8; click sets scrollTop = 0).
  2. `#jaxl-sections.jaxl-sections` – `position:sticky; top:0; height:100dvh; margin-bottom:-100dvh`. Contains navbar (absolute top), message banner (absolute, under navbar), `div.sections` (display:grid; all six `<section>`s stacked with `grid-row:1/-1; grid-column:1/-1; min-height:100dvh`), then `footer.jaxl-footer` (sits below the fold until the last stage slides it up).
  3. **26** empty `div.bg-cover` – each `height:100dvh; scroll-snap-align:start; scroll-snap-stop:always`.
* Scroll fraction `t = scrollTop / clientHeight`, range 0 → 25. Percentage for a stage = `100 * (1 - (end - t) / (end - start))`.
* Engine loop (per scroll event, in rAF): going down → for every stage with `t >= end` call `handler(end)`, then for stages containing t call `handler(t)`. Going up → same in reverse order using `start`. `lastScrollFraction` updated after handlers run (two stages compare against it).

## 2. Stage timeline (t = screens scrolled)

| t range | Stage | What happens |
| --- | --- | --- |
| 0–1 | landingBlur | `#jaxl-landing` filter blur(0→150px?) actually `blur(1.5·p px)`; heading opacity 1→0, translateY 0→100%, scale 1→1.2; download tile pointer-events none after 5%. |
| 0–1 | connectSlideIn | `.left-img` translateX −100%→−30%, `.right-img` +100%→+30%; section opacity 0→1; heading translateY −100%→+100% scale .8→1; after 5% main-container display grid + section z-index 3. |
| 1–2 | connectSpreadDots | phones rotate to ±12.67°; heading translateY 100%→0 scale 1→.875; `.point-dots-container` opacity 0→1; the 7 `.dot-container`s spread from centre to −350%,−250%,−150%,0,+150%,+250%,+350% (of their own width). |
| 2–3 | point "call" in | white circle `.point` scales 0→1, caption `#call-point-desc` fades in rising 20px→0. Dots 2/4/6 lose `.color-switch`. |
| 3–3.5 | call caption out + point "super-features" in | caption fades out moving up 20px; next point in; dot 2 gets `.color-switch` (purple). |
| 4–4.5 | super-features caption out | |
| 4.5–5 | point "private-network" in | dots 2,4 purple. |
| 5–5.5 | private-network caption out | |
| 5.5–6 | point "connectivity" in | dots 2,4,6 purple. |
| 6–7 | connectSlideOut | connect section opacity 1→0, translateY 0→−100%. |
| 6–7 | introFadeIn | `#jaxl-features-intro` opacity 0→1, `scale` .8→1, display grid after 5%. |
| 7–8 | thunderZoomIn | `img.thunder` scale 1 → `1 + n·100·0.07` where `n = max(bodyW, bodyH) / thunder.clientHeight` (~137× on desktop). **The purple bolt fills the screen and becomes the carousel background.** |
| 7–8 | carouselSlideIn | `#jaxl-features-carousel` display grid; heading opacity 0→1 translateY −100%→0; `.carousel-container` translateX 100vw→0; progress bar fades in, `.bar` translateX −100%→−88.9%. |
| 8–9 | landingVisibility | landing display grid when going down, none when going up (net: hidden once past 9). |
| 8–9 | introSwapCopy | going down: bg `features-intro-bg` + "Power Up your Existing Cellphone Number with 10 + <span>Super features</span>"; going up / past 9: bg `features-intro-bg-2` + "Loading <span>Super Features</span> on your Existing Cell Phone Number". |
| 8–17 | carouselFocusCard n=1..9 | one screen per card: container translateX from `−(cardW+gap)·(n−1)` to `−(cardW+gap)·n` px; `.bar` translateX `(10·n + 10·p/100 − 100)%`. |
| 17–18 | carouselSlideOut | heading + progress fade out; container slides fully off left. |
| 17–18 | thunderZoomOut | bolt scales back to 1 (reveals intro with "Loading…" copy + bg-2). |
| 18–19 | introRingFill | `.thunder-container` background = `conic-gradient(#9C63E5 d/3deg, #C4A7EA d/2deg, #9C63E5 d deg, transparent d deg)`, d = 3.6·p; at 100% `.heading.bottom` ("Powered up with <span>10+ features</span>") becomes visible with `.text-zooming`. |
| 19–20 | introFadeOut | intro opacity 1→0. |
| 19–19.6 | virtualFadeIn | `#jaxl-virtual-number` display grid, opacity 0→1 (4 stacked white number tiles, centred). |
| 19.6–20 | virtualTilesShift | tiles 1–3 nudge up 7.5/5/2.5%. |
| 20–21 | virtualTilesSpread | tiles fly to the four corners (translate ±(125·e−50)%, rotate ±30·e deg, scale up); `.intro-container` (heading "Jaxl Phone's Virtual Phone Numbers" + "Installs like an app. Works like a sim") fades in rising from −50%. |
| 21–22 | virtualTilesFlyOut | tiles continue off-screen; intro fades out; `.detail-container` fades in. |
| 22–23 | virtualHighlight | first `<span>` white for p<50, second span white after (other span #2c2c2e, 500ms colour transition). |
| 23–24 | virtualFadeOut + questionsFadeIn | `#jaxl-questions` (bg #f4f4f4) display grid, opacity 0→1. |
| 24–25 | questionsLift + footerSlideUp | questions translateY 0→−(footer.scrollHeight−1)px; footer translateY 0→−100%. |

Other behaviours: navbar hamburger toggles `.close` on `.hamburger`, `.open` on `.jaxl-navbar`, `.stop-scroll` on `#jaxl-phone`. Last nav link ("For Businesses") has class `shimmer` (green pill, shimmer mask animation). Download tile click opens a QR overlay (`.jaxl-overlay-base .download`, CSS in reference). Message banner: `opacity:0` base + `.element-fade-out` animation (visible 9s, then fades). Landing points list: `.points-container` height 2rem shows one line; `.scroll-up` keyframes step −6.25% × 15 over 38s.

## 3. Section markup (ids/classes the engine expects)

```
section#jaxl-landing.landing-section
  .main-container > h1.heading.text-zooming (span = "Future of Calling") ; .points-container > ul.points-list.scroll-up > li.point ×16 ; .download-tile.text-zooming > p "Download App" + .link-container > img.app-store + img.play-store
  .hero-image (background-image: three phones) ; img.bg-gradient
section#connect-section.connect-section
  img.left-img ; img.right-img
  .main-container > h1.heading "Connect beyond <span>Boundaries</span>"
    .point-dots-container > .dot-container#call-dot-container(.dot + .point>img) ; .dot-container.empty(.dot) ; #super-features-dot-container ; .empty ; #private-network-dot-container ; .empty ; #connectivity-dot-container
    .point-desc-container > p#call-point-desc ; p#super-features-point-desc ; p#private-network-point-desc ; p#connectivity-point-desc
section#jaxl-features-intro.features-intro-section (style background-image; data-bg1/data-bg2 used by lib/scrollStory.ts)
  .main-container > h1.heading ; .thunder-container > img.ellipse + img.thunder ; h1.heading.bottom
section#jaxl-features-carousel.features-carousel-section
  .main-container > h1.heading "Super Features for your Existing Number" ; .carousel-container > .card ×10 (p.title, p.subtitle > text + span, .img > img) ; .progress-bar > .bar
section#jaxl-virtual-number.virtual-number-section
  .main-container > .intro-container(h1.heading, p.desc) ; .detail-container(span.highlight, span) ; img.number-tile-img.aus/.deu/.can/.usa
section#jaxl-questions.questions-section
  .main-container > .content-container(h1, p, .button-container > a.link-button "Explore FAQ’s" → /faq) ; img.question-img
footer.jaxl-footer (same content as before: logo-box, os-downloads, Company/Products/Info, copyright, socials)
```

Copy for the connect captions, the 10 carousel cards, and the virtual-number text is in `reference/jaxl-dom-after-js.html`.

## 4. Design tokens

* Purple gradient text: `linear-gradient(89.34deg, #9c63e5 31.33%, #c4a7ea 86.35%)` with background-clip text.
* Purple `#9c63e5`, light purple `#c4a7ea`, dark text `#1c1c1e` / `#2c2c2e`, grey `#8e8e93`, light bg `#f4f4f4`, dot grey `#48484a`, shimmer green `rgba(51,218,160,.74)`.
* Font: DM Sans, headings weight 500. Content max-width 74.375rem; side margins 1.5rem / 3.125rem (≥576) / auto+3.125rem padding (≥1024). Navbar height 4.3125rem.
* Breakpoints used: ≤320, 321–390, 576–1023, ≥1024, plus footer 575/767/991/1199.

## 5. Image slots (placeholders to generate, user will supply real ones)

navbar `logo.svg` (Jaxl Phone wordmark, 147×35) · `innovation-logo.svg` (footer, 170×32) · `app-store-icon.svg` 18×22 & `play-store-icon.svg` 17×19 (dark, inside white pill) · `hero-phones` (3 phones, ~840×588, bottom of landing) · `bg-gradient` (blurred purple glow) · `phone-left` 656×548 & `phone-right` 741×618 (hands holding phones) · `call-point.svg`, `super-features-point.svg`, `private-network-point.svg`, `connectivity-point.svg` (36×36 purple glyphs) · `features-intro-bg` & `features-intro-bg-2` (dark photos) · `ellipse.svg` (162×162 glossy white sphere) · `thunder.svg` (74×74 purple bolt; must be solid near its centre because it is scaled ~137×) · card images `call-recording` (wide, 600×216), `global-roaming`, `private-line`, `low-cost`, `multi-device`, `dnd`, `hide-number`, `voicemail`, `all-numbers`, `caller-id` (216×216) · `aus/deu/can/usa-number-tile` (432×297 white cards) · `question` (425×455) · `scroll-top` (60×60) · footer `ic_apple`, `android`, `x`, `fb`, `linkedin`, `youtube` (20px white) · overlay `qr-placeholder` 242×242, `close.svg`, `play-store-white.svg`.

## 6. Status

All done (2026-09-20):

- [x] `lib/scrollStory.ts` – engine + all 38 stages ported.
- [x] `public/images/*` – 41 labelled placeholder SVGs (generator kept in the session scratchpad; regenerate by hand if needed).
- [x] `app/globals.css` – full port of `reference/jaxl-phone.css` with DM Sans via `next/font`.
- [x] Components: `JaxlPhone.tsx`, `Navbar.tsx`, `MessageBanner.tsx`, `sections/*.tsx`, `Footer.tsx`, `DownloadOverlay.tsx`, `Preloader.tsx`.
- [x] `data/site.ts` – all copy and image paths.
- [x] Verified with Playwright at 1440x900 (scrollTop 0…22500) and 390x844: section display/opacity transitions match `reference/scroll-state-log.json`, no horizontal overflow, no console errors; hamburger, scroll-top and download overlay work.

Only real images are outstanding (user will supply); swap paths in `data/site.ts`.
