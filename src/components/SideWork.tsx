"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import { sideWorkCards, type SideWorkCard, type SideWorkMedia } from "@/data/sideWork";

const MODAL_TRANSITION_MS = 250;
const ZOOM_MIN = 1;
const ZOOM_MAX = 2.5;
const ZOOM_STEP = 0.25;
const GALLERY_GAP_PX = 24;
/** Slightly smaller than width-fit so screens sit with more breathing room in the panel. */
const GALLERY_MEDIA_SCALE = 0.88;
/** Bottom inset for the floating zoom pill (pill height + offset from card edge). */
const GALLERY_ZOOM_PILL_INSET_PX = 56;

function MediaItem({
  media,
  nativeWidth,
  nativeHeight,
}: {
  media: SideWorkMedia;
  nativeWidth: number;
  nativeHeight: number;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    // Missing file (e.g. content not uploaded yet) — fall back to the
    // plain gray cover.
    return null;
  }

  const style: React.CSSProperties = {
    position: "absolute",
    left: `${(media.x / nativeWidth) * 100}%`,
    top: `${(media.y / nativeHeight) * 100}%`,
    width: `${(media.width / nativeWidth) * 100}%`,
    height: `${(media.height / nativeHeight) * 100}%`,
    borderRadius: media.rounded
      ? `${(media.rounded / media.width) * 100}%`
      : undefined,
  };

  if (media.kind === "video") {
    return (
      <video
        src={media.src}
        autoPlay
        muted
        loop
        playsInline
        onError={() => setFailed(true)}
        className="overflow-hidden object-cover"
        style={style}
      />
    );
  }

  return (
    <div className="pointer-events-none overflow-hidden" style={style}>
      <Image
        src={media.src}
        alt=""
        fill
        sizes={`${Math.round((media.width / nativeWidth) * 900)}px`}
        quality={95}
        onError={() => setFailed(true)}
        className="object-cover"
      />
    </div>
  );
}

function SideWorkCover({
  card,
  borderless = false,
}: {
  card: SideWorkCard;
  borderless?: boolean;
}) {
  const nativeWidth = card.nativeWidth ?? 840;
  const nativeHeight = card.nativeHeight ?? 553;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[32px] shrink-0 ${card.coverBgClass}${
        !borderless && card.coverBorderClass ? ` ${card.coverBorderClass}` : ""
      }`}
      style={{ aspectRatio: `${nativeWidth} / ${nativeHeight}` }}
    >
      {card.media.map((media) => (
        <MediaItem
          key={media.src}
          media={media}
          nativeWidth={nativeWidth}
          nativeHeight={nativeHeight}
        />
      ))}
    </div>
  );
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function ModalCloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className="absolute right-[16px] top-[16px] z-10 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white/70 text-[var(--icon-secondary)] shadow-[0_2px_8px_rgba(0,0,0,0.12)] backdrop-blur-[4px] transition-colors duration-[var(--ui-duration)] outline-none hover:bg-white/95 focus-visible:ring-2 focus-visible:ring-[var(--ui-focus-ring)]"
    >
      <IconX size={20} stroke={1.75} aria-hidden />
    </button>
  );
}

/**
 * Panel variant for image-only cards: media lays directly on the card's
 * cover background (no inner cover frame), scaled to fit, with zoom controls.
 */
function GalleryPanel({
  card,
  visible,
  panelRef,
  onRequestClose,
}: {
  card: SideWorkCard;
  visible: boolean;
  panelRef: React.RefObject<HTMLDivElement | null>;
  onRequestClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [fitHeight, setFitHeight] = useState<number | null>(null);
  const [scrollAreaHeight, setScrollAreaHeight] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sumAspect = card.media.reduce((sum, m) => sum + m.width / m.height, 0);

  // Match the standard cover modal's height (840×553 cover at 1000px wide
  // plus 24px padding) but run wider, so the phones get breathing room.
  // On narrow screens phones stay legible by scrolling horizontally.
  useLayoutEffect(() => {
    const compute = () => {
      const panelWidth = Math.min(1200, window.innerWidth - 32);
      const coverPanelWidth = Math.min(1000, window.innerWidth - 32);
      const coverPanelHeight = ((coverPanelWidth - 48) * 553) / 840 + 48;
      const panelHeight = Math.min(coverPanelHeight, window.innerHeight - 48);
      const gaps = (card.media.length - 1) * GALLERY_GAP_PX;
      const widthFit = (panelWidth - 48 - gaps) / sumAspect;
      setScrollAreaHeight(panelHeight);
      setFitHeight(
        Math.min(
          Math.max(widthFit * GALLERY_MEDIA_SCALE, 280),
          panelHeight - GALLERY_ZOOM_PILL_INSET_PX - 32
        )
      );
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [sumAspect, card.media.length]);

  const zoomBy = useCallback((delta: number) => {
    setZoom((z) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, +(z + delta).toFixed(2))));
  }, []);

  // Pinch / ctrl+wheel zoom. Native listener because React's onWheel is
  // passive and can't preventDefault the browser's page zoom.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      zoomBy(-event.deltaY * 0.01);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomBy]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={card.title}
      tabIndex={-1}
      className={`relative flex w-full max-w-[1200px] flex-col overflow-hidden rounded-[32px] ${card.coverBgClass} shadow-[0_24px_64px_rgba(0,0,0,0.2)] outline-none transition-[opacity,transform] duration-[250ms] motion-reduce:transition-none ${
        visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
      style={{ transitionTimingFunction: "var(--ui-ease-out)" }}
    >
      <ModalCloseButton onClick={onRequestClose} />
      <div
        ref={scrollRef}
        className="w-full overflow-auto pb-[56px]"
        style={{ height: scrollAreaHeight ?? undefined }}
      >
        <div className="flex min-h-full w-max min-w-full">
          <div
            className="flex m-auto px-[24px] pt-[24px] pb-[8px] transition-[height] duration-[200ms] motion-reduce:transition-none"
            style={{
              gap: GALLERY_GAP_PX,
              height: fitHeight ? fitHeight * zoom : undefined,
              boxSizing: "content-box",
              transitionTimingFunction: "var(--ui-ease-out)",
            }}
          >
            {card.media.map((media) => (
              <div
                key={media.src}
                className="relative h-full"
                style={{ aspectRatio: `${media.width} / ${media.height}` }}
              >
                <Image
                  src={media.src}
                  alt=""
                  fill
                  sizes="60vw"
                  quality={95}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-[14px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-[2px] rounded-full bg-white/70 px-[4px] py-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.12)] backdrop-blur-[4px]"
        aria-label="Zoom controls"
      >
        <button
          type="button"
          onClick={() => zoomBy(-ZOOM_STEP)}
          disabled={zoom <= ZOOM_MIN}
          aria-label="Zoom out"
          className="flex h-[32px] w-[32px] items-center justify-center rounded-full text-[var(--icon-secondary)] transition-colors duration-[var(--ui-duration)] outline-none hover:bg-black/[0.06] hover:text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[var(--ui-focus-ring)] disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent"
        >
          <IconMinus size={18} stroke={1.75} aria-hidden />
        </button>
        <span className="w-[48px] text-center font-sans text-[13px] font-medium tabular-nums text-[var(--text-secondary)]">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          onClick={() => zoomBy(ZOOM_STEP)}
          disabled={zoom >= ZOOM_MAX}
          aria-label="Zoom in"
          className="flex h-[32px] w-[32px] items-center justify-center rounded-full text-[var(--icon-secondary)] transition-colors duration-[var(--ui-duration)] outline-none hover:bg-black/[0.06] hover:text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[var(--ui-focus-ring)] disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent"
        >
          <IconPlus size={18} stroke={1.75} aria-hidden />
        </button>
      </div>
    </div>
  );
}

function SideWorkModal({
  card,
  onClosed,
}: {
  card: SideWorkCard;
  /** Called once the exit transition has finished and the modal can unmount. */
  onClosed: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const closingRef = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setVisible(false);
    window.setTimeout(onClosed, MODAL_TRANSITION_MS);
  }, [onClosed]);

  // Fade/scale in on the frame after mount so the transition runs.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Lock background scroll, compensating for the scrollbar to avoid layout shift.
  useEffect(() => {
    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, []);

  // Focus management: move focus in on open, trap Tab, restore on unmount.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !panelRef.current?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panelRef.current?.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [requestClose]);

  const isGallery =
    card.media.length > 0 && card.media.every((media) => media.kind === "image");
  const isFrameless = card.modalStyle === "frameless";

  return createPortal(
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-[16px] py-[24px] backdrop-blur-[6px] transition-opacity duration-[250ms] motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionTimingFunction: "var(--ui-ease-out)" }}
    >
      {isGallery ? (
        <GalleryPanel
          card={card}
          visible={visible}
          panelRef={panelRef}
          onRequestClose={requestClose}
        />
      ) : isFrameless ? (
        // The design has its own bg and fills the frame — the modal is the
        // design itself, no panel around it.
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={card.title}
          tabIndex={-1}
          className={`relative w-full max-w-[1000px] overflow-hidden rounded-[32px] shadow-[0_24px_64px_rgba(0,0,0,0.2)] outline-none transition-[opacity,transform] duration-[250ms] motion-reduce:transition-none ${
            visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          style={{
            transitionTimingFunction: "var(--ui-ease-out)",
            maxWidth: `min(1000px, calc((100dvh - 48px) * ${
              (card.nativeWidth ?? 840) / (card.nativeHeight ?? 553)
            }))`,
          }}
        >
          <SideWorkCover card={card} borderless />
          <ModalCloseButton onClick={requestClose} />
        </div>
      ) : (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={card.title}
          tabIndex={-1}
          className={`relative w-full max-w-[1000px] max-h-[calc(100dvh-48px)] overflow-y-auto rounded-[32px] bg-[var(--background)] p-[16px] pb-[20px] shadow-[0_24px_64px_rgba(0,0,0,0.2)] transition-[opacity,transform] duration-[250ms] motion-reduce:transition-none sm:p-[24px] sm:pb-[28px] ${
            visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          style={{ transitionTimingFunction: "var(--ui-ease-out)" }}
        >
          <SideWorkCover card={card} borderless />
          <ModalCloseButton onClick={requestClose} />
        </div>
      )}
    </div>,
    document.body,
  );
}

export default function SideWork() {
  const [activeCard, setActiveCard] = useState<SideWorkCard | null>(null);

  return (
    <section
      id="side-work"
      className="mx-auto w-full max-w-[900px] fluid-px pt-[40px] pb-[60px]"
    >
      <h2 className="mb-[40px] font-sans text-[32px] font-semibold leading-[40px] tracking-[0.32px] text-[var(--text-primary)]">
        Side work
      </h2>
      <div className="flex flex-col gap-[70px]">
        {sideWorkCards.map((card) => (
          <article key={card.id} className="flex flex-col gap-[16px]">
            <button
              type="button"
              onClick={() => setActiveCard(card)}
              aria-haspopup="dialog"
              aria-label={`Expand ${card.title}`}
              data-tooltip="See concept"
              className="flex cursor-pointer flex-col gap-[16px] text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-focus-ring)] focus-visible:ring-offset-4 rounded-[32px]"
            >
              <SideWorkCover card={card} />
              <h3
                className="font-sans text-[24px] font-medium leading-[32px] text-[#383232]"
                style={{
                  fontFamily:
                    "var(--font-inter-display), -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                {card.title}
              </h3>
            </button>
          </article>
        ))}
      </div>
      {activeCard && (
        <SideWorkModal card={activeCard} onClosed={() => setActiveCard(null)} />
      )}
    </section>
  );
}
