"use client";

import { useRef, useEffect, useState } from "react";
import { FadeInScroll } from "./FadeInScroll";

interface FocusArea {
    id: number;
    name: string;
    role: string;
    image: string;
    bio: string;
}

const focusAreas: FocusArea[] = [
    {
        id: 1,
        name: "Francisco Meneses",
        role: "Economía, innovación e inversiones",
        image: "/assets/francisco meneses.jpeg",
        bio: "Economista de la PUC, MPA/ID de Harvard Kennedy School y PhD en Políticas Públicas de Duke University. Ha sido economista del Banco Central de Chile, investigador del Banco Mundial y la UNESCO, gerente de Financiamiento e Inversión (CIO) de Corfo, y director de Estudios del Ministerio de Educación. Especialista en política fiscal, economía de la educación y movilidad social.",
    },
    {
        id: 2,
        name: "Verónica Pardo",
        role: "Turismo",
        image: "/assets/veronica pardo.jpeg",
        bio: "Ingeniera comercial de la USACH y magíster en Gestión Estratégica de RR.HH. de la PUC. Fue Subsecretaria de Turismo de Chile (2023-2025), Senior Manager en Deloitte Chile liderando el área de Tourism, Hospitality & Leisure para América Latina, y directora asociada en The Canvas Group, donde participó en la estrategia de EcoCamp Patagonia. Con amplia trayectoria en gestión pública y consultoría estratégica en turismo.",
    },
    {
        id: 3,
        name: "Luis Felipe Ramos",
        role: "Energía",
        image: "/assets/luis felipe ramos.jpeg",
        bio: "Abogado de la Universidad de Chile y máster en Derecho Constitucional de la PUCV. Subsecretario de Energía de Chile (2023-2026), expresidente del Partido Liberal (2016-2021) y excoordinador legislativo en el Congreso Nacional. Especialista en derecho administrativo económico, con experiencia en regulación energética y políticas de transición hacia energías renovables.",
    },
    {
        id: 4,
        name: "Ernesto Muñoz",
        role: "Seguridad y justicia",
        image: "/assets/ernesto munoz.jpeg",
        bio: "Abogado de la Universidad de Chile, MBA de la Universidad Alberto Hurtado y máster en Políticas Públicas y Ciencia Política de UC Berkeley. Fue Subsecretario de Justicia (2024-2026), director nacional del Sernac (2014-2018) y director en la Defensoría de la Niñez. Doctorando en Derecho, con trayectoria en protección al consumidor, derechos humanos y modernización de la justicia.",
    },
    {
        id: 5,
        name: "Rodrigo Rettig",
        role: "Delitos tributarios y filosofía liberal",
        image: "/assets/rodrigo rettig.jpeg",
        bio: "Abogado litigante con sólida formación en derecho penal, compliance y ciencia política. Con más de 15 años de trayectoria profesional, ha conjugado la resolución de conflictos en criminalidad económica y tributaria con la gestión pública y el análisis estratégico. Su mirada cruza el rigor técnico-jurídico con la construcción institucional, aportando una visión cimentada en la filosofía liberal y la responsabilidad civil.",
    },
    {
        id: 6,
        name: "Francisco Muñoz",
        role: "Transparencia y probidad",
        image: "/assets/francisco munoz.jpeg",
        bio: "Abogado y Magíster en Derecho Regulatorio por la PUC. Con sólida trayectoria en el sector público y privado, incluyendo la Jefatura de Gabinete en las Subsecretarías de Justicia y Turismo. Su carrera destaca por su especialización en derecho administrativo, cumplimiento normativo, transparencia y probidad institucional.",
    },
    {
        id: 7,
        name: "Arantzasu Foppiano",
        role: "Género y agenda mujer",
        image: "/assets/Arantzasu Foppiano.jpg",
        bio: "Abogada con experiencia en asesoría legal y comunicación estratégica. En Fábrica Chile se desempeña como investigadora, aportando desde el análisis y la generación de contenido.",
    },
    {
        id: 8,
        name: "Nicolás Freire",
        role: "Política y coyuntura",
        image: "/assets/nicolas freire.jpeg",
        bio: "Cientista político, máster en Instituciones Parlamentarias y doctor en Estudios Americanos. Con más de 15 años de ejercicio profesional, ha conjugado academia, consultoría y función pública. Panelista estable y frecuente invitado a diversos medios de comunicación, destacando como analista de coyuntura y fenómenos sociopolíticos.",
    },
];

export default function FocusCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isHovered = useRef(false);
    const [hoveredArea, setHoveredArea] = useState<FocusArea | null>(null);
    const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const scheduleClose = () => {
        closeTimeout.current = setTimeout(() => setHoveredArea(null), 200);
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
        <section id="focus-areas" className="bg-[#424242] py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-12">
                    <FadeInScroll>
                        <div>
                            <p className="text-[#F48FB1] text-xs tracking-[0.3em] uppercase font-medium mb-2">
                                Áreas
                            </p>
                            <h2 className="serif text-4xl font-bold text-[#F5F5F5]">
                                Nuestros expertos y vocerias
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
                    {[...focusAreas, ...focusAreas].map((area, i) => (
                        <FadeInScroll
                            key={`${area.id}-${i}`}
                            delay={(i % focusAreas.length) * 0.1}
                        >
                            <div
                                className="shrink-0 w-[260px] md:w-[290px] cursor-pointer group"
                                onMouseEnter={() => { cancelClose(); setHoveredArea(area); }}
                                onMouseLeave={scheduleClose}
                            >
                                <div className="w-full aspect-square mb-5 relative overflow-hidden bg-black/20">
                                    {area.image ? (
                                        <img
                                            src={area.image}
                                            alt={area.name}
                                            className="w-full h-full object-cover object-center grayscale group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[#F5F5F5]/30 text-xs tracking-[0.2em] uppercase">
                                            Próximamente
                                        </div>
                                    )}
                                    {/* Hover hint */}
                                    <div className="absolute inset-0 bg-[#880E4F]/0 group-hover:bg-[#880E4F]/20 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                                        <span className="text-white text-[10px] tracking-[0.2em] uppercase font-medium">Ver más</span>
                                    </div>
                                </div>
                                <h3 className="serif text-lg font-bold text-[#F5F5F5] leading-tight">
                                    {area.name}
                                </h3>
                                <p className="text-[#F48FB1] text-xs tracking-[0.2em] uppercase mt-1">
                                    {area.role}
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
            {hoveredArea && (
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
                        onMouseLeave={() => setHoveredArea(null)}
                    >
                        {/* Photo */}
                        <div className="w-56 md:w-72 shrink-0 aspect-square relative">
                            <img
                                src={hoveredArea.image}
                                alt={hoveredArea.name}
                                className="w-full h-full object-cover object-center grayscale"
                            />
                        </div>
                        {/* Text */}
                        <div className="flex flex-col justify-center p-8 md:p-10">
                            <p className="text-[#F48FB1] text-[10px] tracking-[0.25em] uppercase font-medium mb-2">
                                {hoveredArea.role}
                            </p>
                            <h3 className="serif text-2xl md:text-3xl font-bold text-[#F5F5F5] leading-tight mb-5">
                                {hoveredArea.name}
                            </h3>
                            <p className="text-[#F5F5F5]/75 text-sm leading-relaxed">
                                {hoveredArea.bio}
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
