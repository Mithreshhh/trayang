"use client";

import { useEffect, useState } from "react";

type Item = { id: string; topic: string; q: string; a: string };

/**
 * Ruled question index. Answers open with a grid-row transition (interruptible);
 * a link to /faq/#id opens and scrolls to that answer.
 */
export default function FaqList({ items, level: Q = "h2" }: { items: Item[]; level?: "h2" | "h3" }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.slice(1);
      if (!items.some((item) => item.id === hash)) return;
      setOpen(hash);
      // Opening this answer closes the first one above it, which moves the page; land on it again once that settles.
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ block: "start" }), 350);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [items]);

  return (
    <ol className="faq-list">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <li key={item.id} id={item.id} className={`faq-item${isOpen ? " is-open" : ""}`}>
            <p className="label faq-topic">{item.topic}</p>
            <Q className="faq-q">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${item.id}-answer`}
                onClick={() => setOpen(isOpen ? null : item.id)}
              >
                <span>{item.q}</span>
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                  <path d="M5 12h14" />
                  <path className="faq-plus" d="M12 5v14" />
                </svg>
              </button>
            </Q>
            <div className="faq-a" id={`${item.id}-answer`} role="region" aria-label={item.q} inert={!isOpen}>
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
