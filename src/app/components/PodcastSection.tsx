"use client";

import { FadeInScroll } from "./FadeInScroll";

export default function PodcastSection() {
    return (
        <section id="podcast" className="bg-[#FCE4EC] py-24 px-6 md:px-12 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Column: Text & CTA */}
                <div className="flex flex-col justify-center">
                    <FadeInScroll>
                        <h2 className="serif text-5xl md:text-6xl lg:text-[5rem] font-bold text-[#880E4F] leading-[1.05] mb-8">
                            Escucha <br />
                            nuestro <br />
                            Podcast: <br />
                            Materia Prima
                        </h2>
                    </FadeInScroll>

                    <FadeInScroll delay={0.2}>
                        <p className="text-[#880E4F]/80 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-normal">
                            Un espacio dedicado al análisis profundo sobre el futuro de Chile.
                            Expertos, datos y visiones que transforman la realidad nacional.
                        </p>
                    </FadeInScroll>

                    <FadeInScroll delay={0.4}>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://www.youtube.com/channel/UCtzT5ASvbHBTJwLw8EpcRpA"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#880E4F] text-[#FCE4EC] px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#D81B60] hover:text-white transition-all duration-300 flex items-center gap-3"
                            >
                                <span>▶</span> Último Episodio
                            </a>
                            <a
                                href="https://www.youtube.com/channel/UCtzT5ASvbHBTJwLw8EpcRpA"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-[#880E4F]/20 text-[#880E4F] px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:border-[#880E4F] hover:bg-[#880E4F]/5 transition-all duration-300"
                            >
                                Ver Todos
                            </a>
                        </div>
                    </FadeInScroll>
                </div>

                {/* Right Column: Featured Episode Card */}
                <div className="flex justify-center lg:justify-end">
                    <FadeInScroll delay={0.3} direction="right" className="w-full max-w-md">
                        <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden relative shadow-2xl group cursor-pointer"
                            style={{
                                background: "linear-gradient(145deg, #880E4F 0%, #424242 100%)",
                            }}
                        >
                            {/* Overlay Grid Pattern placeholder */}
                            <div
                                className="absolute inset-0 opacity-10 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-20"
                                style={{
                                    backgroundImage: "radial-gradient(#F5F5F5 2px, transparent 2px)",
                                    backgroundSize: "24px 24px"
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                            {/* Podcast texts will populate here when ready */}

                            <div className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-[#F48FB1] group-hover:border-[#F48FB1] transition-all duration-500 shadow-lg">
                                <span className="text-white ml-1 text-lg">▶</span>
                            </div>
                        </div>
                    </FadeInScroll>
                </div>

            </div>
        </section>
    );
}
