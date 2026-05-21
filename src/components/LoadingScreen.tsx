/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";

const FRAMES = [
  "/orchid/1.webp",
  "/orchid/2.webp",
  "/orchid/frame-01.webp",
  "/orchid/frame-02.webp",
  "/orchid/frame-03.webp",
  "/orchid/frame-04.webp",
  "/orchid/frame-06.webp",
  "/orchid/frame-07.webp",
];

const SIZE = 160;
const FRAME_MS = 130;

interface Props {
  visible?: boolean;
}

export default function LoadingScreen({ visible = true }: Props) {
  const [frameIdx, setFrameIdx] = useState(0);
  const hasPreloaded = useRef(false);

  useEffect(() => {
    if (!hasPreloaded.current) {
      hasPreloaded.current = true;
      FRAMES.slice(1).forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }

    if (!visible) return;

    const timer = setInterval(() => {
      setFrameIdx((i) => (i + 1) % FRAMES.length);
    }, FRAME_MS);

    return () => clearInterval(timer);
  }, [visible]);

  return (
    <div
      role="status"
      aria-hidden={!visible}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "grid",
        placeItems: "center",
        backgroundColor: "var(--background)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 400ms ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        Loading…
      </span>
      <div style={{ position: "relative", width: SIZE, height: SIZE }}>
        {FRAMES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            width={SIZE}
            height={SIZE}
            draggable={false}
            style={{
              position: "absolute",
              inset: 0,
              width: SIZE,
              height: SIZE,
              objectFit: "contain",
              opacity: i === frameIdx ? 1 : 0,
              userSelect: "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
