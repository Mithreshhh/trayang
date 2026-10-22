"use client";

import { useEffect } from "react";

/**
 * Prints [data-reveal] headings when they first enter the viewport: their ghost
 * passes slide into register once. Content is visible without this; only the
 * ghost passes wait for it.
 */
export default function Reveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
