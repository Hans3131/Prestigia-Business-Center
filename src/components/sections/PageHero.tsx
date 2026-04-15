"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui";
import { easePremium } from "@/lib/animations";

type Props = {
  label: string;
  title: string;
  accent?: string;
  subtitle?: string;
  image?: string;
};

export function PageHero({
  label,
  title,
  accent,
  subtitle,
  image = "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop",
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-ivory pt-[140px] pb-[60px] md:pt-[180px] md:pb-[100px]">
      {/* Background */}
      <div className="absolute inset-0 -z-20">
        <div
          className="h-full w-full bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/70 via-navy/80 to-navy"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_20%,rgba(201,168,76,0.12),transparent_60%)]"
      />

      {/* Decorative corners */}
      <div aria-hidden className="pointer-events-none absolute left-6 top-[120px] hidden md:block md:left-12 md:top-32">
        <div className="h-10 w-px bg-gold/50" />
        <div className="-mt-px h-px w-10 bg-gold/50" />
      </div>
      <div aria-hidden className="pointer-events-none absolute right-6 bottom-8 hidden md:block md:right-12 md:bottom-12">
        <div className="ml-auto h-px w-10 bg-gold/50" />
        <div className="ml-auto h-10 w-px bg-gold/50" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex w-[90%] max-w-[1300px] flex-col items-center text-center md:w-full md:px-[50px]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easePremium, delay: 0.1 }}
        >
          <SectionLabel align="center" className="text-gold">
            {label}
          </SectionLabel>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: easePremium, delay: 0.25 }}
          className="mt-6 font-serif font-semibold leading-[1.05] tracking-normal text-ivory text-[clamp(2rem,4.8vw,4rem)]"
        >
          {title}{" "}
          {accent && <span className="italic text-gold">{accent}</span>}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easePremium, delay: 0.45 }}
            className="mt-6 max-w-2xl leading-[1.75] text-ivory/80"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
