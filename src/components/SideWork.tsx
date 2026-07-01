"use client";

import { useState } from "react";
import { sideWorkItems, type SideWorkItem } from "@/data/sideWork";

const TRACK_ITEMS = [...sideWorkItems, ...sideWorkItems];
const EDGE_MASK =
  "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)";

function SideWorkImage({
  item,
}: {
  item: Extract<SideWorkItem, { kind: "image" }>;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div className="h-full w-full bg-[#ededed]" aria-hidden="true" />;
  }
  return (
    <img
      src={item.src}
      alt=""
      onError={() => setFailed(true)}
      className="block h-full w-full object-cover"
    />
  );
}

function IpodComposition({
  item,
}: {
  item: Extract<SideWorkItem, { kind: "ipodComposition" }>;
}) {
  return (
    <div className="relative h-full w-full">
      <img
        src={item.ipodSrc}
        alt=""
        className="absolute object-cover"
        style={{ left: "11%", top: "14%", width: "40%", height: "72%" }}
      />
      <img
        src={item.playerSrc}
        alt=""
        className="absolute object-cover"
        style={{ left: "55%", top: "40%", width: "37%", height: "19%" }}
      />
    </div>
  );
}

function CardMedia({ item }: { item: SideWorkItem }) {
  if (item.kind === "video") {
    return (
      <video
        src={item.src}
        autoPlay
        muted
        loop
        playsInline
        className="block h-full w-full border border-[#d9d9d9] object-cover"
      />
    );
  }
  if (item.kind === "ipodComposition") {
    return <IpodComposition item={item} />;
  }
  return <SideWorkImage item={item} />;
}

export default function SideWork() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <section className="w-full pb-[60px]">
      <h2 className="mx-auto mb-8 w-full max-w-[900px] fluid-px font-sans text-[24px] font-medium leading-[32px] text-[var(--text-secondary)]">
        Side work
      </h2>

      <div
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen [overflow-x:clip]"
        style={{ WebkitMaskImage: EDGE_MASK, maskImage: EDGE_MASK }}
      >
        <div
          className={`side-work-track flex w-max${hoveredKey ? " side-work-paused" : ""}`}
        >
          {TRACK_ITEMS.map((item, index) => {
            const key = `${item.id}-${index}`;
            const isHovered = hoveredKey === key;
            return (
              <div
                key={key}
                onMouseEnter={() => setHoveredKey(key)}
                onMouseLeave={() =>
                  setHoveredKey((current) => (current === key ? null : current))
                }
                aria-label={item.alt}
                className={`relative mr-6 shrink-0 overflow-hidden rounded-[20px] bg-[#ededed] transition-transform duration-200 ease-out ${
                  isHovered ? "scale-[1.06]" : "scale-100"
                }`}
                style={{ width: item.width, height: item.height }}
              >
                <CardMedia item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
