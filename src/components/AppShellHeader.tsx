"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";

function Orchid() {
  return (
    <div className="relative h-[94px] w-[92px] shrink-0 overflow-hidden">
      <Image
        src="/orchid/2.webp"
        alt=""
        fill
        sizes="92px"
        className="object-cover object-center"
        priority
      />
    </div>
  );
}

export default function AppShellHeader() {
  const pathname = usePathname();

  if (pathname.startsWith("/projects/")) {
    return null;
  }

  return <Header leftContent={pathname === "/" ? <Orchid /> : undefined} />;
}
