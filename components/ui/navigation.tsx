"use client";

import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/locale-provider";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { useEffect, useState } from "react";

type NavigationProps = {
  scrollTo: (target: string | number) => void;
};

export function Navigation({ scrollTo }: NavigationProps) {
  const { content } = useLocale();
  const navigation = content.navigation;
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = navigation.map((n) => document.getElementById(n.id));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { threshold: 0.4 }
    );

    for (const section of sections) {
      if (section) {
        observer.observe(section);
      }
    }

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
      observer.disconnect();
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
            "mono-label shrink-0 transition-colors",
            scrolled
              ? "text-soviet-red hover:text-soviet-cream"
              : "text-white/80 hover:text-white"
          )}
          onClick={() => scrollTo("#home")}
          type="button"
        >
          [ {content.ui.portfolio} ]
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
          <LanguageToggle />
        </div>
      </nav>
    </header>
  );
}
