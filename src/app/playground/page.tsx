import FlowerTrail from '@/components/FlowerTrail'

export default function PlaygroundPage() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ width: "100%", height: "calc(100dvh - 80px)" }}
    >
      <FlowerTrail />
      <p className="font-sans text-[16px] text-[var(--text-tertiary)] text-center">
        Currently building!
        <br />
        Get back later :)
      </p>
    </div>
  );
}