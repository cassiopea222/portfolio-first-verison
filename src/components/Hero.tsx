"use client";

export default function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col fluid-px pt-[48px] pb-[60px]">
      <div className="flex w-full max-w-[900px] flex-col gap-5">
        <p
          className="font-medium italic tracking-[0.44px] text-[var(--text-primary)]"
          style={{ fontFamily: "var(--font-crimson), serif", fontSize: 36, lineHeight: "50px" }}
        >
          Julia Bulyndina
        </p>
        <div className="flex w-full flex-col gap-3">
          <p className="w-full font-sans text-[18px] font-normal leading-[26px] tracking-[0.27px] text-[var(--text-secondary)]">
            She is a product designer with a love for visual craft and cohesive systems. She builds
            across interface, brand, and interaction - drawn to the small decisions that scale into
            experiences people feel.
          </p>
          <p className="w-full font-sans text-[18px] font-normal leading-[26px] tracking-[0.27px] text-[var(--text-secondary)]">
            Lately she has worked on gov dashboards, design systems, b2b logistics website &amp; a fitness app.
          </p>
        </div>
      </div>
    </section>
  );
}
