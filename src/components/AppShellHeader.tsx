"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import OrchidAnimation from "@/components/OrchidAnimation";

export default function AppShellHeader() {
  const pathname = usePathname();

  if (pathname.startsWith("/projects/")) {
    return null;
  }

  return <Header leftContent={<OrchidAnimation size={60} initialFrame={1} />} />;
}
