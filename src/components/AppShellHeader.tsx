"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";

function Orchid() {
  return (
    <div className="relative h-[61px] w-[60px] shrink-0 overflow-hidden">
      <Image
        src="/orchid/2.webp"
        alt=""
        fill
        sizes="60px"
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

  return <Header leftContent={<Orchid />} />;
}
