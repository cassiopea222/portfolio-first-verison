"use client";

import dynamic from "next/dynamic";

const HeroFlowAround = dynamic(
  () => import("@/components/HeroFlowAround").then((m) => m.default),
  { ssr: false },
);

export default function Hero() {
  return <HeroFlowAround />;
}
