"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand, contact, navLinks, primaryCta } from "@/data/site";
import { InkLink, Wordmark } from "./Print";
import { setSmoothScrollPaused } from "./SmoothScroll";

/** The printed header band, sticky on every page; the mobile menu locks the page behind it. */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    setSmoothScrollPaused(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header id="trayang-navbar" className={`trayang-navbar${open ? " open" : ""}`}>
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

      <div id="nav-sheet" className="nav-sheet" hidden={!open} data-lenis-prevent="">
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
