"use client";

import { PosterImage } from "@/components/ui/poster-image";
import { useEffect } from "react";
import type { LocaleContent, LocalizedWorkItem } from "@/lib/content/types";

type WorkModalProps = {
  work: LocalizedWorkItem;
  ui: LocaleContent["ui"];
  onClose: () => void;
};

export function WorkModal({ work, ui, onClose }: WorkModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop fixed inset-0 z-[10002] flex items-center justify-center p-4 md:p-8">
      <button
        aria-label={ui.closeModal}
        className="absolute inset-0"
        onClick={onClose}
        type="button"
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-soviet-red bg-soviet-black">
        <div className="relative aspect-video w-full">
          <PosterImage alt={work.title} duotone fill src={work.image} />
          <div className="absolute inset-0 bg-gradient-to-t from-soviet-black to-transparent" />
        </div>

        <div className="p-6 md:p-10">
          <p className="mono-label mb-2 text-soviet-gold">
            {work.year} · {work.category}
          </p>
          <h2 className="display-text mb-2 text-3xl text-soviet-cream md:text-5xl">
            {work.title}
          </h2>
          <p className="mono-label mb-6 text-soviet-muted">{work.subtitle}</p>

          <div className="red-line mb-6 w-full" />

          <p className="mb-8 font-mono text-sm leading-relaxed text-soviet-cream/70 md:text-base">
            {work.description}
          </p>

          {work.collageImages && work.collageImages.length > 1 && (
            <div className="mb-8 grid grid-cols-2 gap-4">
              {work.collageImages.map((src) => (
                <div
                  className="relative aspect-[4/3] overflow-hidden border border-soviet-red/20"
                  key={src}
                >
                  <PosterImage alt="" duotone fill src={src} />
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {work.tags.map((tag) => (
                <span
                  className="mono-label border border-soviet-red/40 px-3 py-1 text-soviet-cream/60"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>

            {work.link && (
              <a
                className="mono-label border border-soviet-red px-6 py-2 text-soviet-red transition-colors hover:bg-soviet-red hover:text-soviet-cream"
                href={work.link}
                rel="noopener"
                target="_blank"
              >
                {ui.viewProject}
              </a>
            )}
          </div>
        </div>

        <button
          className="absolute top-4 right-4 mono-label border border-soviet-cream/30 px-3 py-1 text-soviet-cream transition-colors hover:border-soviet-red hover:text-soviet-red"
          onClick={onClose}
          type="button"
        >
          {ui.closeModal}
        </button>
      </div>
    </div>
  );
}
