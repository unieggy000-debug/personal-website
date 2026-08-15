"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";

let registered = false;

function registerGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export function useSmoothScrollAnimations() {
  useEffect(() => {
    registerGsap();

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-block").forEach((block) => {
        const lines = block.querySelectorAll(".reveal-line-inner");
        gsap.fromTo(
          lines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".timeline-line").forEach((line) => {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: line.parentElement,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".timeline-node").forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: node,
              start: "top 75%",
              once: true,
            },
          }
        );
      });

      const horizontalSection = document.querySelector(".horizontal-section");
      const horizontalTrack = document.querySelector(".horizontal-track");

      if (horizontalSection && horizontalTrack) {
        const getScrollDistance = () =>
          horizontalTrack.scrollWidth - window.innerWidth;

        gsap.to(horizontalTrack, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSection,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      const creditsContent = document.querySelector(".credits-content");
      if (creditsContent) {
        gsap.fromTo(
          creditsContent,
          { y: "20%" },
          {
            y: "-100%",
            ease: "none",
            scrollTrigger: {
              trigger: ".credits-section",
              start: "top top",
              end: "bottom bottom",
              scrub: 2,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>(".collage-layer").forEach((layer) => {
        const speed = Number(layer.dataset.speed ?? 0.3);
        gsap.to(layer, {
          y: () => -80 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: layer.closest("section") ?? layer,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      const progressBar = document.querySelector(".scroll-progress-bar");
      if (progressBar) {
        gsap.to(progressBar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        });
      }
    });

    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      ctx.revert();
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);
}

export function scrollToSection(target: string) {
  const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.5 });
  } else {
    const el = document.querySelector(target);
    el?.scrollIntoView({ behavior: "smooth" });
  }
}
