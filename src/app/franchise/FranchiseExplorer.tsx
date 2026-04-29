"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Building2,
  Megaphone,
  Calculator,
  ArrowUpRight,
  Check,
  Crown,
  TrendingUp,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Franchise = {
  id: "business-center" | "marketing" | "comptabilite";
  title: string;
  price: string;
  tagline: string;
  description: string;
  icon: typeof Building2;
  highlight: string;
  detail: {
    pitch: string;
    accompagnement: string[];
    cleEnMain: string[];
    resultats: string[];
    vision: string;
    image: string;
  };
};

const franchises: Franchise[] = [
  {
    id: "business-center",
    title: "Business Center",
    price: "70 000 €",
    tagline: "Le flagship",
    description:
      "Devenez le visage Prestigia dans votre région. Un business center clé en main, du local équipé à la marque déposée.",
    icon: Building2,
    highlight: "ROI estimé 18-24 mois",
    detail: {
      pitch:
        "La franchise reine du groupe. Vous opérez un business center premium sous l'enseigne Prestigia, avec tous les services associés : domiciliation, salles de réunion, coworking, gestion administrative.",
      accompagnement: [
        "Recherche et négociation du local commercial",
        "Aménagement intérieur sous direction artistique Prestigia",
        "Recrutement et formation des équipes (manager + accueil)",
        "Mise en place des outils CRM, comptabilité, réservation",
        "Lancement marketing local : SEO, presse, événement d'ouverture",
      ],
      cleEnMain: [
        "Identité visuelle et papeterie complètes",
        "Site web dédié à votre centre, intégré à prestigiabusinesscenter.com",
        "Procédures d'exploitation documentées (300+ pages)",
        "Support juridique et fiscal pendant 24 mois",
        "Logiciels métier inclus (gestion membres, facturation, CRM)",
      ],
      resultats: [
        "Chiffre d'affaires moyen 280k€ – 450k€ en année 2",
        "Marge nette typique 28 – 35%",
        "100 à 200 membres actifs en régime stabilisé",
        "Taux d'occupation salles 65% en moyenne",
      ],
      vision:
        "Construire un actif réel, transmissible, qui génère des revenus récurrents et un patrimoine immobilier — pas un simple métier.",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
    },
  },
  {
    id: "marketing",
    title: "Marketing",
    price: "25 000 €",
    tagline: "Croissance",
    description:
      "Une agence marketing premium sous licence Prestigia. Stratégie, branding, performance — vous facturez sans construire from scratch.",
    icon: Megaphone,
    highlight: "Profitabilité dès le 1er trimestre",
    detail: {
      pitch:
        "Vous lancez votre agence marketing avec une marque reconnue, des process éprouvés et un portfolio de prestations standardisées. Vous vendez du conseil et de la stratégie haut de gamme dès le premier jour.",
      accompagnement: [
        "Formation intensive 4 semaines (stratégie, vente, delivery)",
        "Bibliothèque de templates : audits, recommandations, livrables",
        "Pitch deck commercial éprouvé sur 100+ deals signés",
        "Accès aux outils premium (SEMrush, Ahrefs, Adobe)",
        "Mentorat hebdomadaire avec un strategist senior pendant 12 mois",
      ],
      cleEnMain: [
        "Méthodologie Prestigia™ documentée et reproductible",
        "Modèles de contrats, propositions, factures",
        "Site agence prêt à publier sous votre nom",
        "CRM préconfiguré avec scripts d'acquisition",
        "Accès au réseau de freelances qualifiés (design, dev, ads)",
      ],
      resultats: [
        "Premier client signé en moyenne en 6 semaines",
        "Panier moyen 3 500 – 8 000€ par mission",
        "Objectif réaliste 120 – 180k€ de CA en année 1",
        "Marge nette 45% sur les missions de conseil",
      ],
      vision:
        "Bâtir une agence d'expertise stratégique, pas un simple studio créatif. Vous vendez de la valeur, pas des heures.",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop",
    },
  },
  {
    id: "comptabilite",
    title: "Comptabilité",
    price: "10 000 €",
    tagline: "Accessible",
    description:
      "Le ticket d'entrée le plus accessible. Une activité de gestion administrative récurrente et hautement scalable.",
    icon: Calculator,
    highlight: "Activité 100% récurrente",
    detail: {
      pitch:
        "Un modèle de revenus récurrents par excellence : chaque client devient un abonnement mensuel. Vous proposez aux entreprises domiciliées chez Prestigia (et au-delà) un service complet de gestion administrative et comptable.",
      accompagnement: [
        "Formation complète aux outils comptables (Odoo, QuickBooks)",
        "Pas de diplôme comptable requis — vous coordonnez et gérez",
        "Réseau d'experts-comptables agréés en partenariat",
        "Onboarding client documenté de A à Z",
        "Hotline juridique et fiscale 24/7 incluse 18 mois",
      ],
      cleEnMain: [
        "Catalogue de prestations packagées (3 niveaux d'abonnement)",
        "Outils de gestion clients et facturation automatisée",
        "Modèles de mandats et lettres de mission",
        "Site web vitrine et tunnel d'inscription en ligne",
        "Pipeline initial de 20 prospects qualifiés à votre lancement",
      ],
      resultats: [
        "Récurrent stabilisé à 8 – 15k€/mois après 8 mois",
        "Panier moyen 250 – 800€/mois par client",
        "30 à 60 clients actifs en régime de croisière",
        "Marge nette 55 – 65% (forte scalabilité)",
      ],
      vision:
        "Construire un business à revenus récurrents, à très haute marge, avec un investissement de départ minimal et une croissance composée.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop",
    },
  },
];

export function FranchiseExplorer() {
  const [active, setActive] = useState<Franchise["id"] | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const handleSelect = (id: Franchise["id"]) => {
    setActive(id);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const activeFranchise = franchises.find((f) => f.id === active) ?? null;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {franchises.map((f, i) => (
          <FranchiseCard
            key={f.id}
            franchise={f}
            index={i}
            isActive={active === f.id}
            onSelect={() => handleSelect(f.id)}
          />
        ))}
      </div>

      <div ref={detailRef} className="scroll-mt-24">
        <AnimatePresence mode="wait">
          {activeFranchise && (
            <motion.div
              key={activeFranchise.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-20 md:mt-28"
            >
              <FranchiseDetail franchise={activeFranchise} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function FranchiseCard({
  franchise: f,
  index,
  isActive,
  onSelect,
}: {
  franchise: Franchise;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  const Icon = f.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
    >
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "group relative flex h-full w-full flex-col overflow-hidden rounded-sm border bg-navy p-8 text-left text-ivory transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:p-10",
          isActive
            ? "border-gold shadow-[0_30px_70px_-20px_rgba(201,168,76,0.25)] -translate-y-1"
            : "border-ivory/12 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_30px_70px_-30px_rgba(11,26,46,0.6)]"
        )}
      >
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent transition-opacity duration-700",
            isActive ? "opacity-100" : "opacity-40 group-hover:opacity-100"
          )}
        />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(201,168,76,0.16),transparent_55%)] transition-opacity duration-700",
            isActive ? "opacity-100" : "opacity-50 group-hover:opacity-100"
          )}
        />
        <span aria-hidden className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-gold/40 transition-all duration-700 group-hover:h-5 group-hover:w-5 group-hover:border-gold" />
        <span aria-hidden className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 border-r border-b border-gold/40 transition-all duration-700 group-hover:h-5 group-hover:w-5 group-hover:border-gold" />

        <div className="relative flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-sm border border-gold/40 bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ivory group-hover:-rotate-3">
            <Icon size={22} strokeWidth={1.25} />
          </span>
          <span className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-gold/85">
            {f.tagline}
          </span>
        </div>

        <h3 className="relative mt-10 font-serif text-3xl font-semibold leading-tight md:text-[2rem]">
          Franchise <span className="italic text-gold">{f.title}</span>
        </h3>

        <div className="relative mt-5">
          <span className="block whitespace-nowrap font-serif text-[2.5rem] font-semibold leading-none text-ivory md:text-5xl">
            {f.price}
          </span>
          <span className="mt-2 block font-sans text-[10px] uppercase tracking-[0.28em] text-ivory/50">
            Droits d'entrée
          </span>
        </div>

        <span
          aria-hidden
          className="relative mt-6 block h-px w-12 bg-gold transition-all duration-700 group-hover:w-24"
        />

        <p className="relative mt-6 text-[15px] leading-[1.7] text-ivory/75">
          {f.description}
        </p>

        <div className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/8 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
            {f.highlight}
          </span>
        </div>

        <div className="relative mt-auto pt-10">
          <span className="inline-flex items-center gap-3 font-sans text-[12px] font-medium uppercase tracking-[0.26em] text-ivory/85 transition-colors duration-500 group-hover:text-gold">
            <span>{isActive ? "Sélectionné" : "En savoir plus"}</span>
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-500",
                isActive
                  ? "border-gold bg-gold text-navy"
                  : "border-gold/50 group-hover:bg-gold group-hover:text-navy"
              )}
            >
              <ArrowUpRight size={13} strokeWidth={1.75} />
            </span>
          </span>
        </div>
      </button>
    </motion.div>
  );
}

function FranchiseDetail({ franchise: f }: { franchise: Franchise }) {
  return (
    <div className="overflow-hidden rounded-sm border border-gold/30 bg-cream">
      <div className="relative bg-navy px-6 py-8 text-ivory md:px-12 md:py-10">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        />
        <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-gold/85">
          Vue détaillée
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-serif text-3xl font-semibold leading-tight md:text-4xl">
            Franchise <span className="italic text-gold">{f.title}</span>
          </h3>
          <p className="font-serif text-2xl font-semibold text-gold md:text-3xl">
            {f.price}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 px-6 py-12 md:grid-cols-[3fr_2fr] md:gap-16 md:px-12 md:py-16">
        <div>
          <p className="font-serif text-lg italic leading-relaxed text-navy/80 md:text-xl">
            « {f.detail.vision} »
          </p>

          <div className="mt-10 space-y-10">
            <DetailBlock
              label="Le business"
              title="Vision et positionnement"
              text={f.detail.pitch}
            />

            <DetailList label="Accompagnement complet" items={f.detail.accompagnement} />
            <DetailList label="Clé en main" items={f.detail.cleEnMain} />
            <DetailList
              label="Résultats potentiels"
              items={f.detail.resultats}
              emphasis
            />
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-sm bg-navy px-7 py-3.5 font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-ivory transition-all duration-500 hover:-translate-y-0.5"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-700 group-hover:scale-x-100"
              />
              <span className="relative transition-colors duration-500 group-hover:text-navy">
                Postuler à cette franchise
              </span>
              <ArrowUpRight
                size={14}
                strokeWidth={1.75}
                className="relative transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy"
              />
            </Link>
            <span className="text-xs uppercase tracking-[0.22em] text-warmgray">
              Réponse sous 48h ouvrées
            </span>
          </div>
        </div>

        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] hover:scale-105"
              style={{ backgroundImage: `url(${f.detail.image})` }}
              aria-hidden
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-navy/80 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.32em] text-gold backdrop-blur">
                <Crown size={12} strokeWidth={1.5} />
                {f.tagline}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-sm border border-navy/10 bg-white/60 p-6 backdrop-blur-sm">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold">
              {f.highlight.includes("ROI") || f.highlight.includes("Profitabilité")
                ? "Performance"
                : "Modèle"}
            </p>
            <p className="mt-3 font-serif text-xl font-semibold leading-snug text-navy">
              {f.highlight}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-navy/70">
              Les chiffres sont indicatifs et basés sur la moyenne des
              franchisés Prestigia en activité depuis plus de 18 mois.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailBlock({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <div>
      <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-gold">
        {label}
      </p>
      <h4 className="mt-3 font-serif text-xl font-semibold text-navy">
        {title}
      </h4>
      <p className="mt-3 leading-[1.75] text-navy/80">{text}</p>
    </div>
  );
}

function DetailList({
  label,
  items,
  emphasis = false,
}: {
  label: string;
  items: string[];
  emphasis?: boolean;
}) {
  return (
    <div>
      <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-gold">
        {label}
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              className={cn(
                "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                emphasis ? "bg-gold text-navy" : "bg-gold/15 text-gold"
              )}
            >
              {emphasis ? (
                <TrendingUp size={11} strokeWidth={2.5} />
              ) : (
                <Check size={11} strokeWidth={2.5} />
              )}
            </span>
            <span
              className={cn(
                "leading-[1.65]",
                emphasis ? "text-navy font-medium" : "text-navy/80"
              )}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const valueIcons = { Layers };
