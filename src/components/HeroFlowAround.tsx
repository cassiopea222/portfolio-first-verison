/* eslint-disable @next/next/no-img-element */
"use client";

import {
  layoutNextLine,
  prepareWithSegments,
  type LayoutCursor,
  type PreparedTextWithSegments,
} from "@chenglou/pretext";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  carveTextLineSlots,
  getPolygonIntervalForBand,
  getRectIntervalsForBand,
  getWrapHull,
  transformWrapPoints,
  type Interval,
  type Point,
  type Rect,
} from "@/lib/wrap-geometry";

const LEFT_TEXT = "Julia is a product designer and crafter of experiences.";
const RIGHT_TEXT = "She loves visual craft and builds tools that make life easier.";

type Flower = {
  id: string;
  src: string;
  /** Source asset width — used to derive an aspect-correct flower rect on screen. */
  naturalWidth: number;
  /** Source asset height. */
  naturalHeight: number;
};

/**
 * Frames animated on flower-hover. Same ping-pong sequence as the original
 * OrchidAnimation: 0 → 1 → 2 → … → 9 → 8 → … → 1 → 0 → 1 …
 * Each frame's silhouette reflows the surrounding text.
 */
const FLOWERS: readonly Flower[] = [
  { id: "f0", src: "/orchid/1.webp",        naturalWidth: 240, naturalHeight: 240 },
  { id: "f1", src: "/orchid/2.webp",        naturalWidth: 240, naturalHeight: 240 },
  { id: "f2", src: "/orchid/frame-01.webp", naturalWidth: 480, naturalHeight: 480 },
  { id: "f3", src: "/orchid/frame-02.webp", naturalWidth: 480, naturalHeight: 466 },
  { id: "f4", src: "/orchid/frame-03.webp", naturalWidth: 480, naturalHeight: 441 },
  { id: "f5", src: "/orchid/frame-04.webp", naturalWidth: 480, naturalHeight: 415 },
  { id: "f6", src: "/orchid/frame-05.webp", naturalWidth: 480, naturalHeight: 320 },
  { id: "f7", src: "/orchid/frame-06.webp", naturalWidth: 480, naturalHeight: 375 },
  { id: "f8", src: "/orchid/frame-07.webp", naturalWidth: 480, naturalHeight: 430 },
] as const;

const HERO_MAX_WIDTH = 900;
/** Below this width the columns can't hold a flower between them — fall back to a stacked DOM-flow layout. */
const STACK_BREAKPOINT = 480;
/** Effectively infinite region height during layout — we measure the actual block height afterward. */
const LARGE = 9999;
/** Time per frame in the orchid ping-pong animation. Matches the previous OrchidAnimation. */
const FRAME_MS = 800;

export type { Rect } from "@/lib/wrap-geometry";

/** Kept for callers that previously read this; unused internally now. */
export const DEFAULT_CENTER_HOLE_RECT: Rect = {
  x: 0,
  y: 0,
  width: 152,
  height: 152,
};

type PositionedLine = {
  x: number;
  y: number;
  width: number;
  text: string;
};

type FlowerRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type LayoutResult =
  | { mode: "stacked" }
  | {
      mode: "wrapped";
      containerHeight: number;
      fontSize: number;
      lineHeight: number;
      /** Hover hit area for the flower — sized to the flower budget, centered in the hero. */
      stageLeft: number;
      stageTop: number;
      stageSize: number;
      /** Per-flower rendered rect; precomputed so the crossfade can place all images at their own aspect-correct boxes. */
      flowerRects: Record<string, FlowerRect>;
      leftLines: PositionedLine[];
      rightLines: PositionedLine[];
    };

/** Walks lines top-to-bottom in `region`, carving each band around the flower silhouette. */
function layoutColumnAroundPolygon(
  prepared: PreparedTextWithSegments,
  startCursor: LayoutCursor,
  region: Rect,
  worldPoints: Point[] | null,
  flowerRect: Rect,
  side: "left" | "right",
  lineHeight: number,
  hPad: number,
  vPad: number,
): { lines: PositionedLine[]; cursor: LayoutCursor } {
  let cursor: LayoutCursor = startCursor;
  let lineTop = region.y;
  const lines: PositionedLine[] = [];

  while (true) {
    if (lineTop + lineHeight > region.y + region.height) break;

    const bandTop = lineTop;
    const bandBottom = lineTop + lineHeight;

    let blocked: Interval | null = null;
    if (worldPoints !== null) {
      blocked = getPolygonIntervalForBand(worldPoints, bandTop, bandBottom, hPad, vPad);
    } else {
      const intervals = getRectIntervalsForBand(
        [flowerRect],
        bandTop,
        bandBottom,
        hPad,
        vPad,
      );
      blocked = intervals[0] ?? null;
    }

    const base: Interval = { left: region.x, right: region.x + region.width };
    const slots = blocked !== null ? carveTextLineSlots(base, [blocked]) : [base];

    if (slots.length === 0) {
      lineTop += lineHeight;
      continue;
    }

    // "left" → leftmost slot (text sits to the LEFT of the flower);
    // "right" → rightmost slot (text sits to the RIGHT of the flower).
    const slot = side === "left" ? slots[0]! : slots[slots.length - 1]!;
    const slotWidth = slot.right - slot.left;
    const line = layoutNextLine(prepared, cursor, slotWidth);
    if (line === null) break;

    lines.push({
      x: slot.left,
      y: lineTop,
      width: slotWidth,
      text: line.text,
    });
    cursor = line.end;
    lineTop += lineHeight;
  }

  return { lines, cursor };
}

function renderLineWithItalic(text: string): React.ReactNode {
  const word = "experiences";
  const idx = text.indexOf(word);
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ fontStyle: "italic" }}>{word}</span>
      {text.slice(idx + word.length)}
    </>
  );
}

/** Use the page's resolved Inter family (next/font rewrites it) so pretext and the DOM measure the same font. */
function resolveBodyFont(fontSize: number): string {
  if (typeof window === "undefined") return `500 ${fontSize}px "Inter", sans-serif`;
  const family = getComputedStyle(document.body).fontFamily || '"Inter", sans-serif';
  return `500 ${fontSize}px ${family}`;
}

function flowerSizeFor(flower: Flower, sizeBudget: number): { width: number; height: number } {
  const aspect = flower.naturalWidth / flower.naturalHeight;
  const width = aspect >= 1 ? sizeBudget : Math.round(sizeBudget * aspect);
  const height = aspect >= 1 ? Math.round(sizeBudget / aspect) : sizeBudget;
  return { width, height };
}

export default function HeroFlowAround() {
  const rootRef = useRef<HTMLDivElement>(null);
  const preparedLeftRef = useRef<{ prepared: PreparedTextWithSegments; font: string } | null>(null);
  const preparedRightRef = useRef<{ prepared: PreparedTextWithSegments; font: string } | null>(null);
  const hullsRef = useRef<Map<string, Point[]>>(new Map());
  const scheduleRef = useRef<() => void>(() => {});
  const activeFlowerIdRef = useRef<string>(FLOWERS[0]!.id);

  // Ping-pong animation state: keeps last index/direction across hover sessions
  // so re-hovering resumes from where it paused (matches the original OrchidAnimation).
  const frameIdxRef = useRef(0);
  const directionRef = useRef<1 | -1>(1);
  const playingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const tapPlayingRef = useRef(false);

  const [activeFlowerId, setActiveFlowerId] = useState<string>(FLOWERS[0]!.id);
  const [hullsReady, setHullsReady] = useState(false);
  const [layout, setLayout] = useState<LayoutResult | null>(null);

  // Preload every silhouette hull. Hover stays disabled until they're all ready.
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      FLOWERS.map((flower) =>
        getWrapHull(flower.src, { smoothRadius: 6, mode: "mean" })
          .then((hull) => {
            if (cancelled) return;
            hullsRef.current.set(flower.id, hull);
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.warn(`HeroFlowAround: hull failed for ${flower.id}`, err);
          }),
      ),
    ).then(() => {
      if (cancelled) return;
      setHullsReady(true);
      scheduleRef.current();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const tick = useCallback((ts: number) => {
    if (!playingRef.current) return;
    if (lastTimeRef.current === 0) lastTimeRef.current = ts;

    if (ts - lastTimeRef.current >= FRAME_MS) {
      lastTimeRef.current = ts;
      let next = frameIdxRef.current + directionRef.current;
      if (next >= FLOWERS.length) {
        next = FLOWERS.length - 2;
        directionRef.current = -1;
      } else if (next < 0) {
        next = 1;
        directionRef.current = 1;
      }
      frameIdxRef.current = next;
      setActiveFlowerId(FLOWERS[next]!.id);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const play = useCallback(() => {
    if (!hullsReady) return;
    if (playingRef.current) return;
    playingRef.current = true;
    lastTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);
  }, [hullsReady, tick]);

  const pause = useCallback(() => {
    playingRef.current = false;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const isHoverDevice = useCallback(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches,
    [],
  );

  const handleStageMouseEnter = useCallback(() => {
    if (isHoverDevice()) play();
  }, [play, isHoverDevice]);

  const handleStageMouseLeave = useCallback(() => {
    if (isHoverDevice()) pause();
  }, [pause, isHoverDevice]);

  const handleStageClick = useCallback(() => {
    if (isHoverDevice()) return;
    if (tapPlayingRef.current) {
      pause();
      tapPlayingRef.current = false;
    } else {
      play();
      tapPlayingRef.current = true;
    }
  }, [play, pause, isHoverDevice]);

  useEffect(() => () => pause(), [pause]);

  // Re-run layout whenever the active flower changes — text snaps to the new silhouette.
  useEffect(() => {
    activeFlowerIdRef.current = activeFlowerId;
    scheduleRef.current();
  }, [activeFlowerId]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (root === null) return;

    let frame = 0;

    const run = () => {
      const containerWidth = root.clientWidth;
      if (containerWidth < 1) return;

      // Below STACK_BREAKPOINT the two columns can't fit a flower between them.
      // Render a stacked DOM-flow layout instead — no pretext wrapping needed.
      if (containerWidth < STACK_BREAKPOINT) {
        setLayout({ mode: "stacked" });
        return;
      }

      const fontSize = containerWidth < 640 ? 24 : 28;
      const lineHeight = containerWidth < 640 ? 32 : 40;
      const flowerSizeBudget = 160;
      const font = resolveBodyFont(fontSize);

      if (preparedLeftRef.current === null || preparedLeftRef.current.font !== font) {
        preparedLeftRef.current = { prepared: prepareWithSegments(LEFT_TEXT, font), font };
      }
      if (preparedRightRef.current === null || preparedRightRef.current.font !== font) {
        preparedRightRef.current = { prepared: prepareWithSegments(RIGHT_TEXT, font), font };
      }
      const preparedLeft = preparedLeftRef.current.prepared;
      const preparedRight = preparedRightRef.current.prepared;

      const hPad = Math.round(lineHeight * 0.5);
      const vPad = Math.round(lineHeight * 0.15);

      const activeId = activeFlowerIdRef.current;
      const activeFlower = FLOWERS.find((f) => f.id === activeId) ?? FLOWERS[0]!;
      const activeFlowerSize = flowerSizeFor(activeFlower, flowerSizeBudget);
      const hull = hullsRef.current.get(activeFlower.id) ?? null;

      // Place the flower at the top for the layout pass; we shift everything to its
      // final centered position once we know the real text block height.
      const layoutFlowerRect: Rect = {
        x: Math.round((containerWidth - activeFlowerSize.width) / 2),
        y: 0,
        width: activeFlowerSize.width,
        height: activeFlowerSize.height,
      };
      const worldPoints =
        hull !== null ? transformWrapPoints(hull, layoutFlowerRect, 0) : null;

      // Both columns share the FULL container width — the flower polygon carves
      // out the center on each line. The "left" column picks the LEFT chunk on
      // each line (text hugs the flower from its left side) and the "right"
      // column picks the RIGHT chunk. That's the silhouette wrap.
      const leftRegion: Rect = { x: 0, y: 0, width: containerWidth, height: LARGE };
      const rightRegion: Rect = { x: 0, y: 0, width: containerWidth, height: LARGE };

      const leftRaw = layoutColumnAroundPolygon(
        preparedLeft,
        { segmentIndex: 0, graphemeIndex: 0 },
        leftRegion,
        worldPoints,
        layoutFlowerRect,
        "left",
        lineHeight,
        hPad,
        vPad,
      ).lines;
      const rightRaw = layoutColumnAroundPolygon(
        preparedRight,
        { segmentIndex: 0, graphemeIndex: 0 },
        rightRegion,
        worldPoints,
        layoutFlowerRect,
        "right",
        lineHeight,
        hPad,
        vPad,
      ).lines;

      // Measure the real text block height from the actual output.
      const textBlockHeight = Math.max(
        leftRaw.length > 0 ? leftRaw[leftRaw.length - 1]!.y + lineHeight : 0,
        rightRaw.length > 0 ? rightRaw[rightRaw.length - 1]!.y + lineHeight : 0,
      );

      const containerHeight = Math.max(textBlockHeight, flowerSizeBudget) + 40;
      const textStartY = (containerHeight - textBlockHeight) / 2;

      // Shift every line down so the text block's vertical center sits on the container's center axis.
      const leftLines = leftRaw.map((l) => ({ ...l, y: l.y + textStartY }));
      const rightLines = rightRaw.map((l) => ({ ...l, y: l.y + textStartY }));

      // Re-center every flower's rendered rect in the now-known container height.
      const flowerRects: Record<string, FlowerRect> = {};
      for (const flower of FLOWERS) {
        const { width, height } = flowerSizeFor(flower, flowerSizeBudget);
        flowerRects[flower.id] = {
          left: Math.round((containerWidth - width) / 2),
          top: Math.round((containerHeight - height) / 2),
          width,
          height,
        };
      }

      setLayout({
        mode: "wrapped",
        containerHeight,
        fontSize,
        lineHeight,
        stageLeft: Math.round((containerWidth - flowerSizeBudget) / 2),
        stageTop: Math.round((containerHeight - flowerSizeBudget) / 2),
        stageSize: flowerSizeBudget,
        flowerRects,
        leftLines,
        rightLines,
      });
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(run);
    };
    scheduleRef.current = schedule;

    schedule();
    void document.fonts.ready.then(schedule);

    const ro = new ResizeObserver(schedule);
    ro.observe(root);
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const isStacked = layout?.mode === "stacked";

  return (
    <section className="w-full fluid-px-home pb-[120px] pt-[120px] md:pb-[160px] md:pt-[140px]">
      <p className="sr-only">{LEFT_TEXT} {RIGHT_TEXT}</p>

      <div
        ref={rootRef}
        style={{
          width: "100%",
          maxWidth: isStacked ? undefined : HERO_MAX_WIDTH,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {isStacked ? (
          <div className="flex flex-col items-center text-center">
            <div
              role="button"
              tabIndex={-1}
              onClick={handleStageClick}
              style={{
                position: "relative",
                width: 100,
                height: 100,
                cursor: hullsReady ? "pointer" : "default",
              }}
              aria-hidden
            >
              {FLOWERS.map((flower) => (
                <img
                  key={flower.id}
                  src={flower.src}
                  alt=""
                  width={flower.naturalWidth}
                  height={flower.naturalHeight}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    opacity: flower.id === activeFlowerId ? 1 : 0,
                    pointerEvents: "none",
                    transition: "opacity 300ms ease",
                  }}
                />
              ))}
            </div>
            <p
              style={{
                fontSize: 20,
                fontWeight: 500,
                lineHeight: "28px",
                marginTop: 16,
                color: "var(--text-primary)",
              }}
            >
              Julia is a product designer and crafter of <em>experiences</em>.
            </p>
            <p
              style={{
                fontSize: 20,
                fontWeight: 500,
                lineHeight: "28px",
                marginTop: 8,
                color: "var(--text-primary)",
              }}
            >
              She loves visual craft and builds tools that make life easier.
            </p>
          </div>
        ) : (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: layout?.mode === "wrapped" ? layout.containerHeight : undefined,
            }}
            aria-hidden
          >
            {layout?.mode === "wrapped" ? (
              <>
                <div
                  role="button"
                  tabIndex={-1}
                  onMouseEnter={handleStageMouseEnter}
                  onMouseLeave={handleStageMouseLeave}
                  onClick={handleStageClick}
                  style={{
                    position: "absolute",
                    left: layout.stageLeft,
                    top: layout.stageTop,
                    width: layout.stageSize,
                    height: layout.stageSize,
                    cursor: hullsReady ? "pointer" : "default",
                  }}
                >
                  {FLOWERS.map((flower) => {
                    const rect = layout.flowerRects[flower.id]!;
                    const isActive = flower.id === activeFlowerId;
                    return (
                      <img
                        key={flower.id}
                        src={flower.src}
                        alt=""
                        width={flower.naturalWidth}
                        height={flower.naturalHeight}
                        style={{
                          position: "absolute",
                          left: rect.left - layout.stageLeft,
                          top: rect.top - layout.stageTop,
                          width: rect.width,
                          height: rect.height,
                          opacity: isActive ? 1 : 0,
                          pointerEvents: "none",
                          transition: "opacity 300ms ease",
                        }}
                      />
                    );
                  })}
                </div>

                {layout.leftLines.map((line, i) => (
                  <span
                    key={`l-${i}`}
                    style={{
                      position: "absolute",
                      left: line.x,
                      top: line.y,
                      width: line.width,
                      textAlign: "right",
                      fontSize: layout.fontSize,
                      fontWeight: 500,
                      lineHeight: `${layout.lineHeight}px`,
                      whiteSpace: "nowrap",
                      color: "var(--text-primary)",
                    }}
                  >
                    {renderLineWithItalic(line.text)}
                  </span>
                ))}
                {layout.rightLines.map((line, i) => (
                  <span
                    key={`r-${i}`}
                    style={{
                      position: "absolute",
                      left: line.x,
                      top: line.y,
                      width: line.width,
                      textAlign: "left",
                      fontSize: layout.fontSize,
                      fontWeight: 500,
                      lineHeight: `${layout.lineHeight}px`,
                      whiteSpace: "nowrap",
                      color: "var(--text-primary)",
                    }}
                  >
                    {renderLineWithItalic(line.text)}
                  </span>
                ))}
              </>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
