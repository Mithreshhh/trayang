"use client";

import { useEffect, useRef } from "react";
import { capabilities, purpose, storyChapters } from "@/data/site";
import { ScrollStory, storyEnd } from "@/lib/scrollStory";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Reveal from "./Reveal";
import Hero from "./story/Hero";
import Purpose from "./story/Purpose";
import Approach from "./story/Approach";
import Capabilities from "./story/Capabilities";
import Touchpoints from "./story/Touchpoints";
import Questions from "./story/Questions";

/** One spacer per screen the stage stays pinned for, plus the screen that releases it. */
const SPACERS = storyEnd(purpose.points.length, capabilities.cards.length) + 1;

/**
 * The only scrolling element on the page. The sticky stage holds the chapter
 * sheets while the track of spacers scrolls past; the ScrollStory engine turns
 * scroll position into the sheet animations. After the track, the questions
 * and the footer scroll as ordinary content.
 */
export default function TrayangScroller() {
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const story = new ScrollStory(el);
    story.attach();
    return () => story.detach();
  }, []);

  return (
    <div id="trayang-scroller" ref={scroller}>
      <Navbar mode="story" />

      <nav className="chapter-rail" aria-label="Chapters">
        <ol>
          {storyChapters.map((chapter, i) => (
            <li key={chapter.id}>
              <button type="button" data-jump={chapter.id} data-rail="" aria-current={i === 0 ? "step" : undefined}>
                <span className="rail-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="rail-label">{chapter.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="story-track">
        <div className="story-stage">
          <div className="sheets">
            <Hero />
            <Purpose />
            <Approach />
            <Capabilities />
            <Touchpoints />
          </div>
        </div>
        {Array.from({ length: SPACERS }, (_, i) => (
          <div className="bg-cover" key={i} />
        ))}
      </div>

      <Questions />
      <Footer />
      <Reveal />
    </div>
  );
}
