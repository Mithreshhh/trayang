import type { Metadata } from "next";
import SitePage from "@/components/SitePage";
import { contact } from "@/data/site";

export const metadata: Metadata = { title: "Contact | Trayang" };

export default function ContactPage() {
  return <SitePage eyebrow="Contact" title="Let’s find the next growth move." intro={`Write to ${contact.email} with a little context and we will reply within one working day.`} blocks={[
    { eyebrow: "Helpful details", title: "What to include", body: "Tell us your business goal, audience, current challenge, desired timing and approximate budget. A link to your existing brand or website is useful too." },
    { eyebrow: "What happens next", title: "A focused first conversation", body: "We will respond with any useful questions and, if there is a strong fit, arrange a short call to clarify scope, priorities and the most useful starting point." },
  ]} />;
}
