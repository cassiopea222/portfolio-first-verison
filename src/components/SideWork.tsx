// src/components/SideWork.tsx
"use client";

import { useState, type CSSProperties } from "react";
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
  className = "h-full w-full",
  style,
}: {
  item: Extract<SideWorkItem, { kind: "ipodComposition" }>;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`relative ${className}`} style={style}>
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

function SideWorkCardMedia({ item }: { item: SideWorkItem }) {
  if (item.kind === "video") {
    return (
      <video
        src={item.src}
        autoPlay
        muted
        loop
        playsInline
        className="block h-full w-full object-cover"
      />
    );
  }
  if (item.kind === "ipodComposition") {
    return <IpodComposition item={item} />;
  }
  return <SideWorkImage item={item} />;
}

export default function SideWork() {
  return (
    <section className="w-full pb-[60px]">
      <h2 className="mx-auto mb-6 w-full max-w-[900px] fluid-px font-sans text-[24px] font-medium leading-[32px] text-[var(--text-secondary)]">
        Side work
      </h2>

      <div
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden"
        style={{ WebkitMaskImage: EDGE_MASK, maskImage: EDGE_MASK }}
      >
        <div className="side-work-track flex w-max gap-6">
          {TRACK_ITEMS.map((item, index) => {
            const key = `${item.id}-${index}`;
            return (
              <div
                key={key}
                className="relative shrink-0 overflow-hidden rounded-[20px] bg-[#ededed]"
                style={{ width: item.width, height: item.height }}
              >
                <SideWorkCardMedia item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
