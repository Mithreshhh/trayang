"use client";

import { useEffect, useState } from "react";
import { brand, images, navLinks } from "@/data/site";

/**
 * Blurred brown bar pinned to the top of the sticky stage. The last link is the
 * highlighted gold pill. On mobile the hamburger opens a full-screen menu and
 * locks the scroller.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.getElementById("trayang-scroller")?.classList.toggle("stop-scroll", open);
  }, [open]);

  return (
    <div id="trayang-navbar" className={`trayang-navbar${open ? " open" : ""}`}>
      <div className="wrapper">
        <div className="logo-menu-container">
          <a className="logo" href="/" aria-label={`${brand.name} home`}>
            <img alt={`${brand.name} logo`} src={images.logo} />
          </a>
          <div
            className="hamburger-wrapper"
            role="button"
            tabIndex={0}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen((v) => !v)}
          >
            <div className={`hamburger${open ? " close" : ""}`} />
          </div>
        </div>

        <nav className="links-container hide" aria-label="Main">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              className={`link${i === navLinks.length - 1 ? " shimmer" : ""}`}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
