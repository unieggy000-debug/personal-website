"use client";



import { PosterImage } from "@/components/ui/poster-image";

import { useState } from "react";

import type { LocaleContent, LocalizedWorkItem } from "@/lib/content/types";

import { WorkModal } from "@/components/portfolio/work-modal";



type PortfolioSectionProps = {

  works: LocalizedWorkItem[];

  ui: LocaleContent["ui"];

};



export function PortfolioSection({ works, ui }: PortfolioSectionProps) {

  const [selected, setSelected] = useState<LocalizedWorkItem | null>(null);



  return (

    <>

      <section className="relative" data-section id="works">

        <div className="px-6 py-24 md:px-12">

          <div className="mx-auto max-w-6xl">

            <p className="mono-label mb-4 text-soviet-red">

              [ {ui.missionArchive} ]

            </p>

            <h2 className="display-text glitch-text mb-6 text-4xl text-soviet-cream md:text-6xl">

              {ui.selectedWorks}

            </h2>

            <p className="max-w-xl font-mono text-sm text-soviet-cream/60">

              {works.length} {ui.worksIntro}

            </p>

          </div>

        </div>



        <div className="horizontal-section relative h-screen overflow-hidden">

          <div className="horizontal-track flex h-full items-center gap-8 px-6 md:gap-12 md:px-12">

            {works.map((work, i) => (

              <button

                className="poster-card group relative h-[70vh] w-[75vw] max-w-2xl shrink-0 overflow-hidden border border-soviet-red/30 bg-soviet-gray text-left md:w-[55vw]"

                key={work.id}

                onClick={() => setSelected(work)}

                type="button"

              >

                <PosterImage alt={work.title} duotone fill src={work.image} />

                <div className="absolute inset-0 bg-gradient-to-t from-soviet-black via-soviet-black/20 to-transparent" />



                {work.collageImages?.slice(1).map((src, j) => (

                  <div

                    className="absolute overflow-hidden border border-soviet-cream/20 shadow-lg"

                    key={src}

                    style={{

                      width: 120 + j * 20,

                      height: 150 + j * 15,

                      top: `${15 + j * 10}%`,

                      right: `${10 + j * 8}%`,

                      transform: `rotate(${5 + j * 3}deg)`,

                    }}

                  >

                    <div className="relative h-full w-full">

                      <PosterImage alt="" duotone fill src={src} />

                    </div>

                  </div>

                ))}



                <div className="absolute right-0 bottom-0 left-0 p-6 md:p-8">

                  <p className="mono-label mb-2 text-soviet-gold">

                    [{String(i + 1).padStart(2, "0")}] {work.year} ·{" "}

                    {work.category}

                  </p>

                  <h3 className="display-text mb-2 text-2xl text-soviet-cream md:text-4xl">

                    {work.title}

                  </h3>

                  <p className="font-mono text-sm text-soviet-cream/60">

                    {work.subtitle}

                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">

                    {work.tags.map((tag) => (

                      <span

                        className="mono-label border border-soviet-red/30 px-2 py-0.5 text-[10px] text-soviet-cream/50"

                        key={tag}

                      >

                        {tag}

                      </span>

                    ))}

                  </div>

                </div>



                <div className="absolute top-4 right-4 mono-label text-soviet-cream/30">

                  {ui.clickToOpen}

                </div>

              </button>

            ))}



            <div className="flex h-[70vh] w-[40vw] max-w-md shrink-0 flex-col items-center justify-center border border-dashed border-soviet-red/30 p-8">

              <p className="display-text text-center text-2xl text-soviet-cream/40">

                {ui.moreMissions}

              </p>

              <p className="mono-label mt-4 text-center text-soviet-muted">

                {ui.addWorksHint}

              </p>

            </div>

          </div>



          <div className="absolute bottom-8 left-6 md:left-12">

            <p className="mono-label text-soviet-muted">{ui.scrollArchive}</p>

          </div>

        </div>



        <div className="px-6 py-24 md:px-12">

          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {works.map((work) => (

              <button

                className="fade-up poster-card group relative aspect-[4/3] overflow-hidden border border-soviet-gray bg-soviet-gray text-left"

                key={`grid-${work.id}`}

                onClick={() => setSelected(work)}

                type="button"

              >

                <PosterImage alt={work.title} duotone fill src={work.image} />

                <div className="absolute inset-0 bg-gradient-to-t from-soviet-black/90 to-transparent" />

                <div className="absolute right-0 bottom-0 left-0 p-4">

                  <p className="mono-label mb-1 text-soviet-red">{work.year}</p>

                  <p className="display-text text-lg text-soviet-cream">

                    {work.title}

                  </p>

                </div>

              </button>

            ))}

          </div>

        </div>

      </section>



      {selected && (

        <WorkModal onClose={() => setSelected(null)} ui={ui} work={selected} />

      )}

    </>

  );

}


