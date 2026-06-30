"use client";

import { useEffect, useRef, useState } from "react";
import { playgroundItems, PlaygroundItem } from "@/data/playground";

export default function PlaygroundPage() {
  const [selected, setSelected] = useState<PlaygroundItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startScroll = useRef({ left: 0, top: 0 });

  // Drag-to-pan — document listeners so fast mouse moves don't escape
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasDragged.current = true;
      if (hasDragged.current) {
        containerRef.current.scrollLeft = startScroll.current.left - dx;
        containerRef.current.scrollTop = startScroll.current.top - dy;
      }
    };
    const onUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const onCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    isDragging.current = true;
    hasDragged.current = false;
    document.body.style.cursor = "grabbing";
    startPos.current = { x: e.clientX, y: e.clientY };
    startScroll.current = {
      left: containerRef.current?.scrollLeft ?? 0,
      top: containerRef.current?.scrollTop ?? 0,
    };
  };

  return (
    <>
      {/* Full-page gray background — sits behind the transparent layout div, covers header area too */}
      <div className="fixed inset-0 -z-10 bg-zinc-100" />

      {/* Canvas container */}
      <div
        ref={containerRef}
        className="overflow-auto select-none"
        style={{ width: "100%", height: "calc(100dvh - 80px)", cursor: "grab" }}
        onMouseDown={onCanvasMouseDown}
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
                onClick={() => { if (!hasDragged.current) setSelected(item); }}
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
                    className="block w-full h-full object-cover"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
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

      {/* Lightbox overlay */}
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
