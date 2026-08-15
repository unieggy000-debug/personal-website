export function CrtOverlay() {
  return (
    <>
      <div className="crt-overlay pointer-events-none fixed inset-0 z-[9998]" />
      <div className="grain-overlay pointer-events-none fixed inset-0 z-[9997]" />
    </>
  );
}
