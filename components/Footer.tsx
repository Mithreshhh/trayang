import { brand, contact, copyright, footerColumns, images, socialLinks } from "@/data/site";

/** Sits below the sticky stage and is slid up into view by the final scroll stage. */
export default function Footer() {
  return (
    <footer className="trayang-footer">
      <div className="footer-links-container footer-width">
        <div className="logo-box">
          <a href="/" className="footer-logo" aria-label={`${brand.name} home`}>
            <img src={images.footerLogo} alt={`${brand.name} logo`} loading="lazy" />
          </a>
          {/* Class kept from the layout reference; holds the direct contact links. */}
          <div className="os-downloads">
            <a href={`mailto:${contact.email}`} className="d-inline-block">
              <img src={images.mail} alt="" loading="lazy" />
              <span>{contact.email}</span>
            </a>
            <a href={contact.phoneHref} className="d-inline-block">
              <img src={images.phone} alt="" loading="lazy" />
              <span>{contact.phone}</span>
            </a>
          </div>
        </div>

        {footerColumns.map((col) => (
          <div className="footer-links" key={col.heading}>
            <span className="link-heading">{col.heading}</span>
            <ul>
              {col.items.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-copyright footer-width">
        <span className="d-block">{copyright}</span>
        <div className="social-links">
          {socialLinks.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <img src={s.icon} alt={s.label} loading="lazy" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
