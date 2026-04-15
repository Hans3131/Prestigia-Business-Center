import type { Variants, Transition } from "motion/react";

// Premium easing curve (easeOutExpo-ish)
export const easePremium = [0.22, 1, 0.36, 1] as const;
export const easeSoft = [0.4, 0, 0.2, 1] as const;

export const baseTransition: Transition = {
  duration: 0.9,
  ease: easePremium,
};

// Fade in + slide up (default section entry)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

// Fade only
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

// Stagger container
export const staggerContainer = (stagger = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

// Scale in (subtle)
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: baseTransition },
};

// Viewport options for scroll-triggered entries
export const viewportOnce = { once: true, margin: "-10% 0px -10% 0px" } as const;
