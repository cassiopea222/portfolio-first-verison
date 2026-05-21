"use client";

import { useEffect, useRef, useState } from "react";
import LoadingScreen from "./LoadingScreen";

const MIN_DISPLAY_MS = 1500;
const FADE_MS = 400;

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);
  const startRef = useRef(Date.now());

  useEffect(() => {
    function hide() {
      const elapsed = Date.now() - startRef.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

      setTimeout(() => {
        setVisible(false);
        setTimeout(() => setMounted(false), FADE_MS);
      }, remaining);
    }

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
      return () => window.removeEventListener("load", hide);
    }
  }, []);

  return (
    <>
      {mounted && <LoadingScreen visible={visible} />}
      {children}
    </>
  );
}
