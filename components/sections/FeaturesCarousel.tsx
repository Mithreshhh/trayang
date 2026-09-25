import { carousel } from "@/data/site";

/** Stage 4: ten service cards, one screen of scroll per card, with a progress bar. */
export default function FeaturesCarousel() {
  return (
    <section id="trayang-features-carousel" className="features-carousel-section">
      <div className="main-container">
        <h1 className="heading">{carousel.heading}</h1>

        <div className="carousel-container">
          {carousel.cards.map((card, index) => (
            <div className="card" key={card.title}>
              <p className="title">{card.title}</p>
              <p className="subtitle">
                {card.lead} <span>{card.rest}</span>
              </p>
              <div className="img service-mark" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="progress-bar">
          <div className="bar" />
        </div>
      </div>
    </section>
  );
}
