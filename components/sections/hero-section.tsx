"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { LocaleContent } from "@/lib/content/types";

type HeroSectionProps = {
  hero: LocaleContent["hero"];
};

function FitPosterTitle({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const fit = () => {
      const container = containerRef.current;
      const title = titleRef.current;
      if (!container || !title) {
        return;
      }

      const available = container.clientWidth;
      let lo = 16;
      let hi = 200;
      while (lo < hi) {
        const mid = Math.ceil((lo + hi) / 2);
        title.style.fontSize = `${mid}px`;
        if (title.scrollWidth <= available) {
          lo = mid;
        } else {
          hi = mid - 1;
        }
      }
      title.style.fontSize = `${lo}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [text]);

  return (
    <div className="w-full overflow-visible" ref={containerRef}>
      <h1 className="hero-poster-title" ref={titleRef}>
        {text}
      </h1>
    </div>
  );
}

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section
      className="relative h-screen min-h-[600px] overflow-hidden"
      data-section
      id="home"
    >
      <div className="absolute inset-0">
        <Image
          alt=""
          className="object-cover object-center"
          fill
          priority
          sizes="100vw"
          src="/hero-bg.png"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
      </div>

      {/* Chinese subtitle — mid-left, clear of red title */}
      <p className="hero-poster-subtitle absolute top-[34%] left-4 z-20 md:left-10 lg:left-14">
        {hero.tagline}
      </p>

      <div className="pointer-events-none absolute top-[28%] right-6 z-10 hidden select-none md:block">
        <span className="mono-label rotate-90 origin-top-right text-white/25 tracking-[0.4em]">
          ARCHIVE / 001
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 overflow-visible px-4 md:px-8 lg:px-10">
        <div className="hero-poster-title-wrap">
          <FitPosterTitle text={hero.headline} />
        </div>
      </div>
    </section>
  );
}
