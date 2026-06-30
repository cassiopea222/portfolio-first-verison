// src/components/SideWork.tsx
"use client";

import { useEffect, useState, type CSSProperties } from "react";
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

function SideWorkLightbox({
  item,
  onClose,
}: {
  item: SideWorkItem;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      style={{ animation: "pg-fade-in 150ms ease forwards" }}
      onClick={onClose}
    >
      <div
        style={{ animation: "pg-scale-in 150ms ease forwards" }}
        onClick={(e) => e.stopPropagation()}
      >
        {item.kind === "video" && (
          <video
            src={item.src}
            autoPlay
            loop
            muted
            playsInline
            controls
            className="block"
            style={{ maxWidth: "90vw", maxHeight: "90vh" }}
          />
        )}
        {item.kind === "image" && (
          <img
            src={item.src}
            alt={item.alt}
            className="block"
            style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain" }}
          />
        )}
        {item.kind === "ipodComposition" && (
          <IpodComposition
            item={item}
            className=""
            style={{ width: "min(90vw, 480px)", height: "min(90vh, 411px)" }}
          />
        )}
      </div>
    </div>
  );
}

export default function SideWork() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [selected, setSelected] = useState<SideWorkItem | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section className="w-full pb-[60px]">
      <h2 className="mx-auto mb-6 w-full max-w-[900px] fluid-px font-sans text-[24px] font-medium leading-[32px] text-[var(--text-secondary)]">
        Side work
      </h2>

      <div
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden"
        style={{ WebkitMaskImage: EDGE_MASK, maskImage: EDGE_MASK }}
      >
        <div
          className="side-work-track flex w-max gap-6"
          style={{ animationPlayState: hoveredKey ? "paused" : "running" }}
        >
          {TRACK_ITEMS.map((item, index) => {
            const key = `${item.id}-${index}`;
            const isHovered = hoveredKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(item)}
                onMouseEnter={() => setHoveredKey(key)}
                onMouseLeave={() =>
                  setHoveredKey((current) => (current === key ? null : current))
                }
                aria-label={item.alt}
                className={`relative shrink-0 overflow-hidden rounded-[20px] border-0 bg-[#ededed] p-0 transition-transform duration-200 ease-out ${
                  isHovered ? "scale-[1.06]" : "scale-100"
                }`}
                style={{ width: item.width, height: item.height }}
              >
                <SideWorkCardMedia item={item} />
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <SideWorkLightbox item={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
