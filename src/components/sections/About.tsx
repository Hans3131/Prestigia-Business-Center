"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button, Section, SectionLabel } from "@/components/ui";
import {
  ParallaxImage,
  SplitReveal,
  MagneticButton,
} from "@/components/animations";
import { easePremium, viewportOnce } from "@/lib/animations";

export function About() {
  return (
    <Section id="about" className="bg-ivory !pt-[30px] !pb-10 relative overflow-hidden">
      {/* Ambient gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] bg-[radial-gradient(circle,rgba(201,168,76,0.06),transparent_65%)]"
      />

      <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
        {/* --- Visual side --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1.1, ease: easePremium }}
          className="relative"
        >
          <ParallaxImage
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop"
            alt="Intérieur Prestigia — espace premium à Zaventem"
            className="relative aspect-[4/5] rounded-sm"
            intensity={70}
          />

          {/* Gold frame corners */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 border-r border-t border-gold md:-right-6 md:-top-6 md:h-32 md:w-32"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 border-b border-l border-gold md:-bottom-6 md:-left-6 md:h-32 md:w-32"
          />

        </motion.div>

        {/* --- Text side --- */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: easePremium }}
          >
            <SectionLabel>À Propos de Prestigia</SectionLabel>

            {/* Italic eyebrow quote */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, delay: 0.3, ease: easePremium }}
              className="mt-6 max-w-xl font-serif text-base italic leading-[1.55] text-navy/55"
            >
              « Un lieu ne se choisit pas. Il vous choisit. »
            </motion.p>

            <h2 className="mt-4 font-serif font-semibold leading-[1.15] tracking-normal text-navy lg:whitespace-nowrap">
              <SplitReveal
                pre="Un écrin pensé pour les"
                accent="ambitions"
                post="d'exception."
              />
            </h2>

            {/* Gold accent line */}
            <span
              aria-hidden
              className="mt-6 block h-px w-20 bg-gradient-to-r from-gold via-gold/60 to-transparent"
            />

            <p className="mt-8 max-w-xl leading-[1.75] text-navy/80">
              Depuis plus de quinze ans, Prestigia accompagne les entrepreneurs
              et dirigeants qui exigent un cadre à la hauteur de leur vision.
              Domiciliation, gestion administrative, bureaux de prestige et
              stratégie marketing&nbsp;: chaque service est conçu comme un
              prolongement naturel de votre entreprise.
            </p>

            <p className="mt-6 max-w-xl leading-[1.75] text-navy/80">
              Au cœur de Zaventem, notre centre incarne une certaine idée du
              travail&nbsp;: rigoureuse, raffinée, résolument tournée vers
              l'excellence.
            </p>

            {/* CTA */}
            <div className="mt-10">
              <MagneticButton strength={0.2}>
                <Button href="/centres" variant="primary" size="lg">
                  Découvrir nos espaces
                  <ArrowRight size={16} strokeWidth={1.5} />
                </Button>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
