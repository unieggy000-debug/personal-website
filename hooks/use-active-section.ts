"use client";

import { useEffect, useState } from "react";
import type Lenis from "lenis";

type LenisWindow = Window & { __lenis?: Lenis };

/**
 * Track which section is active (Lenis-aware).
 * Uses a probe line ~32% down the viewport.
 */
export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] ?? "home");

  useEffect(() => {
    if (sectionIds.length === 0) {
      return;
    }

    const update = () => {
      const probeY = window.innerHeight * 0.32;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) {
          continue;
        }
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY) {
          current = id;
        }
      }

      const doc = document.documentElement;
      const scrollBottom =
        (window.scrollY || doc.scrollTop) + window.innerHeight;
      if (scrollBottom >= doc.scrollHeight - 60) {
        current = sectionIds[sectionIds.length - 1];
      }

      setActive((prev) => (prev === current ? prev : current));
    };

    update();

    const lenis = (window as LenisWindow).__lenis;
    const onLenisScroll = () => update();
    lenis?.on("scroll", onLenisScroll);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const interval = window.setInterval(update, 250);

    return () => {
      lenis?.off("scroll", onLenisScroll);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.clearInterval(interval);
    };
  }, [sectionIds]);

  return active;
}
