"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FadeInScroll } from "./FadeInScroll";

export interface Person {
    id: number;
    name: string;
    role: string;
    image: string;
    bio?: string;
    objectPosition?: string;
}

interface PeopleCarouselProps {
    sectionId: string;
    eyebrow: string;
    title: string;
    people: Person[];
    theme?: "dark" | "light";
}

const themes = {
    dark: {
        section: "bg-[#424242]",
        eyebrow: "text-[#F48FB1]",
        title: "text-[#F5F5F5]",
        cardTitle: "text-[#F5F5F5]",
        accent: "text-[#F48FB1]",
        arrowEnabled:
            "border-[#F5F5F5]/20 text-[#F5F5F5]/60 hover:border-[#F48FB1] hover:text-[#F48FB1] cursor-pointer",
        arrowDisabled: "border-[#F5F5F5]/10 text-[#F5F5F5]/20 cursor-default",
        fade: "from-[#424242]",
        ring: "focus-visible:outline-[#F48FB1]",
        placeholderBg: "bg-[#3a3a3a]",
        placeholderText: "text-[#F5F5F5]/30",
    },
    light: {
        section: "bg-[#F5F5F5] border-t border-[#424242]/10",
        eyebrow: "text-[#D81B60]",
        title: "text-[#424242]",
        cardTitle: "text-[#424242]",
        accent: "text-[#D81B60]",
        arrowEnabled:
            "border-[#424242]/20 text-[#424242]/60 hover:border-[#D81B60] hover:text-[#D81B60] cursor-pointer",
        arrowDisabled: "border-[#424242]/10 text-[#424242]/20 cursor-default",
        fade: "from-[#F5F5F5]",
        ring: "focus-visible:outline-[#D81B60]",
        placeholderBg: "bg-[#424242]/5",
        placeholderText: "text-[#424242]/30",
    },
};

function Initials({ name }: { name: string }) {
    return (
        <span className="serif text-5xl font-bold text-[#F48FB1] opacity-70">
            {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
        </span>
    );
}

export default function PeopleCarousel({
    sectionId,
    eyebrow,
    title,
    people,
    theme = "dark",
}: PeopleCarouselProps) {
    const t = themes[theme];
    const trackRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(false);
    const [selected, setSelected] = useState<Person | null>(null);

    const updateArrows = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        setCanLeft(el.scrollLeft > 4);
        setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    }, []);

    useEffect(() => {
        updateArrows();
        window.addEventListener("resize", updateArrows);
        return () => window.removeEventListener("resize", updateArrows);
    }, [updateArrows]);

    const scrollByPage = (dir: -1 | 1) => {
        const el = trackRef.current;
        if (!el) return;
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        el.scrollBy({
            left: dir * el.clientWidth * 0.8,
            behavior: reduce ? "auto" : "smooth",
        });
    };

    // Modal: focus close button, close on Escape, lock page scroll
    useEffect(() => {
        if (!selected) return;
        closeButtonRef.current?.focus();
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelected(null);
        };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [selected]);

    return (
        <section
            id={sectionId}
            className={`${t.section} py-24 px-6 overflow-hidden`}
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-12">
                    <FadeInScroll>
                        <div>
                            <p
                                className={`${t.eyebrow} text-xs tracking-[0.3em] uppercase font-medium mb-2`}
                            >
                                {eyebrow}
                            </p>
                            <h2 className={`serif text-4xl font-bold ${t.title}`}>
                                {title}
                            </h2>
                        </div>
                    </FadeInScroll>
                    <FadeInScroll delay={0.2}>
                        <div className="hidden md:flex gap-3">
                            <button
                                type="button"
                                onClick={() => scrollByPage(-1)}
                                disabled={!canLeft}
                                aria-label="Anterior"
                                className={`w-11 h-11 border flex items-center justify-center transition-colors duration-200 outline-offset-2 focus-visible:outline-2 ${t.ring} ${canLeft ? t.arrowEnabled : t.arrowDisabled}`}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollByPage(1)}
                                disabled={!canRight}
                                aria-label="Siguiente"
                                className={`w-11 h-11 border flex items-center justify-center transition-colors duration-200 outline-offset-2 focus-visible:outline-2 ${t.ring} ${canRight ? t.arrowEnabled : t.arrowDisabled}`}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </FadeInScroll>
                </div>

                <div className="relative">
                    <div
                        ref={trackRef}
                        onScroll={updateArrows}
                        role="region"
                        aria-roledescription="carrusel"
                        aria-label={title}
                        tabIndex={0}
                        className={`flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 outline-offset-4 focus-visible:outline-2 ${t.ring} [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
                    >
                        {people.map((person) => {
                            const card = (
                                <>
                                    <div
                                        className={`w-full aspect-square mb-5 overflow-hidden ${t.placeholderBg}`}
                                    >
                                        {person.image ? (
                                            <img
                                                src={person.image}
                                                alt={person.name}
                                                loading="lazy"
                                                className="w-full h-full object-cover grayscale transition-all duration-300 ease-out group-hover:grayscale-0 group-hover:scale-[1.03] group-focus-visible:grayscale-0"
                                                style={{
                                                    objectPosition:
                                                        person.objectPosition || "center",
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                                <Initials name={person.name} />
                                                <span
                                                    className={`text-[10px] tracking-widest uppercase ${t.placeholderText}`}
                                                >
                                                    Próximamente
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <h3
                                        className={`serif text-lg font-bold ${t.cardTitle} leading-tight`}
                                    >
                                        {person.name}
                                    </h3>
                                    <p
                                        className={`${t.accent} text-xs tracking-[0.2em] uppercase mt-1`}
                                    >
                                        {person.role}
                                    </p>
                                    {person.bio && (
                                        <span
                                            className={`${t.accent} text-[10px] tracking-widest uppercase mt-3 inline-block opacity-60 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100`}
                                        >
                                            Ver perfil →
                                        </span>
                                    )}
                                </>
                            );

                            return person.bio ? (
                                <button
                                    key={person.id}
                                    type="button"
                                    onClick={() => setSelected(person)}
                                    className={`group shrink-0 w-[260px] md:w-[290px] snap-start text-left cursor-pointer outline-offset-4 focus-visible:outline-2 ${t.ring}`}
                                >
                                    {card}
                                </button>
                            ) : (
                                <div
                                    key={person.id}
                                    className="group shrink-0 w-[260px] md:w-[290px] snap-start"
                                >
                                    {card}
                                </div>
                            );
                        })}
                    </div>

                    {/* Edge fades: hint that more content exists in that direction */}
                    <div
                        aria-hidden="true"
                        className={`absolute left-0 top-0 bottom-2 w-12 pointer-events-none bg-gradient-to-r ${t.fade} to-transparent transition-opacity duration-300 ${canLeft ? "opacity-100" : "opacity-0"}`}
                    />
                    <div
                        aria-hidden="true"
                        className={`absolute right-0 top-0 bottom-2 w-12 pointer-events-none bg-gradient-to-l ${t.fade} to-transparent transition-opacity duration-300 ${canRight ? "opacity-100" : "opacity-0"}`}
                    />
                </div>
            </div>

            {/* Profile dialog — opens on click/tap only */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.65)",
                        backdropFilter: "blur(4px)",
                        animation: "fadeIn 0.2s ease",
                    }}
                    onClick={() => setSelected(null)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={selected.name}
                        className="flex flex-col md:flex-row w-full md:max-w-2xl bg-[#2a2a2a] overflow-hidden shadow-2xl relative"
                        style={{
                            animation: "scaleIn 0.25s cubic-bezier(0.4,0,0.2,1)",
                            maxHeight: "90vh",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            ref={closeButtonRef}
                            type="button"
                            aria-label="Cerrar"
                            className="absolute top-2 right-2 z-10 w-11 h-11 flex items-center justify-center text-white/60 hover:text-white bg-black/30 rounded-full cursor-pointer outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#F48FB1]"
                            onClick={() => setSelected(null)}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                        <div className="w-full h-52 md:h-auto md:w-56 lg:w-72 shrink-0 relative bg-[#3a3a3a]">
                            {selected.image ? (
                                <img
                                    src={selected.image}
                                    alt={selected.name}
                                    className="w-full h-full object-cover grayscale"
                                    style={{
                                        objectPosition: selected.objectPosition || "center",
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center py-10 min-h-[200px]">
                                    <Initials name={selected.name} />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10 overflow-y-auto">
                            <div className="w-8 h-px bg-[#F48FB1] mb-4" />
                            <p className="text-[#F48FB1] text-[10px] tracking-[0.25em] uppercase font-medium mb-2">
                                {selected.role}
                            </p>
                            <h3 className="serif text-xl md:text-2xl lg:text-3xl font-bold text-[#F5F5F5] leading-tight mb-4">
                                {selected.name}
                            </h3>
                            <p className="text-[#F5F5F5]/75 text-sm leading-relaxed">
                                {selected.bio}
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
