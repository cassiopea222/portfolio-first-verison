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

/**
 * Mirrors pretext's `pages/demos/editorial-engine.ts` `layoutColumn` signature.
 * We keep this as an array even though the hero currently carries a single
 * polygon — it makes adding more obstacles (second flower, pullquote box, …)
 * a no-op on the layout side.
 */
type Obstacles = {
  polygons: Point[][];
  rects: Rect[];
};

const LEFT_TEXT = "Julia is a product designer and crafter of experiences.";
const RIGHT_TEXT = "She loves visual craft and builds tools that make life easier.";

/**
 * Canonical 3-line split, frozen at/above `LOCK_BREAKPOINT_3LINE`. Above that
 * threshold we bypass pretext and render these exact strings at fixed
 * positions; only type size and flower size scale with the breakpoints, so
 * the composition never reflows as the viewport grows.
 */
const LEFT_LINES_LOCKED_3 = [
  "Julia is a product",
  "designer and crafter",
  "of experiences.",
] as const;
const RIGHT_LINES_LOCKED_3 = [
  "She loves visual craft",
  "and builds tools that",
  "make life easier.",
] as const;

type Flower = {
  id: string;
  src: string;
  /** Source asset width — used to derive an aspect-correct flower rect on screen. */
  naturalWidth: number;
  /** Source asset height. */
  naturalHeight: number;
};

/**
 * Frames animated on flower-hover. Forward cycle: 1 → … → frame-07 → 1 → …
 * Order matches lexicographic listing of `/public/orchid/*.webp` (1, 2, frame-01 … frame-07).
 * Each frame's silhouette reflows the surrounding text.
 */
const FLOWERS: readonly Flower[] = [
  { id: "f0", src: "/orchid/1.webp",        naturalWidth: 240, naturalHeight: 240 },
  { id: "f1", src: "/orchid/2.webp",        naturalWidth: 240, naturalHeight: 240 },
  { id: "f2", src: "/orchid/frame-01.webp", naturalWidth: 480, naturalHeight: 480 },
  { id: "f3", src: "/orchid/frame-02.webp", naturalWidth: 480, naturalHeight: 466 },
  { id: "f4", src: "/orchid/frame-03.webp", naturalWidth: 480, naturalHeight: 441 },
  { id: "f5", src: "/orchid/frame-04.webp", naturalWidth: 480, naturalHeight: 415 },
  { id: "f6", src: "/orchid/frame-06.webp", naturalWidth: 480, naturalHeight: 375 },
  { id: "f7", src: "/orchid/frame-07.webp", naturalWidth: 480, naturalHeight: 430 },
] as const;

const HERO_MAX_WIDTH = 1120;
/** At/below this width we switch to the Figma mobile composition — stacked flower above a single centered paragraph. */
const STACK_BREAKPOINT = 810;
/** Container width at/above which we freeze word groupings to the 3-line layout. */
const LOCK_BREAKPOINT_3LINE = 720;
/** Container width at/above which the locked 3-line layout switches to its larger type/flower variant. */
const LOCK_BREAKPOINT_LARGE = 1080;
/** Flower box size for the standard locked layout (matches the approved mid-width screenshot). */
const LOCKED_FLOWER_SIZE = 160;
/** Effectively infinite region height during layout — we measure the actual block height afterward. */
const LARGE = 9999;
/** Time per frame in the orchid cycle. Matches OrchidAnimation. */
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

/**
 * Walks lines top-to-bottom in `region`, collecting every obstacle's blocked
 * interval per band (exactly like pretext's editorial-engine demo), carving
 * the row with `carveTextLineSlots`, then picking the leftmost or rightmost
 * surviving slot for this column.
 *
 * Structure intentionally mirrors `layoutColumn` in
 * `@chenglou/pretext`'s `pages/demos/editorial-engine.ts` — we just pick one
 * slot per line instead of filling all of them, because the hero keeps two
 * independent text cursors (one per column) rather than one continuous flow.
 */
function layoutColumn(
  prepared: PreparedTextWithSegments,
  startCursor: LayoutCursor,
  region: Rect,
  obstacles: Obstacles,
  side: "left" | "right",
  lineHeight: number,
  hPad: number,
  vPad: number,
): { lines: PositionedLine[]; cursor: LayoutCursor } {
  let cursor: LayoutCursor = startCursor;
  let lineTop = region.y;
  const lines: PositionedLine[] = [];

  while (lineTop + lineHeight <= region.y + region.height) {
    const bandTop = lineTop;
    const bandBottom = lineTop + lineHeight;

    const blocked: Interval[] = [];
    for (const polygon of obstacles.polygons) {
      const interval = getPolygonIntervalForBand(polygon, bandTop, bandBottom, hPad, vPad);
      if (interval !== null) blocked.push(interval);
    }
    const rectIntervals = getRectIntervalsForBand(obstacles.rects, bandTop, bandBottom, hPad, vPad);
    for (const interval of rectIntervals) blocked.push(interval);

    const base: Interval = { left: region.x, right: region.x + region.width };
    const slots = carveTextLineSlots(base, blocked);

    if (slots.length === 0) {
      lineTop += lineHeight;
      continue;
    }

    // "left" → leftmost slot (text sits to the LEFT of the obstacles);
    // "right" → rightmost slot (text sits to the RIGHT of the obstacles).
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

function renderLineWithItalic(text: string, baseFontSize: number = 28): React.ReactNode {
  const word = "experiences";
  const idx = text.indexOf(word);
  if (idx < 0) return text;
  // Italic "experiences" tracks the surrounding body size (36 against 28 ≈ 1.286).
  const italicSize = Math.round(baseFontSize * 1.286);
  return (
    <>
      {text.slice(0, idx)}
      <span
        style={{
          fontFamily: "var(--font-crimson), ui-serif, Georgia, serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: italicSize,
          lineHeight: `${italicSize}px`,
        }}
      >
        {word}
      </span>
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

/**
 * Hardcoded wide-viewport layout. Word groupings are frozen (no pretext
 * measurement) but each line's horizontal anchor is queried from the flower
 * polygon at that line's y-band, so the text still hugs the silhouette —
 * line 0 anchors to the narrow top of the flower, line 1 to the wide middle,
 * etc. Same vertical-centering math as the pretext path.
 */
function buildLockedLayout(
  containerWidth: number,
  leftLinesText: readonly string[],
  rightLinesText: readonly string[],
  activeFlowerId: string,
  hullsMap: Map<string, Point[]>,
  options: {
    fontSize?: number;
    lineHeight?: number;
    flowerSizeBudget?: number;
    hPadScale?: number;
  } = {},
): Extract<LayoutResult, { mode: "wrapped" }> {
  const fontSize = options.fontSize ?? 28;
  const lineHeight = options.lineHeight ?? 40;
  const flowerSizeBudget = options.flowerSizeBudget ?? LOCKED_FLOWER_SIZE;
  const hPadScale = options.hPadScale ?? 0.5;
  const hPad = Math.round(lineHeight * hPadScale);
  const vPad = Math.round(lineHeight * 0.15);
  const lineCount = Math.max(leftLinesText.length, rightLinesText.length);

  const textBlockHeight = lineCount * lineHeight;
  const containerHeight = Math.max(textBlockHeight, flowerSizeBudget) + 40;
  const textStartY = (containerHeight - textBlockHeight) / 2;

  const activeFlower = FLOWERS.find((f) => f.id === activeFlowerId) ?? FLOWERS[0]!;
  const activeFlowerSize = flowerSizeFor(activeFlower, flowerSizeBudget);
  const activeFlowerRect: Rect = {
    x: (containerWidth - activeFlowerSize.width) / 2,
    y: (containerHeight - activeFlowerSize.height) / 2,
    width: activeFlowerSize.width,
    height: activeFlowerSize.height,
  };
  const hull = hullsMap.get(activeFlower.id) ?? null;
  const worldPoints =
    hull !== null ? transformWrapPoints(hull, activeFlowerRect, 0) : null;

  // Per-line silhouette anchor: query polygon (or rect fallback) for the
  // band covered by this line, then anchor the line's edge to it.
  const anchorsForBand = (y: number): { left: number; right: number } => {
    let blocked: Interval | null = null;
    if (worldPoints !== null) {
      blocked = getPolygonIntervalForBand(worldPoints, y, y + lineHeight, hPad, vPad);
    } else {
      blocked =
        getRectIntervalsForBand([activeFlowerRect], y, y + lineHeight, hPad, vPad)[0] ??
        null;
    }
    if (blocked === null) {
      // Band doesn't intersect the flower — fall back to the rect edges so
      // above/below-flower lines still have a reasonable anchor.
      return {
        left: activeFlowerRect.x - hPad,
        right: activeFlowerRect.x + activeFlowerRect.width + hPad,
      };
    }
    return { left: blocked.left, right: blocked.right };
  };

  const leftLines: PositionedLine[] = leftLinesText.map((text, i) => {
    const y = textStartY + i * lineHeight;
    const { left: anchorRight } = anchorsForBand(y);
    // Span covers [0, anchorRight]; text is right-aligned so it hugs the
    // silhouette's left edge at this exact band.
    return { x: 0, y, width: Math.max(0, anchorRight), text };
  });

  const rightLines: PositionedLine[] = rightLinesText.map((text, i) => {
    const y = textStartY + i * lineHeight;
    const { right: anchorLeft } = anchorsForBand(y);
    return {
      x: anchorLeft,
      y,
      width: Math.max(0, containerWidth - anchorLeft),
      text,
    };
  });

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

  return {
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
  };
}

export default function HeroFlowAround() {
  const rootRef = useRef<HTMLDivElement>(null);
  const preparedLeftRef = useRef<{ prepared: PreparedTextWithSegments; font: string } | null>(null);
  const preparedRightRef = useRef<{ prepared: PreparedTextWithSegments; font: string } | null>(null);
  const hullsRef = useRef<Map<string, Point[]>>(new Map());
  const scheduleRef = useRef<() => void>(() => {});
  const activeFlowerIdRef = useRef<string>(FLOWERS[0]!.id);

  // Cycle index; re-hovering resumes from the last shown frame.
  const frameIdxRef = useRef(0);
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

  const tick = useCallback(function tick(ts: number) {
    if (!playingRef.current) return;
    if (lastTimeRef.current === 0) lastTimeRef.current = ts;

    if (ts - lastTimeRef.current >= FRAME_MS) {
      lastTimeRef.current = ts;
      const next = (frameIdxRef.current + 1) % FLOWERS.length;
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

      // Mobile switch is driven by viewport width (not container width) so that
      // padding changes at the layout breakpoint don't shrink the container in
      // a way that fights STACK_BREAKPOINT (stacked hero below 810px viewport).
      const viewportWidth =
        typeof window !== "undefined" ? window.innerWidth : containerWidth;
      if (viewportWidth < STACK_BREAKPOINT) {
        setLayout({ mode: "stacked" });
        return;
      }

      // Wide viewports snap to a larger 3-line composition — bigger type, a
      // slightly bigger flower, but the same canonical word groupings as the
      // mid-width lock so resizing across 1080 only changes scale, not breaks.
      if (containerWidth >= LOCK_BREAKPOINT_LARGE) {
        setLayout(
          buildLockedLayout(
            containerWidth,
            LEFT_LINES_LOCKED_3,
            RIGHT_LINES_LOCKED_3,
            activeFlowerIdRef.current,
            hullsRef.current,
            {
              fontSize: 32,
              lineHeight: 42,
              flowerSizeBudget: LOCKED_FLOWER_SIZE + 20,
              hPadScale: 0.3,
            },
          ),
        );
        return;
      }

      // Mid-width viewports snap to the canonical 3-line composition (same
      // silhouette anchoring as the wide path, just smaller).
      if (containerWidth >= LOCK_BREAKPOINT_3LINE) {
        setLayout(
          buildLockedLayout(
            containerWidth,
            LEFT_LINES_LOCKED_3,
            RIGHT_LINES_LOCKED_3,
            activeFlowerIdRef.current,
            hullsRef.current,
            { hPadScale: 0.3 },
          ),
        );
        return;
      }

      const fontSize = containerWidth < 694 ? 24 : 28;
      const lineHeight = containerWidth < 694 ? 32 : 40;
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

      // Feed obstacles as arrays — same shape pretext's editorial-engine uses.
      // Polygon silhouette when the hull is ready; falls back to the bounding rect otherwise.
      const obstacles: Obstacles =
        hull !== null
          ? { polygons: [transformWrapPoints(hull, layoutFlowerRect, 0)], rects: [] }
          : { polygons: [], rects: [layoutFlowerRect] };

      // Both columns share the FULL container width — obstacles carve out the
      // center on each line. The "left" column picks the LEFT chunk on each
      // line (text hugs the flower from its left side) and the "right" column
      // picks the RIGHT chunk.
      const leftRegion: Rect = { x: 0, y: 0, width: containerWidth, height: LARGE };
      const rightRegion: Rect = { x: 0, y: 0, width: containerWidth, height: LARGE };

      const leftRaw = layoutColumn(
        preparedLeft,
        { segmentIndex: 0, graphemeIndex: 0 },
        leftRegion,
        obstacles,
        "left",
        lineHeight,
        hPad,
        vPad,
      ).lines;
      const rightRaw = layoutColumn(
        preparedRight,
        { segmentIndex: 0, graphemeIndex: 0 },
        rightRegion,
        obstacles,
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
    <section className="w-full fluid-px-home py-[60px] min-[810px]:pt-[140px] min-[810px]:pb-[160px]">
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
          <div
            className="flex flex-col items-center justify-between w-full"
            style={{ minHeight: 460 }}
          >
            <div
              role="button"
              tabIndex={-1}
              onMouseEnter={handleStageMouseEnter}
              onMouseLeave={handleStageMouseLeave}
              onClick={handleStageClick}
              className="origin-center transition-transform duration-200 ease-out hover:scale-105"
              style={{
                position: "relative",
                width: 220,
                height: 220,
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
                  }}
                />
              ))}
            </div>
            <p
              style={{
                fontSize: 22,
                fontWeight: 500,
                lineHeight: "32px",
                width: "100%",
                color: "var(--text-primary)",
              }}
            >
              Julia is a product designer and crafter of{" "}
              <span
                style={{
                  fontFamily: "var(--font-crimson), ui-serif, Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 28,
                  lineHeight: "32px",
                }}
              >
                experiences
              </span>
              . She loves visual craft and builds tools that make life easier.
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
                  className="origin-center transition-transform duration-200 ease-out hover:scale-105"
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
                    {renderLineWithItalic(line.text, layout.fontSize)}
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
                    {renderLineWithItalic(line.text, layout.fontSize)}
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
