import OrchidAnimation from "@/components/OrchidAnimation";

export default function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-6 pb-[160px] pt-[140px] md:px-14 lg:px-[140px]">
      <OrchidAnimation />

      <div className="flex flex-col items-center gap-3">
        <p className="text-center text-[28px] font-medium leading-10 text-[var(--text-primary)]">
          Julia is a product designer and crafter of{" "}
          <span className="italic">experiences</span>.
        </p>
        <p className="text-center text-[18px] font-normal leading-6 text-[var(--text-secondary)]">
          She loves visual craft and builds tools that make life easier.
        </p>
      </div>
    </section>
  );
}
