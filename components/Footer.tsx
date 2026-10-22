import Link from "next/link";
import { brand, contact, copyright, footer, primaryCta, socialLinks } from "@/data/site";
import { InkLink, Pass, Rule, Wordmark } from "./Print";

/**
 * Brown kraft sheet that closes every page. On the home page it sits below the
 * sticky stage and is slid up into view by the final scroll stage.
 */
export default function Footer() {
  return (
    <footer className="trayang-footer stock-brown">
      <div className="footer-inner">
        <div className="footer-cta">
          <Pass as="p" className="footer-heading display pass-full">
            {footer.heading.before}
            <span className="ink-gold">{footer.heading.highlight}</span>
            {footer.heading.after}
          </Pass>
          <div className="footer-cta-side">
            <p className="footer-body">{footer.body}</p>
            <div className="footer-actions">
              <InkLink href={primaryCta.href} variant="gold">
                {primaryCta.label}
              </InkLink>
              <a className="footer-mail" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        <Rule />

        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label={`${brand.name} home`}>
              <Wordmark />
            </Link>
            <p>{brand.motto.join(" ")}</p>
          </div>
          {footer.columns.map((col) => (
            <div className={`footer-col footer-col-${col.heading.toLowerCase()}`} key={col.heading}>
              <p className="label">{col.heading}</p>
              <ul>
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-base">
          <span className="label footer-signoff">{brand.signoff}</span>
          {socialLinks.length > 0 && (
            <ul className="footer-social">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <span className="footer-copy">{copyright}</span>
        </div>
      </div>
    </footer>
  );
}
