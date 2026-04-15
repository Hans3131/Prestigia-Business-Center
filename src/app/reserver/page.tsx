import type { Metadata } from "next";
import { Calendar, Clock, User, Check } from "lucide-react";
import { PageHero } from "@/components/sections";
import { Section, SectionLabel } from "@/components/ui";
import { SlideUp } from "@/components/animations";
import { ReservationForm } from "./ReservationForm";

export const metadata: Metadata = {
  title: "Réserver une visite",
  description:
    "Planifiez une visite privée du centre Prestigia. Nos conseillers vous accueillent sur rendez-vous pour vous présenter nos espaces et services sur-mesure.",
};

const steps = [
  { icon: Calendar, label: "Choix du créneau" },
  { icon: User, label: "Coordonnées" },
  { icon: Check, label: "Confirmation" },
];

const benefits = [
  "Visite privée de 30 à 45 minutes",
  "Présentation personnalisée des services",
  "Rencontre avec un conseiller dédié",
  "Devis sur-mesure sous 24h",
];

export default function ReserverPage() {
  return (
    <>
      <PageHero
        label="Réserver"
        title="Planifiez votre"
        accent="visite privée."
        subtitle="Un rendez-vous confidentiel avec l'un de nos conseillers pour explorer nos espaces et construire l'offre qui correspond à vos ambitions."
      />

      {/* Steps indicator */}
      <Section className="bg-ivory !pt-[30px] !pb-8">
        <SlideUp>
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-gold/10 text-gold">
                      <Icon size={18} strokeWidth={1.5} />
                    </span>
                    <span className="mt-3 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-navy/70">
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden
                      className="mx-4 h-px flex-1 bg-gradient-to-r from-gold/50 via-gold/20 to-gold/50"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </SlideUp>
      </Section>

      {/* Main booking grid */}
      <Section className="bg-ivory !py-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* Left — benefits */}
          <SlideUp>
            <SectionLabel>Votre visite</SectionLabel>
            <h2 className="mt-6 font-serif font-semibold leading-[1.15] tracking-normal text-navy">
              Une rencontre <span className="italic text-gold">sans engagement</span>.
            </h2>

            <p className="mt-6 leading-[1.75] text-navy/80">
              Nos conseillers prennent le temps de comprendre votre projet avant
              de vous proposer une solution. Chaque visite est unique, à votre
              image.
            </p>

            <ul className="mt-8 space-y-4 border-t border-navy/10 pt-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                  <span className="text-navy/85">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-3 rounded-sm border border-gold/30 bg-gold/5 p-4">
              <Clock size={16} className="shrink-0 text-gold" strokeWidth={1.5} />
              <p className="text-sm text-navy/85">
                Durée moyenne <span className="font-medium">30 à 45 min</span> · Réponse sous 24h.
              </p>
            </div>
          </SlideUp>

          {/* Right — form */}
          <SlideUp delay={0.1}>
            <ReservationForm />
          </SlideUp>
        </div>
      </Section>
    </>
  );
}
