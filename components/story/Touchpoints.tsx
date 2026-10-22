import type { CSSProperties } from "react";
import { chapterLabel, touchpoints } from "@/data/site";
import Glyph from "../Glyph";
import { Pass, RegCorners } from "../Print";

/**
 * Chapter 5 on kraft. As the sheet scrolls through, a gold line draws down
 * through the four touchpoints, lighting each one, and the statement takes the
 * ink word by word. Both run on CSS view timelines; without them, everything
 * shows inked.
 */
export default function Touchpoints() {
  let word = 0;
  return (
    <section id="touchpoints" className="home-sheet touch-sheet stock-brown" aria-labelledby="touch-title">
      <RegCorners />
      <div className="sheet-inner touch-layout">
        <div className="touch-copy">
          <p className="label">{chapterLabel("touchpoints")}</p>
          <Pass id="touch-title" className="display touch-title" reveal>
            {touchpoints.heading}
          </Pass>
          <p className="touch-desc">{touchpoints.desc}</p>
          <p className="touch-statement">
            <span className="sr-only">{touchpoints.statement.join(" ")}</span>
            {touchpoints.statement.map((sentence, s) => (
              <span key={s} className={`touch-sentence touch-sentence-${s + 1}`} aria-hidden="true">
                {sentence.split(" ").map((w, j) => (
                  <span key={j} className="w" style={{ "--i": word++ } as CSSProperties}>
                    {w}{" "}
                  </span>
                ))}
              </span>
            ))}
          </p>
        </div>

        <div className="circuit">
          <span className="circuit-rail" aria-hidden="true">
            <span className="circuit-fill" />
          </span>
          <ol className="circuit-nodes" aria-label="Touchpoints">
            {touchpoints.nodes.map((node, i) => (
              <li key={node.label} className="node" style={{ "--i": i } as CSSProperties}>
                <span className="node-ring">
                  <Glyph name={node.glyph} />
                </span>
                <span className="node-label">{node.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
