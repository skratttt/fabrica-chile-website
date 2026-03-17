"use client";

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

/**
 * AnimatedPageTitle
 * Applies the staggered children variants on load and fades out on down-scroll.
 * 
 * @param children Should contain <AnimatedWord> components for the stagger effect.
 * @param className Custom classes for the h1 container.
 * @param scrollFade If true, fades out and translates slightly on scroll.
 */
export function AnimatedPageTitle({
    children,
    className = "",
    scrollFade = true
}: {
    children: ReactNode;
    className?: string;
    scrollFade?: boolean;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Measure relative to the whole page scroll or the container itself.
    // Using global scrollY is usually fine for Hero titles as they are at the very top.
    const { scrollY } = useScroll();

    // Fade out starting after 50px of scroll, fully faded by 300px
    const opacity = useTransform(scrollY, [50, 300], [1, 0]);
    // Slide down slightly to create a parallax/exit drift effect
    const yOffset = useTransform(scrollY, [50, 300], [0, 50]);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1, // Small delay allows the page to load first
            },
        },
    };

    return (
        <motion.div
            ref={containerRef}
            style={scrollFade ? { opacity, y: yOffset } : undefined}
            className={`relative z-10 ${className}`}
        >
            <motion.h1
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {children}
            </motion.h1>
        </motion.div>
    );
}

/**
 * AnimatedWord
 * Represents a single word or small phrase that reveals sliding up and fading in from blur.
 */
export function AnimatedWord({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    const textVariants: Variants = {
        hidden: { opacity: 0, y: 30, filter: "blur(2px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.7,
                ease: [0.25, 0.4, 0.1, 1], // Custom premium easing curve
            }
        },
    };

    return (
        <span className="inline-block relative overflow-hidden align-bottom">
            <motion.span
                variants={textVariants}
                className={`inline-block relative ${className}`}
            >
                {children}
            </motion.span>
        </span>
    );
}
