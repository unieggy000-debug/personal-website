"use client";

import { PosterImage } from "@/components/ui/poster-image";
import { useState } from "react";
import type { LocaleContent, LocalizedWorkItem } from "@/lib/content/types";
import { WorkModal } from "@/components/portfolio/work-modal";

type PortfolioSectionProps = {
  works: LocalizedWorkItem[];
  ui: LocaleContent["ui"];
};

function isExternalUrl(link?: string) {
  return Boolean(link && /^https?:\/\//i.test(link.trim()));
}

function DossierCover({
  work,
  index,
  clickLabel,
  onOpen,
}: {
  work: LocalizedWorkItem;
  index: number;
  clickLabel: string;
  onOpen: () => void;
}) {
  const fileNo = String(index + 1).padStart(3, "0");

  return (
    <button
      className="dossier-card group relative h-[68vh] w-[75vw] max-w-xl shrink-0 text-left md:w-[40vw]"
      onClick={onOpen}
      type="button"
    >
      <div className="dossier-flap absolute -top-3 right-6 left-6 h-8 rounded-t-sm border border-b-0 border-[#8a6a3a]/60 bg-[#c4a574]" />
      <div className="dossier-tab absolute -top-6 left-10 z-20 flex h-7 min-w-[7rem] items-center justify-center border border-[#8a6a3a]/70 bg-[#d2b48c] px-3">
        <span className="mono-label text-[10px] text-[#4a3420]">
          ДЕЛО № {fileNo}
        </span>
      </div>

      <div className="dossier-body relative h-full overflow-hidden border-2 border-[#8a6a3a]/80 bg-[#e8d5b5] shadow-[8px_12px_40px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply paper-texture" />

        <div className="absolute inset-4 bottom-28 overflow-hidden border border-[#6b4f2e]/50 bg-soviet-black shadow-inner md:inset-6 md:bottom-32">
          <PosterImage alt={work.title} duotone fill src={work.image} />
          <div className="absolute inset-0 bg-gradient-to-t from-soviet-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 bg-soviet-red/10" />
          </div>
        </div>

        <div className="pointer-events-none absolute top-8 right-8 z-10 flex h-16 w-16 rotate-12 items-center justify-center rounded-full border-2 border-soviet-red/70 text-center opacity-80 transition-transform duration-500 group-hover:rotate-[18deg] group-hover:scale-110">
          <span className="mono-label text-[8px] leading-tight text-soviet-red">
            АРХИВ
            <br />
            {work.year}
          </span>
        </div>

        <div className="absolute right-0 bottom-0 left-0 border-t border-[#8a6a3a]/40 bg-[#dcc9a0]/95 px-5 py-4 md:px-6 md:py-5">
          <p className="mono-label mb-1 text-[#6b4f2e]">
            [{String(index + 1).padStart(2, "0")}] {work.year} · {work.category}
          </p>
          <h3 className="display-text mb-1 text-xl text-[#2a1c0e] md:text-3xl">
            {work.title}
          </h3>
          <p className="font-mono text-xs text-[#5a4228]/80 md:text-sm">
            {work.subtitle}
          </p>
          {isExternalUrl(work.link) && (
            <p className="mono-label mt-2 text-[9px] text-soviet-red/80">
              ↗ EXTERNAL LINK
            </p>
          )}
        </div>

        <div className="absolute top-4 left-4 mono-label text-[10px] text-[#6b4f2e]/50 opacity-0 transition-opacity group-hover:opacity-100">
          {clickLabel}
        </div>

        <div className="absolute top-1/3 left-2 flex -translate-y-1/2 flex-col gap-6">
          <span className="h-2 w-2 rounded-full bg-[#6b4f2e]/35 shadow-inner" />
          <span className="h-2 w-2 rounded-full bg-[#6b4f2e]/35 shadow-inner" />
          <span className="h-2 w-2 rounded-full bg-[#6b4f2e]/35 shadow-inner" />
        </div>
      </div>
    </button>
  );
}

export function PortfolioSection({ works, ui }: PortfolioSectionProps) {
  const [selected, setSelected] = useState<LocalizedWorkItem | null>(null);

  const handleOpen = (work: LocalizedWorkItem) => {
    if (isExternalUrl(work.link)) {
      window.open(work.link!.trim(), "_blank", "noopener,noreferrer");
      return;
    }
    setSelected(work);
  };

  return (
    <>
      <section className="relative" data-section id="works">
        <div className="overflow-hidden border-y border-soviet-red/20 bg-soviet-red/[0.04] py-2">
          <div className="works-marquee mono-label flex whitespace-nowrap text-soviet-red/50">
            {Array.from({ length: 8 }).map((_, i) => (
              <span className="mx-6" key={i}>
                MISSION ARCHIVE · 精选作品 · SELECTED WORKS ·
              </span>
            ))}
          </div>
        </div>

        <div className="px-6 pt-10 pb-6 md:px-12 md:pt-14 md:pb-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mono-label mb-2 text-soviet-red">
                [ {ui.missionArchive} ]
              </p>
              <h2 className="display-text text-4xl text-soviet-cream md:text-6xl">
                {ui.selectedWorks}
              </h2>
            </div>
            <p className="max-w-sm font-mono text-sm text-soviet-cream/55 md:text-right">
              {works.length} {ui.worksIntro}
            </p>
          </div>
        </div>

        <div className="horizontal-section relative h-[88vh] overflow-hidden md:h-screen">
          <div className="horizontal-track flex h-full items-center gap-10 px-6 pt-6 md:gap-14 md:px-12">
            {works.map((work, i) => (
              <DossierCover
                clickLabel={
                  isExternalUrl(work.link) ? "↗ 打开链接" : ui.clickToOpen
                }
                index={i}
                key={work.id}
                onOpen={() => handleOpen(work)}
                work={work}
              />
            ))}

            <a
              className="group relative flex h-[68vh] w-[40vw] max-w-md shrink-0 flex-col items-center justify-center overflow-hidden border border-soviet-red/40 bg-soviet-black/30 p-8 transition-all duration-500 hover:border-soviet-red hover:bg-soviet-gray/40"
              href="https://www.miaoda.cn/profile/user-a7o5kfzf2kn4"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="pointer-events-none absolute -right-4 -bottom-6 display-text text-[8rem] text-soviet-red/10 transition-transform duration-700 group-hover:scale-110">
                →
              </span>
              <p className="display-text relative text-center text-2xl text-soviet-cream md:text-3xl">
                更多历史作品
              </p>
              <p className="mono-label relative mt-4 text-center text-soviet-gold transition-colors group-hover:text-soviet-red">
                → MIAODA PROFILE
              </p>
            </a>
          </div>

          <div className="absolute bottom-6 left-6 md:left-12">
            <p className="mono-label text-soviet-muted">{ui.scrollArchive}</p>
          </div>
        </div>
      </section>

      {selected && (
        <WorkModal onClose={() => setSelected(null)} ui={ui} work={selected} />
      )}
    </>
  );
}
