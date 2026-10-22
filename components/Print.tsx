import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Screenprint primitives shared by every page: the diamond ornament,
 * registration marks, the double rule, ink buttons and headings printed in
 * three passes (two translucent ghost passes under the key pass).
 */

export function Diamond({ className = "" }: { className?: string }) {
  return (
    <svg className={`diamond ${className}`} viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path d="M6 .8 11.2 6 6 11.2.8 6Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="6" cy="6" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function RegMark({ className = "" }: { className?: string }) {
  return (
    <svg className={`reg-mark ${className}`} viewBox="0 0 28 28" aria-hidden="true" focusable="false">
      <circle cx="14" cy="14" r="7.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M14 0v28M0 14h28" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Four registration marks pinned to the corners of the nearest positioned ancestor. */
export function RegCorners() {
  return (
    <span className="reg-corners" aria-hidden="true">
      <RegMark className="tl" />
      <RegMark className="tr" />
      <RegMark className="bl" />
      <RegMark className="br" />
    </span>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return (
    <span className={`rule ${className}`} aria-hidden="true">
      <span className="rule-line" />
      <Diamond />
      <span className="rule-line" />
    </span>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`}>
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path className="wm-b" d="M16 1.5 30.5 16 16 30.5 1.5 16Z" />
        <path className="wm-c" d="M19 6 30 17 19 28 8 17Z" />
        <path className="wm-a" d="M9.5 11.5h13v3.2h-4.9v9.8h-3.2v-9.8H9.5Z" />
      </svg>
      <span className="wm-text">TRAYANG</span>
    </span>
  );
}

type InkLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "gold";
  className?: string;
};

/** The world's button: a printed ink block flanked by diamond marks. */
export function InkLink({ href, children, variant = "solid", className = "" }: InkLinkProps) {
  const cls = `ink-btn ink-btn-${variant} ${className}`;
  const inner = (
    <>
      <Diamond />
      <span>{children}</span>
      <Diamond />
    </>
  );
  if (/^(mailto:|https?:)/.test(href)) {
    return (
      <a className={cls} href={href}>
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {inner}
    </Link>
  );
}

/**
 * A photo printed as a brown/gold duotone, with a light-gold pass of the same
 * image laid over it slightly out of register so it shows past the plate edge.
 */
export function PrintPlate({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`print ${className}`}>
      <div className="print-plate">
        <img className="plate plate-key" src={src} alt={alt} />
      </div>
      <span className="plate-ghost" aria-hidden="true" style={{ "--plate": `url(${src})` } as React.CSSProperties} />
    </div>
  );
}

type PassProps = {
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** Wait to register until the heading scrolls into view (see Reveal). */
  reveal?: boolean;
  id?: string;
  children: ReactNode;
};

/** A heading printed as a key pass over two translucent, slightly misregistered passes. */
export function Pass({ as: Tag = "h2", className = "", reveal, id, children }: PassProps) {
  return (
    <Tag id={id} className={`pass ${className}`} data-reveal={reveal ? "" : undefined}>
      <span className="pass-ghost pass-ghost-1" aria-hidden="true">
        {children}
      </span>
      <span className="pass-ghost pass-ghost-2" aria-hidden="true">
        {children}
      </span>
      <span className="pass-key">{children}</span>
    </Tag>
  );
}
