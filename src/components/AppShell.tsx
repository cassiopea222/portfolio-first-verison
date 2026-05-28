"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import { LOADING_FADE_MS } from "./loading-constants";

const MIN_DISPLAY_MS = 1500;

export default function AppShell({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);
  const startRef = useRef(0);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    startRef.current = Date.now();

    function hide() {
      const elapsed = Date.now() - startRef.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      t1 = setTimeout(() => {
        setVisible(false);
        t2 = setTimeout(() => setMounted(false), LOADING_FADE_MS);
      }, remaining);
    }

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("load", hide);
    };
  }, []);

  return (
    <>
      {mounted && <LoadingScreen visible={visible} />}
      {children}
    </>
  );
}
