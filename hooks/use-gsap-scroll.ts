"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

let registered = false;

export function registerGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export function useGsapScroll() {
  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      // Reveal lines on scroll
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

      // Fade up cards
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

      // Timeline line draw
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

      // Timeline nodes
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

      // Horizontal scroll pin for portfolio
      const horizontalSection = document.querySelector(".horizontal-section");
      const horizontalTrack = document.querySelector(".horizontal-track");

      if (horizontalSection && horizontalTrack) {
        const trackWidth = horizontalTrack.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = trackWidth - viewportWidth;

        if (scrollDistance > 0) {
          gsap.to(horizontalTrack, {
            x: -scrollDistance,
            ease: "none",
            scrollTrigger: {
              trigger: horizontalSection,
              start: "top top",
              end: () => `+=${scrollDistance}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      // Credits crawl
      const creditsContent = document.querySelector(".credits-content");
      if (creditsContent) {
        gsap.fromTo(
          creditsContent,
          { y: "30%" },
          {
            y: "-120%",
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

      // Parallax collage layers
      gsap.utils.toArray<HTMLElement>(".collage-layer").forEach((layer) => {
        const speed = Number(layer.dataset.speed ?? 0.3);
        gsap.to(layer, {
          y: () => -100 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: layer.closest("section") ?? layer,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // Scroll progress bar
      const progressBar = document.querySelector(".scroll-progress-bar");
      if (progressBar) {
        gsap.to(progressBar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);
}

export { gsap, ScrollTrigger };
