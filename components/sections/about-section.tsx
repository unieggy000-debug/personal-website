"use client";

import { PosterImage } from "@/components/ui/poster-image";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { useLocale } from "@/lib/i18n/locale-provider";
import type { LocaleContent } from "@/lib/content/types";

type AboutSectionProps = {
  about: LocaleContent["about"];
  portrait: string;
};

export function AboutSection({ about, portrait }: AboutSectionProps) {
  const { content } = useLocale();
  const { ui } = content;

  return (
    <section
      className="relative px-6 py-24 md:px-12 md:py-32"
      data-section
      id="about"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mono-label mb-4 text-soviet-red">{about.fileNumber}</p>
        <h2 className="display-text glitch-text mb-16 text-4xl text-soviet-cream md:text-6xl">
          {ui.personalFile}
        </h2>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="fade-up">
            <div className="relative aspect-[3/4] max-w-sm overflow-hidden border-2 border-soviet-red">
              <PosterImage alt={about.name} duotone fill src={portrait} />
              <div className="absolute inset-0 bg-gradient-to-t from-soviet-black/80 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-4">
                <p className="display-text text-2xl text-soviet-cream">
                  {about.name}
                </p>
                <p className="mono-label text-soviet-gold">{about.role}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-px border border-soviet-red/30 bg-soviet-red/30">
              {about.stats.map((stat) => (
                <div
                  className="bg-soviet-black p-4 transition-colors hover:bg-soviet-gray"
                  key={stat.label}
                >
                  <p className="mono-label mb-1 text-soviet-muted">
                    {stat.label}
                  </p>
                  <p className="font-mono text-sm text-soviet-cream">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <CopyEmailButton showLabel variant="full" />
            </div>
          </div>

          <div>
            <div className="reveal-block mb-10">
              {about.bio.split(/(?<=[。!.?])\s+/).map((sentence) => (
                <p
                  className="reveal-line mb-3 font-mono text-sm leading-relaxed text-soviet-cream/70 md:text-base"
                  key={sentence.slice(0, 30)}
                >
                  <span className="reveal-line-inner inline-block">
                    {sentence.trim()}
                  </span>
                </p>
              ))}
            </div>

            <div className="fade-up">
              <p className="mono-label mb-4 text-soviet-red">{ui.skills}</p>
              <div className="flex flex-wrap gap-2">
                {about.skills.map((skill) => (
                  <span
                    className="border border-soviet-red/40 px-3 py-1 font-mono text-xs text-soviet-cream/80 transition-colors hover:border-soviet-red hover:text-soviet-red"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <p className="mono-label mb-8 text-soviet-gold">{ui.missionLog}</p>
          <div className="relative">
            <div
              className="timeline-line absolute top-0 left-4 h-full w-px origin-top bg-soviet-red md:left-1/2"
              style={{ transform: "scaleY(0)" }}
            />

            {about.timeline.map((event, i) => (
              <div
                className={`fade-up relative mb-12 flex flex-col md:flex-row ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                key={event.year + event.title}
              >
                <div className="hidden w-1/2 md:block" />
                <div className="timeline-node absolute top-2 left-4 z-10 h-3 w-3 rounded-full border-2 border-soviet-red bg-soviet-black md:left-1/2 md:-translate-x-1/2" />
                <div
                  className={`w-full pl-12 md:w-1/2 md:pl-0 ${
                    i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <p className="mono-label mb-1 text-soviet-red">
                    [{event.year}]
                  </p>
                  <h3 className="display-text mb-2 text-xl text-soviet-cream">
                    {event.title}
                  </h3>
                  {event.location && (
                    <p className="mono-label mb-2 text-soviet-muted">
                      {event.location}
                    </p>
                  )}
                  <p className="font-mono text-sm text-soviet-cream/60">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
