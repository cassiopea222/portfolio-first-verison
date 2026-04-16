/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const FRAMES = [
  "/orchid/1.png",
  "/orchid/2.png",
  "/orchid/frame-01.png",
  "/orchid/frame-02.png",
  "/orchid/frame-03.png",
  "/orchid/frame-04.png",
  "/orchid/frame-05.png",
  "/orchid/frame-06.png",
  "/orchid/frame-07.png",
  "/orchid/frame-08.png",
];

// Exact display sizes + vertical offsets from Figma.
// topOffset: how far below the container's center the image is positioned.
// Frame 8 uses object-fit:cover to replicate its Figma manual crop (160.98% width, -31.16% left).
const FRAME_STYLES = [
  { w: 150, h: 150, topOffset: 9   }, // 1.png — default/closed
  { w: 150, h: 150, topOffset: 9   }, // 2.png
  { w: 150, h: 150, topOffset: 9   }, // frame 01
  { w: 150, h: 146, topOffset: 0   }, // frame 02
  { w: 150, h: 138, topOffset: 0   }, // frame 03
  { w: 150, h: 130, topOffset: 0   }, // frame 04
  { w: 164, h: 109, topOffset: 0   }, // frame 05 — wide/flat
  { w: 150, h: 118, topOffset: 0   }, // frame 06
  { w: 150, h: 134, topOffset: 0   }, // frame 07
  { w: 150, h: 162, topOffset: 0   }, // frame 08 — fully open/tallest
] as const;

const FRAME_MS = 800; // 0.8 s per frame

export default function OrchidAnimation() {
  const [currentFrame, setCurrentFrame] = useState(0);

  const frameIdxRef = useRef(0);
  const directionRef = useRef<1 | -1>(1);
  const playingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const mobilePlayingRef = useRef(false);
  const tickRef = useRef<(ts: number) => void>(() => {});

  useEffect(() => {
    tickRef.current = (ts: number) => {
      if (!playingRef.current) return;

      if (lastTimeRef.current === 0) lastTimeRef.current = ts;

      if (ts - lastTimeRef.current >= FRAME_MS) {
        lastTimeRef.current = ts;
        let next = frameIdxRef.current + directionRef.current;

        // ping-pong: bounce at both ends
        if (next >= FRAMES.length) {
          next = FRAMES.length - 2;
          directionRef.current = -1;
        } else if (next < 0) {
          next = 1;
          directionRef.current = 1;
        }

        frameIdxRef.current = next;
        setCurrentFrame(next);
      }

      rafRef.current = requestAnimationFrame(tickRef.current);
    };
  }, []);

  const play = useCallback(() => {
    if (playingRef.current) return;
    playingRef.current = true;
    lastTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(tickRef.current);
  }, []);

  const pause = useCallback(() => {
    playingRef.current = false;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Defer preloading non-visible frames until browser idle time to improve initial page load.
    const preloadRest = () => {
      FRAMES.slice(1).forEach((src) => {
        const img = new window.Image();
        img.decoding = "async";
        img.src = src;
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = (
        window as Window & {
          requestIdleCallback: (cb: () => void, options?: { timeout: number }) => number;
          cancelIdleCallback: (id: number) => void;
        }
      ).requestIdleCallback(preloadRest, { timeout: 1500 });
      return () => {
        (
          window as Window & {
            cancelIdleCallback: (id: number) => void;
          }
        ).cancelIdleCallback(idleId);
        pause();
      };
    }

    const timeout = setTimeout(preloadRest, 600);
    return () => {
      clearTimeout(timeout);
      pause();
    };
  }, [pause]);

  const isHoverDevice = useCallback(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches,
    []
  );

  const handleMouseEnter = useCallback(() => {
    if (isHoverDevice()) play();
  }, [play, isHoverDevice]);

  const handleMouseLeave = useCallback(() => {
    if (isHoverDevice()) pause();
  }, [pause, isHoverDevice]);

  const handleClick = useCallback(() => {
    if (isHoverDevice()) return;
    if (mobilePlayingRef.current) {
      pause();
      mobilePlayingRef.current = false;
    } else {
      play();
      mobilePlayingRef.current = true;
    }
  }, [play, pause, isHoverDevice]);

  return (
    <div
      role="img"
      aria-label="Orchid flower animation"
      className="group relative h-[150px] w-[150px] cursor-pointer select-none overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Frames — each sized and positioned exactly as in Figma */}
      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
        {FRAMES.map((src, i) => {
          const { w, h, topOffset } = FRAME_STYLES[i];
          return (
            <div
              key={src}
              style={{
                position: "absolute",
                width: w,
                height: h,
                left: "50%",
                top: `calc(50% + ${topOffset}px)`,
                transform: "translate(-50%, -50%)",
                overflow: "hidden",
                opacity: i === currentFrame ? 1 : 0,
              }}
            >
              <img
                src={src}
                alt=""
                width={w}
                height={h}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </div>
          );
        })}
      </div>

    </div>
  );
}
