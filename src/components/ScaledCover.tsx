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
  /** Subtly zooms the content on hover, clipped to this box's frame. */
  hoverZoom?: boolean;
};

export default function ScaledCover({
  children,
  // Home-page card: (1440 - 2×140 - 32) / 2 = 564 wide, 500 tall (from Figma)
  nativeWidth = 564,
  nativeHeight = 500,
  className = "rounded-[20px] bg-[#ededed] shrink-0",
  hoverZoom = false,
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
      className={`relative w-full overflow-hidden ${hoverZoom ? "group" : ""} ${className}`}
      style={{ aspectRatio: `${nativeWidth} / ${nativeHeight}` }}
    >
      {/* Inner: rendered at native size, then uniformly scaled down */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: nativeWidth,
          height: nativeHeight,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        {hoverZoom ? (
          // Separate element from the responsive-scale transform above so the
          // hover zoom (CSS, on :hover) doesn't fight the inline JS-driven scale.
          <div className="h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.05]">
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
