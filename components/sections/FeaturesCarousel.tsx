import { carousel } from "@/data/site";
import Glyph from "../Glyph";
import { Pass } from "../Print";

/** Stage 4: ten capability prints on the gold stock, one screen of scroll per card, with a progress bar. */
export default function FeaturesCarousel() {
  return (
    <section id="trayang-features-carousel" className="features-carousel-section stock-gold">
      <div className="main-container">
        <Pass as="h2" className="heading display">
          {carousel.heading}
        </Pass>

        <div className="carousel-container">
          {carousel.cards.map((card) => (
            <article className="card stock-cream" key={card.title}>
              <h3 className="title display">{card.title}</h3>
              <p className="lead">{card.lead}</p>
              <p className="body">{card.body}</p>
              <Glyph name={card.glyph} className="card-glyph" />
            </article>
          ))}
        </div>

        <div className="progress-bar" aria-hidden="true">
          <div className="bar" />
        </div>
      </div>
    </section>
  );
}
