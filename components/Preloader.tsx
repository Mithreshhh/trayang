"use client";

import { useEffect, useState } from "react";

/** The mark prints in three passes that slide into register, then the sheet lifts away. */
export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const finish = () => setDone(true);
    // Long enough for the passes to land, never long enough to block.
    const minDelay = setTimeout(() => {
      if (document.readyState === "complete") finish();
      else window.addEventListener("load", finish, { once: true });
    }, 650);
    const failSafe = setTimeout(finish, 2500);
    return () => {
      clearTimeout(minDelay);
      clearTimeout(failSafe);
      window.removeEventListener("load", finish);
    };
  }, []);

  return (
    <div id="preloader" className={done ? "remove" : undefined} aria-hidden="true">
      <svg viewBox="0 0 32 32" className="preloader-mark">
        <path className="p-b" d="M16 1.5 30.5 16 16 30.5 1.5 16Z" />
        <path className="p-c" d="M19 6 30 17 19 28 8 17Z" />
        <path className="p-a" d="M9.5 11.5h13v3.2h-4.9v9.8h-3.2v-9.8H9.5Z" />
      </svg>
    </div>
  );
}
