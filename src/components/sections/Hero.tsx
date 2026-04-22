"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { easePremium } from "@/lib/animations";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: background moves slower than scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  // Content fades out progressively on scroll
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-navy text-ivory pt-[100px] pb-[50px] md:px-[50px] md:pb-[100px]"
    >
      {/* ---------- Background layers ---------- */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-20 will-change-transform"
      >
        {/* Video with fallback image */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop"
          className="h-full w-full object-cover"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-skyscrapers-at-dusk-1572/1080p.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* Deep navy overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-navy/70"
      />
      {/* Vertical gradient for readability (darker at bottom) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/40 via-navy/70 to-navy"
      />
      {/* Subtle gold glow top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_15%,rgba(201,168,76,0.14),transparent_55%)]"
      />
      {/* Film grain for cinematic texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Decorative gold corner lines */}
      <DecorativeCorners />

      {/* ---------- Content ---------- */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative flex w-full flex-col items-center text-center"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
          }}
          className="flex w-[90%] max-w-[1300px] flex-col items-center md:w-full"
        >
          {/* Glass pill label */}
          <motion.div
            variants={lineReveal}
            className="mt-[50px] mb-10 flex justify-center"
          >
            <span className="inline-flex items-center gap-3 rounded-full border border-ivory/15 bg-ivory/5 px-5 py-2 backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <span
                aria-hidden
                className="relative flex h-2 w-2"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <span className="font-sans text-[10px] md:text-[12px] font-medium uppercase tracking-[0.32em] text-ivory/90">
                Business Center · Zaventem
              </span>
            </span>
          </motion.div>

          {/* Headline — one line up to 1300px */}
          <h1 className="font-serif font-semibold leading-[1.1] tracking-normal text-ivory text-[clamp(2.25rem,5.2vw,5rem)] md:whitespace-nowrap md:leading-[1.05]">
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span variants={wordReveal} className="inline-block">
                L'Adresse
              </motion.span>
            </span>{" "}
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span variants={wordReveal} className="inline-block">
                de votre
              </motion.span>
            </span>{" "}
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                variants={wordReveal}
                className="inline-block italic text-gold"
              >
                Réussite.
              </motion.span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            variants={lineReveal}
            className="mx-auto mt-10 max-w-xl text-[17px] leading-[1.7] text-ivory/85 md:text-lg"
          >
            Domiciliation d'entreprise, bureaux professionnels et services
            sur-mesure pour entrepreneurs exigeants. Profitez d'un personnel
            qualifié, d'une grande réactivité et d'un accompagnement de qualité
            pour développer votre activité en toute confiance.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={lineReveal}
            className="mt-12 mb-24 flex flex-wrap items-center justify-center gap-6 md:mb-32"
          >
            <PremiumButton href="/services">
              Découvrir l'Excellence
            </PremiumButton>

            <Link
              href="/reserver"
              className="group inline-flex items-center gap-3 font-sans text-sm uppercase tracking-[0.22em] text-ivory/85 transition-colors hover:text-ivory"
            >
              <span className="relative pb-1">
                Réserver une visite
                <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100" />
              </span>
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ opacity: contentOpacity }}
        className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-ivory/50">
          Défiler
        </span>
        <div className="relative h-14 w-px overflow-hidden bg-ivory/20">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-transparent via-gold to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* --------------------------- Variants --------------------------- */

const wordReveal = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1.1, ease: easePremium },
  },
};

const lineReveal = {
  hidden: { y: 18, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: easePremium },
  },
};

/* ------------------------ Premium Button ------------------------ */

function PremiumButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-sm bg-gold px-9 font-sans text-xs font-medium uppercase tracking-[0.22em] text-navy transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
    >
      {/* Glow halo */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: "#C9A84C" }}
      />
      {/* Shimmer sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full"
      />
      <span className="relative flex items-center gap-3">
        {children}
        <ArrowRight
          size={14}
          strokeWidth={1.75}
          className="transition-transform duration-500 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

/* ----------------------- Decorative Corners ----------------------- */

function DecorativeCorners() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 1.2, ease: easePremium }}
        className="pointer-events-none absolute left-6 top-28 hidden md:block md:left-10 md:top-32"
        aria-hidden
      >
        <div className="h-10 w-px bg-gold/50" />
        <div className="-mt-px h-px w-10 bg-gold/50" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 1.2, ease: easePremium }}
        className="pointer-events-none absolute right-6 bottom-10 hidden md:block md:right-10 md:bottom-16"
        aria-hidden
      >
        <div className="ml-auto h-px w-10 bg-gold/50" />
        <div className="ml-auto h-10 w-px bg-gold/50" />
      </motion.div>
    </>
  );
}
