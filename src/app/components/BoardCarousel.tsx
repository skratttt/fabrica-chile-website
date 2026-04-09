"use client";

import { useRef, useEffect } from "react";
import { FadeInScroll } from "./FadeInScroll";

interface BoardMember {
    id: number;
    name: string;
    role: string;
    image: string;
}

// Empty placeholders to be filled later
const boardMembers: BoardMember[] = [
    {
        id: 1,
        name: "Nicolás Freire",
        role: "Director Ejecutivo",
        image: "/assets/nicolas freire.jpeg",
    },
    {
        id: 2,
        name: "Juan Carlos Úrzua",
        role: "Presidente del directorio",
        image: "/assets/juan carlos urzua.jpeg",
    },
    {
        id: 3,
        name: "Próximamente",
        role: "Próximamente",
        image: "",
    },
    {
        id: 4,
        name: "Próximamente",
        role: "Próximamente",
        image: "",
    },
];

export default function BoardCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isHovered = useRef(false);
    const offsetRef = useRef(0);

    useEffect(() => {
        let animationFrameId: number;
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

    let lastTime = 0;
    const SPEED = Math.max(35, window.innerWidth * 0.04); // ~35px/s mobile, ~77px/s 1920p, scales with viewport

    const scrollStep = (timestamp: number) => {
      if (!isHovered.current) {
        const delta = lastTime ? (timestamp - lastTime) / 1000 : 0;
        const halfWidth = scrollContainer.scrollWidth / 2;
        if (halfWidth > 0) {
          offsetRef.current += SPEED * delta;
          if (offsetRef.current >= halfWidth) offsetRef.current -= halfWidth;
          scrollContainer.style.transform = `translateX(-${offsetRef.current}px)`;
        }
      }
      lastTime = timestamp;
      animationFrameId = window.requestAnimationFrame(scrollStep);
    };

    animationFrameId = window.requestAnimationFrame(scrollStep);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, []);

  const scroll = (dir: "left" | "right") => {
    offsetRef.current += dir === "right" ? 320 : -320;
  };

  return (
    <section id="board" className="bg-[#F5F5F5] py-24 px-6 overflow-hidden border-t border-[#424242]/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <FadeInScroll>
            <div>
              <p className="text-[#D81B60] text-xs tracking-[0.3em] uppercase font-medium mb-2">
                Directorio
              </p>
              <h2 className="serif text-4xl font-bold text-[#424242]">
                Equipo Directivo
              </h2>
            </div>
          </FadeInScroll>
          <FadeInScroll delay={0.2} direction="left">
            <div className="flex gap-3">
              <button
                onClick={() => scroll("left")}
                aria-label="Anterior"
                className="w-11 h-11 border border-[#424242]/20 text-[#424242]/60 flex items-center justify-center hover:border-[#D81B60] hover:text-[#D81B60] transition-all duration-200"
              >
                ←
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Siguiente"
                className="w-11 h-11 border border-[#424242]/20 text-[#424242]/60 flex items-center justify-center hover:border-[#D81B60] hover:text-[#D81B60] transition-all duration-200"
              >
                →
              </button>
            </div>
          </FadeInScroll>
        </div>

        <div className="overflow-hidden">
        <div
          ref={scrollRef}
          onMouseEnter={() => (isHovered.current = true)}
          onMouseLeave={() => (isHovered.current = false)}
          className="flex flex-nowrap gap-5 pb-2"
          style={{ willChange: "transform" }}
        >
          {[...boardMembers, ...boardMembers].map((member, i) => (
            <FadeInScroll
              key={`${member.id}-${i}`}
              delay={(i % boardMembers.length) * 0.1}
              className="shrink-0 w-[260px] md:w-[290px] group cursor-pointer"
            >
              <div
                className="w-full aspect-square mb-5 relative overflow-hidden bg-[#424242]/5 border border-[#424242]/10"
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#424242]/30 text-xs tracking-[0.2em] uppercase">
                    Próximamente
                  </div>
                )}
              </div>
              <h3 className="serif text-lg font-bold text-[#424242] leading-tight">
                {member.name}
              </h3>
              <p className="text-[#D81B60] text-xs tracking-[0.2em] uppercase mt-1">
                {member.role}
              </p>
            </FadeInScroll>
          ))}
        </div>
        </div>

                <p className="text-[#424242]/25 text-xs tracking-widest uppercase text-center mt-6 md:hidden">
                    Desliza para ver más →
                </p>
            </div>
        </section>
    );
}
