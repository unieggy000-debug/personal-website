/** Soft visual bridges so sections feel continuous rather than hard-cut. */
export function SectionBridge({ tone = "default" }: { tone?: "default" | "warm" }) {
  return (
    <div
      aria-hidden
      className={`section-bridge pointer-events-none relative z-[1] -my-16 h-32 md:-my-20 md:h-40 ${
        tone === "warm" ? "section-bridge-warm" : ""
      }`}
    />
  );
}
