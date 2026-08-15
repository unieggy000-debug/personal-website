"use client";

import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { GithubLinkButton } from "@/components/ui/github-link-button";
import { useLocale } from "@/lib/i18n/locale-provider";
import type { LocaleContent } from "@/lib/content/types";
import { useEffect, useState } from "react";

type AboutSectionProps = {
  about: LocaleContent["about"];
};

export function AboutSection({ about }: AboutSectionProps) {
  const { content } = useLocale();
  const { ui } = content;
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [about.timeline]);

  return (
    <section
      className="about-section relative overflow-hidden px-6 py-20 md:px-10 md:py-24 lg:px-14"
      data-section
      id="about"
    >
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(220px,0.9fr)_1.4fr] lg:gap-16 xl:gap-24">
        {/* Left: curved timeline */}
        <aside className="relative min-h-[420px] lg:min-h-[560px]">
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            viewBox="0 0 200 560"
          >
            <path
              d="M 70 20 C 30 140, 30 280, 70 400 C 95 470, 120 520, 150 540"
              fill="none"
              stroke="rgba(136,136,136,0.45)"
              strokeWidth="1.2"
            />
          </svg>

          <p className="mono-label absolute top-0 left-0 text-soviet-muted/70 [writing-mode:vertical-rl] rotate-180 tracking-[0.35em]">
            {about.timeline[0]?.year?.slice(0, 4) ?? "2024"}
          </p>

          <div className="relative z-10 flex h-full flex-col justify-between py-6 pl-10 md:pl-14">
            {about.timeline.map((event, i) => {
              const isActive = active === i;
              return (
                <button
                  className="group relative flex items-start gap-4 text-left"
                  key={event.year + event.title}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  type="button"
                  style={{
                    marginLeft: `${Math.min(i * 10, 36)}px`,
                  }}
                >
                  <span
                    className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full border transition-all duration-300 ${
                      isActive
                        ? "scale-125 border-soviet-red bg-soviet-red shadow-[0_0_12px_rgba(196,30,30,0.7)]"
                        : "border-soviet-muted bg-transparent group-hover:border-soviet-gold"
                    }`}
                  />
                  <div>
                    <p
                      className={`display-text transition-all duration-300 ${
                        isActive
                          ? "text-3xl text-soviet-red md:text-4xl"
                          : "text-2xl text-soviet-muted/50 md:text-3xl"
                      }`}
                    >
                      {event.year}
                    </p>
                    {isActive && (
                      <div className="mt-2 max-w-[14rem] animate-[fadeIn_0.35s_ease]">
                        <p className="mono-label text-[10px] text-soviet-gold">
                          {event.location ?? "MISSION"}
                        </p>
                        <p className="mt-1 font-serif-sc text-sm text-soviet-cream md:text-base">
                          {event.title}
                        </p>
                        <p className="mt-2 font-mono text-[11px] leading-relaxed text-soviet-cream/50">
                          {event.description}
                        </p>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right: flexible identity stack */}
        <div className="relative flex flex-col justify-center">
          <p className="mono-label mb-3 text-soviet-red">{about.fileNumber}</p>
          <h2 className="display-text mb-1 text-2xl text-soviet-cream/35 md:text-3xl">
            {ui.personalFile}
          </h2>
          <h3 className="display-text text-5xl text-soviet-cream md:text-7xl">
            {about.name}
          </h3>
          <p className="mono-label mt-3 text-soviet-gold">{about.role}</p>

          <p className="mt-8 max-w-lg font-serif-sc text-base leading-relaxed text-soviet-cream/75 md:text-lg">
            {about.bio}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {about.stats.map((stat) => (
              <span
                className="border border-soviet-red/35 px-3 py-1.5 font-mono text-xs text-soviet-cream/80"
                key={stat.label}
              >
                <span className="text-soviet-muted">{stat.label}</span>
                <span className="mx-2 text-soviet-red/40">/</span>
                {stat.value}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <p className="mono-label mb-3 text-soviet-red">{ui.skills}</p>
            <div className="flex flex-wrap gap-2">
              {about.skills.map((skill) => (
                <span
                  className="border border-soviet-red/40 px-3 py-1 font-mono text-xs text-soviet-cream/80 transition-colors hover:border-soviet-red hover:bg-soviet-red hover:text-soviet-cream"
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <CopyEmailButton showLabel variant="full" />
            <GithubLinkButton showLabel variant="full" />
          </div>
        </div>
      </div>
    </section>
  );
}
