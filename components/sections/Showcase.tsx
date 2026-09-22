import { showcase } from "@/data/site";

/**
 * Stage 5: four stacked collection tiles fan out to the corners while the
 * heading rises, then fly off-screen as the detail copy fades in and highlights
 * sentence by sentence. Class names are kept from the layout reference.
 */
export default function Showcase() {
  return (
    <section id="trayang-showcase" className="virtual-number-section">
      <div className="main-container">
        <div className="intro-container">
          <h1 className="heading">{showcase.heading}</h1>
          <p className="desc">{showcase.desc}</p>
        </div>

        <div className="detail-container">
          <span className="highlight">{showcase.detail1}</span>
          <span>{showcase.detail2}</span>
        </div>

        {showcase.tiles.map((tile) => (
          <img key={tile.code} alt="" src={tile.image} loading="lazy" className={`number-tile-img ${tile.code}`} />
        ))}
      </div>
    </section>
  );
}
