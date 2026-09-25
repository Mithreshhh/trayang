import type { Metadata } from "next";
import SitePage from "@/components/SitePage";

export const metadata: Metadata = { title: "Privacy | Trayang" };

export default function PrivacyPage() {
  return <SitePage eyebrow="Privacy policy" title="Your information stays purposeful." intro="We use the details you share only to respond to enquiries, deliver agreed marketing services and improve the Trayang experience." blocks={[
    { title: "Information we receive", body: "This may include your name, contact details, company information and the business context you choose to share in an enquiry or engagement." },
    { title: "How it is used", body: "We use information to communicate with you, prepare proposals, deliver services, provide support and meet legal obligations." },
    { title: "Sharing and retention", body: "Information is shared only with service providers needed to fulfil your request, and retained only as long as operational or legal needs require." },
    { title: "Your choices", body: "You may ask what personal information we hold or request a correction or deletion, subject to applicable record-keeping requirements." },
  ]} />;
}
