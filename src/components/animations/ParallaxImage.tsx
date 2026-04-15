"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  /** Intensité du mouvement (px). 40–120 recommandé */
  intensity?: number;
  /** Scale global de l'image pour éviter les bords vides */
  scale?: number;
};

export function ParallaxImage({
  src,
  alt = "",
  className,
  intensity = 80,
  scale = 1.15,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [-intensity, intensity]
  );

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      role="img"
      aria-label={alt}
    >
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 will-change-transform"
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${src})` }}
        />
      </motion.div>
    </div>
  );
}
