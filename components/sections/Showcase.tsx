import { brand, showcase } from "@/data/site";
import { Diamond, Wordmark } from "../Print";

/**
 * Stage 5: four touchpoint prints (brand, campaign, website, growth) stacked
 * in the centre fan out to the corners while the heading rises, then fly
 * off-screen as the statement prints sentence by sentence. The engine
 * addresses .number-tile-img in DOM order; the last one sits on top.
 */
export default function Showcase() {
  return (
    <section id="trayang-showcase" className="virtual-number-section stock-brown">
      <div className="main-container">
        <div className="intro-container">
          <h2 className="heading display">{showcase.heading}</h2>
          <p className="desc">{showcase.desc}</p>
        </div>

        <div className="detail-container">
          <span className="highlight">{showcase.detail1}</span>
          <span>{showcase.detail2}</span>
        </div>

        <div className="number-tile-img tile-one tile-growth" aria-hidden="true">
          <span className="tile-label">Performance</span>
          <svg viewBox="0 0 160 100" className="tile-art">
            <rect className="ink ink-b" x="14" y="62" width="22" height="30" />
            <rect className="ink ink-b" x="44" y="48" width="22" height="44" />
            <rect className="ink ink-b" x="74" y="34" width="22" height="58" />
            <rect className="ink ink-b" x="104" y="16" width="22" height="76" />
            <circle className="ink ink-c" cx="104" cy="40" r="26" />
            <path className="ink ink-a" d="m12 74 34-26 30 8 58-46" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="number-tile-img tile-two tile-web" aria-hidden="true">
          <span className="tile-label">Website</span>
          <div className="tile-browser">
            <i className="tb-bar" />
            <i className="tb-title" />
            <i className="tb-line" />
            <i className="tb-line short" />
            <i className="tb-btn" />
            <i className="tb-plate" />
          </div>
        </div>

        <div className="number-tile-img tile-three tile-campaign" aria-hidden="true">
          <span className="tile-label">Campaign</span>
          <p className="tile-poster display">
            Rise
            <br />
            beyond
          </p>
          <Diamond />
        </div>

        <div className="number-tile-img tile-four tile-brand" aria-hidden="true">
          <span className="tile-label">Brand identity</span>
          <Wordmark />
          <span className="tile-swatches">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="tile-motto">{brand.motto.join(" ")}</span>
        </div>
      </div>
    </section>
  );
}
