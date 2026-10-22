"use client";

import { useEffect, useRef, useState } from "react";
import { capabilities, chapterLabel } from "@/data/site";
import Glyph from "../Glyph";
import { Pass } from "../Print";

const pad = (n: number) => String(n).padStart(2, "0");
const entryId = (i: number) => `service-${pad(i + 1)}`;

/**
 * Chapter 4 on gold. The heading and an index of the ten capabilities hold
 * still on the left while the entries scroll past on the right. The index is
 * drawn twice: the second copy (cream type) sits inside a brown band that
 * glides to whichever entry is crossing the middle of the screen.
 */
export default function Capabilities() {
  const [active, setActive] = useState(0);
  const [band, setBand] = useState<{ top: number; height: number } | null>(null);
  const rows = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const entries = capabilities.cards.map((_, i) => document.getElementById(entryId(i)));
    const io = new IntersectionObserver(
      (seen) => {
        for (const e of seen) if (e.isIntersecting) setActive(entries.indexOf(e.target as HTMLElement));
      },
      { rootMargin: "-45% 0px -55% 0px" },
    );
    for (const el of entries) if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const place = () => {
      const row = rows.current?.children[active] as HTMLElement | undefined;
      if (row) setBand({ top: row.offsetTop, height: row.offsetHeight });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  return (
    <section id="capabilities" className="home-sheet cap-sheet stock-gold" aria-labelledby="capabilities-title">
      <div className="sheet-inner cap-layout">
        <div className="cap-aside">
          <p className="label">{chapterLabel("capabilities")}</p>
          <Pass id="capabilities-title" className="display cap-title" reveal>
            {capabilities.heading.split(/(?<=\.)\s+/).map((sentence) => (
              <span key={sentence} className="cap-title-line">
                {sentence}{" "}
              </span>
            ))}
          </Pass>

          <nav className="cap-index" aria-label="Services">
            <ol className="cap-list" ref={rows}>
              {capabilities.cards.map((card, i) => (
                <li key={card.title}>
                  <a href={`#${entryId(i)}`} aria-current={i === active ? "true" : undefined}>
                    <CapRow n={i + 1} title={card.title} />
                  </a>
                </li>
              ))}
            </ol>
            <div
              className="cap-band"
              aria-hidden="true"
              style={band ? { height: band.height, transform: `translate3d(0, ${band.top}px, 0)` } : undefined}
            >
              <ol className="cap-list cap-list-ink" style={band ? { transform: `translate3d(0, ${-band.top}px, 0)` } : undefined}>
                {capabilities.cards.map((card, i) => (
                  <li key={card.title}>
                    <CapRow n={i + 1} title={card.title} />
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        </div>

        <ol className="cap-entries">
          {capabilities.cards.map((card, i) => (
            <li className="cap-entry" id={entryId(i)} key={card.title}>
              <div className="cap-entry-mark">
                <span className="cap-big-num display" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <Glyph name={card.glyph} className="cap-glyph" />
              </div>
              <div className="cap-entry-copy">
                <h3 className="display cap-entry-title">{card.title}</h3>
                <p className="cap-lead">{card.lead}</p>
                <p className="cap-body">{card.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CapRow({ n, title }: { n: number; title: string }) {
  return (
    <span className="cap-row">
      <span className="cap-num">{pad(n)}</span>
      <span className="cap-name">{title}</span>
    </span>
  );
}
