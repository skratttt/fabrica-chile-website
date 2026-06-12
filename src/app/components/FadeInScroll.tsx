"use client";

import { ReactNode } from "react";
import { BlurFade } from "@/components/ui/blur-fade";

interface FadeInScrollProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none"; // kept for compatibility but unused
    distance?: number; // kept for compatibility but unused
    offset?: any; // kept for compatibility but unused
}

/**
 * Scroll-reveal wrapper used across the site.
 * Delegates to BlurFade (blur + fade text animation) so every
 * call site shares the same entrance animation.
 */
export function FadeInScroll({
    children,
    className = "",
    delay = 0,
}: FadeInScrollProps) {
    return (
        <BlurFade className={className} delay={delay} inView>
            {children}
        </BlurFade>
    );
}
