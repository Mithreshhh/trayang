import type { Metadata } from "next";
import { privacy } from "@/data/site";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", description: privacy.intro };

export default function PrivacyPage() {
  return <LegalPage {...privacy} />;
}
