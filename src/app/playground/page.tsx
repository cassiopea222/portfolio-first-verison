"use client";

import { useEffect, useState } from "react";
import { playgroundItems, PlaygroundItem } from "@/data/playground";

export default function PlaygroundPage() {
  const [selected, setSelected] = useState<PlaygroundItem | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <>
      {/* Canvas container */}
      <div
        className="overflow-auto"
        style={{ width: "100%", height: "calc(100dvh - 80px)" }}
      >
        {playgroundItems.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="font-sans text-[16px] text-[var(--text-tertiary)]">Coming soon</p>
          </div>
        ) : (
          <div className="relative" style={{ width: 4000, height: 3000 }}>
            {playgroundItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item)}
                aria-label={item.alt ?? `Playground item ${item.id}`}
                className="absolute p-0 border-0 bg-transparent focus-visible:outline-2 focus-visible:outline-[var(--ui-focus-ring)] focus-visible:outline-offset-2"
                style={{ top: item.top, left: item.left, width: item.width, height: item.height }}
              >
                {item.type === "image" && (
                  <img
                    src={item.src}
                    alt={item.alt ?? ""}
                    draggable={false}
                    className="block w-full h-full object-cover"
                  />
                )}
                {item.type === "video" && (
                  <video
                    src={item.src}
                    muted
                    playsInline
                    loop
                    autoPlay
                    className="block w-full h-full object-cover"
                  />
                )}
                {item.type === "iframe" && (
                  <iframe
                    src={item.src}
                    title={item.alt ?? "Embedded prototype"}
                    className="block w-full h-full border-0 pointer-events-none"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.alt ?? "Playground item"}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          style={{ animation: "pg-fade-in 150ms ease forwards" }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{ animation: "pg-scale-in 150ms ease forwards" }}
            onClick={(e) => e.stopPropagation()}
          >
            {selected.type === "image" && (
              <img
                src={selected.src}
                alt={selected.alt ?? ""}
                className="block"
                style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain" }}
              />
            )}
            {selected.type === "video" && (
              <video
                src={selected.src}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="block"
                style={{ maxWidth: "90vw", maxHeight: "90vh" }}
              />
            )}
            {selected.type === "iframe" && (
              <iframe
                src={selected.src}
                title={selected.alt ?? "Embedded prototype"}
                className="block border-0"
                style={{
                  width: selected.width,
                  height: selected.height,
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
