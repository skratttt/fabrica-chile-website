"use client";

import { useRef, useEffect, useState } from "react";
import { FadeInScroll } from "./FadeInScroll";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

const team: TeamMember[] = [
  {
    id: 1,
    name: "José Francisco Aravena",
    role: "Coordinador de Equipo",
    image: "/assets/Jose Francisco Aravena .jpg",
    bio: "Texto sobre José Francisco aquí.",
  },
  {
    id: 2,
    name: "Arantzasu Foppiano",
    role: "Investigador",
    image: "/assets/Arantzasu Foppiano.jpg",
    bio: "Abogada con experiencia en asesoría legal y comunicación estratégica. En Fábrica Chile se desempeña como investigadora, aportando desde el análisis y la generación de contenido.",
  },
  {
    id: 3,
    name: "Bartolomé Reus",
    role: "Comunicaciones",
    image: "/assets/bartolome reus.jpeg",
    bio: "Texto sobre Bartolomé aquí.",
  },
  {
    id: 4,
    name: "Francisco Oyarce",
    role: "Investigador",
    image: "/assets/Fransisco oyarce.jpg",
    bio: "Texto sobre Francisco aquí.",
  },
  {
    id: 5,
    name: "Nicolás Germain",
    role: "Investigador",
    image: "/assets/Nicolas Germain.jpeg",
    bio: "Texto sobre Nicolás aquí.",
  },
  {
    id: 6,
    name: "Tomás Domínguez",
    role: "Investigador",
    image: "/assets/Tomas Dominguez.jpg",
    bio: "Texto sobre Tomás aquí.",
  },
];

export default function TeamCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const [hoveredMember, setHoveredMember] = useState<TeamMember | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = () => {
    closeTimeout.current = setTimeout(() => setHoveredMember(null), 200);
  };

  const cancelClose = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
  };

  useEffect(() => {
    let animationFrameId: number;
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollStep = () => {
      if (!isHovered.current) {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft -= scrollContainer.scrollWidth / 2;
        }
        scrollContainer.scrollLeft += 1;
      }
      animationFrameId = window.requestAnimationFrame(scrollStep);
    };

    animationFrameId = window.requestAnimationFrame(scrollStep);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 320 : -320,
      behavior: "smooth",
    });
  };

  return (
    <section id="team" className="bg-[#424242] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <FadeInScroll>
            <div>
              <p className="text-[#F48FB1] text-xs tracking-[0.3em] uppercase font-medium mb-2">
                Equipo
              </p>
              <h2 className="serif text-4xl font-bold text-[#F5F5F5]">
                Nuestro Equipo
              </h2>
            </div>
          </FadeInScroll>
          <FadeInScroll delay={0.2} direction="left">
            <div className="flex gap-3">
              <button
                onClick={() => scroll("left")}
                aria-label="Anterior"
                className="w-11 h-11 border border-[#F5F5F5]/20 text-[#F5F5F5]/60 flex items-center justify-center hover:border-[#F48FB1] hover:text-[#F48FB1] transition-all duration-200"
              >
                ←
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Siguiente"
                className="w-11 h-11 border border-[#F5F5F5]/20 text-[#F5F5F5]/60 flex items-center justify-center hover:border-[#F48FB1] hover:text-[#F48FB1] transition-all duration-200"
              >
                →
              </button>
            </div>
          </FadeInScroll>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={() => (isHovered.current = true)}
          onMouseLeave={() => (isHovered.current = false)}
          className="flex gap-5 overflow-x-auto overflow-y-hidden scrollbar-hide pb-2"
        >
          {[...team, ...team].map((member, i) => (
            <FadeInScroll
              key={`${member.id}-${i}`}
              delay={(i % team.length) * 0.1}
            >
              <div
                className="shrink-0 w-[260px] md:w-[290px] cursor-pointer group"
                onMouseEnter={() => { cancelClose(); setHoveredMember(member); }}
                onMouseLeave={scheduleClose}
              >
                <div className="w-full aspect-square mb-5 relative overflow-hidden bg-black/20">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center grayscale group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#880E4F]/0 group-hover:bg-[#880E4F]/20 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                    <span className="text-white text-[10px] tracking-[0.2em] uppercase font-medium">Ver más</span>
                  </div>
                </div>
                <h3 className="serif text-lg font-bold text-[#F5F5F5] leading-tight">
                  {member.name}
                </h3>
                <p className="text-[#F48FB1] text-xs tracking-[0.2em] uppercase mt-1">
                  {member.role}
                </p>
              </div>
            </FadeInScroll>
          ))}
        </div>

        <p className="text-[#F5F5F5]/25 text-xs tracking-widest uppercase text-center mt-6 md:hidden">
          Desliza para ver más →
        </p>
      </div>

      {/* Centered overlay */}
      {hoveredMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
          style={{
            backgroundColor: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <div
            className="flex max-w-2xl w-full bg-[#424242] overflow-hidden shadow-2xl pointer-events-auto"
            style={{ animation: "scaleIn 0.25s cubic-bezier(0.4,0,0.2,1)" }}
            onMouseEnter={cancelClose}
            onMouseLeave={() => setHoveredMember(null)}
          >
            {/* Photo */}
            <div className="w-56 md:w-72 shrink-0 aspect-square relative">
              <img
                src={hoveredMember.image}
                alt={hoveredMember.name}
                className="w-full h-full object-cover object-center grayscale"
              />
            </div>
            {/* Text */}
            <div className="flex flex-col justify-center p-8 md:p-10">
              <p className="text-[#F48FB1] text-[10px] tracking-[0.25em] uppercase font-medium mb-2">
                {hoveredMember.role}
              </p>
              <h3 className="serif text-2xl md:text-3xl font-bold text-[#F5F5F5] leading-tight mb-5">
                {hoveredMember.name}
              </h3>
              <p className="text-[#F5F5F5]/75 text-sm leading-relaxed">
                {hoveredMember.bio}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </section>
  );
}
