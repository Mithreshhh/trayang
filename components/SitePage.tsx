import type { ReactNode } from "react";
import { proof } from "@/data/site";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Reveal from "./Reveal";
import { InkLink, Pass, PrintPlate, RegCorners, Rule } from "./Print";

/** Shell for every page outside the scroll story: printed header band, cream sheet, kraft footer. */
export default function SitePage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`site-page stock-cream ${className}`}>
      <Navbar mode="page" />
      <main id="main">{children}</main>
      <Footer />
      <Reveal />
    </div>
  );
}

type Plate = { src: string; alt: string };

export function PageHero({ title, intro, plate, children }: { title: string; intro: string; plate?: Plate; children?: ReactNode }) {
  return (
    <section className={`page-hero${plate ? " has-plate" : ""}`}>
      <RegCorners />
      <div className="page-hero-copy">
        <Pass as="h1" className="display page-title">
          {title}
        </Pass>
        <Rule />
        <p className="page-intro">{intro}</p>
        {children}
      </div>
      {plate && <PrintPlate src={plate.src} alt={plate.alt} className="page-hero-plate" />}
    </section>
  );
}

export function CtaBand({ title, body, href, button }: { title: string; body: string; href: string; button: string }) {
  return (
    <section className="cta-band stock-gold">
      <RegCorners />
      <Pass as="h2" className="display" reveal>
        {title}
      </Pass>
      <div className="cta-band-side">
        <p>{body}</p>
        <InkLink href={href}>
          {button}
        </InkLink>
      </div>
    </section>
  );
}

/** Real proof only: each block stays out of the page until data/site.ts has entries for it. */
export function ProofSlots() {
  const { clients, caseStudies, testimonials } = proof;
  if (!clients.length && !caseStudies.length && !testimonials.length) return null;
  return (
    <section className="proof sheet">
      {clients.length > 0 && (
        <ul className="proof-clients" aria-label="Clients">
          {clients.map((c) => (
            <li key={c.name}>{c.logo ? <img src={c.logo} alt={c.name} /> : c.name}</li>
          ))}
        </ul>
      )}
      {caseStudies.length > 0 && (
        <div className="proof-cases">
          {caseStudies.map((c) => (
            <article key={c.title}>
              <h3>{c.title}</h3>
              <p>
                {c.client}. {c.summary}
              </p>
              {c.href && <a href={c.href}>Read the case study</a>}
            </article>
          ))}
        </div>
      )}
      {testimonials.length > 0 && (
        <div className="proof-quotes">
          {testimonials.map((t) => (
            <figure key={t.name}>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                {t.name}, {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
