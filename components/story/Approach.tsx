import { approach, chapterLabel } from "@/data/site";
import { Diamond, Pass, RegCorners, Rule } from "../Print";

/**
 * Chapter 3 on cream. Three translucent ink discs, one per pass, move into
 * register as the plate scrolls through the screen, and the result prints
 * once they meet. Driven by a CSS view timeline on .discs (see globals.css);
 * without one, the registered end state shows.
 */
export default function Approach() {
  return (
    <section id="approach" className="home-sheet approach-sheet stock-cream" aria-labelledby="approach-title">
      <RegCorners />
      <div className="sheet-inner approach-layout">
        <div className="approach-copy">
          <p className="label">{chapterLabel("approach")}</p>
          <Pass id="approach-title" className="display approach-title" reveal>
            {approach.heading.before}
            <span className="ink-gold">{approach.heading.highlight}</span>
            {approach.heading.after}
          </Pass>
          <div className="approach-result">
            <Rule />
            <p className="display approach-growth">
              {approach.result.before}
              <span className="ink-gold">{approach.result.highlight}</span>
              {approach.result.after}
            </p>
            <p className="approach-caption">{approach.caption}</p>
          </div>
        </div>

        <div className="discs" role="img" aria-label={`${approach.passes.join(", ")}: three passes moving into register`}>
          {approach.passes.map((pass, i) => (
            <span key={pass} className={`disc disc-${i + 1}`}>
              <span className="disc-label">{pass}</span>
            </span>
          ))}
          <Diamond className="disc-centre" />
        </div>
      </div>
    </section>
  );
}
