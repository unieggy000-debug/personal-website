"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

const CLICKS_REQUIRED = 5;
const CLICK_WINDOW_MS = 4000;

/** Tiny near-invisible footer trigger — 5 clicks opens /admin. */
export function AdminEntry() {
  const router = useRouter();
  const clicksRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onClick = useCallback(() => {
    clicksRef.current += 1;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      clicksRef.current = 0;
    }, CLICK_WINDOW_MS);

    if (clicksRef.current >= CLICKS_REQUIRED) {
      clicksRef.current = 0;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      router.push("/admin");
    }
  }, [router]);

  return (
    <button
      aria-hidden
      className="absolute bottom-2 right-2 z-10 h-2 w-2 cursor-default border-0 bg-transparent p-0 opacity-[0.01]"
      onClick={onClick}
      tabIndex={-1}
      type="button"
    />
  );
}
