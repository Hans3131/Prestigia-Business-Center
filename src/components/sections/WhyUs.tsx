"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionLabel, Button } from "@/components/ui";
import { SplitReveal, MagneticButton } from "@/components/animations";
import { easePremium, viewportOnce } from "@/lib/animations";

const reasons = [
  {
    title: "Adresse de prestige",
    description:
      "Une domiciliation à Zaventem qui asseoit la crédibilité de votre entreprise auprès de vos clients et partenaires.",
  },
  {
    title: "Accompagnement sur-mesure",
    description:
      "Chaque service est pensé comme un prolongement naturel de votre activité. Nos équipes comprennent vos enjeux et y répondent avec précision.",
  },
  {
    title: "Discrétion absolue",
    description:
      "La confidentialité est au cœur de notre engagement. Vos échanges, documents et rendez-vous bénéficient d'une sécurité irréprochable.",
  },
  {
    title: "Réseau d'exception",
    description:
      "Rejoignez une communauté d'entrepreneurs visionnaires. Opportunités, rencontres et synergies naissent naturellement dans nos espaces.",
  },
  {
    title: "Flexibilité totale",
    description:
      "Contrats courts ou longs, bureaux à la journée ou à l'année : nous nous adaptons au rythme de vos ambitions, sans compromis.",
  },
  {
    title: "Cadre d'exception",
    description:
      "Des espaces raffinés, pensés dans le moindre détail pour offrir confort, inspiration et sérénité à chaque instant.",
  },
];

export function WhyUs() {
  return (
    <Section id="why-us" className="bg-ivory !py-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* ---- Left column ---- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: easePremium }}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <SectionLabel>L'Excellence Prestigia</SectionLabel>

          <h2 className="mt-6 font-serif font-semibold leading-[1.15] tracking-normal text-navy">
            <SplitReveal
              pre="Pourquoi faire appel à notre"
              accent="expertise"
              post="."
            />
          </h2>

          <p className="mt-6 max-w-md leading-[1.75] text-navy/80">
            Six piliers concrets qui font de Prestigia bien plus qu'un business
            center&nbsp;: un partenaire engagé dans votre réussite.
          </p>

          {/* Decorative gold line */}
          <div
            aria-hidden
            className="mt-8 h-px w-24 bg-gradient-to-r from-gold via-gold/40 to-transparent"
          />

          {/* Stats grid */}
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6">
            {[
              { value: "15+", label: "Années d'expertise" },
              { value: "+2500", label: "Clients accompagnés" },
              { value: "100%", label: "Confidentialité" },
              { value: "9h – 17h", label: "Accès sécurisé" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-serif text-2xl font-semibold leading-none text-navy md:text-3xl">
                  {s.value}
                </div>
                <div className="mt-2 font-sans text-[10px] uppercase tracking-[0.22em] text-warmgray">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10">
            <MagneticButton strength={0.2}>
              <Button href="/contact" variant="primary" size="lg">
                Échanger avec un conseiller
                <ArrowUpRight size={16} strokeWidth={1.5} />
              </Button>
            </MagneticButton>
          </div>
        </motion.div>

        {/* ---- Right column: editorial list ---- */}
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="relative"
        >
          {/* Vertical gold thread */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent md:block"
          />

          {reasons.map((r, i) => (
            <motion.li
              key={r.title}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, ease: easePremium },
                },
              }}
              className="group relative"
            >
              <div className="flex gap-5 border-b border-navy/10 py-6 transition-colors duration-500 last:border-b-0 group-hover:border-gold/50 md:gap-10 md:py-7">
                {/* Big italic serif number */}
                <div className="relative shrink-0">
                  <span className="font-serif text-4xl font-semibold italic leading-none text-navy/20 transition-colors duration-500 group-hover:text-gold md:text-5xl">
                    0{i + 1}
                  </span>
                  {/* Dot that appears on hover */}
                  <span
                    aria-hidden
                    className="absolute -right-3 top-1 h-1.5 w-1.5 scale-0 rounded-full bg-gold opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h3 className="font-serif text-xl font-semibold leading-snug text-navy transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 md:text-2xl">
                    {r.title}
                  </h3>
                  <p className="mt-2 max-w-xl leading-[1.7] text-navy/70 transition-colors duration-500 group-hover:text-navy/90">
                    {r.description}
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="hidden shrink-0 items-start pt-2 md:flex">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/10 text-navy/30 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.75}
                      className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </div>

              {/* Bottom accent gold line on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold/0 via-gold to-gold/0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}
