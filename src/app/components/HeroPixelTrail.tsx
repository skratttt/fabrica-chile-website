"use client";

import { PixelTrail } from "@/components/ui/pixel-trail";
import { useScreenSize } from "@/components/hooks/use-screen-size";

/* Circle trail layer for the burgundy page headers (home hero,
   servicios, sobre-nosotros, contacto). */
export default function HeroPixelTrail() {
  const screenSize = useScreenSize();

  return (
    <div className="absolute inset-0 z-0">
      <PixelTrail
        pixelSize={screenSize.lessThan("md") ? 48 : 64}
        fadeDuration={700}
        delay={300}
        pixelClassName="rounded-full bg-[#D81B60]/40"
      />
    </div>
  );
}
