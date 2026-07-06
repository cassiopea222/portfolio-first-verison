"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  /** Design-reference width (px). Defaults to the home-page card native width. */
  nativeWidth?: number;
  /** Design-reference height (px). Defaults to the home-page card native height. */
  nativeHeight?: number;
  /**
   * Visual classes applied on top of the base structural ones
   * (relative, w-full, overflow-hidden are always present).
   * Defaults to the project-card styling.
   */
  className?: string;
};

export default function ScaledCover({
  children,
  // Home-page card: (1440 - 2×140 - 32) / 2 = 564 wide, 500 tall (from Figma)
  nativeWidth = 564,
  nativeHeight = 500,
  className = "rounded-[20px] bg-[#ededed] shrink-0",
}: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w > 0) setScale(w / nativeWidth);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [nativeWidth]);

  return (
    // Outer: tracks real width; aspect-ratio keeps height proportional
    <div
      ref={outerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio: `${nativeWidth} / ${nativeHeight}` }}
    >
      {/* Inner: rendered at native size, then uniformly scaled down.
          `zoom` reflows and repaints at the target size (sharper than
          `transform: scale`, which bitmap-scales an already-rasterized layer). */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: nativeWidth,
          height: nativeHeight,
          zoom: scale,
        }}
      >
        {children}
      </div>
    </div>
  );
}
