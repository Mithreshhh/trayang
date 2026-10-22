import { featuresIntro, images } from "@/data/site";

type Heading = { before: string; highlight: string; after: string };
const toHtml = (h: Heading) => `${h.before}<span>${h.highlight}</span>${h.after}`;

/**
 * Stage 3: "Every move has a purpose". The gold diamond (img.thunder, class
 * kept for the engine) sits in a registration target and is scaled until it
 * floods the viewport, becoming the gold stock behind the carousel. On the way
 * back the copy and plate swap (data-copy-up / data-bg2) and the target ring
 * fills before "Growth, built with purpose." prints.
 */
export default function FeaturesIntro() {
  return (
    <section
      id="trayang-features-intro"
      className="features-intro-section stock-brown"
      style={{ backgroundImage: `url(${images.studio})` }}
      data-bg1={images.studio}
      data-bg2={images.growth}
      data-copy-down={toHtml(featuresIntro.headingDown)}
      data-copy-up={toHtml(featuresIntro.headingUp)}
    >
      <div className="main-container">
        <h2 className="heading display">
          {featuresIntro.headingDown.before}
          <span>{featuresIntro.headingDown.highlight}</span>
          {featuresIntro.headingDown.after}
        </h2>
        <div className="thunder-container">
          <div className="ellipse" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" />
              <circle cx="50" cy="50" r="30" />
              <path d="M50 0v18M50 82v18M0 50h18M82 50h18" />
            </svg>
          </div>
          <img alt="" src={images.emblem} className="thunder" />
        </div>
        <h2 className="heading bottom display">
          {featuresIntro.bottom.before}
          <span>{featuresIntro.bottom.highlight}</span>
          {featuresIntro.bottom.after}
        </h2>
      </div>
    </section>
  );
}
