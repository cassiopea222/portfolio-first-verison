"use client";

import { useEffect, useRef, useState } from "react";

type TooltipState = {
  /** The original tooltip label (from data-tooltip attribute). */
  text: string;
  /** What's actually displayed — may differ temporarily (e.g. "Copied"). */
  displayText: string;
  x: number;
  y: number;
  visible: boolean;
};

/**
 * Mounts a single floating pill that acts as a custom cursor replacement:
 * its centre sits exactly at the mouse hotspot and it appears/disappears
 * with a 150ms fade + scale transition.
 *
 * Special behaviour:
 *  - Clicking the Email link (data-tooltip="Copy email") copies the address
 *    to clipboard and briefly shows "Copied" for 2 s.
 *  - On touch devices the tooltip is suppressed entirely.
 */
export default function TooltipProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<TooltipState>({
    text: "",
    displayText: "",
    x: 0,
    y: 0,
    visible: false,
  });

  const currentElRef = useRef<Element | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTouchRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const touchMql = window.matchMedia("(pointer: coarse)");

    const updateMatches = () => {
      isTouchRef.current = touchMql.matches;
      if (isTouchRef.current) {
        currentElRef.current = null;
        setState((prev) => (prev.visible ? { ...prev, visible: false } : prev));
      }
    };
    updateMatches();
    touchMql.addEventListener("change", updateMatches);

    // Position updates are instant — no lerp, no transition on left/top.
    const handleMouseMove = (e: MouseEvent) => {
      setState((prev) =>
        prev.visible ? { ...prev, x: e.clientX, y: e.clientY } : prev,
      );
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (isTouchRef.current) return;

      const target = (e.target as Element).closest("[data-tooltip]");
      if (target) {
        if (target !== currentElRef.current) {
          currentElRef.current = target;
          const text = target.getAttribute("data-tooltip") ?? "";
          setState({ text, displayText: text, x: e.clientX, y: e.clientY, visible: true });
        } else {
          setState((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
        }
      } else {
        currentElRef.current = null;
        setState((prev) => ({ ...prev, visible: false }));
      }
    };

    // Email: copy to clipboard on click.
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest("[data-tooltip]");
      if (!target) return;
      if (target.getAttribute("data-tooltip") !== "Copy") return;

      e.preventDefault();
      const email =
        ((target as HTMLAnchorElement).href ?? "").replace("mailto:", "") ||
        "ubulyndina@gmail.com";
      navigator.clipboard.writeText(email).catch(() => {});

      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      setState((prev) => ({ ...prev, displayText: "Copied" }));
      resetTimerRef.current = setTimeout(() => {
        setState((prev) => ({ ...prev, displayText: prev.text }));
      }, 2000);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("click", handleClick, true);
      touchMql.removeEventListener("change", updateMatches);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  return (
    <>
      {children}
      {/*
        Pill is centred exactly on the cursor hotspot via translate(-50%, -50%).
        Scale animates 0.9 → 1 on appear.
        pointer-events: none so it never blocks clicks or hover events.
      */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: state.x,
          top: state.y,
          transform: `translate(-50%, -50%) scale(${state.visible ? 1 : 0.9})`,
          transformOrigin: "center center",
          opacity: state.visible ? 1 : 0,
          transition: "opacity 150ms ease-out, transform 150ms ease-out",
          pointerEvents: "none",
          zIndex: 9999,
          background: "#2a2a2a",
          borderRadius: "6px",
          padding: "4px 6px",
          boxShadow: "0px 2px 3px 0px rgba(0,0,0,0.06)",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "16px",
          color: "#ffffff",
          fontFamily: "var(--font-inconsolata, Inconsolata), sans-serif",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        {state.displayText}
      </div>
    </>
  );
}
