import { chapterLabel, images, purpose } from "@/data/site";
import { PointIcon } from "../Glyph";
import { Pass, PrintPlate, RegMark } from "../Print";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Chapter 2 on kraft. The purpose lines roll past a registration line, one
 * per screen of scroll, while the counter turns like an odometer. The engine
 * centres .reel-item elements on the line, so keep them in .reel-track.
 */
export default function Purpose() {
  const total = purpose.points.length;
  return (
    <section id="story-purpose" className="story-sheet purpose-sheet stock-brown" aria-labelledby="purpose-title">
      <span className="sheet-shade" aria-hidden="true" />
      <div className="sheet-inner purpose-layout">
        <div className="purpose-head">
          <p className="label">{chapterLabel("purpose")}</p>
          <Pass id="purpose-title" className="display purpose-title">
            {purpose.heading.before}
            <span className="ink-gold">{purpose.heading.highlight}</span>
            {purpose.heading.after}
          </Pass>
          <PrintPlate src={images.growth} alt="" className="purpose-plate" />
        </div>

        <div className="reel">
          <p className="reel-count display" aria-hidden="true">
            <span className="reel-count-window">
              <span className="reel-count-strip">
                {purpose.points.map((point, i) => (
                  <span key={point.id}>{pad(i + 1)}</span>
                ))}
              </span>
            </span>
            <span className="reel-count-total">/{pad(total)}</span>
          </p>
          <div className="reel-window">
            <span className="reel-line" aria-hidden="true">
              <RegMark />
            </span>
            <ol className="reel-track">
              {purpose.points.map((point) => (
                <li className="reel-item" key={point.id}>
                  <PointIcon name={point.icon} />
                  <span>{point.desc}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
