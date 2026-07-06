/* Temporary full-screen notice for phone-sized viewports (620px and below)
   while the mobile layout is in progress. Pure CSS — remove this component
   and its usage in layout.tsx once the mobile version ships. */
export default function MobileOverlay() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-3 bg-[var(--background)] px-8 text-center min-[621px]:hidden">
      <h2 className="text-[length:var(--type-h3-size)] font-[600] leading-[var(--type-h3-line)] text-[var(--text-primary)]">
        Mobile version is in progress
      </h2>
      <p className="text-[length:var(--type-body-size)] leading-[var(--type-body-line)] text-[var(--text-tertiary)]">
        Please visit from a computer in the meantime.
      </p>
    </div>
  );
}
