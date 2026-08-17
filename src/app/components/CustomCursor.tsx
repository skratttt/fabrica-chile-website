"use client";

import { useEffect, useRef } from "react";

const GEAR_PATH =
  "M22.9,10.5 L22.9,13.5 L18.8,13.5 L17.9,15.8 L20.8,18.6 L18.6,20.8 L15.8,17.9 L13.5,18.8 L13.5,22.9 L10.5,22.9 L10.5,18.8 L8.2,17.9 L5.4,20.8 L3.2,18.6 L6.1,15.8 L5.2,13.5 L1.1,13.5 L1.1,10.5 L5.2,10.5 L6.1,8.2 L3.2,5.4 L5.4,3.2 L8.2,6.1 L10.5,5.2 L10.5,1.1 L13.5,1.1 L13.5,5.2 L15.8,6.1 L18.6,3.2 L20.8,5.4 L17.9,8.2 L18.8,10.5 Z";

const GEAR_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='${GEAR_PATH}' fill='black'/></svg>`
)}")`;

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
      <div className="gear-spin" style={{ width: 20, height: 20, position: "relative" }}>
        {/* Glass layer: blurred background clipped to gear shape */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(8px) saturate(180%) brightness(1.1)",
            WebkitBackdropFilter: "blur(8px) saturate(180%) brightness(1.1)",
            background: "rgba(255,255,255,0.25)",
            maskImage: GEAR_MASK,
            WebkitMaskImage: GEAR_MASK,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
        {/* Stroke overlay for the glass border highlight */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          style={{ position: "absolute", inset: 0 }}
        >
          <path
            d={GEAR_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="12"
            r="3"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.8"
          />
        </svg>
      </div>
    </div>
  );
}
