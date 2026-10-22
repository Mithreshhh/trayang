import type { Metadata } from "next";
import { faq, primaryCta } from "@/data/site";
import SitePage, { CtaBand, PageHero } from "@/components/SitePage";
import FaqList from "@/components/FaqList";

export const metadata: Metadata = { title: "FAQs", description: faq.intro };

export default function FaqPage() {
  return (
    <SitePage className="page-faq">
      <PageHero title={faq.title} intro={faq.intro} />
      <section className="sheet faq-sheet">
        <FaqList items={faq.items} />
      </section>
      <CtaBand title={faq.cta.title} body={faq.cta.body} href={primaryCta.href} button={faq.cta.button} />
    </SitePage>
  );
}
