export type SideWorkVideoItem = {
  id: string;
  kind: "video";
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type SideWorkImageItem = {
  id: string;
  kind: "image";
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type SideWorkIpodCompositionItem = {
  id: string;
  kind: "ipodComposition";
  ipodSrc: string;
  playerSrc: string;
  width: number;
  height: number;
  alt: string;
};

export type SideWorkItem =
  | SideWorkVideoItem
  | SideWorkImageItem
  | SideWorkIpodCompositionItem;

export const sideWorkItems: SideWorkItem[] = [
  {
    id: "vinyl-animation",
    kind: "video",
    src: "/playground/vinyl_plate_animation.mp4",
    width: 360,
    height: 360,
    alt: "Vinyl plate animation",
  },
  {
    id: "concept-animation",
    kind: "video",
    src: "/playground/concept_animation.mp4",
    width: 480,
    height: 360,
    alt: "Concept animation",
  },
  {
    id: "device-1",
    kind: "image",
    src: "/side-work/device-1.png",
    width: 150,
    height: 360,
    alt: "Device mockup 1",
  },
  {
    id: "device-2",
    kind: "image",
    src: "/side-work/device-2.png",
    width: 150,
    height: 360,
    alt: "Device mockup 2",
  },
  {
    id: "device-3",
    kind: "image",
    src: "/side-work/device-3.png",
    width: 150,
    height: 360,
    alt: "Device mockup 3",
  },
  {
    id: "device-4",
    kind: "image",
    src: "/side-work/device-4.png",
    width: 150,
    height: 360,
    alt: "Device mockup 4",
  },
  {
    id: "lorde-ipod",
    kind: "ipodComposition",
    ipodSrc: "/playground/lorde%20ipod.png",
    playerSrc: "/playground/player%20lorde.png",
    width: 420,
    height: 360,
    alt: "Lorde iPod concept with player overlay",
  },
];
