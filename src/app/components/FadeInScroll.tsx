"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInScrollProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
    offset?: any; // kept for compatibility but unused
}

/**
 * A reusable wrapper that animates its children in when scrolled into view.
 * Removed heavy useScroll bindings for better performance.
 */
export function FadeInScroll({
    children,
    className = "",
    delay = 0,
    direction = "up",
    distance = 30,
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

    const initialOffset = getInitialOffset();

    return (
        <div className={className}>
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
                    once: false,
                    amount: 0.15
                }}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.25, 0.4, 0.1, 1] 
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
