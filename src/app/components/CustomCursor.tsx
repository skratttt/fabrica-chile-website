"use client";

import { useEffect, useRef } from "react";

const GEAR_PATH =
  "M22.9,10.7 L22.9,13.3 L19.3,13.6 L18.3,16.0 L20.7,18.8 L18.8,20.7 L16.0,18.3 L13.6,19.3 L13.3,22.9 L10.7,22.9 L10.4,19.3 L8.0,18.3 L5.2,20.7 L3.3,18.8 L5.7,16.0 L4.7,13.6 L1.1,13.3 L1.1,10.7 L4.7,10.4 L5.7,8.0 L3.3,5.2 L5.2,3.3 L8.0,5.7 L10.4,4.7 L10.7,1.1 L13.3,1.1 L13.6,4.7 L16.0,5.7 L18.8,3.3 L20.7,5.2 L18.3,8.0 L19.3,10.4 Z";

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = ref.current;
    if (!el) return;

    document.documentElement.classList.add("custom-cursor-active");
    el.style.display = "block";

    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    const onEnter = () => {
      el.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed z-[9999] pointer-events-none"
      style={{
        display: "none",
        transform: "translate(-10px, -10px)",
        opacity: 0,
        transition: "opacity 0.2s",
        willChange: "left, top",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="gear-spin"
      >
        <path d={GEAR_PATH} fill="none" stroke="#1d1d1f" strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" fill="none" stroke="#1d1d1f" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
