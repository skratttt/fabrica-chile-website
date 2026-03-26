"use client";

import { useRef, useEffect } from "react";
import { FadeInScroll } from "./FadeInScroll";

interface FocusArea {
    id: number;
    name: string;
    role: string;
    image: string;
}

// Empty placeholders to be filled later
const focusAreas: FocusArea[] = [
    {
        id: 1,
        name: "Próximamente",
        role: "Próximamente",
        image: "",
    },
    {
        id: 2,
        name: "Próximamente",
        role: "Próximamente",
        image: "",
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

export default function FocusCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isHovered = useRef(false);

    useEffect(() => {
        let animationFrameId: number;
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const scrollStep = () => {
            if (!isHovered.current) {
                if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1) {
                    scrollContainer.scrollLeft = 0;
                } else {
                    scrollContainer.scrollLeft += 1;
                }
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
                    {focusAreas.map((area, i) => (
                        <FadeInScroll
                            key={area.id}
                            delay={i * 0.1}
                            className="shrink-0 w-[260px] md:w-[290px] group cursor-pointer"
                        >
                            <div
                                className="w-full aspect-square mb-5 relative overflow-hidden bg-black/20"
                            >
                                {area.image ? (
                                    <img
                                        src={area.image}
                                        alt={area.name}
                                        className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#F5F5F5]/30 text-xs tracking-[0.2em] uppercase">
                                        Próximamente
                                    </div>
                                )}
                            </div>
                            <h3 className="serif text-lg font-bold text-[#F5F5F5] leading-tight">
                                {area.name}
                            </h3>
                            <p className="text-[#F48FB1] text-xs tracking-[0.2em] uppercase mt-1">
                                {area.role}
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
