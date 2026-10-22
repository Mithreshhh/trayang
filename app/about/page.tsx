import type { Metadata } from "next";
import { about, images, primaryCta } from "@/data/site";
import SitePage, { CtaBand, PageHero, ProofSlots } from "@/components/SitePage";
import { Diamond, Pass } from "@/components/Print";

export const metadata: Metadata = { title: "About", description: about.intro };

export default function AboutPage() {
  return (
    <SitePage className="page-about">
      <PageHero title={about.title} intro={about.intro} plate={{ src: images.studio, alt: "The Trayang team working across a brand moodboard" }}>
        <p className="page-intro page-intro-2">{about.scope}</p>
      </PageHero>

      <section className="principles sheet">
        <figure className="overlap-figure" aria-label="Strategy, creativity and execution overlap at Trayang">
          <svg viewBox="0 0 300 280" aria-hidden="true">
            <circle className="ink ink-a-soft" cx="112" cy="104" r="84" />
            <circle className="ink ink-b" cx="188" cy="104" r="84" />
            <circle className="ink ink-c" cx="150" cy="170" r="84" />
            <path className="overlap-centre" d="M150 112 164 126 150 140 136 126Z" />
          </svg>
          <figcaption>
            {about.principles.map((p, i) => (
              <span key={p.pass} className={`overlap-label overlap-label-${i + 1}`}>
                {p.pass}
              </span>
            ))}
          </figcaption>
        </figure>

        <ol className="principle-rows">
          {about.principles.map((p) => (
            <li key={p.label}>
              <p className="label">{p.label}</p>
              <div>
                <Pass as="h2" className="display row-title" reveal>
                  {p.title}
                </Pass>
                <p>{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="purpose sheet">
        <div className="purpose-head">
          <Pass as="h2" className="display section-title" reveal>
            {about.purpose.title}
          </Pass>
          <p>{about.purpose.body}</p>
        </div>
        <ul className="purpose-lines">
          {about.purpose.lines.map((line) => (
            <li key={line}>
              <Diamond />
              {line}
            </li>
          ))}
        </ul>
        <p className="purpose-closing">{about.purpose.closing}</p>
      </section>

      <section className="statement">
        <p className="display">{about.statement}</p>
      </section>

      <ProofSlots />

      <CtaBand title={about.cta.title} body={about.cta.body} href={primaryCta.href} button={primaryCta.label} />
    </SitePage>
  );
}
