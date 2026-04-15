"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { easePremium } from "@/lib/animations";

type Props = {
  /** Texte principal (sera découpé mot à mot) */
  children?: string;
  /** Texte avant l'accent */
  pre?: string;
  /** Mot(s) mis en avant (italique doré) */
  accent?: string;
  /** Texte après l'accent */
  post?: string;
  className?: string;
  stagger?: number;
  delay?: number;
  y?: number;
  inView?: boolean;
};

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const word = (y: number): Variants => ({
  hidden: { y: `${y * 3}%`, opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1.1, ease: easePremium },
  },
});

function renderWords(text: string, accent = false) {
  return text.split(" ").map((w, i, arr) => (
    <span
      key={`${w}-${i}`}
      className="relative inline-block overflow-hidden align-[0.12em] leading-[1.15]"
      aria-hidden
    >
      <motion.span
        variants={word(40)}
        className={accent ? "inline-block italic text-gold" : "inline-block"}
      >
        {w}
      </motion.span>
      {i < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
    </span>
  ));
}

export function SplitReveal({
  children,
  pre,
  accent,
  post,
  className,
  stagger = 0.08,
  delay = 0,
  inView = true,
}: Props) {
  const hasStructured = pre !== undefined || accent !== undefined || post !== undefined;
  const plainText =
    [pre, accent, post].filter(Boolean).join(" ") || children || "";

  return (
    <motion.span
      variants={container(stagger, delay)}
      initial="hidden"
      {...(inView
        ? {
            whileInView: "visible",
            viewport: { once: true, margin: "-15% 0px -15% 0px" },
          }
        : { animate: "visible" })}
      className={className}
    >
      {hasStructured ? (
        <>
          {pre && renderWords(pre)}
          {pre && accent && (
            <span className="inline-block" aria-hidden>
              &nbsp;
            </span>
          )}
          {accent && renderWords(accent, true)}
          {accent && post && (
            <span className="inline-block" aria-hidden>
              &nbsp;
            </span>
          )}
          {post && renderWords(post)}
        </>
      ) : (
        renderWords(children ?? "")
      )}
      <span className="sr-only">{plainText}</span>
    </motion.span>
  );
}

/** Receive inline ReactNode children where only raw strings are split.
 *  Useful when fine control isn't needed. */
type InlineProps = {
  children: ReactNode;
  className?: string;
};
export function WordReveal({ children, className }: InlineProps) {
  return <span className={className}>{children}</span>;
}
