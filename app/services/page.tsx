import type { Metadata } from "next";
import SitePage from "@/components/SitePage";

export const metadata: Metadata = { title: "Services | Trayang" };

export default function ServicesPage() {
  return <SitePage eyebrow="Services" title="The capabilities to move from idea to impact." intro="Engage Trayang for a focused project or an integrated programme across brand, creative, digital and performance." blocks={[
    { id: "strategy", eyebrow: "Find the sharpest direction", title: "Brand & marketing strategy", body: "Research, positioning, audience definition, messaging and channel planning that align the brand with a real commercial opportunity." },
    { id: "creative", eyebrow: "Make the strategy visible", title: "Creative, content & campaigns", body: "Identity, campaign concepts, social systems, copy and content designed to earn attention while staying unmistakably on brand." },
    { id: "growth", eyebrow: "Turn attention into action", title: "Performance & growth", body: "Paid search, paid social, SEO, landing pages and conversion optimisation focused on qualified demand and sustainable return." },
    { id: "digital", eyebrow: "Build the destination", title: "Web experiences", body: "Fast, clear marketing websites that express the brand, answer the audience’s questions and guide visitors towards the next step." },
    { id: "analytics", eyebrow: "Make better next moves", title: "Analytics & optimisation", body: "Measurement plans, useful reporting and structured experimentation that turn campaign data into decisions." },
  ]} />;
}
