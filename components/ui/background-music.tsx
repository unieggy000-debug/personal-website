"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SKIP_TAIL_SECONDS = 30;

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    audio.volume = 0.35;
    audio.loop = false;
    setReady(true);

    const onTimeUpdate = () => {
      if (!Number.isFinite(audio.duration) || audio.duration <= SKIP_TAIL_SECONDS) {
        return;
      }
      if (audio.currentTime >= audio.duration - SKIP_TAIL_SECONDS) {
        audio.currentTime = 0;
        void audio.play().catch(() => undefined);
      }
    };

    const onEnded = () => {
      audio.currentTime = 0;
      void audio.play().catch(() => undefined);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    const tryPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    };

    const unlock = () => {
      void tryPlay();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    void tryPlay();

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <>
      <audio preload="auto" ref={audioRef} src="/bgm.mp3" />
      <button
        aria-label={playing ? "暂停背景音乐" : "播放背景音乐"}
        className={cn(
          "fixed bottom-5 left-5 z-[1000] flex h-10 w-10 items-center justify-center border border-soviet-red/40 bg-soviet-black/70 text-soviet-cream/80 backdrop-blur-sm transition-colors hover:border-soviet-red hover:text-soviet-red",
          !ready && "opacity-0"
        )}
        onClick={toggle}
        type="button"
      >
        {playing ? (
          <svg aria-hidden fill="currentColor" height="14" viewBox="0 0 16 16" width="14">
            <rect height="12" width="4" x="2" y="2" />
            <rect height="12" width="4" x="10" y="2" />
          </svg>
        ) : (
          <svg aria-hidden fill="currentColor" height="14" viewBox="0 0 16 16" width="14">
            <path d="M3 2v12l11-6L3 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
