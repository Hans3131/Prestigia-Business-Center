import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Linkedin, Instagram } from "lucide-react";
import { PageHero } from "@/components/sections";
import { Section, SectionLabel } from "@/components/ui";
import { SlideUp, StaggerList, StaggerItem } from "@/components/animations";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Échangez avec les équipes Prestigia. Un conseiller dédié vous répond sous 24h pour construire la solution adaptée à votre entreprise.",
};

const contacts = [
  {
    icon: Phone,
    label: "Téléphone",
    value: "+32 489 82 05 23",
    href: "tel:+32489820523",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@prestigiabusinesscenter.com",
    href: "mailto:info@prestigiabusinesscenter.com",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "Lozenberg 21, 1932 Zaventem",
    href: "https://maps.google.com/?q=Lozenberg+21+1932+Zaventem",
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun – Ven · 08h – 20h",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Une équipe à votre"
        accent="écoute."
        subtitle="Écrivez-nous, appelez-nous ou passez directement à Zaventem. Nous prenons le temps qu'il faut pour comprendre vos besoins."
      />

      {/* Contact cards row */}
      <Section className="bg-ivory !pt-[30px] !pb-8">
        <StaggerList
          stagger={0.08}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {contacts.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-navy">
                  <Icon size={16} strokeWidth={1.5} />
                </span>
                <p className="mt-5 font-sans text-[10px] uppercase tracking-[0.3em] text-warmgray">
                  {label}
                </p>
                <p className="mt-2 font-serif text-lg font-semibold text-navy">
                  {value}
                </p>
              </>
            );
            return (
              <StaggerItem key={label}>
                {href ? (
                  <a
                    href={href}
                    className="group flex h-full flex-col rounded-sm border border-navy/10 bg-cream/60 p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-cream"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="group flex h-full flex-col rounded-sm border border-navy/10 bg-cream/60 p-6">
                    {inner}
                  </div>
                )}
              </StaggerItem>
            );
          })}
        </StaggerList>
      </Section>

      {/* Form + map */}
      <Section className="bg-ivory !py-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Form */}
          <SlideUp>
            <SectionLabel>Écrivez-nous</SectionLabel>
            <h2 className="mt-6 font-serif font-semibold leading-[1.15] tracking-normal text-navy">
              Parlons de votre <span className="italic text-gold">projet</span>.
            </h2>
            <p className="mt-6 leading-[1.75] text-navy/80">
              Décrivez-nous vos besoins en quelques lignes. Un conseiller dédié
              vous répond personnellement sous 24 heures ouvrées.
            </p>

            <ContactForm />
          </SlideUp>

          {/* Map + social */}
          <SlideUp delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-navy/10">
              <iframe
                title="Plan d'accès Prestigia Zaventem"
                src="https://www.openstreetmap.org/export/embed.html?bbox=4.45%2C50.87%2C4.50%2C50.90&layer=mapnik&marker=50.885%2C4.475"
                className="h-full w-full grayscale-[0.5]"
                loading="lazy"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/30"
              />
            </div>

            <div className="mt-8 rounded-sm border border-navy/10 bg-cream/60 p-6">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-warmgray">
                Suivez-nous
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/10 text-navy/60 transition-all hover:border-gold hover:bg-gold hover:text-navy"
                >
                  <Linkedin size={16} strokeWidth={1.5} />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/10 text-navy/60 transition-all hover:border-gold hover:bg-gold hover:text-navy"
                >
                  <Instagram size={16} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </SlideUp>
        </div>
      </Section>
    </>
  );
}
