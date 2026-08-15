export function SovietBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base gradient — Soviet Space longride palette */}
      <div className="hero-bg absolute inset-0" />

      {/* Star field */}
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          className="absolute rounded-full bg-soviet-cream"
          key={`star-${i}`}
          style={{
            width: i % 7 === 0 ? 2 : 1,
            height: i % 7 === 0 ? 2 : 1,
            top: `${(i * 13.7) % 100}%`,
            left: `${(i * 19.3) % 100}%`,
            opacity: 0.15 + (i % 4) * 0.1,
          }}
        />
      ))}

      {/* Red glow orbs */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-soviet-red/20 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-soviet-red-dark/25 blur-[100px]" />

      {/* Paper texture strip */}
      <div className="paper-texture absolute inset-0 opacity-[0.07]" />
    </div>
  );
}
