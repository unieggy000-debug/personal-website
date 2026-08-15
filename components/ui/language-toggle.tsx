"use client";

import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/locale-provider";

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center border border-soviet-red/30">
      <button
        aria-label="Switch to Chinese"
        className={cn(
          "mono-label px-2 py-1 text-[10px] transition-colors md:px-3 md:text-xs",
          locale === "zh"
            ? "bg-soviet-red text-soviet-cream"
            : "text-soviet-cream/50 hover:text-soviet-cream"
        )}
        onClick={() => setLocale("zh")}
        type="button"
      >
        中
      </button>
      <button
        aria-label="Switch to English"
        className={cn(
          "mono-label px-2 py-1 text-[10px] transition-colors md:px-3 md:text-xs",
          locale === "en"
            ? "bg-soviet-red text-soviet-cream"
            : "text-soviet-cream/50 hover:text-soviet-cream"
        )}
        onClick={() => setLocale("en")}
        type="button"
      >
        EN
      </button>
    </div>
  );
}
