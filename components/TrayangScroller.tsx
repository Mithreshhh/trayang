"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollStory } from "@/lib/scrollStory";
import { images } from "@/data/site";
import Navbar from "./Navbar";
import MessageBanner from "./MessageBanner";
import Footer from "./Footer";
import ContactOverlay from "./ContactOverlay";
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
 * The enquiry card opens from the hero button or any link to #contact.
 */
export default function TrayangScroller() {
  const scroller = useRef<HTMLDivElement>(null);
  const scrollTopIcon = useRef<HTMLImageElement>(null);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const story = new ScrollStory(el, {
      onScrollFractionChange: (t) => scrollTopIcon.current?.classList.toggle("hidden", !(t > 0.8)),
    });
    story.attach();
    return () => story.detach();
  }, []);

  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#contact") setShowContact(true);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const openContact = useCallback(() => setShowContact(true), []);
  const closeContact = useCallback(() => {
    setShowContact(false);
    if (window.location.hash === "#contact") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <div id="trayang-scroller" ref={scroller}>
      <img
        ref={scrollTopIcon}
        alt="scroll top"
        src={images.scrollTop}
        loading="lazy"
        className="scroll-top-icon hidden"
        onClick={() => {
          if (scroller.current) scroller.current.scrollTop = 0;
        }}
      />

      <div id="trayang-sections" className="trayang-sections">
        <Navbar />
        <MessageBanner />
        <div className="sections">
          <Landing onCtaClick={openContact} />
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

      {showContact && <ContactOverlay onClose={closeContact} />}
    </div>
  );
}
