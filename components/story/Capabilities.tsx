import { capabilities, chapterLabel } from "@/data/site";
import Glyph from "../Glyph";
import { Pass } from "../Print";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Chapter 4 on gold. An index of the ten capabilities beside a detail panel,
 * one screen of scroll per entry. The index is drawn twice: the second copy
 * (cream type) sits inside a brown band that travels to the active row, so
 * the highlight moves with the scroll. Index rows jump straight to their entry.
 */
export default function Capabilities() {
  const total = capabilities.cards.length;
  return (
    <section id="story-capabilities" className="story-sheet cap-sheet stock-gold" aria-labelledby="capabilities-title">
      <span className="sheet-shade" aria-hidden="true" />
      <div className="sheet-inner cap-layout">
        <header className="cap-head">
          <p className="label">{chapterLabel("capabilities")}</p>
          <Pass id="capabilities-title" className="display cap-title">
            {capabilities.heading.split(/(?<=\.)\s+/).map((sentence) => (
              <span key={sentence} className="cap-title-line">
                {sentence}{" "}
              </span>
            ))}
          </Pass>
        </header>

        <div className="cap-index">
          <ol className="cap-list">
            {capabilities.cards.map((card, i) => (
              <li key={card.title}>
                <button type="button" data-jump="capabilities" data-step={i}>
                  <CapRow n={i + 1} title={card.title} />
                </button>
              </li>
            ))}
          </ol>
          <div className="cap-band" aria-hidden="true">
            <ol className="cap-list cap-list-ink">
              {capabilities.cards.map((card, i) => (
                <li key={card.title}>
                  <CapRow n={i + 1} title={card.title} />
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="cap-meter" aria-hidden="true">
          <span className="cap-count">
            <b className="cap-now">01</b> / {pad(total)}
          </span>
          <span className="cap-ticks">
            {capabilities.cards.map((card) => (
              <i key={card.title} />
            ))}
          </span>
        </div>

        <div className="cap-panels stock-cream">
          {capabilities.cards.map((card, i) => (
            <article className="cap-panel" key={card.title}>
              <span className="cap-big-num display" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <Glyph name={card.glyph} className="cap-glyph" />
              <h3 className="display cap-panel-title">{card.title}</h3>
              <p className="cap-lead">{card.lead}</p>
              <p className="cap-body">{card.body}</p>
            </article>
          ))}
        </div>
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
