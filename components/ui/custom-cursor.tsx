"use client";

import { useEffect, useRef, useState } from "react";

type Pulse = { id: number };

const SHIP_W = 48;
const SHIP_H = 54;
/** Nose tip in rendered SVG coords. */
const TIP_X = 24;
const TIP_Y = 3;
/** Gap between ship nose and signal origin. */
const PULSE_GAP = 10;

export function CustomCursor() {
  const craftRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const angleRef = useRef(-90);
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

    const onDown = () => {
      const id = ++pulseId.current;
      setPulses((prev) => [...prev.slice(-3), { id }]);
      window.setTimeout(() => {
        setPulses((prev) => prev.filter((p) => p.id !== id));
      }, 680);
      craftRef.current?.classList.add("craft-ping");
      window.setTimeout(() => {
        craftRef.current?.classList.remove("craft-ping");
      }, 220);
    };

    const animate = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.32;
      current.current.y += (pos.current.y - current.current.y) * 0.32;

      const dx = pos.current.x - current.current.x;
      const dy = pos.current.y - current.current.y;
      if (Math.hypot(dx, dy) > 0.6) {
        angleRef.current = (Math.atan2(dy, dx) * 180) / Math.PI - 90;
      }

      if (craftRef.current) {
        craftRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) rotate(${angleRef.current}deg)`;
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
    <div
      className="pointer-events-none fixed top-0 left-0 z-[10001] overflow-visible will-change-transform"
      ref={craftRef}
      style={{
        width: SHIP_W,
        height: SHIP_H,
        transformOrigin: `${TIP_X}px ${TIP_Y}px`,
        marginLeft: -TIP_X,
        marginTop: -TIP_Y,
      }}
    >
      {pulses.map((p) => (
        <span
          aria-hidden
          className="craft-wifi pointer-events-none absolute"
          key={p.id}
          style={{
            left: TIP_X,
            top: TIP_Y,
            transform: `translate(-50%, calc(-100% - ${PULSE_GAP}px))`,
          }}
        >
          <svg fill="none" height="44" viewBox="0 0 32 44" width="32">
            <path
              className="wifi-bar wifi-bar-1"
              d="M12 38 A4 4 0 0 1 20 38"
              stroke="#c41e1e"
              strokeLinecap="round"
              strokeWidth="2.4"
            />
            <path
              className="wifi-bar wifi-bar-2"
              d="M8 32 A8 8 0 0 1 24 32"
              stroke="#c41e1e"
              strokeLinecap="round"
              strokeWidth="2.4"
            />
            <path
              className="wifi-bar wifi-bar-3"
              d="M4 26 A12 12 0 0 1 28 26"
              stroke="#c41e1e"
              strokeLinecap="round"
              strokeWidth="2.4"
            />
          </svg>
        </span>
      ))}

      <svg
        aria-hidden
        className="craft-ship relative z-[1] block drop-shadow-[0_0_10px_rgba(196,30,30,0.7)]"
        fill="none"
        height={SHIP_H}
        viewBox="0 0 32 36"
        width={SHIP_W}
      >
        <path
          d="M16 2 L24 14 L22 18 L18 17 L16 34 L14 17 L10 18 L8 14 Z"
          fill="#f2e8d5"
          stroke="#c41e1e"
          strokeLinejoin="round"
          strokeWidth="1.1"
        />
        <path d="M16 2 L16 12" stroke="#d4a017" strokeWidth="1.2" />
        <path
          d="M12 20 L8 28"
          stroke="#c41e1e"
          strokeLinecap="round"
          strokeWidth="1.1"
        />
        <path
          d="M20 20 L24 28"
          stroke="#c41e1e"
          strokeLinecap="round"
          strokeWidth="1.1"
        />
        <circle cx="16" cy="13" fill="#c41e1e" r="1.6" />
      </svg>
    </div>
  );
}
