"use client";

import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/locale-provider";
import { useActiveSection } from "@/hooks/use-active-section";
import { useMemo, useState } from "react";

type SectionDotsProps = {
  scrollTo: (target: string | number) => void;
};

export function SectionDots({ scrollTo }: SectionDotsProps) {
  const { content } = useLocale();
  const navigation = content.navigation;
  const sectionIds = useMemo(() => navigation.map((n) => n.id), [navigation]);
  const active = useActiveSection(sectionIds);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="fixed right-6 top-1/2 z-[1000] hidden -translate-y-1/2 flex-col gap-4 md:flex">
      {navigation.map((item) => (
        <div className="relative flex items-center justify-end" key={item.id}>
          {hovered === item.id && (
            <span className="mono-label absolute right-6 whitespace-nowrap text-soviet-cream/80">
              {item.label}
            </span>
          )}
          <button
            aria-label={item.label}
            className={cn(
              "h-2 w-2 rounded-full border transition-all duration-300",
              active === item.id
                ? "scale-150 border-soviet-red bg-soviet-red"
                : "border-soviet-muted bg-transparent hover:border-soviet-red"
            )}
            onClick={() => scrollTo(`#${item.id}`)}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            type="button"
          />
        </div>
      ))}
    </div>
  );
}
