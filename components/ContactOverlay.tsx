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
  ];

  return (
    <section className="trayang-overlay-base" onClick={onClose} role="dialog" aria-modal="true" aria-label="Contact Trayang">
      <div className="download" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
          <img src={images.close} alt="" />
        </button>

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
                aria-label={`${c.label}: ${contact.email}`}
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
