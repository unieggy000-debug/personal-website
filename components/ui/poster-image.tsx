"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const FALLBACK =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
      <rect fill="#1a0505" width="400" height="500"/>
      <rect fill="#c41e1e" x="0" y="0" width="400" height="8"/>
      <text x="200" y="250" fill="#f5e6c8" font-family="sans-serif" font-size="24" text-anchor="middle">★ SOVIET POSTER ★</text>
      <text x="200" y="290" fill="#888" font-family="monospace" font-size="12" text-anchor="middle">IMAGE PLACEHOLDER</text>
    </svg>`
  );

type PosterImageProps = {
  src: string;
  alt: string;
  className?: string;
  duotone?: boolean;
  fill?: boolean;
  style?: React.CSSProperties;
};

export function PosterImage({
  src,
  alt,
  className,
  duotone = true,
  fill = false,
  style,
}: PosterImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const applyDuotone = duotone && !currentSrc.endsWith(".svg");

  return (
    <>
      {!loaded && (
        <div
          className={cn(
            "animate-pulse bg-soviet-gray",
            fill ? "absolute inset-0" : "h-full w-full",
            className
          )}
        />
      )}
      {/* biome-ignore lint/nursery/noImgElement: native img avoids Next optimizer blocking external URLs */}
      <img
        alt={alt}
        className={cn(
          fill ? "absolute inset-0 h-full w-full" : "h-full w-full",
          "object-cover transition-opacity duration-500",
          duotone && applyDuotone && "duotone-red",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        decoding="async"
        loading="lazy"
        onError={() => setCurrentSrc(FALLBACK)}
        onLoad={() => setLoaded(true)}
        referrerPolicy="no-referrer"
        src={currentSrc}
        style={style}
      />
    </>
  );
}
