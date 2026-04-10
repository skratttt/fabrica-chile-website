"use client";

import Image from "next/image";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { AnimatedPageTitle, AnimatedWord } from "@/app/components/AnimatedTitle";

const X_URL = "https://x.com/fabrica_chile";
const STREAMING_URL = "#streaming";

export default function Hero() {
    // Animation Variants
    const fadeUpVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        },
    };

    // Scroll Fade Out for the entire Hero content
    const { scrollY } = useScroll();
    const contentOpacity = useTransform(scrollY, [50, 400], [1, 0]);
    const contentY = useTransform(scrollY, [50, 400], [0, 50]);

    return (
        <section className="min-h-[90vh] bg-[#880E4F] flex flex-col justify-end pt-28 pb-20 px-6 relative">
            {/* Background aesthetics */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#F5F5F5 1px, transparent 1px), linear-gradient(90deg, #F5F5F5 1px, transparent 1px)",
                        backgroundSize: "64px 64px",
                    }}
                />
                <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.05]"
                    style={{ width: "clamp(20rem, 50vw, 55rem)", height: "clamp(20rem, 50vw, 55rem)" }}
                >
                    <Image
                        src="/assets/gear.png"
                        alt="Logo Gear Background"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain object-left -scale-x-100"
                    />
                </div>
                <div className="absolute left-0 top-0 w-1 h-full bg-[#D81B60]" />
                <div
                    className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(244,143,177,0.15) 0%, transparent 70%)",
                    }}
                />
            </div>

            <motion.div
                style={{ opacity: contentOpacity, y: contentY }}
                className="max-w-7xl mx-auto w-full relative z-10 pl-4"
            >
                {/* Animated Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="flex items-center gap-3 mb-10"
                >
                    <div className="w-10 h-px bg-[#F48FB1]" />
                    <span className="text-[#F48FB1] text-xs tracking-[0.35em] uppercase font-medium">
                        Centro de Pensamiento Político
                    </span>
                </motion.div>

                {/* Animated Staggered Title */}
                <AnimatedPageTitle
                    className="serif font-bold text-[#F5F5F5] leading-[1.08] mb-8"
                    scrollFade={false}
                >
                    <div className="overflow-hidden" style={{ fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)" }}>
                        <AnimatedWord>Ideas</AnimatedWord>{" "}
                        <AnimatedWord>que</AnimatedWord>
                    </div>
                    <div className="overflow-hidden" style={{ fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)" }}>
                        <AnimatedWord className="text-[#F48FB1]">fabrican</AnimatedWord>{" "}
                        <AnimatedWord>la</AnimatedWord>
                    </div>
                    <div className="overflow-hidden" style={{ fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)" }}>
                        <AnimatedWord>conversación.</AnimatedWord>
                    </div>
                </AnimatedPageTitle>

                {/* Animated Subtitle */}
                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariants}
                    transition={{ delay: 1.0 }}
                    className="text-[#F5F5F5]/60 text-lg max-w-md mb-12 leading-relaxed"
                >
                    Investigación, análisis y opinión sobre las dinámicas políticas que
                    moldean nuestra sociedad. Sigue el debate en nuestras redes.
                </motion.p>

                {/* Animated CTA Buttons */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariants}
                    transition={{ delay: 1.2 }}
                    className="flex flex-wrap items-center gap-4"
                >
                    <a
                        href="#columns"
                        className="bg-[#D81B60] text-white px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-white hover:text-[#880E4F] transition-all duration-300 shadow-lg shadow-[#880E4F]/20 hover:shadow-xl hover:-translate-y-0.5"
                    >
                        Leer Última Columna
                    </a>
                    <a
                        href={X_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[#F5F5F5]/30 text-[#F5F5F5] px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:border-[#F48FB1] hover:text-[#F48FB1] transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Seguir en X
                    </a>
                    <a
                        href={STREAMING_URL}
                        className="border border-[#F5F5F5]/30 text-[#F5F5F5] px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:border-[#F48FB1] hover:text-[#F48FB1] transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Streaming
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
