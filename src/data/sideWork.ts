export type SideWorkMedia = {
  kind: "image" | "video";
  src: string;
  /** Position & size in the cover's native 840×553 coordinate space. */
  x: number;
  y: number;
  width: number;
  height: number;
  /** Corner radius in px, omitted = square corners. */
  rounded?: number;
};

export type SideWorkCard = {
  id: string;
  title: string;
  /** Complete Tailwind class literal so Tailwind v4 can see it at build time. */
  coverBgClass: string;
  /** Optional border classes applied on the home page cover only. */
  coverBorderClass?: string;
  /**
   * How the expanded modal frames the cover. "frameless" — the design has
   * its own colored bg filling the frame, so the modal is the design itself.
   * "framed" (default) — the design sits on a white modal panel (right when
   * the content's own bg is white or absent). Image-only cards ignore this
   * and always open as a zoomable gallery on the cover bg.
   */
  modalStyle?: "framed" | "frameless";
  /** Cover frame size in px. Defaults to 840×553 when omitted. */
  nativeWidth?: number;
  nativeHeight?: number;
  media: SideWorkMedia[];
};

export const sideWorkCards: SideWorkCard[] = [
  {
    id: "finance-concept",
    title: "Finance mobile app concept",
    coverBgClass: "bg-[#f1f1f1]",
    media: [
      { kind: "image", src: "/home/side-work/finance-1.png", x: 34, y: 88, width: 185, height: 383 },
      { kind: "image", src: "/home/side-work/finance-2.png", x: 230, y: 88, width: 185, height: 383 },
      { kind: "image", src: "/home/side-work/finance-3.png", x: 425, y: 88, width: 185, height: 383 },
      { kind: "image", src: "/home/side-work/finance-4.png", x: 620, y: 88, width: 185, height: 383 },
    ],
  },
  {
    id: "vinyl-animation",
    title: "Vinyl playing animation",
    coverBgClass: "bg-[var(--background)]",
    coverBorderClass: "border border-[#ececec]",
    media: [
      {
        kind: "video",
        src: "/playground/vinyl_plate_animation.mp4",
        x: 208.5,
        y: 65,
        width: 423,
        height: 423,
        rounded: 16,
      },
    ],
  },
  {
    id: "movie-diary",
    title: "Movie diary app",
    coverBgClass: "bg-[#ececec]",
    modalStyle: "frameless",
    nativeWidth: 2336,
    nativeHeight: 1752,
    media: [
      {
        kind: "video",
        src: "/home/side-work/movie_diary_app.mp4",
        x: 0,
        y: 0,
        width: 2336,
        height: 1752,
      },
    ],
  },
];
