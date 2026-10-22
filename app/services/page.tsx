import type { Metadata } from "next";
import { carousel, images, primaryCta, services } from "@/data/site";
import SitePage, { CtaBand, PageHero, ProofSlots } from "@/components/SitePage";
import Glyph from "@/components/Glyph";
import { Pass } from "@/components/Print";

export const metadata: Metadata = { title: "Services", description: services.intro };

export default function ServicesPage() {
  return (
    <SitePage className="page-services">
      <PageHero title={services.title} intro={services.intro} plate={{ src: images.growth, alt: "Gold growth bars rising across a desk of printed work" }}>
        <nav className="jump" aria-label="Services on this page">
          {services.pillars.map((p) => (
            <a key={p.id} href={`#${p.id}`}>
              {p.name}
            </a>
          ))}
        </nav>
      </PageHero>

      <ol className="pillar-rows sheet">
        {services.pillars.map((p) => (
          <li key={p.id} id={p.id}>
            <div className="pillar-name">
              <Glyph name={p.glyph} className="pillar-glyph" />
              <p>{p.name}</p>
            </div>
            <div className="pillar-copy">
              <Pass as="h2" className="display row-title" reveal>
                {p.title}
              </Pass>
              <p>{p.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="capabilities stock-brown">
        <div className="capabilities-head">
          <Pass as="h2" className="display section-title" reveal>
            {services.detailTitle}
          </Pass>
          <p>{services.detailIntro}</p>
        </div>
        <div className="capability-groups">
          {services.capabilityGroups.map((group, i) => (
            <section key={group.pass} className="capability-group" aria-labelledby={`pass-${i}`}>
              <h3 id={`pass-${i}`} className="pass-chip capability-pass">
                <i aria-hidden="true" className={`pass-dot-${i + 1}`} />
                {group.pass}
              </h3>
              <ul>
                {group.titles.map((title) => {
                  const c = carousel.cards.find((card) => card.title === title);
                  if (!c) return null;
                  return (
                    <li key={c.title}>
                      <p className="display capability-name">{c.title}</p>
                      <p className="lead">{c.lead}</p>
                      <p>{c.body}</p>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <ProofSlots />

      <CtaBand title={services.cta.title} body={services.cta.body} href={primaryCta.href} button={primaryCta.label} />
    </SitePage>
  );
}
