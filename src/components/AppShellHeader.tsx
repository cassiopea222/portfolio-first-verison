"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function AppShellHeader() {
  const pathname = usePathname();

  if (pathname.startsWith("/projects/")) {
    return null;
  }

  return <Header />;
}
