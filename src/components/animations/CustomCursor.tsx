"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * Curseur personnalisé premium — desktop uniquement.
 * Suit la souris avec un spring, s'agrandit sur les éléments interactifs.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { damping: 26, stiffness: 240, mass: 0.4 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  useEffect(() => {
    // Desktop fine pointer only
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    setEnabled(mq.matches && !prefersReduced);
    const handler = (e: MediaQueryListEvent) =>
      setEnabled(e.matches && !prefersReduced);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [prefersReduced]);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    // Detect hovering over interactive elements
    const interactive = "a, button, [role='button'], input, textarea, select, label";
    const onOver = (e: Event) => {
      const el = e.target as HTMLElement;
      if (el.closest(interactive)) setHovered(true);
    };
    const onOut = (e: Event) => {
      const el = e.target as HTMLElement;
      if (el.closest(interactive)) setHovered(false);
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    // Hide native cursor on enabled devices
    document.documentElement.classList.add("cursor-none-all");

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("cursor-none-all");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring — follows cursor with spring */}
      <motion.div
        style={{
          translateX: sx,
          translateY: sy,
        }}
        animate={{
          width: hovered ? 56 : 28,
          height: hovered ? 56 : 28,
          opacity: hidden ? 0 : 1,
          borderColor: hovered ? "rgba(201,168,76,1)" : "rgba(201,168,76,0.55)",
          backgroundColor: hovered
            ? "rgba(201,168,76,0.08)"
            : "rgba(201,168,76,0)",
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-[1px] mix-blend-difference"
      />

      {/* Inner dot — hugs cursor precisely */}
      <motion.div
        style={{ translateX: x, translateY: y }}
        animate={{ opacity: hidden ? 0 : hovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
      />
    </>
  );
}
