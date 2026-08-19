"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STICKERS = [
  "/stickers/sticker-2.png",
  "/stickers/sticker-3.png",
  "/stickers/sticker-4.png",
  "/stickers/sticker-5.png",
  "/stickers/sticker-6.png",
  "/stickers/sticker-7.png",
] as const;

/** pageStart/pageEnd = fraction of full-page scroll progress for each flight window. */
const FLIGHTS = [
  {
    pageStart: 0.04,
    pageEnd: 0.2,
    fromX: -0.18,
    fromY: 1.18,
    toX: 1.12,
    toY: -0.22,
    rot: -24,
    size: 168,
  },
  {
    pageStart: 0.12,
    pageEnd: 0.3,
    fromX: 1.14,
    fromY: -0.18,
    toX: -0.12,
    toY: 1.16,
    rot: 30,
    size: 182,
  },
  {
    pageStart: 0.22,
    pageEnd: 0.42,
    fromX: -0.08,
    fromY: 1.22,
    toX: 0.92,
    toY: 0.02,
    rot: -14,
    size: 156,
  },
  {
    pageStart: 0.34,
    pageEnd: 0.54,
    fromX: 1.08,
    fromY: 0.88,
    toX: 0.04,
    toY: -0.18,
    rot: 20,
    size: 174,
  },
  {
    pageStart: 0.46,
    pageEnd: 0.66,
    fromX: 0.12,
    fromY: -0.16,
    toX: 1.06,
    toY: 1.12,
    rot: -18,
    size: 162,
  },
  {
    pageStart: 0.58,
    pageEnd: 0.78,
    fromX: 1.02,
    fromY: 1.14,
    toX: -0.2,
    toY: 0.08,
    rot: 26,
    size: 178,
  },
] as const;

export function FlyingStickers() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) {
      return;
    }

    const items = Array.from(
      layer.querySelectorAll<HTMLElement>("[data-flyer]")
    );

    let ctx: gsap.Context | null = null;

    const setup = () => {
      ctx?.revert();

      ctx = gsap.context(() => {
        items.forEach((el, i) => {
          const flight = FLIGHTS[i];
          if (!flight) {
            return;
          }

          const path = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const half = flight.size / 2;
            return {
              x0: w * flight.fromX - half,
              y0: h * flight.fromY,
              x1: w * flight.toX - half,
              y1: h * flight.toY,
            };
          };

          gsap.set(el, { opacity: 0, force3D: true });

          ScrollTrigger.create({
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              const { pageStart, pageEnd } = flight;

              if (p < pageStart || p > pageEnd) {
                gsap.set(el, { opacity: 0 });
                return;
              }

              const local = (p - pageStart) / (pageEnd - pageStart);
              const fade = Math.sin(Math.PI * local);
              const { x0, y0, x1, y1 } = path();

              gsap.set(el, {
                x: x0 + (x1 - x0) * local,
                y: y0 + (y1 - y0) * local,
                rotate: flight.rot + (flight.rot * -0.45 - flight.rot) * local,
                scale: 0.88 + 0.12 * fade,
                opacity: Math.min(0.88, fade * 0.95),
                force3D: true,
              });
            },
          });
        });
      }, layer);

      ScrollTrigger.refresh();
    };

    window.addEventListener("scroll-animations-ready", setup);
    window.addEventListener("load", setup);
    const t = window.setTimeout(setup, 500);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll-animations-ready", setup);
      window.removeEventListener("load", setup);
      ctx?.revert();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] overflow-visible"
      ref={layerRef}
    >
      {STICKERS.map((src, i) => (
        <div
          className="absolute top-0 left-0 will-change-transform"
          data-flyer
          key={src}
          style={{ width: FLIGHTS[i]?.size ?? 170 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="block h-auto w-full bg-transparent drop-shadow-[0_8px_22px_rgba(0,0,0,0.5)]"
            draggable={false}
            src={src}
          />
        </div>
      ))}
    </div>
  );
}
