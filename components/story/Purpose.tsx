import { chapterLabel, images, purpose } from "@/data/site";
import { PointIcon } from "../Glyph";
import { Pass, PrintPlate } from "../Print";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Chapter 2 on kraft. The heading holds still beside the purpose lines, and
 * each line takes the ink as it scrolls up to the middle of the screen.
 */
export default function Purpose() {
  return (
    <section id="purpose" className="home-sheet purpose-sheet stock-brown" aria-labelledby="purpose-title">
      <div className="sheet-inner purpose-layout">
        <div className="purpose-head">
          <p className="label">{chapterLabel("purpose")}</p>
          <Pass id="purpose-title" className="display purpose-title" reveal>
            {purpose.heading.before}
            <span className="ink-gold">{purpose.heading.highlight}</span>
            {purpose.heading.after}
          </Pass>
          <PrintPlate src={images.growth} alt="" className="purpose-plate" />
        </div>

        <ol className="purpose-list">
          {purpose.points.map((point, i) => (
            <li className="purpose-item" key={point.id}>
              <span className="purpose-num display" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <PointIcon name={point.icon} />
              <p>{point.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
