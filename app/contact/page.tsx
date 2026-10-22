import type { Metadata } from "next";
import { contact, contactPage } from "@/data/site";
import SitePage, { CtaBand, PageHero } from "@/components/SitePage";
import EnquiryForm from "@/components/EnquiryForm";
import { RegCorners } from "@/components/Print";

export const metadata: Metadata = { title: "Contact", description: contactPage.intro };

export default function ContactPage() {
  return (
    <SitePage className="page-contact">
      <PageHero title={contactPage.title} intro={contactPage.intro} />

      <section className="contact-grid sheet">
        <div className="enquiry-sheet">
          <RegCorners />
          <EnquiryForm />
        </div>

        <aside className="contact-aside">
          {contactPage.details.map((d) => (
            <div key={d.title} className="contact-note">
              <h2 className="display">{d.title}</h2>
              <p>{d.body}</p>
            </div>
          ))}
          <p className="contact-note contact-prefer">
            Prefer email? Write to{" "}
            <a className="contact-mail" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
        </aside>
      </section>

      <CtaBand title={contactPage.cta.title} body={contactPage.cta.body} href={`mailto:${contact.email}`} button={contactPage.cta.button} />
    </SitePage>
  );
}
