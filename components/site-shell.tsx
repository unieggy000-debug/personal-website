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
import { CreditsSection } from "@/components/sections/credits-section";
import { FooterCollage } from "@/components/ui/footer-collage";

function SiteContent() {
  useSmoothScrollAnimations();
  const scrollTo = scrollToSection;
  const { content, config } = useLocale();

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Navigation scrollTo={scrollTo} />
      <SectionDots scrollTo={scrollTo} />
      <CustomCursor />
      <CrtOverlay />

      <main className="custom-cursor-active relative bg-[#0a0a0a]">
        <HeroSection hero={content.hero} />
        <AboutSection about={content.about} portrait={config.portrait} />
        <PortfolioSection ui={content.ui} works={content.works} />
        <CreditsSection content={content.credits} />
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
