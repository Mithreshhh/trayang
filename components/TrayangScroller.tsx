"use client";

import { useEffect, useRef } from "react";
import { ScrollStory } from "@/lib/scrollStory";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Landing from "./sections/Landing";
import Connect from "./sections/Connect";
import FeaturesIntro from "./sections/FeaturesIntro";
import FeaturesCarousel from "./sections/FeaturesCarousel";
import Showcase from "./sections/Showcase";
import Questions from "./sections/Questions";

/** A tighter 17-screen journey keeps the storytelling without making visitors work through 26 full screens. */
const SCREENS = 17;

/**
 * The only scrolling element on the page. A sticky 100dvh stage sits at the top
 * and the ScrollStory engine turns scroll position into the section animations.
 */
export default function TrayangScroller() {
  const scroller = useRef<HTMLDivElement>(null);
  const scrollTop = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const story = new ScrollStory(el, {
      onScrollFractionChange: (t) => scrollTop.current?.classList.toggle("is-visible", t > 0.8),
    });
    story.attach();
    return () => story.detach();
  }, []);

  return (
    <div id="trayang-scroller" ref={scroller}>
      <button
        ref={scrollTop}
        type="button"
        className="scroll-top"
        aria-label="Back to top"
        onClick={() => scroller.current?.scrollTo({ top: 0 })}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>

      <div id="trayang-sections" className="trayang-sections">
        <Navbar mode="story" />
        <div className="sections">
          <Landing />
          <Connect />
          <FeaturesIntro />
          <FeaturesCarousel />
          <Showcase />
          <Questions />
        </div>
        <Footer />
      </div>

      {Array.from({ length: SCREENS }, (_, i) => (
        <div className="bg-cover" key={i} />
      ))}
    </div>
  );
}
