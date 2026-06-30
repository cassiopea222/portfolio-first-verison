export type PlaygroundItem = {
  id: string;
  type: "image" | "video" | "iframe";
  src: string;
  width: number;   // canvas display width in px
  height: number;  // canvas display height in px
  top: number;     // absolute position from canvas top
  left: number;    // absolute position from canvas left
  alt?: string;
};

export const playgroundItems: PlaygroundItem[] = [
  {
    id: "concept-animation",
    type: "video",
    src: "/playground/concept_animation.mp4",
    width: 560,
    height: 420,
    top: 120,
    left: 200,
    alt: "Concept animation",
  },
  {
    id: "vinyl-plate-animation",
    type: "video",
    src: "/playground/vinyl_plate_animation.mp4",
    width: 420,
    height: 423,
    top: 80,
    left: 860,
    alt: "Vinyl plate animation",
  },
  {
    id: "lorde-ipod",
    type: "image",
    src: "/playground/lorde%20ipod.png",
    width: 320,
    height: 496,
    top: 260,
    left: 1390,
    alt: "Lorde iPod concept",
  },
  {
    id: "player-lorde",
    type: "image",
    src: "/playground/player%20lorde.png",
    width: 237,
    height: 105,
    top: 600,
    left: 580,
    alt: "Player concept",
  },
];
