"use client";

import { useEffect, useState } from "react";
import { storyChapters } from "@/data/site";

/** Numbered links down the right edge (wide screens); the chapter crossing the middle of the screen is marked. */
export default function ChapterRail() {
  const [active, setActive] = useState<string>(storyChapters[0].id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const c of storyChapters) {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return (
    <nav className="chapter-rail" aria-label="Chapters">
      <ol>
        {storyChapters.map((chapter, i) => (
          <li key={chapter.id}>
            <a href={`#${chapter.id}`} aria-current={active === chapter.id ? "location" : undefined}>
              <span className="rail-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="rail-label">{chapter.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
