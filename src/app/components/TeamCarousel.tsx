"use client";

import { useRef } from "react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  bg: string;
}

const team: TeamMember[] = [
  {
    id: 1,
    name: "María González",
    role: "Directora Ejecutiva",
    bio: "Politóloga con 15 años de experiencia en análisis político y comunicación estratégica.",
    bg: "linear-gradient(135deg, #880E4F 0%, #D81B60 100%)",
  },
  {
    id: 2,
    name: "Carlos Herrera",
    role: "Analista Político Senior",
    bio: "Especialista en sistemas electorales y comportamiento político en América Latina.",
    bg: "linear-gradient(135deg, #424242 0%, #880E4F 100%)",
  },
  {
    id: 3,
    name: "Valentina Rivas",
    role: "Investigadora Digital",
    bio: "Experta en comunicación política digital y análisis de redes sociales.",
    bg: "linear-gradient(135deg, #D81B60 0%, #F48FB1 100%)",
  },
  {
    id: 4,
    name: "Andrés Morales",
    role: "Especialista Legislativo",
    bio: "Abogado y analista parlamentario con amplio conocimiento del proceso legislativo chileno.",
    bg: "linear-gradient(135deg, #4DB6AC 0%, #424242 100%)",
  },
  {
    id: 5,
    name: "Sofía Castillo",
    role: "Analista de Opinión Pública",
    bio: "Socióloga especializada en metodología de investigación y medición de opinión ciudadana.",
    bg: "linear-gradient(135deg, #880E4F 0%, #4DB6AC 100%)",
  },
  {
    id: 6,
    name: "Diego Fuentes",
    role: "Coordinador de Proyectos",
    bio: "Cientista político con experiencia en gestión de proyectos de investigación aplicada.",
    bg: "linear-gradient(135deg, #D81B60 0%, #424242 100%)",
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
          <div>
            <p className="text-[#F48FB1] text-xs tracking-[0.3em] uppercase font-medium mb-2">
              Equipo
            </p>
            <h2 className="serif text-4xl font-bold text-[#F5F5F5]">
              Nuestro Equipo
            </h2>
          </div>
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
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
        >
          {team.map((member) => (
            <div
              key={member.id}
              className="snap-start shrink-0 w-[260px] md:w-[290px] group cursor-pointer"
            >
              <div
                className="w-full aspect-square mb-5 relative overflow-hidden"
                style={{ background: member.bg }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="serif text-5xl font-bold text-white/20 select-none">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="absolute inset-0 bg-[#D81B60]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <p className="text-white text-xs leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
              <h3 className="serif text-lg font-bold text-[#F5F5F5] leading-tight">
                {member.name}
              </h3>
              <p className="text-[#F48FB1] text-xs tracking-[0.2em] uppercase mt-1">
                {member.role}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[#F5F5F5]/25 text-xs tracking-widest uppercase text-center mt-6 md:hidden">
          Desliza para ver más →
        </p>
      </div>
    </section>
  );
}
