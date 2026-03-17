"use client";

import { useRef } from "react";
import { FadeInScroll } from "./FadeInScroll";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

const team: TeamMember[] = [
  {
    id: 1,
    name: "Nicolás Freire",
    role: "Director Ejecutivo",
    image: "/assets/nicolas freire.jpeg",
  },
  {
    id: 2,
    name: "Bartolomé Reus",
    role: "Jefe de Comunicaciones",
    image: "/assets/bartolome reus.jpeg",
  },
  {
    id: 3,
    name: "José Francisco Aravena",
    role: "Coordinador de Equipo",
    image: "/assets/Jose Francisco Aravena .jpg",
  },
  {
    id: 4,
    name: "Arantzasu Foppiano",
    role: "Investigador",
    image: "/assets/Arantzasu Foppiano.jpg",
  },
  {
    id: 5,
    name: "Francisco Oyarce",
    role: "Investigador",
    image: "/assets/Fransisco oyarce.jpg",
  },
  {
    id: 6,
    name: "Nicolás Germain",
    role: "Investigador",
    image: "/assets/Nicolas Germain.jpeg",
  },
  {
    id: 7,
    name: "Tomás Domínguez",
    role: "Investigador",
    image: "/assets/Tomas Dominguez.jpg",
  },
];

export default function TeamCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 320 : -320,
      behavior: "smooth",
    });
  };

  return (
    <section id="team" className="bg-[#880E4F] py-24 px-6 overflow-hidden">
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
          className="flex gap-5 overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory pb-2"
        >
          {team.map((member, i) => (
            <FadeInScroll
              key={member.id}
              delay={i * 0.1}
              className="snap-start shrink-0 w-[260px] md:w-[290px] group cursor-pointer"
            >
              <div
                className="w-full aspect-square mb-5 relative overflow-hidden bg-black/20"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="serif text-lg font-bold text-[#F5F5F5] leading-tight">
                {member.name}
              </h3>
              <p className="text-[#F48FB1] text-xs tracking-[0.2em] uppercase mt-1">
                {member.role}
              </p>
            </FadeInScroll>
          ))}
        </div>

        <p className="text-[#F5F5F5]/25 text-xs tracking-widest uppercase text-center mt-6 md:hidden">
          Desliza para ver más →
        </p>
      </div>
    </section>
  );
}
