"use client";

import { Quote, Star } from "lucide-react";
import { motion } from "motion/react";
import { Section, SectionLabel } from "@/components/ui";
import { SplitReveal } from "@/components/animations";
import { easePremium, viewportOnce } from "@/lib/animations";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  rating: number;
};

const featured: Testimonial = {
  quote:
    "Un cadre remarquable et un service d'une rigueur exemplaire. Prestigia incarne le sérieux que nous exigeons de nos partenaires — et la discrétion dont nos clients ont besoin.",
  author: "Marc Antoine Lefèvre",
  role: "Fondateur",
  company: "Cabinet de conseil M.A.L",
  initials: "ML",
  rating: 5,
};

const side: Testimonial[] = [
  {
    quote:
      "Une flexibilité sans égale et une écoute attentive. Le partenaire idéal pour une jeune entreprise ambitieuse.",
    author: "Méline Moret",
    role: "CEO",
    company: "Oryn Technologies",
    initials: "MM",
    rating: 5,
  },
  {
    quote:
      "La qualité des lieux et l'accompagnement marketing nous ont permis de gagner en crédibilité auprès de nos clients.",
    author: "Edlen Caster",
    role: "Directeur",
    company: "Caster Digital",
    initials: "EC",
    rating: 5,
  },
];

const brands = ["CABINET M.A.L", "ORYN TECH", "CASTER DIGITAL", "LUMIA GROUP", "ATRIUM"];

export function Testimonials() {
  return (
    <Section className="bg-cream !py-8 relative overflow-hidden">
      {/* Ornamental oversized quote mark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-6 -top-12 font-serif text-[22rem] font-bold leading-none text-gold/[0.045] select-none md:-left-8 md:-top-20"
      >
        &rdquo;
      </span>

      {/* Header */}
      <div className="relative mb-10 flex flex-col items-center text-center">
        <SectionLabel align="center">Témoignages</SectionLabel>
        <h2 className="mt-6 max-w-3xl font-serif font-semibold leading-[1.15] tracking-normal text-navy">
          <SplitReveal pre="Ils nous font" accent="confiance" />
        </h2>

        {/* Rating row */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className="fill-gold text-gold"
                strokeWidth={1}
              />
            ))}
          </div>
          <span className="font-sans text-sm text-navy/70">
            <span className="font-semibold text-navy">4.9 / 5</span> · plus de
            200 entrepreneurs accompagnés
          </span>
        </div>
      </div>

      {/* ----- Featured + sides grid ----- */}
      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Featured card */}
        <FeaturedCard testimonial={featured} />

        {/* Two stacked side cards */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {side.map((t, i) => (
            <SideCard key={t.author} testimonial={t} index={i} />
          ))}
        </div>
      </div>

      {/* ----- Brand strip ----- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.2, ease: easePremium, delay: 0.2 }}
        className="relative mt-12 border-t border-navy/10 pt-10"
      >
        <p className="mb-6 text-center font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-warmgray">
          Ils choisissent Prestigia
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
          {brands.map((b) => (
            <span
              key={b}
              className="font-sans text-xs font-medium tracking-[0.32em] text-navy/45 transition-colors duration-500 hover:text-navy md:text-sm"
            >
              {b}
            </span>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

/* ------------------------------ Cards ------------------------------ */

function FeaturedCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 1, ease: easePremium }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-navy/10 bg-navy p-8 text-ivory shadow-[0_24px_50px_-28px_rgba(11,26,46,0.35)] lg:col-span-3 lg:p-12"
    >
      {/* Gold ambient glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,rgba(201,168,76,0.18),transparent_55%)]"
      />
      {/* Top hairline */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
      />
      {/* Decorative corners */}
      <span aria-hidden className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-gold/40" />
      <span aria-hidden className="pointer-events-none absolute right-4 bottom-4 h-5 w-5 border-r border-b border-gold/40" />

      <div className="relative">
        <Quote size={32} strokeWidth={1} className="text-gold" aria-hidden />
        <blockquote className="mt-6 font-serif text-xl font-medium leading-[1.45] text-ivory md:text-2xl lg:text-[1.6rem]">
          “{t.quote}”
        </blockquote>
      </div>

      <figcaption className="relative mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-ivory/10 pt-6">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold/10 font-serif text-sm font-semibold text-gold">
            {t.initials}
          </span>
          <div>
            <p className="font-sans text-sm font-medium text-ivory">
              {t.author}
            </p>
            <p className="mt-0.5 text-xs text-ivory/60">
              {t.role} · {t.company}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className="fill-gold text-gold"
              strokeWidth={1}
            />
          ))}
        </div>
      </figcaption>
    </motion.figure>
  );
}

function SideCard({
  testimonial: t,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{
        duration: 0.9,
        ease: easePremium,
        delay: 0.1 + index * 0.1,
      }}
      className="group relative flex flex-1 flex-col justify-between overflow-hidden rounded-sm border border-navy/10 bg-white/50 p-6 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/50 hover:bg-white hover:shadow-[0_20px_40px_-20px_rgba(11,26,46,0.18)] md:p-7"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />

      <div>
        <Quote size={20} strokeWidth={1} className="text-gold" aria-hidden />
        <blockquote className="mt-4 font-serif text-base font-medium leading-[1.55] text-navy md:text-[17px]">
          “{t.quote}”
        </blockquote>
      </div>

      <figcaption className="mt-6 flex items-center justify-between border-t border-navy/10 pt-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-serif text-xs font-semibold text-gold">
            {t.initials}
          </span>
          <div>
            <p className="font-sans text-sm font-medium text-navy">
              {t.author}
            </p>
            <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-warmgray">
              {t.role} · {t.company}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star
              key={i}
              size={11}
              className="fill-gold text-gold"
              strokeWidth={1}
            />
          ))}
        </div>
      </figcaption>
    </motion.figure>
  );
}
