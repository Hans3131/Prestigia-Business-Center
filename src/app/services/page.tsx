import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  FileText,
  Users,
  Briefcase,
  Megaphone,
  ArrowRight,
  Check,
} from "lucide-react";
import { PageHero } from "@/components/sections";
import { Section, SectionLabel, Button } from "@/components/ui";
import { SlideUp } from "@/components/animations";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Découvrez les cinq services d'élite de Prestigia : domiciliation, gestion administrative, salles de réunion, coworking et accompagnement marketing.",
};

type ServiceBlock = {
  id: string;
  icon: typeof Building2;
  title: string;
  accent: string;
  description: string;
  features: string[];
  image: string;
};

const services: ServiceBlock[] = [
  {
    id: "domiciliation",
    icon: Building2,
    title: "Domiciliation",
    accent: "d'entreprise",
    description:
      "Installez votre siège social à une adresse premium de Zaventem. Une vitrine qui impose la confiance avant même le premier rendez-vous.",
    features: [
      "Adresse prestigieuse à Zaventem",
      "Réception et tri du courrier",
      "Numérisation et envoi des documents",
      "Contrat flexible — mensuel ou annuel",
    ],
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "gestion",
    icon: FileText,
    title: "Gestion",
    accent: "administrative",
    description:
      "Déléguez vos tâches quotidiennes à une équipe dédiée. Du courrier au secrétariat, nous gérons avec discrétion et précision.",
    features: [
      "Secrétariat téléphonique personnalisé",
      "Gestion des factures et relances",
      "Organisation d'agenda",
      "Assistance RH et administrative",
    ],
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "salles",
    icon: Users,
    title: "Salles",
    accent: "de réunion",
    description:
      "Des espaces raffinés et technologiquement équipés pour vos rendez-vous les plus stratégiques, de 4 à 20 personnes.",
    features: [
      "Salles modulables 4 à 20 places",
      "Écrans 4K et visioconférence",
      "Café, thé et collation premium",
      "Réservation à l'heure ou à la journée",
    ],
    image:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "coworking",
    icon: Briefcase,
    title: "Espaces",
    accent: "coworking",
    description:
      "Un environnement calme et inspirant, pensé pour stimuler la concentration et favoriser les rencontres de qualité.",
    features: [
      "Postes flexibles ou dédiés",
      "Fibre très haut débit sécurisée",
      "Espaces détente et cuisine",
      "Accès sécurisé par badge",
    ],
    image:
      "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "marketing",
    icon: Megaphone,
    title: "Accompagnement",
    accent: "marketing",
    description:
      "Une expertise stratégique pour gagner en visibilité. De l'identité de marque à la performance digitale, nous structurons votre rayonnement.",
    features: [
      "Stratégie de marque et positionnement",
      "Identité visuelle et brand book",
      "Site web et présence digitale",
      "Campagnes et analyse de performance",
    ],
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Cinq services"
        accent="d'élite."
        subtitle="Un catalogue pensé comme une offre complète : chaque service répond à un besoin précis des entrepreneurs exigeants, et tous fonctionnent en synergie pour structurer votre réussite."
        image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2400&auto=format&fit=crop"
      />

      {/* Service blocks */}
      {services.map((s, i) => {
        const Icon = s.icon;
        const reversed = i % 2 === 1;
        return (
          <Section
            key={s.id}
            id={s.id}
            className={`${i === 0 ? "bg-cream" : i % 2 === 1 ? "bg-ivory" : "bg-cream"} !py-12 md:!py-20`}
          >
            <div
              className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reversed ? "lg:[&>:first-child]:order-2" : ""}`}
            >
              {/* Image */}
              <SlideUp>
                <div className="relative">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
                      style={{ backgroundImage: `url(${s.image})` }}
                      aria-hidden
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent"
                    />
                  </div>
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute ${reversed ? "-left-4 -top-4" : "-right-4 -top-4"} h-20 w-20 ${reversed ? "border-l border-t" : "border-r border-t"} border-gold md:${reversed ? "-left-6 -top-6" : "-right-6 -top-6"} md:h-28 md:w-28`}
                  />
                </div>
              </SlideUp>

              {/* Text */}
              <SlideUp delay={0.1}>
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
                    0{i + 1}
                  </span>
                  <span className="h-px w-8 bg-gold/60" aria-hidden />
                  <Icon size={18} strokeWidth={1.5} className="text-gold" />
                </div>

                <h2 className="mt-6 font-serif font-semibold leading-[1.15] tracking-normal text-navy">
                  {s.title}{" "}
                  <span className="italic text-gold">{s.accent}</span>
                </h2>

                <p className="mt-6 max-w-xl leading-[1.75] text-navy/80">
                  {s.description}
                </p>

                <ul className="mt-8 space-y-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                        <Check size={10} strokeWidth={2.5} />
                      </span>
                      <span className="text-navy/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Button href="/contact" variant="ghost" size="md">
                    Demander une offre
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </Button>
                </div>
              </SlideUp>
            </div>
          </Section>
        );
      })}

      {/* CTA bottom */}
      <Section className="bg-navy !py-16 md:!py-24 text-ivory">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel align="center">Parlons de votre projet</SectionLabel>
          <h2 className="mt-6 font-serif font-semibold leading-[1.15] tracking-normal text-ivory">
            Un accompagnement <span className="italic text-gold">sur-mesure</span>.
          </h2>
          <p className="mt-6 leading-[1.75] text-ivory/75">
            Nos conseillers étudient votre situation et vous proposent une
            combinaison de services adaptée à vos ambitions.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Button href="/reserver" variant="primary" size="lg">
              Réserver une visite
              <ArrowRight size={16} strokeWidth={1.5} />
            </Button>
            <Link
              href="/contact"
              className="font-sans text-sm uppercase tracking-[0.22em] text-ivory/85 hover:text-ivory"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
