"use client";

import { useCallback, useState } from "react";
import Image from "next/image";

const imgFolderBack = "/home/intro/folder-back.svg";
const imgCoverPhoto = "/home/intro/cover-photo.png";
const imgCoverDashboard = "/home/intro/cover-dashboard.png";
const imgPhoneBg = "/home/intro/phone-bg.png";
const imgPhoneLeft = "/home/intro/phone-1.png";
const imgPhoneRight = "/home/intro/phone-2.png";

/*
 * The whole composition is authored at the Figma reference size (64px headline)
 * and every dimension is expressed in em, so the section scales fluidly with
 * the container-query-driven font size on the headline.
 */
const em = (px: number) => `${+(px / 64).toFixed(4)}em`;

/*
 * The folder/tag, cover, heart and phone geometry below is still written in the
 * original 74px-reference pixel values; each visual was scaled down by its own
 * factor in the updated design (node 708:444787), applied via these helpers.
 */
const fem = (px: number) => em(px * 0.8889); // folder + tags: 95.9 / 107.888
const cem = (px: number) => em(px * 0.9247); // cover: 129.46 / 140
const hem = (px: number) => em(px * 0.8852); // heart: 55.77 / 63
const pem = (px: number) => em(px * 0.9175); // phone: 121.46 / 132.375

type Tag = {
  label: string;
  /** Bounding box + rotation while tucked inside the folder (relative to the folder box). */
  rest: { left: number; top: number; w: number; h: number; rot: number };
  /** Translation delta + rotation once pulled out above the folder. */
  out: { dx: number; dy: number; rot: number };
  pill: string;
  text: string;
};

const TAGS: Tag[] = [
  {
    label: "financial",
    rest: { left: 44.59, top: -26.83, w: 72.07, h: 99.04, rot: -62.03 },
    out: { dx: 55.65, dy: -51.67, rot: 3.77 },
    pill: "linear-gradient(-68.5deg, #ffd4c4 10.837%, #fff1b2 88.057%)",
    text: "linear-gradient(95.4deg, #d9b735 4.71%, #eb815b 95.39%)",
  },
  {
    label: "social",
    rest: { left: 40.25, top: -12.41, w: 68.08, h: 77.85, rot: -54.22 },
    out: { dx: -31.22, dy: -101.03, rot: -2.11 },
    pill: "linear-gradient(-73.12deg, #ffedc6 10.837%, #ffc4d8 88.057%)",
    text: "linear-gradient(93.68deg, #ff7ba2 4.71%, #efaf60 95.39%)",
  },
  {
    label: "government",
    rest: { left: -3.23, top: -27.76, w: 113.48, h: 107.7, rot: 42.54 },
    out: { dx: -56.56, dy: -43.08, rot: -4.78 },
    pill: "linear-gradient(-62.65deg, #d9f6c6 10.837%, #f6d7ff 88.057%)",
    text: "linear-gradient(97.72deg, #c67dd3 4.71%, #83c856 95.39%)",
  },
  {
    label: "web",
    rest: { left: 39.69, top: -15.65, w: 38.87, h: 65.45, rot: 82.15 },
    out: { dx: -104.28, dy: -86.46, rot: -6.69 },
    pill: "linear-gradient(-75.55deg, #e5deff 10.837%, #b7d8ff 88.057%)",
    text: "linear-gradient(92.74deg, #448ee2 4.71%, #a18cff 95.39%)",
  },
  {
    label: "mobile",
    rest: { left: 12.86, top: -21.24, w: 62.8, h: 87.1, rot: 64.64 },
    out: { dx: 97.76, dy: -94.03, rot: -3.62 },
    pill: "linear-gradient(-71.41deg, #f5f7bf 10.837%, #b6ffc9 88.057%)",
    text: "linear-gradient(94.31deg, #4cb17b 4.71%, #b7b346 95.39%)",
  },
];

/** Pulled-out tags render ~15% larger in the design (20.56px vs 17.888px labels). */
const TAG_OUT_SCALE = 1.149;

/*
 * How far the pulled-out cluster spreads: each tag's landing spot is pushed
 * away from the cluster's center by this factor, so the gaps between pills
 * grow while the arrangement keeps its shape.
 */
const OUT_SPREAD = 1.12;

const outCenterOf = (tag: Tag) => ({
  x: tag.rest.left + tag.rest.w / 2 + tag.out.dx,
  y: tag.rest.top + tag.rest.h / 2 + tag.out.dy,
});

const OUT_CENTROID = TAGS.reduce(
  (acc, tag) => {
    const c = outCenterOf(tag);
    return { x: acc.x + c.x / TAGS.length, y: acc.y + c.y / TAGS.length };
  },
  { x: 0, y: 0 },
);

/** Out-state translation delta with the spread applied. */
const spreadDelta = (tag: Tag) => {
  const c = outCenterOf(tag);
  return {
    dx: tag.out.dx + (c.x - OUT_CENTROID.x) * (OUT_SPREAD - 1),
    dy: tag.out.dy + (c.y - OUT_CENTROID.y) * (OUT_SPREAD - 1),
  };
};

function FolderWithTags() {
  const [open, setOpen] = useState(false);

  const toggleOnTouch = useCallback(() => {
    // Hover handles pointer devices; click is the affordance for touch.
    if (!window.matchMedia("(hover: hover)").matches) {
      setOpen((v) => !v);
    }
  }, []);

  return (
    <button
      type="button"
      aria-label="Peek inside the project folder"
      aria-expanded={open}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={toggleOnTouch}
      className="relative inline-block shrink-0 cursor-pointer border-0 bg-transparent p-0"
      style={{ width: fem(107.888), height: fem(90) }}
    >
      {/* Folder back */}
      <span
        className="absolute left-0 z-[1]"
        style={{ top: fem(7.83), width: fem(107.888), height: fem(66.073) }}
      >
        <Image src={imgFolderBack} alt="" fill sizes="120px" className="object-fill" />
      </span>

      {/* Tags — tucked between the folder's back and front flap */}
      {TAGS.map((tag, i) => {
        const delay = open ? i * 45 : (TAGS.length - 1 - i) * 30;
        const transition = open
          ? `transform 550ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`
          : `transform 400ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`;
        const out = spreadDelta(tag);
        return (
          <span
            key={tag.label}
            aria-hidden="true"
            className="pointer-events-none absolute z-[2] flex items-center justify-center motion-reduce:transition-none!"
            style={{
              left: fem(tag.rest.left),
              top: fem(tag.rest.top),
              width: fem(tag.rest.w),
              height: fem(tag.rest.h),
              transform: open ? `translate(${fem(out.dx)}, ${fem(out.dy)})` : "translate(0, 0)",
              transition,
            }}
          >
            <span
              className="flex items-center justify-center whitespace-nowrap border-solid border-white motion-reduce:transition-none!"
              style={{
                transform: `rotate(${open ? tag.out.rot : tag.rest.rot}deg) scale(${open ? TAG_OUT_SCALE : 1})`,
                transition,
                borderWidth: fem(2.236),
                borderRadius: fem(22.36),
                padding: `${fem(3.354)} ${fem(13.416)}`,
                backgroundImage: tag.pill,
                boxShadow: `0 ${fem(0.559)} ${fem(1.118)} ${fem(1.118)} rgba(14, 14, 14, 0.1)`,
              }}
            >
              <span
                className="bg-clip-text font-semibold text-transparent"
                style={{
                  fontSize: fem(17.888),
                  lineHeight: 23.478 / 17.888,
                  backgroundImage: tag.text,
                }}
              >
                {tag.label}
              </span>
            </span>
          </span>
        );
      })}

      {/* Folder front flap */}
      <span
        className="absolute bottom-0 left-0 z-[3] bg-[#6cb1fa]"
        style={{ width: fem(107.888), height: fem(65.255), borderRadius: fem(8.944) }}
      />
    </button>
  );
}

function CoverVisual() {
  return (
    <span
      className="relative inline-block shrink-0 overflow-hidden bg-[#ededed] transition-transform duration-200 ease-out hover:scale-110 motion-reduce:transition-none"
      style={{ width: cem(140), height: cem(93), borderRadius: cem(12) }}
    >
      <span
        className="absolute blur-[1px]"
        style={{ left: cem(-92.43), top: cem(-26.95), width: cem(346.567), height: cem(227.186) }}
      >
        <Image src={imgCoverPhoto} alt="" fill sizes="380px" className="object-cover" />
      </span>
      <span
        className="absolute overflow-hidden"
        style={{
          left: `calc(50% + ${cem(20.01)})`,
          top: `calc(50% + ${cem(19.74)})`,
          width: cem(158),
          height: cem(112.328),
          transform: "translate(-50%, -50%)",
          borderRadius: cem(4.488),
        }}
      >
        <Image src={imgCoverDashboard} alt="" fill sizes="170px" className="object-cover" />
      </span>
    </span>
  );
}

function HeartVisual() {
  return (
    <span
      className="relative inline-block shrink-0 transition-transform duration-200 ease-out hover:scale-110 motion-reduce:transition-none"
      style={{ width: hem(63), height: hem(61) }}
    >
      <svg
        viewBox="0 0 63.635 57.434"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute overflow-visible"
        style={{ left: hem(3.5), top: hem(6.5), width: hem(55.009), height: hem(48.368) }}
      >
        <path
          d="M38.4319 7.35893C58.8218 -4.29178 72.6911 33.726 34.7728 50.9585C33.8301 51.3869 32.8561 51.9513 31.821 51.9218C30.6667 51.8889 28.8921 51.4408 26.4376 50.0248"
          stroke="#FF6868"
          strokeWidth="10"
        />
        <path
          d="M30.4338 51.785C-9.28508 34.8759 4.6755 -3.661 24.1417 6.7598C31.6565 11.6783 40.12 27.2703 3.62477 53.3672"
          stroke="#FF6868"
          strokeWidth="10"
        />
      </svg>
    </span>
  );
}

function PhoneVisual() {
  return (
    <span
      className="relative inline-block shrink-0 overflow-hidden bg-white transition-transform duration-200 ease-out hover:scale-110 motion-reduce:transition-none"
      style={{ width: pem(132.375), height: pem(93.728), borderRadius: pem(12) }}
    >
      <span
        className="absolute"
        style={{
          left: `calc(50% - ${pem(1.5)})`,
          top: `calc(50% + ${pem(23.5)})`,
          width: pem(281),
          height: pem(499),
          transform: "translate(-50%, -50%) rotate(-90deg)",
        }}
      >
        <Image src={imgPhoneBg} alt="" fill sizes="550px" className="object-cover" />
      </span>
      <span
        className="absolute"
        style={{ left: pem(25.54), top: pem(6.25), width: pem(39.243), height: pem(81.222) }}
      >
        <Image src={imgPhoneLeft} alt="" fill sizes="60px" className="object-cover" />
      </span>
      <span
        className="absolute"
        style={{ left: pem(67.58), top: pem(6.25), width: pem(39.243), height: pem(81.222) }}
      >
        <Image src={imgPhoneRight} alt="" fill sizes="60px" className="object-cover" />
      </span>
    </span>
  );
}

export default function IntroSection() {
  return (
    <section
      className="mx-auto flex w-full flex-col justify-center fluid-px pt-[100px] pb-[120px]"
      style={{ minHeight: "calc(100dvh - var(--header-height, 0px))" }}
    >
      <div style={{ containerType: "inline-size" }}>
        <h1
          className="hero-enter-heading flex flex-col items-center font-semibold text-[var(--text-primary)]"
          style={{
            /* 7.2cqw: the widest line (cover + "interfaces people ♥ love,")
               measures ~13.82em in Inter Display, so the headline fills ~99%
               of the container at any width and caps at 60px on wide screens. */
            fontFamily: "var(--font-inter-display), -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: "min(60px, 7.2cqw)",
            lineHeight: 64 / 60,
            letterSpacing: "0.01em",
            gap: em(4),
          }}
        >
          <span className="flex items-end whitespace-nowrap" style={{ gap: em(24) }}>
            <span>Julia designs</span>
            <FolderWithTags />
            <span>products,</span>
          </span>
          <span className="whitespace-nowrap">translates business logic into</span>
          <span className="flex items-center whitespace-nowrap" style={{ gap: em(24) }}>
            <CoverVisual />
            <span className="flex items-center" style={{ gap: em(12) }}>
              <span>interfaces people</span>
              <HeartVisual />
              <span>love,</span>
            </span>
          </span>
          <span className="flex items-center whitespace-nowrap" style={{ gap: em(24) }}>
            <span>and builds for fun.</span>
            <PhoneVisual />
          </span>
        </h1>
      </div>
    </section>
  );
}
