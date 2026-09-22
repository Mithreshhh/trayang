import { featuresIntro, images } from "@/data/site";

type Heading = { before: string; highlight: string; after: string };
const toHtml = (h: Heading) => `${h.before}<span>${h.highlight}</span>${h.after}`;

/**
 * Stage 3: "Elevate your everyday". The gold emblem (img.thunder, class kept
 * from the layout reference) is scaled ~137x by the engine until it fills the
 * viewport and becomes the backdrop for the carousel. On the way back it shrinks,
 * the copy and background swap (data-copy-up / data-bg2) and a conic ring fills.
 */
export default function FeaturesIntro() {
  return (
    <section
      id="trayang-features-intro"
      className="features-intro-section"
      style={{ backgroundImage: `url(${images.introBg})` }}
      data-bg1={images.introBg}
      data-bg2={images.introBg2}
      data-copy-down={toHtml(featuresIntro.headingDown)}
      data-copy-up={toHtml(featuresIntro.headingUp)}
    >
      <div className="main-container">
        <h1 className="heading">
          {featuresIntro.headingDown.before}
          <span>{featuresIntro.headingDown.highlight}</span>
          {featuresIntro.headingDown.after}
        </h1>
        <div className="thunder-container">
          <img alt="" src={images.ellipse} loading="lazy" className="ellipse" />
          <img alt="" src={images.emblem} loading="lazy" className="thunder" />
        </div>
        <h1 className="heading bottom">
          {featuresIntro.bottom.before}
          <span>{featuresIntro.bottom.highlight}</span>
          {featuresIntro.bottom.after}
        </h1>
      </div>
    </section>
  );
}
