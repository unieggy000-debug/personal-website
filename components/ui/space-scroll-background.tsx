"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_ZONE = "[data-scroll-zone]";

/**
 * Fixed viewport + slow parallax pan: full image spans the scroll zone height.
 */
export function SpaceScrollBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const imgWrap = imgWrapRef.current;
    if (!wrap || !imgWrap) {
      return;
    }

    const measure = () => {
      const zone = document.querySelector<HTMLElement>(SCROLL_ZONE);
      const vh = window.innerHeight;
      const imgH = imgWrap.offsetHeight;
      const zoneH = zone?.offsetHeight ?? imgH;
      const scaleY = imgH > 0 && zoneH > imgH ? zoneH / imgH : 1;
      const scaledH = imgH * scaleY;
      return { vh, scaleY, travel: Math.max(0, scaledH - vh) };
    };

    const ctx = gsap.context(() => {
      gsap.set(imgWrap, { y: 0, scaleY: 1, transformOrigin: "top center", force3D: true });

      ScrollTrigger.create({
        trigger: SCROLL_ZONE,
        start: "top top",
        end: "bottom bottom",
        scrub: 2.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const { travel, scaleY } = measure();
          gsap.set(imgWrap, {
            y: -travel * self.progress,
            scaleY,
            force3D: true,
          });
        },
      });
    }, wrap);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);
    window.addEventListener("scroll-animations-ready", refresh);
    const t = window.setTimeout(refresh, 400);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("scroll-animations-ready", refresh);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
      ref={wrapRef}
    >
      <div className="absolute inset-x-0 top-0 flex justify-center" ref={imgWrapRef}>
        <Image
          alt=""
          className="block h-auto w-full min-w-full select-none"
          height={1024}
          priority
          sizes="100vw"
          src="/space-scroll-bg.png"
          unoptimized
          width={345}
        />
      </div>
    </div>
  );
}
