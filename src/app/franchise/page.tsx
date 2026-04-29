import type { Metadata } from "next";
import {
  GraduationCap,
  Sparkles,
  HandCoins,
  ShieldCheck,
  TrendingUp,
  Layers,
  Target,
  ArrowRight,
} from "lucide-react";
import { Section, SectionLabel, Button } from "@/components/ui";
import { SlideUp, StaggerList, StaggerItem, SplitReveal, MagneticButton } from "@/components/animations";
import { FranchiseExplorer } from "./FranchiseExplorer";

export const metadata: Metadata = {
  title: "Franchise Prestigia",
  description:
    "Démarrez un business clé en main avec Prestigia. Trois franchises premium — Business Center, Marketing, Comptabilité — pensées comme des opportunités d'investissement rentables et durables.",
};

const values = [
  {
    icon: GraduationCap,
    title: "Accessible sans diplôme",
    description:
      "Aucune qualification académique requise. Notre programme de formation vous donne tout ce dont vous avez besoin.",
  },
  {
    icon: Sparkles,
    title: "Sans expérience préalable",
    description:
      "Vous démarrez de zéro ou en reconversion. Nos process pas-à-pas couvrent l'ensemble du cycle business.",
  },
  {
    icon: HandCoins,
    title: "Accompagnement complet",
    description:
      "Onboarding intensif, mentorat continu, hotline experte. Vous n'êtes jamais seul face aux décisions clés.",
  },
  {
    icon: ShieldCheck,
    title: "Modèle éprouvé",
    description:
      "15 années d'opération, +2500 clients accompagnés. Un système qui produit des résultats reproductibles.",
  },
];

const proofs = [
  {
    icon: Layers,
    label: "Business structuré",
    text: "Un système opérationnel documenté à chaque étape : acquisition, delivery, gestion, scaling. Rien n'est laissé à l'improvisation.",
  },
  {
    icon: TrendingUp,
    label: "Rentable",
    text: "Chaque franchise est dimensionnée pour atteindre la rentabilité dans les 12 à 24 mois. Les indicateurs sont publics et auditables.",
  },
  {
    icon: Target,
    label: "Scalable",
    text: "Les modèles supportent la croissance : duplication de centres, multiplication d'agences, montée en gamme automatique des paniers.",
  },
];

export default function FranchisePage() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-navy text-ivory pt-[100px] pb-[50px] md:pb-[100px]">
        <div className="absolute inset-0 -z-20">
          <div
            className="h-full w-full bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2400&auto=format&fit=crop')",
            }}
            aria-hidden
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/65 via-navy/80 to-navy"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_25%_15%,rgba(201,168,76,0.18),transparent_55%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        <span aria-hidden className="pointer-events-none absolute left-6 top-32 hidden h-10 w-10 border-l border-t border-gold/50 md:block md:left-12" />
        <span aria-hidden className="pointer-events-none absolute right-6 bottom-12 hidden h-10 w-10 border-r border-b border-gold/50 md:block md:right-12" />

        <SlideUp className="relative w-[90%] max-w-[1300px] text-center md:w-full md:px-[50px]">
          <div className="mb-10 flex justify-center">
            <span className="inline-flex items-center gap-3 rounded-full border border-ivory/15 bg-ivory/5 px-5 py-2 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-ivory/90 md:text-[12px]">
                Opportunité d'investissement
              </span>
            </span>
          </div>

          <h1 className="font-serif font-semibold leading-[1.05] tracking-normal text-ivory text-[clamp(2.5rem,5.6vw,5.5rem)]">
            Démarrez un business <br className="hidden md:block" />
            <span className="italic text-gold">clé en main.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-[15px] leading-[1.75] text-ivory/85 md:text-base">
            Trois franchises Prestigia, trois modèles éprouvés pour bâtir une
            activité rentable, durable et transmissible. Un investissement
            unique, des revenus structurels — la liberté financière par le
            sérieux opérationnel.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <MagneticButton strength={0.2}>
              <a
                href="#franchises"
                className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-sm bg-gold px-9 font-sans text-xs font-medium uppercase tracking-[0.22em] text-navy transition-all duration-500 hover:-translate-y-0.5"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50"
                  style={{ background: "#C9A84C" }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
                />
                Découvrir les franchises
                <ArrowRight size={14} strokeWidth={1.75} />
              </a>
            </MagneticButton>

            <a
              href="#proof"
              className="group inline-flex items-center gap-3 font-sans text-sm uppercase tracking-[0.22em] text-ivory/85 transition-colors hover:text-ivory"
            >
              <span className="relative pb-1">
                Pourquoi Prestigia
                <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </span>
            </a>
          </div>
        </SlideUp>
      </section>

      {/* ===== Positionnement ===== */}
      <Section className="bg-ivory !py-[50px]">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel align="center">Positionnement</SectionLabel>
          <h2 className="mt-6 font-serif font-semibold leading-[1.15] tracking-normal text-navy">
            <SplitReveal
              pre="Un investissement"
              accent="rentable, stable"
              post="et durable."
            />
          </h2>
          <p className="mt-8 leading-[1.85] text-navy/80 md:text-[17px]">
            Nous ne vendons pas une promesse. Nous proposons une participation
            à un système éprouvé — un actif réel, mesurable, qui génère des
            revenus récurrents et conserve sa valeur dans le temps.
            Chaque franchise est conçue comme une PME autonome, ancrée dans une
            marque reconnue.
          </p>
          <span
            aria-hidden
            className="mx-auto mt-10 block h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
          />
        </div>
      </Section>

      {/* ===== Franchises ===== */}
      <Section
        id="franchises"
        className="bg-cream !py-[50px] scroll-mt-24"
      >
        <div className="mb-14 flex flex-col items-center text-center">
          <SectionLabel align="center">Trois opportunités</SectionLabel>
          <h2 className="mt-6 max-w-3xl font-serif font-semibold leading-[1.15] tracking-normal text-navy">
            <SplitReveal pre="Choisissez votre" accent="modèle d'excellence" />
          </h2>
          <p className="mt-6 max-w-xl leading-[1.7] text-navy/70">
            Trois portes d'entrée vers l'écosystème Prestigia, du ticket le
            plus accessible au flagship. Cliquez pour explorer.
          </p>
        </div>

        <FranchiseExplorer />
      </Section>

      {/* ===== Valeur ===== */}
      <Section className="bg-ivory !py-[50px]">
        <div className="mb-14 flex flex-col items-center text-center">
          <SectionLabel align="center">L'engagement Prestigia</SectionLabel>
          <h2 className="mt-6 max-w-3xl font-serif font-semibold leading-[1.15] tracking-normal text-navy">
            <SplitReveal pre="Tout pour" accent="réussir" post="dès le départ." />
          </h2>
        </div>

        <StaggerList
          stagger={0.1}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <StaggerItem key={v.title}>
                <div className="group relative flex h-full flex-col rounded-sm border border-navy/10 bg-cream/60 p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/50 hover:bg-cream hover:shadow-[0_24px_50px_-24px_rgba(11,26,46,0.15)]">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold/0 via-gold to-gold/0 transition-transform duration-700 group-hover:scale-x-100"
                  />
                  <span className="flex h-12 w-12 items-center justify-center rounded-sm border border-gold/30 bg-gold/5 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ivory group-hover:-rotate-3">
                    <Icon size={20} strokeWidth={1.25} />
                  </span>
                  <h3 className="mt-6 font-serif text-lg font-semibold leading-tight text-navy md:text-xl">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-navy/70">
                    {v.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerList>
      </Section>

      {/* ===== Preuve / Business ===== */}
      <Section
        id="proof"
        className="relative bg-navy !py-[50px] text-ivory"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_25%,rgba(201,168,76,0.14),transparent_55%)]"
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <SlideUp>
            <SectionLabel className="text-gold">Le système</SectionLabel>
            <h2 className="mt-6 font-serif font-semibold leading-[1.15] tracking-normal text-ivory">
              Un business <span className="italic text-gold">qui se réplique</span>.
            </h2>
            <p className="mt-8 leading-[1.85] text-ivory/80">
              Prestigia n'est pas un concept marketing — c'est un système
              opérationnel construit sur 15 années d'exploitation. Chaque
              franchise hérite de procédures testées, d'outils éprouvés et
              d'une marque qui ouvre les portes.
            </p>
            <p className="mt-6 leading-[1.85] text-ivory/80">
              Vous n'achetez pas un emploi. Vous prenez part à un actif qui
              génère, qui scale, et qui se transmet.
            </p>
          </SlideUp>

          <StaggerList
            stagger={0.12}
            className="space-y-6"
          >
            {proofs.map((p) => {
              const Icon = p.icon;
              return (
                <StaggerItem key={p.label}>
                  <div className="group relative overflow-hidden rounded-sm border border-ivory/10 bg-ivory/[0.02] p-7 backdrop-blur-sm transition-all duration-500 hover:border-gold/40 hover:bg-ivory/[0.04]">
                    <div className="flex items-start gap-5">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-gold/40 bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-navy">
                        <Icon size={20} strokeWidth={1.25} />
                      </span>
                      <div>
                        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
                          {p.label}
                        </p>
                        <p className="mt-3 leading-[1.7] text-ivory/85">
                          {p.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerList>
        </div>
      </Section>

      {/* ===== Final CTA ===== */}
      <Section className="bg-cream !py-[50px]">
        <div className="relative mx-auto max-w-3xl text-center">
          <span aria-hidden className="pointer-events-none absolute -left-2 -top-2 h-8 w-8 border-l border-t border-gold md:-left-6 md:-top-6 md:h-12 md:w-12" />
          <span aria-hidden className="pointer-events-none absolute -right-2 -bottom-2 h-8 w-8 border-r border-b border-gold md:-right-6 md:-bottom-6 md:h-12 md:w-12" />

          <SlideUp>
            <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-gold">
              Le pas suivant
            </p>
            <h2 className="mt-6 font-serif font-semibold leading-[1.1] tracking-normal text-navy text-[clamp(2rem,4.4vw,3.5rem)]">
              <span className="block">Rejoindre</span>
              <span className="block italic text-gold">Prestigia.</span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl leading-[1.75] text-navy/75">
              Les places sont délibérément limitées — chaque franchisé reçoit
              l'attention qu'exige son projet. Un entretien confidentiel pour
              valider l'adéquation et tracer votre feuille de route.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
              <MagneticButton strength={0.2}>
                <Button href="/contact" variant="primary" size="lg">
                  Postuler maintenant
                  <ArrowRight size={16} strokeWidth={1.5} />
                </Button>
              </MagneticButton>
              <a
                href="tel:+32489820523"
                className="group inline-flex items-center gap-3 font-sans text-sm uppercase tracking-[0.22em] text-navy/85 transition-colors hover:text-navy"
              >
                <span className="relative pb-1">
                  +32 489 82 05 23
                  <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </span>
              </a>
            </div>

            <p className="mt-12 text-xs uppercase tracking-[0.22em] text-warmgray">
              Confidentialité garantie · Réponse sous 48h ouvrées
            </p>
          </SlideUp>
        </div>
      </Section>
    </>
  );
}
