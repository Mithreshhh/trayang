import { connect, images } from "@/data/site";

/**
 * Stage 2: "Crafted beyond Expectations". Two visuals slide in from the sides,
 * then four promise points pop in one at a time along a dotted line.
 * The engine addresses the 7 .dot-container children (4 points + 3 spacers)
 * by index, so keep the order.
 */
export default function Connect() {
  return (
    <section id="connect-section" className="connect-section">
      <img alt="" src={images.showcaseLeft} loading="lazy" className="left-img" />
      <img alt="" src={images.showcaseRight} loading="lazy" className="right-img" />
      <div className="main-container">
        <h1 className="heading">
          {connect.heading.before}
          <span>{connect.heading.highlight}</span>
          {connect.heading.after}
        </h1>

        <div className="point-dots-container">
          {connect.points.map((point, i) => (
            <PointDot key={point.id} id={point.id} icon={point.icon} withSpacer={i < connect.points.length - 1} />
          ))}
        </div>

        <div className="point-desc-container">
          {connect.points.map((point) => (
            <p id={`${point.id}-point-desc`} key={point.id}>
              {point.desc}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function PointDot({ id, icon, withSpacer }: { id: string; icon: string; withSpacer: boolean }) {
  return (
    <>
      <div className="dot-container" id={`${id}-dot-container`}>
        <div className="dot" />
        <div className="point">
          <img alt="" src={icon} loading="lazy" />
        </div>
      </div>
      {withSpacer && (
        <div className="dot-container empty">
          <div className="dot" />
        </div>
      )}
    </>
  );
}
