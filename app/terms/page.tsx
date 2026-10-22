import type { Metadata } from "next";
import { terms } from "@/data/site";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms & Conditions", description: terms.intro };

export default function TermsPage() {
  return <LegalPage {...terms} />;
}
