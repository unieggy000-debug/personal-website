"use client";

import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/locale-provider";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { GithubLinkButton } from "@/components/ui/github-link-button";
import { useActiveSection } from "@/hooks/use-active-section";
import { useEffect, useMemo, useState } from "react";

type NavigationProps = {
  scrollTo: (target: string | number) => void;
};

export function Navigation({ scrollTo }: NavigationProps) {
  const { content } = useLocale();
  const navigation = content.navigation;
  const sectionIds = useMemo(() => navigation.map((n) => n.id), [navigation]);
  const active = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onKey = (e: KeyboardEvent) => {
      const num = Number.parseInt(e.key, 10);
      if (num >= 1 && num <= navigation.length) {
        scrollTo(`#${navigation[num - 1].id}`);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [navigation, scrollTo]);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-[1000] transition-all duration-500",
        scrolled
          ? "border-soviet-gray/50 border-b bg-soviet-black/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 md:px-6 md:py-4">
        <button
          className={cn(
            "display-text shrink-0 text-lg tracking-[0.12em] transition-colors md:text-xl",
            scrolled
              ? "text-soviet-red hover:text-soviet-cream"
              : "text-white/90 hover:text-white"
          )}
          onClick={() => scrollTo("#home")}
          type="button"
        >
          Carol
        </button>

        <ul className="flex flex-1 items-center justify-center gap-0.5 md:gap-4">
          {navigation.map((item, i) => (
            <li key={item.id}>
              <button
                className={cn(
                  "mono-label px-1.5 py-1 text-[10px] transition-colors md:px-2 md:text-xs",
                  scrolled
                    ? active === item.id
                      ? "text-soviet-red"
                      : "text-soviet-cream/60 hover:text-soviet-red"
                    : active === item.id
                      ? "text-white"
                      : "text-white/50 hover:text-white"
                )}
                onClick={() => scrollTo(`#${item.id}`)}
                type="button"
              >
                <span
                  className={cn(
                    "hidden md:inline",
                    scrolled ? "text-soviet-muted" : "text-white/40"
                  )}
                >
                  [0{i + 1}]{" "}
                </span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <CopyEmailButton />
          <GithubLinkButton />
          <LanguageToggle />
        </div>
      </nav>
    </header>
  );
}
