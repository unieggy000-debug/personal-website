"use client";

import type { LocaleContent } from "@/lib/content/types";

type CreditsSectionProps = {
  content: LocaleContent["credits"];
};

export function CreditsSection({ content }: CreditsSectionProps) {
  return (
    <section
      className="credits-section relative overflow-hidden px-6 py-16 md:px-12 md:py-20"
      data-section
      id="credits"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4"
      >
        <span className="display-text select-none text-[20vw] leading-none text-soviet-red/[0.06] md:text-[12vw]">
          Спасибо
        </span>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-soviet-red/30 pb-6">
          <h2 className="display-text text-5xl text-soviet-red md:text-7xl">
            {content.title}
          </h2>
          <p className="mono-label hidden text-soviet-muted sm:block">
            END CREDITS
          </p>
        </div>

        <ul className="credits-list space-y-0">
          {content.lines.map((line, i) => (
            <li
              className="credits-line group flex items-start gap-4 border-b border-soviet-cream/10 py-5 transition-all duration-300 hover:border-soviet-gold/40 hover:pl-3 md:gap-8"
              key={line.slice(0, 40)}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="mono-label mt-1 shrink-0 text-soviet-red/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="display-text text-lg leading-snug text-soviet-gold transition-colors group-hover:text-soviet-cream md:text-2xl">
                {line}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
