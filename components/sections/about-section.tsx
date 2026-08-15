"use client";

import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { GithubLinkButton } from "@/components/ui/github-link-button";
import { useLocale } from "@/lib/i18n/locale-provider";
import type { LocaleContent } from "@/lib/content/types";

type AboutSectionProps = {
  about: LocaleContent["about"];
};

export function AboutSection({ about }: AboutSectionProps) {
  const { content } = useLocale();
  const { ui } = content;

  return (
    <section
      className="about-section relative overflow-hidden px-6 py-20 md:px-12 md:py-24"
      data-section
      id="about"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-24 select-none font-serif-sc text-[18vw] leading-none text-soviet-red/[0.07] md:top-16"
      >
        周
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-label mb-3 text-soviet-red">{about.fileNumber}</p>
            <h2 className="display-text text-3xl text-soviet-cream/40 md:text-5xl">
              {ui.personalFile}
            </h2>
            <h3 className="display-text mt-2 text-6xl text-soviet-cream md:-mt-2 md:text-8xl">
              {about.name}
            </h3>
          </div>
          <div className="max-w-md md:pb-2 md:text-right">
            <p className="mono-label mb-3 text-soviet-gold">{about.role}</p>
            <p className="font-serif-sc text-base leading-relaxed text-soviet-cream/75 md:text-lg">
              {about.bio}
            </p>
          </div>
        </div>

        <div className="fade-up mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {about.stats.map((stat, i) => (
            <div
              className="group border border-soviet-red/30 bg-gradient-to-br from-soviet-gray/40 to-transparent p-4 transition-transform duration-300 hover:-translate-y-1 hover:border-soviet-red"
              key={stat.label}
              style={{ transform: `rotate(${i % 2 === 0 ? -0.6 : 0.6}deg)` }}
            >
              <p className="mono-label mb-2 text-soviet-muted">{stat.label}</p>
              <p className="display-text text-xl text-soviet-cream">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="fade-up mb-10">
          <div className="mb-3 flex items-baseline gap-4">
            <p className="mono-label text-soviet-red">{ui.skills}</p>
            <div className="h-px flex-1 bg-soviet-red/20" />
          </div>
          <div className="flex flex-wrap gap-2">
            {about.skills.map((skill, i) => (
              <span
                className="skill-chip border border-soviet-red/40 px-3 py-1.5 font-mono text-xs text-soviet-cream/80 transition-all duration-300 hover:border-soviet-red hover:bg-soviet-red hover:text-soviet-cream"
                key={skill}
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="fade-up mb-12 flex flex-wrap gap-2">
          <CopyEmailButton showLabel variant="full" />
          <GithubLinkButton showLabel variant="full" />
        </div>

        <div className="relative">
          <div
            className="timeline-line absolute top-0 left-0 h-full w-px origin-top bg-soviet-red/80 md:left-28"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="space-y-0">
            {about.timeline.map((event, i) => (
              <div
                className="fade-up group relative grid gap-4 border-b border-soviet-red/15 py-8 pl-8 transition-colors hover:bg-soviet-red/[0.03] md:grid-cols-[7rem_1fr] md:gap-10 md:pl-0"
                key={event.year + event.title}
              >
                <div className="timeline-node absolute top-10 left-0 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-soviet-red bg-soviet-black md:left-28" />
                <p className="mono-label pt-1 text-soviet-red md:text-right">
                  {event.year}
                </p>
                <div className="md:pr-8">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h4 className="display-text text-2xl text-soviet-cream transition-colors group-hover:text-soviet-gold md:text-3xl">
                      {event.title}
                    </h4>
                    {event.location && (
                      <span className="mono-label text-soviet-muted">
                        {event.location}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-soviet-cream/55">
                    {event.description}
                  </p>
                  <span className="mono-label mt-3 inline-block text-[10px] text-soviet-red/40">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(about.timeline.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
