import type { Metadata } from "next";
import SitePage from "@/components/SitePage";

export const metadata: Metadata = { title: "About Trayang" };

export default function AboutPage() {
  return <SitePage eyebrow="About Trayang" title="Clear thinking. Memorable creative. Measurable momentum." intro="Trayang is a marketing studio for ambitious brands that need strategy and execution to work as one—not as disconnected deliverables." blocks={[
    { eyebrow: "How we think", title: "Start with the business problem", body: "We define the audience, opportunity and outcome before choosing channels. That keeps the work focused and gives every creative decision a reason." },
    { eyebrow: "How we work", title: "Senior attention, fewer hand-offs", body: "Strategy, creative and growth work together from the beginning, so ideas survive the journey from brief to launch and optimisation." },
    { eyebrow: "What we value", title: "Clarity, craft and accountability", body: "You get direct communication, honest recommendations and reporting that explains what happened, why it matters and what we should do next." },
  ]} />;
}
