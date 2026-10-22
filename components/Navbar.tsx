"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand, contact, navLinks, primaryCta } from "@/data/site";
import { InkLink, Wordmark } from "./Print";

/**
 * The printed header band. In the scroll story it sits inside the sticky stage
 * and the mobile menu locks the scroller; on the other pages it is sticky and
 * locks the document instead.
 */
export default function Navbar({ mode = "page" }: { mode?: "story" | "page" }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (mode === "story") {
      document.getElementById("trayang-scroller")?.classList.toggle("stop-scroll", open);
    } else {
      document.documentElement.classList.toggle("menu-open", open);
    }
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, mode]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header id="trayang-navbar" className={`trayang-navbar navbar-${mode}${open ? " open" : ""}`}>
      <div className="nav-bar">
        <Link className="nav-logo" href="/" aria-label={`${brand.name} home`}>
          <Wordmark />
        </Link>

        <nav className="nav-links" aria-label="Main">
          {navLinks.map((link) => (
            <Link key={link.href} className="nav-link" href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
          <InkLink href={primaryCta.href} variant="gold" className="nav-cta">
            {primaryCta.label}
          </InkLink>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="nav-sheet"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-bars" />
        </button>
      </div>

      <div id="nav-sheet" className="nav-sheet" hidden={!open}>
        <nav aria-label="Mobile">
          {navLinks.map((link, i) => (
            <Link key={link.href} href={link.href} style={{ "--i": i } as React.CSSProperties} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-sheet-foot">
          <InkLink href={primaryCta.href} variant="gold">
            {primaryCta.label}
          </InkLink>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </div>
    </header>
  );
}
