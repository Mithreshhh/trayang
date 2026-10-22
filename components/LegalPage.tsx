import { contact } from "@/data/site";
import SitePage, { PageHero } from "./SitePage";

type Section = { title: string; body: string };

/** Plain-language legal pages: numbered clauses so they can be referenced in proposals. */
export default function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: Section[] }) {
  return (
    <SitePage className="page-legal">
      <PageHero title={title} intro={intro} />
      <ol className="clauses sheet">
        {sections.map((s, i) => (
          <li key={s.title}>
            <p className="clause-no">{String(i + 1).padStart(2, "0")}</p>
            <div>
              <h2 className="display">{s.title}</h2>
              <p>{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="legal-contact sheet">
        Questions about this page? Email <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    </SitePage>
  );
}
