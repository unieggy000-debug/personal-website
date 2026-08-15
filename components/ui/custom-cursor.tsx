"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      return;
    }

    setVisible(true);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.15;
      current.current.y += (pos.current.y - current.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterInteractive = () => {
      cursorRef.current?.classList.add("scale-150", "border-soviet-red");
    };
    const onLeaveInteractive = () => {
      cursorRef.current?.classList.remove("scale-150", "border-soviet-red");
    };

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);

    const interactives = document.querySelectorAll("a, button, .poster-card");
    for (const el of interactives) {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      for (const el of interactives) {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      }
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[10001] mix-blend-difference"
      ref={cursorRef}
      style={{ marginLeft: -8, marginTop: -8 }}
    >
      <div className="h-4 w-4 rounded-full border border-soviet-cream transition-transform duration-200" />
    </div>
  );
}
