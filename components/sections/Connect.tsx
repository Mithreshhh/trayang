import { connect, images } from "@/data/site";
import { PointIcon } from "../Glyph";
import { Pass } from "../Print";

/**
 * Stage 2: "Creative with a commercial purpose". Two printed plates slide in
 * from the sides, then the purpose points register one at a time along the
 * dotted line. The engine addresses the .dot-container children (points with
 * spacers between them) by index, so keep the order.
 */
export default function Connect() {
  return (
    <section id="connect-section" className="connect-section stock-brown">
      <img alt="" src={images.studio} className="left-img" />
      <img alt="" src={images.growth} className="right-img" />
      <div className="main-container">
        <Pass as="h2" className="heading display">
          {connect.heading.before}
          <span className="ink-gold">{connect.heading.highlight}</span>
          {connect.heading.after}
        </Pass>

        <div className="point-dots-container" aria-hidden="true">
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
          <PointIcon name={icon} />
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
