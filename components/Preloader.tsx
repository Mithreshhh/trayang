"use client";

import { useEffect, useState } from "react";

/** Full-screen loader with four bouncing bars, slides away once the page has loaded. */
export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const finish = () => setDone(true);
    // Keep it visible for a beat so the animation is seen, but never block for long.
    const minDelay = setTimeout(finish, 350);
    const failSafe = setTimeout(finish, 3000);
    if (document.readyState !== "complete") {
      window.addEventListener("load", finish, { once: true });
    }
    return () => {
      clearTimeout(minDelay);
      clearTimeout(failSafe);
      window.removeEventListener("load", finish);
    };
  }, []);

  return (
    <div id="preloader" className={done ? "remove" : undefined} aria-hidden={done}>
      <div className="bars">
        <div className="line" />
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>
      <div className="message">Loading ...</div>
    </div>
  );
}
