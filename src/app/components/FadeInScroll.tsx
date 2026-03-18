"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface FadeInScrollProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
    offset?: any; // e.g. ["start 25%", "start -25%"]
}

/**
 * A reusable wrapper that animates its children in when scrolled into view
 * and animates them out when scrolled out of view.
 */
export function FadeInScroll({
    children,
    className = "",
    delay = 0,
    direction = "up",
    distance = 30,
    offset = ["start 25%", "start -25%"]
}: FadeInScrollProps) {

    // Calculate initial offset based on direction
    const getInitialOffset = () => {
        switch (direction) {
            case "up": return { y: distance };
            case "down": return { y: -distance };
            case "left": return { x: distance };
            case "right": return { x: -distance };
            case "none": return { x: 0, y: 0 };
            default: return { y: distance };
        }
    };

    const ref = useRef<HTMLDivElement>(null);

    // Fade out as the element scrolls up and out of the viewport.
    // By default starts fading when the element's top is 25% from the top of the viewport,
    // and finishes fading when its top is 25% above the top of the viewport.
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: offset
    });

    // We apply a slight upward drift and fade out as it leaves.
    const fadeOutOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const fadeOutY = useTransform(scrollYProgress, [0, 1], [0, -40]);

    const initialOffset = getInitialOffset();

    return (
        <motion.div
            ref={ref}
            style={{ opacity: fadeOutOpacity, y: fadeOutY }}
            className={className}
        >
            <motion.div
                initial={{
                    opacity: 0,
                    filter: "blur(4px)",
                    ...initialOffset
                }}
                whileInView={{
                    opacity: 1,
                    filter: "blur(0px)",
                    x: 0,
                    y: 0
                }}
                viewport={{
                    once: false, // Animates out when leaving screen
                    amount: 0.15 // Triggers when 15% of the element is in view
                }}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.25, 0.4, 0.1, 1] // Anthropic-style smooth curve
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
