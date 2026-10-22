import { chapterLabel, touchpoints } from "@/data/site";
import Glyph from "../Glyph";
import { Pass, RegCorners } from "../Print";

/**
 * Chapter 5 on kraft. A gold line runs through the four touchpoints and each
 * one prints as the line reaches it; then the heading lifts away and the
 * statement takes the ink word by word.
 */
export default function Touchpoints() {
  return (
    <section id="story-touchpoints" className="story-sheet touch-sheet stock-brown" aria-labelledby="touch-title">
      <span className="sheet-shade" aria-hidden="true" />
      <RegCorners />
      <div className="sheet-inner touch-layout">
        <div className="touch-copy">
          <div className="touch-intro">
            <p className="label">{chapterLabel("touchpoints")}</p>
            <Pass id="touch-title" className="display touch-title">
              {touchpoints.heading}
            </Pass>
            <p className="touch-desc">{touchpoints.desc}</p>
          </div>

          <p className="touch-statement">
            <span className="sr-only">{touchpoints.statement.join(" ")}</span>
            {touchpoints.statement.map((sentence, s) => (
              <span key={s} className={`touch-sentence touch-sentence-${s + 1}`} aria-hidden="true">
                {sentence.split(" ").map((word, j) => (
                  <span key={j} className="w">
                    {word}{" "}
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
            {touchpoints.nodes.map((node) => (
              <li key={node.label} className="node">
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
