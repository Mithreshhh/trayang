import type { Metadata } from "next";
import SitePage from "@/components/SitePage";

export const metadata: Metadata = { title: "Terms | Trayang" };

export default function TermsPage() {
  return <SitePage eyebrow="Terms & conditions" title="A clear basis for working together." intro="These plain-language terms outline how enquiries and marketing engagements are handled. Project-specific terms are confirmed in each proposal." blocks={[
    { title: "Proposals and payment", body: "A proposal is valid for the period shown on it. Work begins after written acceptance, receipt of the requested advance and access to agreed project inputs." },
    { title: "Scope and changes", body: "Deliverables, review rounds and responsibilities are defined in the proposal. Material changes to scope, timing or assumptions may require a revised fee and schedule." },
    { title: "Timelines and approvals", body: "Schedules depend on timely feedback, approvals and materials from all parties. Delays in these inputs may move delivery dates." },
    { title: "Intellectual property", body: "Usage and ownership terms are set out in the proposal. Final approved work transfers only as agreed and after outstanding fees have been paid." },
  ]} />;
}
