import { approach, chapterLabel } from "@/data/site";
import { Diamond, Pass, RegCorners, Rule } from "../Print";

/**
 * Chapter 3 on cream. Three translucent ink discs, one per pass, start apart
 * and move into register as you scroll; where all three overlap the result
 * prints. The engine moves .disc and fades the labels, centre mark and result.
 */
export default function Approach() {
  return (
    <section id="story-approach" className="story-sheet approach-sheet stock-cream" aria-labelledby="approach-title">
      <span className="sheet-shade" aria-hidden="true" />
      <RegCorners />
      <div className="sheet-inner approach-layout">
        <div className="approach-copy">
          <p className="label">{chapterLabel("approach")}</p>
          <div className="approach-swap">
            <Pass id="approach-title" className="display approach-title">
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
