"use client";

import { useEffect, useRef, useState } from "react";

type Pulse = { id: number; x: number; y: number; angle: number };

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const angleRef = useRef(0);
  const rafRef = useRef(0);
  const pulseId = useRef(0);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      return;
    }

    setVisible(true);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = (e: MouseEvent) => {
      const id = ++pulseId.current;
      setPulses((prev) => [
        ...prev.slice(-3),
        { id, x: e.clientX, y: e.clientY, angle: angleRef.current },
      ]);
      window.setTimeout(() => {
        setPulses((prev) => prev.filter((p) => p.id !== id));
      }, 650);
      cursorRef.current?.classList.add("craft-ping");
      window.setTimeout(() => {
        cursorRef.current?.classList.remove("craft-ping");
      }, 220);
    };

    const animate = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.22;
      current.current.y += (pos.current.y - current.current.y) * 0.22;

      if (cursorRef.current) {
        const dx = pos.current.x - current.current.x;
        const dy = pos.current.y - current.current.y;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        angleRef.current = angle;
        cursorRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px) rotate(${angle}deg)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <>
      <div
        className="pointer-events-none fixed top-0 left-0 z-[10001]"
        ref={cursorRef}
        style={{ marginLeft: -12, marginTop: -14 }}
      >
        <svg
          aria-hidden
          className="craft-ship drop-shadow-[0_0_6px_rgba(196,30,30,0.55)]"
          fill="none"
          height="28"
          viewBox="0 0 24 28"
          width="24"
        >
          <path
            d="M12 1 L15.5 10 L21 12 L15.5 13.5 L14 22 L12 26 L10 22 L8.5 13.5 L3 12 L8.5 10 Z"
            fill="#f5e6c8"
            stroke="#c41e1e"
            strokeWidth="0.8"
          />
          <circle cx="12" cy="11" fill="#c41e1e" r="1.4" />
          <path d="M9 18 L7 24" stroke="#d4a017" strokeWidth="1" />
          <path d="M15 18 L17 24" stroke="#d4a017" strokeWidth="1" />
        </svg>
      </div>

      {pulses.map((p) => (
        <span
          aria-hidden
          className="craft-wifi pointer-events-none fixed z-[10000]"
          key={p.id}
          style={{
            left: p.x,
            top: p.y,
            transform: `translate(-50%, -100%) rotate(${p.angle}deg)`,
          }}
        >
          <svg fill="none" height="36" viewBox="0 0 40 36" width="40">
            <path
              className="wifi-bar wifi-bar-1"
              d="M14 28 A8 8 0 0 1 26 28"
              stroke="#c41e1e"
              strokeLinecap="round"
              strokeWidth="2.2"
            />
            <path
              className="wifi-bar wifi-bar-2"
              d="M10 22 A14 14 0 0 1 30 22"
              stroke="#c41e1e"
              strokeLinecap="round"
              strokeWidth="2.2"
            />
            <path
              className="wifi-bar wifi-bar-3"
              d="M6 16 A20 20 0 0 1 34 16"
              stroke="#c41e1e"
              strokeLinecap="round"
              strokeWidth="2.2"
            />
            <circle cx="20" cy="32" fill="#d4a017" r="2" />
          </svg>
        </span>
      ))}
    </>
  );
}
