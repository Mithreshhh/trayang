import type { Metadata } from "next";
import SitePage from "@/components/SitePage";

export const metadata: Metadata = { title: "FAQs | Trayang" };

export default function FaqPage() {
  return <SitePage eyebrow="Frequently asked questions" title="The useful details, upfront." intro="A quick guide to scope, timing, retainers, measurement and how an engagement begins." blocks={[
    { title: "Do you work on projects or retainers?", body: "Both. Focused brand, website and campaign engagements work well as projects; ongoing content, media and optimisation are usually structured as retainers." },
    { title: "What kind of businesses do you work with?", body: "We work best with ambitious teams that value clear thinking, collaborative access and decisions grounded in both brand and commercial goals." },
    { title: "How long does a project take?", body: "Timing depends on scope. A focused strategy sprint may take a few weeks, while a complete brand or web programme is planned across clear phases." },
    { title: "Can you work with our internal team?", body: "Yes. We can lead the programme or work alongside internal marketing, sales, product and specialist partners with defined responsibilities." },
    { title: "How do you measure success?", body: "We agree on meaningful indicators at the start—from clarity and launch readiness to qualified leads, conversion efficiency and revenue contribution." },
    { title: "What do you need to prepare a proposal?", body: "A concise conversation about the business goal, audience, current activity, timing, stakeholders and working budget is usually enough to begin." },
  ]} />;
}
