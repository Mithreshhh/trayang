import { brand, hero, images } from "@/data/site";

interface Props {
  onCtaClick: () => void;
}

/** Stage 1: hero. Blurs and shrinks away as the user starts scrolling. */
export default function Landing({ onCtaClick }: Props) {
  return (
    <section id="trayang-landing" className="landing-section">
      <div className="main-container">
        <h1 className="heading text-zooming">
          {hero.heading.before}
          <span>{hero.heading.highlight}</span>
          {hero.heading.after}
        </h1>

        <div className="points-container" aria-label="Why Trayang">
          <ul className="points-list scroll-up">
            {hero.points.map((point, i) => (
              <li className="point" key={`${point}-${i}`}>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Class kept from the layout reference; this is the gold call-to-action pill. */}
        <button
          type="button"
          className="download-tile text-zooming"
          onClick={onCtaClick}
        >
          <p>{hero.cta}</p>
          <div className="link-container">
            <img alt="" src={images.ctaIcon} />
          </div>
        </button>
      </div>

      <div className="hero-image" style={{ backgroundImage: `url('${images.heroShowcase}')` }} role="img" aria-label={`${brand.name} showcase`} />
      <img alt="" src={images.bgGradient} className="bg-gradient" />
    </section>
  );
}
