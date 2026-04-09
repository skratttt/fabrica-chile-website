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
    image: "/assets/jose-francisco-aravena.jpg",
    bio: "Texto sobre José Francisco aquí.",
  },
  {
    id: 2,
    name: "Arantzasu Foppiano",
    role: "Investigador",
    image: "/assets/arantzasu-foppiano.jpg",
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
    image: "/assets/fransisco-oyarce.jpg",
    bio: "Texto sobre Francisco aquí.",
  },
  {
    id: 5,
    name: "Nicolás Germain",
    role: "Investigador",
    image: "/assets/nicolas-germain.jpg",
    bio: "Texto sobre Nicolás aquí.",
  },
  {
    id: 6,
    name: "Tomás Domínguez",
    role: "Investigador",
    image: "/assets/tomas-dominguez.jpg",
    bio: "Texto sobre Tomás aquí.",
  },
];

function FlipCard({
  member,
  onHover,
  onLeave,
}: {
  member: TeamMember;
  onHover: () => void;
  onLeave: () => void;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="shrink-0 w-[260px] md:w-[290px] cursor-pointer"
      onMouseEnter={() => { setFlipped(true); onHover(); }}
      onMouseLeave={() => { setFlipped(false); onLeave(); }}
      onClick={onHover}
    >
      {/* Flip square */}
      <div className="w-full aspect-square mb-5 relative" style={{ perspective: "1000px" }}>
        <div
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Front: photo */}
          <div
            style={{ backfaceVisibility: "hidden" }}
            className="absolute inset-0 overflow-hidden bg-black/20"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover object-center grayscale"
            />
          </div>
          {/* Back: name + role */}
          <div
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            className="absolute inset-0 bg-[#2a2a2a] flex flex-col items-center justify-center p-6 gap-3"
          >
            <div className="w-8 h-px bg-[#F48FB1]" />
            <h3 className="serif text-lg font-bold text-[#F5F5F5] text-center leading-snug">
              {member.name}
            </h3>
            <p className="text-[#F48FB1] text-[10px] tracking-[0.25em] uppercase font-medium text-center">
              {member.role}
            </p>
            <div className="w-8 h-px bg-[#F48FB1]" />
            <span className="text-[#F5F5F5]/40 text-[10px] tracking-widest uppercase mt-1">
              Ver perfil →
            </span>
          </div>
        </div>
      </div>

      {/* Name / role below */}
      <h3 className="serif text-lg font-bold text-[#F5F5F5] leading-tight">
        {member.name}
      </h3>
      <p className="text-[#F48FB1] text-xs tracking-[0.2em] uppercase mt-1">
        {member.role}
      </p>
    </div>
  );
}

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
    let lastTime = 0;
    const SPEED = Math.max(35, window.innerWidth * 0.04); // ~35px/s mobile, ~77px/s 1920p, scales with viewport
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollStep = (timestamp: number) => {
      if (!isHovered.current) {
        const delta = lastTime ? (timestamp - lastTime) / 1000 : 0;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft -= scrollContainer.scrollWidth / 2;
        }
        scrollContainer.scrollLeft += SPEED * delta;
      }
      lastTime = timestamp;
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
              <FlipCard
                member={member}
                onHover={() => { cancelClose(); setHoveredMember(member); }}
                onLeave={scheduleClose}
              />
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
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6 pointer-events-auto md:pointer-events-none"
          style={{
            backgroundColor: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
            animation: "fadeIn 0.2s ease",
          }}
          onClick={() => setHoveredMember(null)}
        >
          <div
            className="flex flex-col md:flex-row w-full md:max-w-2xl bg-[#2a2a2a] overflow-hidden shadow-2xl pointer-events-auto relative"
            style={{
              animation: "scaleIn 0.25s cubic-bezier(0.4,0,0.2,1)",
              maxHeight: "90vh",
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={cancelClose}
            onMouseLeave={() => setHoveredMember(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white bg-black/30 rounded-full text-lg leading-none"
              onClick={() => setHoveredMember(null)}
            >
              ×
            </button>
            {/* Photo */}
            <div className="w-full h-52 md:h-auto md:w-56 lg:w-72 shrink-0 relative">
              <img
                src={hoveredMember.image}
                alt={hoveredMember.name}
                className="w-full h-full object-cover object-center grayscale"
              />
            </div>
            {/* Text */}
            <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10 overflow-y-auto">
              <div className="w-8 h-px bg-[#F48FB1] mb-4" />
              <p className="text-[#F48FB1] text-[10px] tracking-[0.25em] uppercase font-medium mb-2">
                {hoveredMember.role}
              </p>
              <h3 className="serif text-xl md:text-2xl lg:text-3xl font-bold text-[#F5F5F5] leading-tight mb-4">
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
