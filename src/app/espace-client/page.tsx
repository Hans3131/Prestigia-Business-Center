import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Mail, ArrowRight, FileText, Inbox, Calendar, CreditCard } from "lucide-react";
import { PageHero } from "@/components/sections";
import { Section, SectionLabel, Field, Input, Button } from "@/components/ui";
import { SlideUp } from "@/components/animations";

export const metadata: Metadata = {
  title: "Espace Client",
  description:
    "Accédez à votre espace personnel Prestigia pour consulter votre courrier, vos factures, gérer vos réservations et échanger avec votre conseiller.",
};

const features = [
  { icon: Inbox, label: "Courrier & colis", description: "Notifications en temps réel." },
  { icon: FileText, label: "Factures & contrats", description: "Téléchargement sécurisé." },
  { icon: Calendar, label: "Réservations", description: "Salles & créneaux en un clic." },
  { icon: CreditCard, label: "Paiements", description: "Historique transparent." },
];

export default function EspaceClientPage() {
  return (
    <>
      <PageHero
        label="Espace Client"
        title="Votre portail"
        accent="privé."
        subtitle="Un espace sécurisé pour piloter votre relation avec Prestigia : courrier, factures, réservations et échanges avec votre conseiller."
      />

      <Section className="bg-ivory !pt-[30px] !pb-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — features preview */}
          <SlideUp>
            <SectionLabel>Fonctionnalités</SectionLabel>
            <h2 className="mt-6 font-serif font-semibold leading-[1.15] tracking-normal text-navy">
              Tout votre Prestigia, <span className="italic text-gold">à portée de clic</span>.
            </h2>
            <p className="mt-6 leading-[1.75] text-navy/80">
              L'espace client centralise l'ensemble des services au quotidien.
              Un outil pensé pour vous faire gagner du temps, sans jamais
              sacrifier la qualité de l'accompagnement humain.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map(({ icon: Icon, label, description }) => (
                <div
                  key={label}
                  className="group rounded-sm border border-navy/10 bg-cream/60 p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-navy">
                    <Icon size={16} strokeWidth={1.5} />
                  </span>
                  <p className="mt-4 font-serif text-lg font-semibold text-navy">
                    {label}
                  </p>
                  <p className="mt-1 text-sm text-navy/70">{description}</p>
                </div>
              ))}
            </div>
          </SlideUp>

          {/* Right — login card */}
          <SlideUp delay={0.1}>
            <div className="relative overflow-hidden rounded-sm border border-navy/10 bg-navy p-8 text-ivory md:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_10%,rgba(201,168,76,0.18),transparent_55%)]"
              />
              {/* Decorative corners */}
              <div aria-hidden className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-gold/50" />
              <div aria-hidden className="pointer-events-none absolute right-3 bottom-3 h-5 w-5 border-r border-b border-gold/50" />

              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                  <Lock size={18} strokeWidth={1.5} />
                </span>

                <h3 className="mt-6 font-serif text-2xl font-semibold leading-tight">
                  Connexion sécurisée
                </h3>
                <p className="mt-2 text-sm text-ivory/70">
                  Identifiez-vous pour accéder à votre tableau de bord.
                </p>

                <form className="mt-8 space-y-6">
                  <Field label="Email" dark>
                    <Input dark type="email" name="email" autoComplete="email" required />
                  </Field>
                  <Field label="Mot de passe" dark>
                    <Input dark type="password" name="password" required autoComplete="current-password" />
                  </Field>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs text-ivory/70">
                      <input type="checkbox" className="accent-[#C9A84C]" />
                      Se souvenir de moi
                    </label>
                    <Link
                      href="#"
                      className="text-xs text-gold hover:underline"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Se connecter
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </Button>
                </form>

                <p className="mt-8 border-t border-ivory/10 pt-6 text-center text-sm text-ivory/70">
                  Pas encore client Prestigia ?{" "}
                  <Link href="/contact" className="text-gold hover:underline">
                    Contactez-nous
                  </Link>
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-sm border border-gold/20 bg-gold/5 p-4">
              <Mail size={16} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.5} />
              <p className="text-sm text-navy/80">
                Pour toute assistance, écrivez à{" "}
                <a href="mailto:support@prestigia.be" className="text-gold hover:underline">
                  support@prestigia.be
                </a>
                .
              </p>
            </div>
          </SlideUp>
        </div>
      </Section>
    </>
  );
}
