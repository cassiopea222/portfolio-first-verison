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

export const playgroundItems: PlaygroundItem[] = [];
