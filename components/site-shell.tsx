"use client";

import {
  scrollToSection,
  useSmoothScrollAnimations,
} from "@/hooks/use-smooth-scroll-animations";
import { LocaleProvider, useLocale } from "@/lib/i18n/locale-provider";
import { Preloader } from "@/components/ui/preloader";
import { Navigation } from "@/components/ui/navigation";
import { CrtOverlay } from "@/components/ui/crt-overlay";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SectionDots } from "@/components/ui/section-dots";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { BackgroundMusic } from "@/components/ui/background-music";
import { SpaceScrollBackground } from "@/components/ui/space-scroll-background";
import { FlyingStickers } from "@/components/ui/flying-stickers";
import { FooterCollage } from "@/components/ui/footer-collage";

function SiteContent() {
  useSmoothScrollAnimations();
  const scrollTo = scrollToSection;
  const { content } = useLocale();

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Navigation scrollTo={scrollTo} />
      <SectionDots scrollTo={scrollTo} />
      <CustomCursor />
      <BackgroundMusic />
      <CrtOverlay />

      <main className="custom-cursor-active site-atmosphere relative z-10 min-h-screen bg-transparent">
        <div className="relative" data-scroll-zone>
          <SpaceScrollBackground />
          <FlyingStickers />
          <HeroSection hero={content.hero} />
          <AboutSection about={content.about} />
          <PortfolioSection ui={content.ui} works={content.works} />
        </div>
        <FooterCollage />
      </main>
    </>
  );
}

export function SiteShell() {
  return (
    <LocaleProvider>
      <SiteContent />
    </LocaleProvider>
  );
}
