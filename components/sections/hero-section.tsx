"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLocale } from "@/lib/i18n/locale-provider";
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
      if (!container || !title) return;

      let size = 120;
      title.style.fontSize = `${size}px`;

      while (title.scrollWidth > container.clientWidth && size > 12) {
        size -= 1;
        title.style.fontSize = `${size}px`;
      }
    };

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [text]);

  return (
    <div className="w-full" ref={containerRef}>
      <h1 className="hero-poster-title" ref={titleRef}>
        {text}
      </h1>
    </div>
  );
}

export function HeroSection({ hero }: HeroSectionProps) {
  const { content } = useLocale();
  const { ui } = content;

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
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="px-4 pb-[clamp(0.5rem,2vh,1.5rem)] md:px-8 lg:px-10">
          <p className="hero-poster-subtitle">{hero.tagline}</p>
          <FitPosterTitle text={hero.headline} />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 scroll-hint">
        <p className="mono-label text-white/50">{ui.scroll}</p>
        <div className="mx-auto mt-1 h-5 w-px bg-white/30" />
      </div>
    </section>
  );
}
