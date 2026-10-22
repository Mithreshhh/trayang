/**
 * Scroll-driven story engine for the Trayang homepage.
 *
 * The page never scrolls the document. A single container (#trayang-scroller)
 * scrolls through a track of viewport-tall spacers while a sticky 100dvh stage
 * (.story-stage) stays pinned. Scroll position is converted to a fraction
 * t = scrollTop / viewportHeight and every stage below maps a [start, end]
 * range of t to a 0–100 percentage that drives inline styles. Whole values of
 * t are the snap points, so each one is designed to be a finished state.
 *
 * The chapters are sheets of stock stacked in the stage. Each new sheet slides
 * up over the last one, which sinks back under a shade. Once the last sheet
 * has played out the track ends, the stage scrolls away and the questions and
 * footer follow as ordinary content.
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

/** Screens the story stays pinned for; the track renders one spacer per screen plus one. */
export function storyEnd(purposeCount: number, capabilityCount: number): number {
  // hero → purpose sheet (1) + its lines (n − 1) + approach sheet and register (2)
  // + capabilities sheet (1) + its entries (n − 1) + touchpoints sheet, line and statement (3)
  return purposeCount + capabilityCount + 5;
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

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

/** Where the three approach discs sit: angle (radians) from the centre of the plate. */
const DISC_ANGLES = [(210 * Math.PI) / 180, (330 * Math.PI) / 180, Math.PI / 2];
/** Disc distance from centre, in disc diameters: apart (matches the CSS start state) → in register. */
const DISC_APART = 0.72;
const DISC_REGISTERED = 0.2;

export class ScrollStory {
  private readonly stages: Stage[] = [];
  private readonly chapterAt = new Map<string, number>();
  private readonly capabilityStart: number;
  readonly end: number;
  private last: number | undefined;
  private goingDown = true;
  private raf = 0;
  private activeChapter = "";
  private attached = false;
  private readonly reduced: boolean;
  private readonly cache = new Map<string, HTMLElement | HTMLElement[]>();
  private readonly measured = new Map<string, number[]>();

  constructor(private readonly root: HTMLElement, private readonly opts: ScrollStoryOptions = {}) {
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const purposeCount = root.querySelectorAll("#story-purpose .reel-item").length;
    const capabilityCount = root.querySelectorAll("#story-capabilities .cap-panel").length;

    let t = 0;
    const at = (span: number, fn: StageFn) => {
      this.stages.push({ start: t, end: t + span, fn });
      t += span;
    };

    this.chapterAt.set("hero", 0);
    at(1, (p, ph) => this.sheetIn(1, p, ph));
    this.chapterAt.set("purpose", t);
    at(purposeCount - 1, (p) => this.purposeReel(p));

    at(1, (p, ph) => this.sheetIn(2, p, ph));
    this.chapterAt.set("approach", t);
    at(1, (p) => this.approachRegister(p));

    at(1, (p, ph) => this.sheetIn(3, p, ph));
    this.chapterAt.set("capabilities", t);
    this.capabilityStart = t;
    at(capabilityCount - 1, (p) => this.capabilityIndex(p));

    at(1, (p, ph) => this.sheetIn(4, p, ph));
    this.chapterAt.set("touchpoints", t);
    at(1, (p) => this.touchpointLine(p));
    at(1, (p) => this.touchpointStatement(p));

    this.end = t;
    // The track releases the stage one screen later, where the questions sheet starts.
    this.chapterAt.set("questions", t + 1);
  }

  /* ------------------------------------------------------------------ */
  /* Engine                                                              */
  /* ------------------------------------------------------------------ */

  attach(): void {
    this.root.addEventListener("scroll", this.onScroll, { passive: true });
    this.root.addEventListener("click", this.onClick);
    window.addEventListener("resize", this.onResize);
    this.attached = true;
    // Line heights settle once the webfonts land; measure again then.
    document.fonts?.ready.then(() => this.attached && this.onResize());
    this.run();
  }

  detach(): void {
    this.attached = false;
    this.root.removeEventListener("scroll", this.onScroll);
    this.root.removeEventListener("click", this.onClick);
    window.removeEventListener("resize", this.onResize);
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.cache.clear();
    this.measured.clear();
  }

  /** Scroll position (in screens) where a chapter, or one capability entry, is fully in place. */
  timeFor(chapter: string, step = 0): number | undefined {
    if (chapter === "capabilities") return this.capabilityStart + step;
    return this.chapterAt.get(chapter);
  }

  private onScroll = (): void => {
    if (this.raf) return;
    this.raf = requestAnimationFrame(this.run);
  };

  /** Measured offsets go stale after a resize, and pixel-based stages must be re-applied. */
  private onResize = (): void => {
    this.measured.clear();
    for (const stage of this.stages) stage.phase = undefined;
    this.last = undefined;
    this.onScroll();
  };

  /** Anything with data-jump (the chapter rail, the capability index) scrolls to its place in the story. */
  private onClick = (e: MouseEvent): void => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-jump]");
    if (!el) return;
    const t = this.timeFor(el.dataset.jump ?? "", Number(el.dataset.step ?? 0));
    if (t === undefined) return;
    e.preventDefault();
    this.root.scrollTo({ top: t * this.root.clientHeight });
  };

  private run = (): void => {
    this.raf = 0;
    const t = this.root.scrollTop / this.root.clientHeight;
    this.goingDown = this.last === undefined || t > this.last;
    this.opts.onScrollFractionChange?.(t);
    const st = this.stages;
    // First run (or after a resize): stages still ahead get their start state, latest first.
    if (this.last === undefined) {
      for (let i = st.length - 1; i >= 0; i--) {
        if (t < st[i].start) {
          st[i].fn(0, "before");
          st[i].phase = "before";
        }
      }
    }
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
    this.markChapter(t);
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

  /** Layout reads, cached until the next resize so stages never force layout mid-frame. */
  private measure(key: string, read: () => number[]): number[] {
    let hit = this.measured.get(key);
    if (!hit) {
      hit = read();
      this.measured.set(key, hit);
    }
    return hit;
  }

  /** The rail marks the chapter whose start is nearest behind the current position. */
  private markChapter(t: number): void {
    let current = "hero";
    for (const [id, start] of this.chapterAt) if (t >= start - 0.5) current = id;
    if (current === this.activeChapter) return;
    this.activeChapter = current;
    for (const btn of this.qa("[data-rail]")) {
      if (btn.dataset.jump === current) btn.setAttribute("aria-current", "step");
      else btn.removeAttribute("aria-current");
    }
  }

  /* ------------------------------------------------------------------ */
  /* Sheets                                                              */
  /* ------------------------------------------------------------------ */

  /**
   * Sheet i slides up over sheet i − 1, which sinks back under a shade. Every
   * write here is a transform or an opacity on its own layer, so a sheet change
   * never repaints a sheet: the compositor only moves and fades them.
   */
  private sheetIn(i: number, p: number, phase: Phase): void {
    const sheets = this.qa(".story-sheet");
    const cur = sheets[i];
    const prev = sheets[i - 1];
    const shade = this.qa(".story-sheet > .sheet-shade")[i - 1];
    const e = 0.01 * p;

    cur.style.visibility = p > 0 ? "visible" : "hidden";
    // A covered sheet stops painting; it comes back the moment the one above starts to lift.
    prev.style.visibility = phase === "after" ? "hidden" : "visible";
    shade.style.opacity = `${0.55 * e}`;

    if (this.reduced) {
      cur.style.opacity = `${e}`;
      return;
    }
    cur.style.transform = `translate3d(0, ${100 - p}%, 0)`;
    prev.style.transform = `translate3d(0, ${-4 * e}%, 0) scale(${1 - 0.05 * e})`;
  }

  /* ------------------------------------------------------------------ */
  /* 2. Purpose reel                                                     */
  /* ------------------------------------------------------------------ */

  private purposeReel(p: number): void {
    const items = this.qa("#story-purpose .reel-item");
    const track = this.q("#story-purpose .reel-track");
    const strip = this.q("#story-purpose .reel-count-strip");
    const n = items.length;
    const pos = 0.01 * p * (n - 1);
    const i0 = Math.min(Math.floor(pos), n - 1);
    const i1 = Math.min(i0 + 1, n - 1);
    const centres = this.measure("reel", () => items.map((el) => el.offsetTop + el.offsetHeight / 2));
    // The active line sits on the registration line; neighbours fade with distance.
    track.style.transform = `translate3d(0, ${-lerp(centres[i0], centres[i1], easeInOut(pos - i0))}px, 0)`;
    items.forEach((el, i) => {
      const d = Math.abs(pos - i);
      el.style.opacity = `${Math.max(0.14, 1 - 0.86 * d)}`;
      el.classList.toggle("is-active", d < 0.5);
    });
    strip.style.transform = `translate3d(0, ${(-100 * pos) / n}%, 0)`;
  }

  /* ------------------------------------------------------------------ */
  /* 3. Approach: three passes move into register                        */
  /* ------------------------------------------------------------------ */

  private approachRegister(p: number): void {
    const discs = this.qa("#story-approach .disc");
    const labels = this.qa("#story-approach .disc-label");
    const centre = this.q("#story-approach .disc-centre");
    const result = this.q("#story-approach .approach-result");
    const title = this.q("#story-approach .approach-title");
    const e = easeInOut(0.01 * p);
    const d = 100 * lerp(DISC_APART, DISC_REGISTERED, e);
    discs.forEach((disc, i) => {
      const a = DISC_ANGLES[i];
      disc.style.transform = `translate3d(${Math.cos(a) * d}%, ${Math.sin(a) * d}%, 0)`;
    });
    // Styles go straight onto the few elements that change; a custom property
    // on the section would restyle every element inside it on every frame.
    const merge = clamp((e - 0.55) / 0.45);
    const fade = `${1 - clamp(e / 0.6)}`;
    for (const label of labels) label.style.opacity = fade;
    centre.style.opacity = `${merge}`;
    centre.style.transform = `translate(-50%, -50%) scale(${0.6 + 0.4 * merge}) rotate(${90 * merge}deg)`;
    result.style.opacity = `${merge}`;
    result.style.transform = `translate3d(0, ${16 * (1 - merge)}px, 0)`;
    // Phones swap the heading for the result in one place (see the CSS); wide screens ignore this.
    title.style.setProperty("--merge", `${merge}`);
  }

  /* ------------------------------------------------------------------ */
  /* 4. Capabilities index                                               */
  /* ------------------------------------------------------------------ */

  private capabilityIndex(p: number): void {
    const panels = this.qa("#story-capabilities .cap-panel");
    const rows = this.qa("#story-capabilities .cap-list:not(.cap-list-ink) li");
    const band = this.q("#story-capabilities .cap-band");
    const ink = this.q("#story-capabilities .cap-list-ink");
    const ticks = this.qa("#story-capabilities .cap-ticks i");
    const now = this.q("#story-capabilities .cap-now");
    const buttons = this.qa("#story-capabilities .cap-list button");
    const n = panels.length;
    const pos = 0.01 * p * (n - 1);
    const i0 = Math.min(Math.floor(pos), n - 1);
    const f = pos - i0;

    // Hand-off: the outgoing panel lifts away before the incoming one prints, never both at once.
    panels.forEach((panel, i) => {
      let o = 0;
      let y = 0;
      if (i === i0) {
        const k = clamp(f / 0.48);
        o = 1 - k;
        y = -24 * k;
      } else if (i === i0 + 1) {
        const k = clamp((f - 0.52) / 0.48);
        o = k;
        y = 24 * (1 - k);
      }
      panel.style.opacity = `${o}`;
      panel.style.transform = `translate3d(0, ${y}px, 0)`;
      panel.style.visibility = o > 0 ? "visible" : "hidden";
    });

    // The ink band is a window onto a second copy of the index: the band slides
    // down while the copy inside slides up by the same amount, so the cream rows
    // stay lined up with the brown ones underneath. Both moves are transforms.
    if (band.offsetParent) {
      const edges = this.measure("capRows", () => rows.flatMap((r) => [r.offsetTop, r.offsetHeight]));
      const i1 = Math.min(i0 + 1, n - 1);
      const g = easeInOut(f);
      const top = lerp(edges[2 * i0], edges[2 * i1], g);
      const height = `${Math.round(lerp(edges[2 * i0 + 1], edges[2 * i1 + 1], g))}px`;
      if (band.style.height !== height) band.style.height = height;
      band.style.transform = `translate3d(0, ${top}px, 0)`;
      ink.style.transform = `translate3d(0, ${-top}px, 0)`;
    }

    ticks.forEach((tick, i) => tick.style.setProperty("--fill", `${clamp(pos + 1 - i)}`));
    const active = Math.round(pos);
    const label = String(active + 1).padStart(2, "0");
    if (now.textContent !== label) now.textContent = label;
    buttons.forEach((b, i) => (i === active ? b.setAttribute("aria-current", "true") : b.removeAttribute("aria-current")));
  }

  /* ------------------------------------------------------------------ */
  /* 5. Touchpoints                                                      */
  /* ------------------------------------------------------------------ */

  private touchpointLine(p: number): void {
    const fill = this.q("#story-touchpoints .circuit-fill");
    const nodes = this.qa("#story-touchpoints .node");
    const e = 0.01 * p;
    // CSS draws it across on phones and downwards on wide screens.
    fill.style.setProperty("--draw", `${e}`);
    nodes.forEach((node, i) => node.classList.toggle("is-lit", e > 0 && e >= i / (nodes.length - 1) - 0.02));
  }

  private touchpointStatement(p: number): void {
    const intro = this.q("#story-touchpoints .touch-intro");
    const statement = this.q("#story-touchpoints .touch-statement");
    const words = this.qa("#story-touchpoints .touch-statement .w");
    const e = 0.01 * p;
    const k = clamp(e / 0.3);
    intro.style.opacity = `${1 - k}`;
    intro.style.transform = `translate3d(0, ${-24 * k}px, 0)`;
    intro.style.visibility = k < 1 ? "visible" : "hidden";
    statement.style.opacity = `${k}`;
    // Words take the ink one after another across the rest of the screen. They
    // stop at 0.99: an inline element crossing opacity 1 gains or loses its paint
    // layer, which forces a layout on every frame.
    const lit = clamp((e - 0.2) / 0.75) * words.length;
    words.forEach((w, j) => (w.style.opacity = `${0.16 + 0.83 * clamp(lit - j)}`));
  }
}
