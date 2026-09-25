import Link from "next/link";
import { brand, contact, footerColumns, images } from "@/data/site";

type Block = {
  eyebrow?: string;
  title: string;
  body: string;
  id?: string;
};

export default function SitePage({
  eyebrow,
  title,
  intro,
  blocks,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  blocks?: Block[];
  children?: React.ReactNode;
}) {
  return (
    <div className="site-page">
      <header className="site-header">
        <Link href="/" aria-label={`${brand.name} home`}><img src={images.logo} alt={brand.name} /></Link>
        <nav aria-label="Main">
          <Link href="/about/">About</Link>
          <Link href="/services/">Services</Link>
          <Link href="/contact/">Contact</Link>
        </nav>
      </header>

      <main>
        <section className="site-hero">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="intro">{intro}</p>
        </section>

        {blocks && (
          <section className="site-grid">
            {blocks.map((block) => (
              <article id={block.id} key={block.title}>
                {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
                <h2>{block.title}</h2>
                <p>{block.body}</p>
              </article>
            ))}
          </section>
        )}
        {children}

        <section className="site-cta">
          <p className="eyebrow">A good place to begin</p>
          <h2>Tell us where you want to grow.</h2>
          <p>Share the goal, challenge, timing and working budget. We will help define the most useful next move.</p>
          <a href={`mailto:${contact.email}`}>Email {contact.email}</a>
        </section>
      </main>

      <footer className="site-page-footer">
        <span>© {new Date().getFullYear()} {brand.name}</span>
        <div>{footerColumns[2].items.map((item) => <Link href={item.href} key={item.label}>{item.label}</Link>)}</div>
      </footer>
    </div>
  );
}
