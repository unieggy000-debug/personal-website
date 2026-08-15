"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/locale-provider";

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="16"
    >
      <title>Mail</title>
      <rect height="16" rx="2" width="20" x="2" y="4" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="16"
    >
      <title>Copied</title>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

type CopyEmailButtonProps = {
  className?: string;
  showLabel?: boolean;
  variant?: "icon" | "full";
};

export function CopyEmailButton({
  className,
  showLabel = false,
  variant = "icon",
}: CopyEmailButtonProps) {
  const { config, content } = useLocale();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(config.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      aria-label={content.ui.copyEmail}
      className={cn(
        "group relative flex items-center gap-2 transition-colors",
        variant === "icon"
          ? "border border-soviet-red/30 p-2 text-soviet-cream/70 hover:border-soviet-red hover:text-soviet-red"
          : "border border-soviet-red/40 px-4 py-2 font-mono text-xs text-soviet-cream/80 hover:border-soviet-red hover:text-soviet-red",
        className
      )}
      onClick={handleCopy}
      title={config.email}
      type="button"
    >
      {copied ? (
        <CheckIcon className="text-soviet-gold" />
      ) : (
        <MailIcon />
      )}
      {showLabel && (
        <span className="mono-label text-[10px] md:text-xs">
          {copied ? content.ui.copied : config.email}
        </span>
      )}
      {variant === "full" && !showLabel && (
        <span className="mono-label text-[10px]">
          {copied ? content.ui.copied : content.ui.copyEmail}
        </span>
      )}
      {variant === "icon" && copied && (
        <span className="pointer-events-none absolute top-full left-1/2 z-50 mt-1 -translate-x-1/2 whitespace-nowrap border border-soviet-gold/40 bg-soviet-black px-2 py-1 mono-label text-[10px] text-soviet-gold">
          {content.ui.copied}
        </span>
      )}
    </button>
  );
}
