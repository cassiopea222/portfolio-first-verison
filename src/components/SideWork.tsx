"use client";

import { useState } from "react";
import ScaledCover from "@/components/ScaledCover";
import { sideWorkCards, type SideWorkMedia } from "@/data/sideWork";

function MediaItem({ media }: { media: SideWorkMedia }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    // Missing file (e.g. content not uploaded yet) — fall back to the
    // plain gray cover.
    return null;
  }

  const style: React.CSSProperties = {
    position: "absolute",
    left: media.x,
    top: media.y,
    width: media.width,
    height: media.height,
    borderRadius: media.rounded,
  };

  if (media.kind === "video") {
    return (
      <video
        src={media.src}
        autoPlay
        muted
        loop
        playsInline
        onError={() => setFailed(true)}
        className="overflow-hidden object-cover"
        style={style}
      />
    );
  }

  return (
    <img
      src={media.src}
      alt=""
      onError={() => setFailed(true)}
      className="pointer-events-none object-cover"
      style={style}
    />
  );
}

export default function SideWork() {
  return (
    <section
      id="side-work"
      className="mx-auto w-full max-w-[900px] fluid-px pt-[40px] pb-[60px]"
    >
      <h2 className="mb-[40px] font-sans text-[32px] font-semibold leading-[40px] tracking-[0.32px] text-[var(--text-primary)]">
        Side work
      </h2>
      <div className="flex flex-col gap-[70px]">
        {sideWorkCards.map((card) => (
          <article key={card.id} className="flex flex-col gap-[20px]">
            <ScaledCover
              nativeWidth={840}
              nativeHeight={553}
              className={`rounded-[32px] shrink-0 ${card.coverBgClass}`}
            >
              {card.media.map((media) => (
                <MediaItem key={media.src} media={media} />
              ))}
            </ScaledCover>
            <h3 className="font-sans text-[24px] font-semibold leading-[32px] text-[#383232]">
              {card.title}
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
}
