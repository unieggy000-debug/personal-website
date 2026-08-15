"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type DraggablePosterProps = {
  src: string;
  label: string;
  initialX: number;
  initialY: number;
  rotation: number;
  width: number;
  height: number;
};

function DraggablePoster({
  src,
  label,
  initialX,
  initialY,
  rotation,
  width,
  height,
}: DraggablePosterProps) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      posX: pos.x,
      posY: pos.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) {
      return;
    }
    setPos({
      x: dragStart.current.posX + (e.clientX - dragStart.current.x),
      y: dragStart.current.posY + (e.clientY - dragStart.current.y),
    });
  };

  const onPointerUp = () => setDragging(false);

  return (
    <div
      className="absolute cursor-grab touch-none select-none active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        left: pos.x,
        top: pos.y,
        width,
        height,
        transform: `rotate(${rotation}deg)`,
        zIndex: dragging ? 50 : 10,
        transition: dragging ? "none" : "transform 0.3s ease",
      }}
    >
      <div
        className={`relative h-full w-full overflow-hidden border-2 shadow-2xl ${
          dragging ? "border-soviet-gold" : "border-soviet-red/50"
        }`}
      >
        <Image
          alt={label}
          className="duotone-red object-cover pointer-events-none"
          fill
          sizes={`${width}px`}
          src={src}
        />
        <div className="absolute right-1 bottom-1 mono-label text-[8px] text-soviet-cream/60">
          {label}
        </div>
      </div>
    </div>
  );
}

type DraggableCollageProps = {
  images: string[];
};

export function DraggableCollage({ images }: DraggableCollageProps) {
  return (
    <div className="fade-up relative mt-20 h-[420px] w-full overflow-hidden border border-soviet-red/20 bg-soviet-gray/20 md:h-[500px]">
      <p className="mono-label absolute top-4 left-4 z-20 text-soviet-gold">
        THESE POSTERS CAN BE MOVED WITH THE CURSOR
      </p>
      <p className="mono-label absolute top-4 right-4 z-20 text-soviet-muted">
        ЭТИ ПЛАКАТЫ МОЖНО ПЕРЕМЕЩАТЬ
      </p>

      {images.map((src, i) => (
        <DraggablePoster
          height={180 + (i % 2) * 40}
          initialX={40 + i * 140}
          initialY={60 + (i % 3) * 50}
          key={src}
          label={`[POSTER ${i + 1}]`}
          rotation={-6 + i * 4}
          src={src}
          width={140 + (i % 2) * 20}
        />
      ))}
    </div>
  );
}
