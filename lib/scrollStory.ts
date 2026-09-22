/**
 * Scroll-driven story engine for the Trayang homepage.
 *
 * The page never scrolls the document. A single container (#trayang-scroller)
 * scrolls through 26 viewport-tall spacers while a sticky 100dvh stage
 * (#trayang-sections) stays pinned. Scroll position is converted to a fraction
 * t = scrollTop / viewportHeight (0 → 25) and every stage below maps a
 * [start, end] range of t to a 0–100 percentage that drives inline styles.
 *
 * Each stage is called with a phase:
 *   "active" – t is inside [start, end): called every frame with the live percentage
 *   "after"  – t moved past end (called once, p = 100)
 *   "before" – t moved back before start (called once, p = 0)
 * so the end/start states are applied exactly once instead of on every frame,
 * and element lookups are cached. Runs as plain DOM code, no React re-renders.
 */

export function getScrollPercentage(start: number, end: number, t: number): number {
  return 100 * (1 - (end - t) / (end - start));
}

export type Phase = "before" | "active" | "after";
type StageFn = (p: number, phase: Phase) => void;

interface Stage {
  start: number;
  end: number;
  fn: StageFn;
  phase?: Phase;
}

export interface ScrollStoryOptions {
  onScrollFractionChange?: (t: number) => void;
}

export class ScrollStory {
  private readonly stages: Stage[];
  private last: number | undefined;
  private goingDown = true;
  private raf = 0;
  private readonly cache = new Map<string, HTMLElement | HTMLElement[]>();

  constructor(private readonly root: HTMLElement, private readonly opts: ScrollStoryOptions = {}) {
    const s = (start: number, end: number, fn: StageFn): Stage => ({ start, end, fn });

    // Order matters: later stages overwrite earlier ones for the same element.
    this.stages = [
      s(0, 1, (p) => this.landingBlur(p)),
      s(0, 1, (p) => this.connectSlideIn(p)),
      s(1, 2, (p) => this.connectSpreadDots(p)),
      s(2, 3, (p) => this.connectPointIn(0, p)),
      s(3, 3.5, (p) => this.connectPointOut(0, p)),
      s(3, 3.5, (p) => this.connectPointIn(1, p)),
      s(4, 4.5, (p) => this.connectPointOut(1, p)),
      s(4.5, 5, (p) => this.connectPointIn(2, p)),
      s(5, 5.5, (p) => this.connectPointOut(2, p)),
      s(5.5, 6, (p) => this.connectPointIn(3, p)),
      s(6, 7, (p) => this.connectSlideOut(p)),
      s(6, 7, (p) => this.introFadeIn(p)),
      s(7, 8, (p) => this.emblemZoomIn(p)),
      s(7, 8, (p) => this.carouselSlideIn(p)),
      s(8, 9, (_p, phase) => this.landingVisibility(phase)),
      s(8, 9, (_p, phase) => this.introSwapCopy(phase)),
      s(8, 9, (p) => this.carouselFocusCard(p, 1)),
      s(9, 10, (p) => this.carouselFocusCard(p, 2)),
      s(10, 11, (p) => this.carouselFocusCard(p, 3)),
      s(11, 12, (p) => this.carouselFocusCard(p, 4)),
      s(12, 13, (p) => this.carouselFocusCard(p, 5)),
      s(13, 14, (p) => this.carouselFocusCard(p, 6)),
      s(14, 15, (p) => this.carouselFocusCard(p, 7)),
      s(15, 16, (p) => this.carouselFocusCard(p, 8)),
      s(16, 17, (p) => this.carouselFocusCard(p, 9)),
      s(17, 18, (p) => this.carouselSlideOut(p)),
      s(17, 18, (p) => this.emblemZoomOut(p)),
      s(18, 19, (p) => this.introRingFill(p)),
      s(19, 20, (p) => this.introFadeOut(p)),
      s(19, 19.6, (p) => this.showcaseFadeIn(p)),
      s(19.6, 20, (p) => this.showcaseTilesShift(p)),
      s(20, 21, (p) => this.showcaseTilesSpread(p)),
      s(21, 22, (p) => this.showcaseTilesFlyOut(p)),
      s(22, 23, (p) => this.showcaseHighlight(p)),
      s(23, 24, (p) => this.showcaseFadeOut(p)),
      s(23, 24, (p) => this.questionsFadeIn(p)),
      s(24, 25, (p) => this.questionsLift(p)),
      s(24, 25, (p) => this.footerSlideUp(p)),
    ];
  }

  /* ------------------------------------------------------------------ */
  /* Engine                                                              */
  /* ------------------------------------------------------------------ */

  attach(): void {
    this.root.addEventListener("scroll", this.onScroll, { passive: true });
    window.addEventListener("resize", this.onResize);
    this.run();
  }

  detach(): void {
    this.root.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onResize);
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.cache.clear();
  }

  private onScroll = (): void => {
    if (this.raf) return;
    this.raf = requestAnimationFrame(this.run);
  };

  /** Pixel-based stages (carousel offsets, footer height) must be recomputed after a resize. */
  private onResize = (): void => {
    for (const stage of this.stages) stage.phase = undefined;
    this.last = undefined;
    this.onScroll();
  };

  private run = (): void => {
    this.raf = 0;
    const t = this.root.scrollTop / this.root.clientHeight;
    this.goingDown = this.last === undefined || t > this.last;
    this.opts.onScrollFractionChange?.(t);
    const st = this.stages;
    if (this.goingDown) {
      for (const s of st) {
        if (t >= s.end) {
          if (s.phase !== "after") {
            s.fn(100, "after");
            s.phase = "after";
          }
        } else if (t >= s.start) {
          s.fn(getScrollPercentage(s.start, s.end, t), "active");
          s.phase = "active";
        }
      }
    } else {
      for (let i = st.length - 1; i >= 0; i--) {
        const s = st[i];
        if (t < s.start) {
          if (s.phase !== "before") {
            s.fn(0, "before");
            s.phase = "before";
          }
        } else if (t < s.end) {
          s.fn(getScrollPercentage(s.start, s.end, t), "active");
          s.phase = "active";
        }
      }
    }
    this.last = t;
  };

  private q<T extends HTMLElement = HTMLElement>(selector: string): T {
    const hit = this.cache.get(selector);
    if (hit && !Array.isArray(hit)) return hit as T;
    const el = this.root.querySelector<T>(selector);
    if (!el) throw new Error(`ScrollStory: missing element ${selector}`);
    this.cache.set(selector, el);
    return el;
  }

  private qa<T extends HTMLElement = HTMLElement>(selector: string): T[] {
    const hit = this.cache.get(selector);
    if (hit && Array.isArray(hit)) return hit as T[];
    const els = Array.from(this.root.querySelectorAll<T>(selector));
    this.cache.set(selector, els);
    return els;
  }

  /* ------------------------------------------------------------------ */
  /* 1. Hero                                                             */
  /* ------------------------------------------------------------------ */

  private landingBlur(p: number): void {
    const landing = this.q("#trayang-landing");
    const heading = this.q("#trayang-landing .heading");
    const tile = this.q("#trayang-landing .download-tile");
    const r = 0.01 * p;
    landing.style.filter = `blur(${1.5 * p}px)`;
    heading.style.opacity = `${1 - r}`;
    heading.style.transform = `translate3d(0, ${p}%, 0) scale(${1 + 0.2 * r})`;
    tile.style.pointerEvents = p > 5 ? "none" : "initial";
  }

  /** Hide the (blurred, expensive) hero once the carousel fully covers it. */
  private landingVisibility(phase: Phase): void {
    const show = phase === "before" || (phase === "active" && this.goingDown);
    this.q("#trayang-landing").style.display = show ? "grid" : "none";
  }

  /* ------------------------------------------------------------------ */
  /* 2. Crafted beyond Expectations                                      */
  /* ------------------------------------------------------------------ */

  private connectSlideIn(p: number): void {
    const section = this.q("#connect-section");
    const main = this.q("#connect-section .main-container");
    const left = this.q("#connect-section .left-img");
    const right = this.q("#connect-section .right-img");
    const heading = this.q("#connect-section .heading");
    const a = 0.01 * p;
    const offset = 100 - 70 * a;
    left.style.transform = `translate3d(${-offset}%, 0, 0)`;
    right.style.transform = `translate3d(${offset}%, 0, 0)`;
    section.style.opacity = `${a}`;
    heading.style.transform = `translate3d(0, ${2 * p - 100}%, 0) scale(${0.8 + 0.2 * a})`;
    main.style.display = p > 5 ? "grid" : "none";
    section.style.zIndex = p > 5 ? "3" : "-1";
  }

  private connectSpreadDots(p: number): void {
    const left = this.q("#connect-section .left-img");
    const right = this.q("#connect-section .right-img");
    const heading = this.q("#connect-section .heading");
    const dots = this.q("#connect-section .point-dots-container");
    const dc = this.qa("#connect-section .dot-container");
    const rot = 12.67 * p * 0.01;
    const l = p, c = 2 * p, u = 3 * p;
    left.style.transform = `translate3d(-30%, 0, 0) rotate(${360 - rot}deg)`;
    right.style.transform = `translate3d(30%, 0, 0) rotate(${rot}deg)`;
    heading.style.transform = `translate3d(0, ${100 - p}%, 0) scale(${1 - 0.125 * p * 0.01})`;
    dots.style.opacity = `${0.01 * p}`;
    dc[0].style.transform = `translate3d(${-50 - u}%, -50%, 0)`;
    dc[1].style.transform = `translate3d(${-50 - c}%, -50%, 0)`;
    dc[2].style.transform = `translate3d(${-50 - l}%, -50%, 0)`;
    dc[4].style.transform = `translate3d(${-50 + l}%, -50%, 0)`;
    dc[5].style.transform = `translate3d(${c - 50}%, -50%, 0)`;
    dc[6].style.transform = `translate3d(${u - 50}%, -50%, 0)`;
  }

  /** Point i (0–3) pops in; the i spacer dots before it turn gold. */
  private connectPointIn(i: number, p: number): void {
    const point = this.qa("#connect-section .dot-container:not(.empty) .point")[i];
    const desc = this.qa("#connect-section .point-desc-container p")[i];
    this.qa("#connect-section .dot-container.empty .dot").forEach((dot, j) => dot.classList.toggle("color-switch", j < i));
    const a = 0.01 * p;
    point.style.opacity = `${a}`;
    point.style.transform = `scale(${a})`;
    desc.style.opacity = `${a}`;
    desc.style.transform = `translate3d(-50%, ${20 - 0.2 * p}px, 0)`;
  }

  private connectPointOut(i: number, p: number): void {
    const desc = this.qa("#connect-section .point-desc-container p")[i];
    desc.style.opacity = `${1 - 0.01 * p}`;
    desc.style.transform = `translate3d(-50%, ${-0.2 * p}px, 0)`;
  }

  private connectSlideOut(p: number): void {
    const section = this.q("#connect-section");
    section.style.opacity = `${1 - 0.01 * p}`;
    section.style.transform = `translate3d(0, ${-p}%, 0)`;
  }

  /* ------------------------------------------------------------------ */
  /* 3. Signature services intro (gold emblem)                           */
  /* ------------------------------------------------------------------ */

  private introFadeIn(p: number): void {
    const intro = this.q("#trayang-features-intro");
    intro.style.opacity = `${0.01 * p}`;
    intro.style.setProperty("scale", `${0.8 + 0.002 * p}`);
    intro.style.display = p > 5 ? "grid" : "none";
  }

  private emblemScaleFactor(emblem: HTMLElement): number {
    return Math.max(document.body.clientHeight, document.body.clientWidth) / emblem.clientHeight;
  }

  /** The emblem zooms until it fills the screen and becomes the carousel backdrop. */
  private emblemZoomIn(p: number): void {
    const emblem = this.q("#trayang-features-intro img.thunder");
    emblem.style.transform = `translate(-50%, -50%) scale(${1 + this.emblemScaleFactor(emblem) * p * 0.07})`;
  }

  private emblemZoomOut(p: number): void {
    const emblem = this.q("#trayang-features-intro img.thunder");
    emblem.style.transform = `translate(-50%, -50%) scale(${1 + this.emblemScaleFactor(emblem) * (100 - p) * 0.07})`;
  }

  /** Swap copy/background so the return trip reads differently (strings live in data-* attributes). */
  private introSwapCopy(phase: Phase): void {
    const intro = this.q("#trayang-features-intro");
    const heading = this.q("#trayang-features-intro .heading:first-child");
    const down = phase === "before" || (phase === "active" && this.goingDown);
    intro.style.backgroundImage = `url(${down ? intro.dataset.bg1 : intro.dataset.bg2 ?? intro.dataset.bg1})`;
    heading.innerHTML = (down ? intro.dataset.copyDown : intro.dataset.copyUp) ?? heading.innerHTML;
  }

  private introRingFill(p: number): void {
    const ring = this.q("#trayang-features-intro .thunder-container");
    const bottom = this.q("#trayang-features-intro .heading.bottom");
    const deg = 3.6 * p;
    ring.style.background = `conic-gradient(var(--gold) ${deg / 3}deg, var(--gold-light) ${deg / 2}deg, var(--gold) ${deg}deg, transparent ${deg}deg)`;
    bottom.style.visibility = p === 100 ? "visible" : "hidden";
    bottom.classList.toggle("text-zooming", p === 100);
  }

  private introFadeOut(p: number): void {
    this.q("#trayang-features-intro").style.opacity = `${1 - 0.01 * p}`;
  }

  /* ------------------------------------------------------------------ */
  /* 4. Signature services carousel                                      */
  /* ------------------------------------------------------------------ */

  private carouselSlideIn(p: number): void {
    const section = this.q("#trayang-features-carousel");
    const heading = this.q("#trayang-features-carousel .heading");
    const container = this.q("#trayang-features-carousel .carousel-container");
    const progress = this.q("#trayang-features-carousel .progress-bar");
    const bar = this.q("#trayang-features-carousel .progress-bar .bar");
    const a = 0.01 * p;
    heading.style.opacity = `${a}`;
    heading.style.transform = `translate3d(0, ${-100 + p}%, 0)`;
    container.style.transform = `translate3d(${100 - p}vw, 0, 0)`;
    progress.style.opacity = `${a}`;
    bar.style.transform = `translate3d(${(100 / 9) * p * 0.01 - 100}%, 0, 0)`;
    section.style.display = p > 5 ? "grid" : "none";
  }

  private cardOffset(index: number): number {
    const container = this.q("#trayang-features-carousel .carousel-container");
    const cards = this.qa("#trayang-features-carousel .card");
    const gapTotal = container.scrollWidth - cards[0].clientWidth * cards.length;
    return -(cards[0].clientWidth + gapTotal / (cards.length - 1)) * index;
  }

  private carouselFocusCard(p: number, n: number): void {
    const container = this.q("#trayang-features-carousel .carousel-container");
    const cards = this.qa("#trayang-features-carousel .card");
    const bar = this.q("#trayang-features-carousel .bar");
    const from = this.cardOffset(n - 1);
    const to = this.cardOffset(n);
    const step = 100 / cards.length;
    container.style.transform = `translate3d(${from + (to - from) * p * 0.01}px, 0, 0)`;
    bar.style.transform = `translateX(${step * n + step * p * 0.01 - 100}%)`;
  }

  private carouselSlideOut(p: number): void {
    const heading = this.q("#trayang-features-carousel .heading");
    const container = this.q("#trayang-features-carousel .carousel-container");
    const cards = this.qa("#trayang-features-carousel .card");
    const progress = this.q("#trayang-features-carousel .progress-bar");
    const fade = 1 - 0.01 * p;
    const lastOffset = this.cardOffset(cards.length - 1);
    const x = lastOffset - (container.offsetLeft + container.scrollWidth - lastOffset + 20) * p * 0.01;
    heading.style.opacity = `${fade}`;
    progress.style.opacity = `${fade}`;
    container.style.transform = `translate3d(${x}px, 0, 0)`;
  }

  /* ------------------------------------------------------------------ */
  /* 5. Signature collection showcase                                    */
  /* ------------------------------------------------------------------ */

  private showcaseFadeIn(p: number): void {
    const section = this.q("#trayang-showcase");
    section.style.opacity = `${0.01 * p}`;
    section.style.display = p > 5 ? "grid" : "none";
  }

  private showcaseTilesShift(p: number): void {
    const tiles = this.qa("#trayang-showcase .number-tile-img");
    tiles[0].style.transform = `translate3d(-50%, ${-50 - 7.5 * p * 0.01}%, 0) scale(0.85)`;
    tiles[1].style.transform = `translate3d(-50%, ${-50 - 5 * p * 0.01}%, 0) scale(0.9)`;
    tiles[2].style.transform = `translate3d(-50%, ${-50 - 2.5 * p * 0.01}%, 0) scale(0.95)`;
  }

  private showcaseTilesSpread(p: number): void {
    const tiles = this.qa("#trayang-showcase .number-tile-img");
    const intro = this.q("#trayang-showcase .intro-container");
    const e = 0.01 * p;
    const rot = 30 * e;
    const spread = 125 * e;
    const pos = spread - 50;
    const neg = -50 - spread;
    tiles[0].style.transform = `translate3d(${pos}%, ${pos}%, 0) rotate(-${rot}deg) scale(${0.85 + 0.15 * e})`;
    tiles[1].style.transform = `translate3d(${neg}%, ${neg}%, 0) rotate(-${rot}deg) scale(${0.9 + 0.1 * e})`;
    tiles[2].style.transform = `translate3d(${pos}%, ${neg}%, 0) rotate(${rot}deg) scale(${0.95 + 0.05 * e})`;
    tiles[3].style.transform = `translate3d(${neg}%, ${pos}%, 0) rotate(${rot}deg)`;
    intro.style.opacity = `${e}`;
    intro.style.transform = `translate3d(0, ${50 * e - 50}%, 0)`;
  }

  private showcaseTilesFlyOut(p: number): void {
    const tiles = this.qa("#trayang-showcase .number-tile-img");
    const main = this.q("#trayang-showcase .main-container");
    const intro = this.q("#trayang-showcase .intro-container");
    const detail = this.q("#trayang-showcase .detail-container");
    const e = 0.01 * p;
    const rot = 30 * e;
    const t0 = tiles[0];
    const xPct = 100 * (main.offsetLeft / t0.offsetWidth + t0.offsetLeft / t0.offsetWidth);
    const yPct = 100 * (main.offsetTop / t0.offsetHeight + t0.offsetTop / t0.offsetHeight);
    const s = 125 * e;
    tiles[0].style.transform = `translate3d(${75 + (xPct - 73) * e}%, ${75 - s}%, 0) rotate(${rot - 30}deg)`;
    tiles[1].style.transform = `translate3d(${-175 - (xPct - 73) * e}%, ${s - 175}%, 0) rotate(${rot - 30}deg)`;
    tiles[2].style.transform = `translate3d(${75 - s}%, ${-175 - (yPct - 73) * e}%, 0) rotate(${30 - rot}deg)`;
    tiles[3].style.transform = `translate3d(${s - 175}%, ${75 + (yPct - 73) * e}%, 0) rotate(${30 - rot}deg)`;
    intro.style.opacity = `${1 - e}`;
    detail.style.opacity = `${e}`;
  }

  private showcaseHighlight(p: number): void {
    const spans = this.qa("#trayang-showcase .detail-container span");
    const first = p < 50;
    spans[0].classList.toggle("highlight", first);
    spans[1].classList.toggle("highlight", !first);
  }

  private showcaseFadeOut(p: number): void {
    this.q("#trayang-showcase").style.opacity = `${1 - 0.01 * p}`;
  }

  /* ------------------------------------------------------------------ */
  /* 6. Questions + footer                                               */
  /* ------------------------------------------------------------------ */

  private questionsFadeIn(p: number): void {
    const section = this.q("#trayang-questions");
    section.style.opacity = `${0.01 * p}`;
    section.style.display = p > 5 ? "grid" : "none";
  }

  private questionsLift(p: number): void {
    const footer = this.q(".trayang-footer");
    this.q("#trayang-questions").style.transform = `translate3d(0, ${(1 - footer.scrollHeight) * p * 0.01}px, 0)`;
  }

  private footerSlideUp(p: number): void {
    this.q(".trayang-footer").style.transform = `translate3d(0, ${-p}%, 0)`;
  }
}
