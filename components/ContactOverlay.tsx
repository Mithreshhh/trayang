"use client";

import { useEffect } from "react";
import { contact, contactCard, images } from "@/data/site";

interface Props {
  onClose: () => void;
}

/**
 * Enquiry card opened from the hero button or #contact links.
 * Class names (.download, .qr-code-container, ...) are kept from the layout
 * reference so the existing overlay styles apply unchanged.
 */
export default function ContactOverlay({ onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const channels = [
    { label: "Email", href: `mailto:${contact.email}`, icon: images.mail },
    { label: "WhatsApp", href: contact.whatsapp, icon: images.whatsapp, external: true },
    { label: "Call", href: contact.phoneHref, icon: images.phone },
  ];

  return (
    <section className="trayang-overlay-base" onClick={onClose} role="dialog" aria-modal="true" aria-label="Contact Trayang">
      <div className="download" onClick={(e) => e.stopPropagation()}>
        <div className="close-btn" onClick={onClose} role="button" aria-label="Close">
          <img src={images.close} alt="" />
        </div>

        <div className="instructions">
          <h1>{contactCard.heading}</h1>
          <p>{contactCard.body}</p>
        </div>

        <div className="qr-code-container">
          <img src={images.contactIllustration} alt="" />
        </div>

        <div className="download-container">
          <p>{contactCard.note}</p>
          <div className="buttons-container">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                aria-label={`${c.label}: ${c.label === "Call" ? contact.phone : c.label === "Email" ? contact.email : "chat on WhatsApp"}`}
              >
                <img src={c.icon} alt="" />
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
