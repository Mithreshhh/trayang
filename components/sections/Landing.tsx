import { hero, images, pillars, primaryCta } from "@/data/site";
import Glyph from "../Glyph";
import { InkLink, Pass, PrintPlate, RegCorners, Rule } from "../Print";

/** Stage 1: hero. Blurs away and its passes drift out of register as the user starts scrolling. */
export default function Landing() {
  return (
    <section id="trayang-landing" className="landing-section stock-cream">
      <RegCorners />
      <div className="main-container">
        <div className="landing-copy">
          <Pass as="h1" className="heading display pass-full">
            {hero.lines.map((line) => (
              <span key={line.text} className={`line${line.ink === "gold" ? " ink-gold" : ""}`}>
                {line.text}{" "}
              </span>
            ))}
          </Pass>
          <Rule />
          <p className="landing-body">{hero.body}</p>
          <div className="landing-actions">
            {/* .download-tile is addressed by the scroll engine to disable it once the hero blurs. */}
            <InkLink href={primaryCta.href} className="download-tile">
              {primaryCta.label}
            </InkLink>
            <InkLink href={hero.secondary.href} variant="outline">
              {hero.secondary.label}
            </InkLink>
          </div>
        </div>

        <figure className="landing-print">
          <PrintPlate src={images.studio} alt="The Trayang team laying out a brand moodboard" />
          <figcaption className="pass-legend">
            {hero.passes.map((pass, i) => (
              <span key={pass} className={`pass-chip pass-chip-${i + 1}`}>
                <i aria-hidden="true" />
                {pass}
              </span>
            ))}
          </figcaption>
        </figure>
      </div>

      <ul className="pillar-band" aria-label="What we do">
        {pillars.map((pillar) => (
          <li key={pillar.label}>
            <Glyph name={pillar.glyph} />
            <span>{pillar.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
