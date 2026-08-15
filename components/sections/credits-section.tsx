"use client";

import type { LocaleContent } from "@/lib/content/types";

type CreditsSectionProps = {
  content: LocaleContent["credits"];
};

export function CreditsSection({ content }: CreditsSectionProps) {
  return (
    <section
      className="credits-section relative min-h-[200vh] overflow-hidden"
      data-section
      id="credits"
    >
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            className="absolute h-px w-px rounded-full bg-soviet-cream/40"
            key={`star-${i}`}
            style={{
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              opacity: 0.2 + (i % 5) * 0.15,
            }}
          />
        ))}
      </div>

      <div className="credits-crawl sticky top-0 flex h-screen items-end justify-center overflow-hidden pb-0">
        <div className="credits-content w-full max-w-3xl px-8 text-center">
          <h2 className="display-text mb-12 text-4xl text-soviet-red md:text-6xl">
            {content.title}
          </h2>

          {content.lines.map((line) => (
            <p
              className="display-text mb-8 text-lg text-soviet-gold md:text-2xl"
              key={line.slice(0, 40)}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
