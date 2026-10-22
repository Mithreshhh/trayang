"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenis: Lenis | null = null;

/** Pause the eased scroll while an overlay (the mobile menu) owns the screen. */
export function setSmoothScrollPaused(paused: boolean) {
  if (paused) lenis?.stop();
  else lenis?.start();
}

/**
 * Eased wheel scrolling for every page. The document still scrolls natively
 * (sticky header, scroll-linked CSS, find-in-page and hash links all work);
 * Lenis only smooths wheel input. Touch keeps the platform's own momentum,
 * and nothing is smoothed for people who ask for reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      autoRaf: true,
      stopInertiaOnNavigate: true,
      // In-page links glide; scroll-padding-top in CSS keeps them clear of the sticky header.
      anchors: true,
    });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
