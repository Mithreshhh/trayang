/**
 * Overlap artwork: every service is drawn as two or three ink passes
 * (a = key ink, b = gold, c = light gold) that mix where they overlap.
 * Colours and blend mode come from the surrounding paper stock in CSS.
 */

const A = "ink ink-a";
const B = "ink ink-b";
const C = "ink ink-c";

const art: Record<string, React.ReactNode> = {
  strategy: (
    <>
      <circle className={B} cx="54" cy="64" r="36" />
      <circle className={C} cx="72" cy="50" r="26" />
      <path className={A} d="M28 94 84 38" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path className={A} d="M66 34h22v22" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  identity: (
    <>
      <rect className={B} x="18" y="26" width="58" height="58" />
      <circle className={C} cx="76" cy="66" r="30" />
      <path className={A} d="M36 40h46v11H65v42H53V51H36Z" />
    </>
  ),
  content: (
    <>
      <path className={B} d="M28 22h52a12 12 0 0 1 12 12v30a12 12 0 0 1-12 12H48L30 94V76h-2a12 12 0 0 1-12-12V34a12 12 0 0 1 12-12Z" />
      <rect className={C} x="50" y="48" width="56" height="48" rx="4" />
      <path className={A} d="M30 38h44M30 50h36M30 62h24" strokeWidth="6" strokeLinecap="round" fill="none" />
    </>
  ),
  website: (
    <>
      <rect className={B} x="14" y="24" width="82" height="62" rx="5" />
      <circle className={C} cx="84" cy="76" r="24" />
      <path className={A} d="M14 40h82" strokeWidth="4" fill="none" />
      <rect className={A} x="14" y="24" width="82" height="62" rx="5" fill="none" strokeWidth="4" />
      <path className={A} d="m78 62 22 16-11 2 6 14-6 2-6-13-7 7Z" />
    </>
  ),
  social: (
    <>
      <circle className={B} cx="44" cy="50" r="28" />
      <circle className={C} cx="76" cy="50" r="28" />
      <circle className={B} cx="60" cy="78" r="28" opacity=".7" />
      <circle className={A} cx="60" cy="60" r="7" />
    </>
  ),
  advertising: (
    <>
      <path className={B} d="M22 46 74 22v76L22 74Z" />
      <circle className={C} cx="84" cy="60" r="24" />
      <path className={A} d="M16 48h10v24H16zM86 40l14-8M88 60h16M86 80l14 8" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  launch: (
    <>
      <path className={B} d="M60 14 102 98H18Z" />
      <rect className={C} x="44" y="56" width="52" height="44" />
      <path className={A} d="M60 100V36M46 50l14-14 14 14" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  research: (
    <>
      <circle className={B} cx="50" cy="50" r="32" />
      <rect className={C} x="56" y="56" width="50" height="50" />
      <circle className={A} cx="50" cy="50" r="20" fill="none" strokeWidth="6" />
      <path className={A} d="m65 65 30 30" strokeWidth="9" strokeLinecap="round" />
    </>
  ),
  growth: (
    <>
      <path className={B} d="M18 74h16v28H18zM42 60h16v42H42zM66 44h16v58H66zM90 26h16v76H90z" />
      <circle className={C} cx="62" cy="46" r="26" />
      <path className={A} d="m16 86 26-24 22 6 38-40" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  creator: (
    <>
      <path className={B} d="M60 12 70 50l38 10-38 10-10 38-10-38-38-10 38-10Z" />
      <circle className={C} cx="76" cy="44" r="24" />
      <circle className={A} cx="60" cy="60" r="9" />
    </>
  ),
  marketing: (
    <>
      <circle className={B} cx="46" cy="60" r="32" />
      <circle className={C} cx="74" cy="60" r="32" />
      <path className={A} d="M20 60h78M84 46l14 14-14 14" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  branding: (
    <>
      <rect className={B} x="18" y="26" width="58" height="58" />
      <circle className={C} cx="76" cy="66" r="30" />
      <path className={A} d="M36 40h46v11H65v42H53V51H36Z" />
    </>
  ),
  consulting: (
    <>
      <path className={B} d="M60 12 108 60 60 108 12 60Z" />
      <circle className={C} cx="68" cy="54" r="26" />
      <circle className={A} cx="60" cy="60" r="16" fill="none" strokeWidth="5" />
      <path className={A} d="M60 30v60M30 60h60" strokeWidth="4" />
    </>
  ),
  influence: (
    <>
      <circle className={B} cx="48" cy="62" r="32" />
      <path className={C} d="M80 18 87 41l23 7-23 7-7 23-7-23-23-7 23-7Z" />
      <circle className={A} cx="48" cy="62" r="9" />
      <path className={A} d="M22 98c6-14 16-20 26-20s20 6 26 20" strokeWidth="6" strokeLinecap="round" fill="none" />
    </>
  ),
  events: (
    <>
      <path className={C} d="M60 14 96 98H24Z" />
      <rect className={B} x="12" y="72" width="96" height="28" />
      <circle className={A} cx="60" cy="24" r="9" />
      <path className={A} d="M12 72h96" strokeWidth="5" />
    </>
  ),
};

export default function Glyph({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg className={`glyph ${className}`} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      {art[name] ?? art.strategy}
    </svg>
  );
}

/** Small line icons for the five purpose points. */
const icons: Record<string, React.ReactNode> = {
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8Z" />
    </>
  ),
  diamond: (
    <>
      <path d="M12 3 21 12 12 21 3 12Z" />
      <path d="M12 8.5 15.5 12 12 15.5 8.5 12Z" />
    </>
  ),
  arrow: (
    <>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  blocks: (
    <>
      <rect x="3" y="13" width="8" height="8" />
      <rect x="13" y="13" width="8" height="8" />
      <rect x="8" y="3" width="8" height="8" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3 13.8 10.2 21 12l-7.2 1.8L12 21l-1.8-7.2L3 12l7.2-1.8Z" />
    </>
  ),
};

export function PointIcon({ name }: { name: string }) {
  return (
    <svg className="point-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
}
