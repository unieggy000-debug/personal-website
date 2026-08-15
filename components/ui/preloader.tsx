"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n/locale-provider";

export function Preloader() {
  const { content } = useLocale();
  const bootLines = content.preloader;
  const [visible, setVisible] = useState(true);
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = "";

    const typeInterval = setInterval(() => {
      if (lineIndex >= bootLines.length) {
        clearInterval(typeInterval);
        return;
      }

      const target = bootLines[lineIndex];
      if (charIndex < target.length) {
        currentLine += target[charIndex];
        charIndex++;
        setLines((prev) => {
          const next = [...prev];
          next[lineIndex] = currentLine;
          return next;
        });
      } else {
        lineIndex++;
        charIndex = 0;
        currentLine = "";
        setProgress(Math.round((lineIndex / bootLines.length) * 100));
      }
    }, 25);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 3200);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(hideTimer);
    };
  }, [bootLines]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-soviet-black">
      <div className="w-full max-w-lg px-8 font-mono text-sm text-soviet-cream">
        {lines.map((line, index) => (
          <p className="mb-1 text-soviet-cream/90" key={`boot-${index}`}>
            {line}
            {line === lines.at(-1) && (
              <span className="cursor-blink ml-1 inline-block h-4 w-2 bg-soviet-red" />
            )}
          </p>
        ))}
      </div>
      <div className="mt-8 w-64">
        <div className="mono-label mb-2 text-soviet-muted">
          {content.ui.loading} {progress}%
        </div>
        <div className="h-1 w-full bg-soviet-gray">
          <div
            className="h-full bg-soviet-red transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
