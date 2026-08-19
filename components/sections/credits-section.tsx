"use client";

import type { LocaleContent } from "@/lib/content/types";

type CreditsSectionProps = {
  content: LocaleContent["credits"];
};

/**
 * Credits crawl — GSAP animates .credits-content; perspective on .credits-tilt wrapper.
 */
export function CreditsSection({ content }: CreditsSectionProps) {
  return (
    <section
      className="credits-section relative z-10 -mt-10 h-[112vh] overflow-hidden bg-transparent md:-mt-14"
      data-section
      id="credits"
    >
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
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

      <div className="credits-crawl sticky top-0 flex h-screen items-end justify-center overflow-hidden pb-6 md:pb-8">
        <div className="credits-tilt w-full max-w-4xl px-8 text-center">
          <div className="credits-content">
            <h2 className="display-text mb-5 text-5xl text-soviet-red md:mb-6 md:text-7xl">
              {content.title}
            </h2>

            {content.lines.map((line) => (
              <p
                className="display-text mb-3 text-xl text-soviet-gold md:mb-4 md:text-3xl"
                key={line.slice(0, 40)}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
